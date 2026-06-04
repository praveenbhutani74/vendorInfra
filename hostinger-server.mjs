import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { Readable } from "node:stream";
import { pathToFileURL } from "node:url";

const clientDir = resolve("dist/client");
const serverEntryPath = resolve("dist/server/server.js");

function loadLocalEnv() {
  const envPath = resolve(".env.local");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] ??= value;
  }
}

loadLocalEnv();

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "0.0.0.0";

const mimeTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function getStaticFile(pathname) {
  const decodedPath = decodeURIComponent(pathname.split("?")[0] ?? "/");
  const normalizedPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(clientDir, normalizedPath === "/" ? "index.html" : normalizedPath);
  const resolvedFile = resolve(filePath);

  if (!resolvedFile.startsWith(clientDir) || !existsSync(resolvedFile)) {
    return undefined;
  }

  const stat = statSync(resolvedFile);
  if (!stat.isFile()) return undefined;

  return { filePath: resolvedFile, stat };
}

function sendStatic(res, pathname) {
  const file = getStaticFile(pathname);
  if (!file) return false;

  const ext = extname(file.filePath).toLowerCase();
  res.writeHead(200, {
    "content-type": mimeTypes[ext] ?? "application/octet-stream",
    "content-length": file.stat.size,
    "cache-control": pathname.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "public, max-age=300",
  });
  createReadStream(file.filePath).pipe(res);
  return true;
}

async function toWebRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  const hostHeader = req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost";
  const url = `${protocol}://${hostHeader}${req.url ?? "/"}`;
  const method = req.method ?? "GET";
  const hasBody = !["GET", "HEAD"].includes(method);

  return new Request(url, {
    method,
    headers: req.headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

async function sendWebResponse(res, webResponse) {
  res.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => res.setHeader(key, value));

  if (!webResponse.body) {
    res.end();
    return;
  }

  Readable.fromWeb(webResponse.body).pipe(res);
}

const app = await import(pathToFileURL(serverEntryPath).href).then((module) => module.default ?? module);

createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url ?? "/", "http://localhost").pathname;
    const shouldServeStatic = req.method === "GET" || req.method === "HEAD";

    if (shouldServeStatic && sendStatic(res, pathname)) {
      return;
    }

    const webRequest = await toWebRequest(req);
    const webResponse = await app.fetch(webRequest, process.env, {});
    await sendWebResponse(res, webResponse);
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
}).listen(port, host, () => {
  console.log(`Vendor Infra website listening on http://${host}:${port}`);
});
