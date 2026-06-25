import { useEffect } from "react";

const DEFAULT_TITLE = "Vendor Infra | Vendor Infra | AI-Powered Operating System for Infrastructure, Construction & Manufacturing Industry.";
const DEFAULT_DESCRIPTION =
  "Discover vendors, procure materials & access real-time market intelligence. India's #1 platform for contractors and EPC companies.";

function getOgImageUrl() {
  return `${window.location.origin}/og-image.jpg`;
}

export function setPageSeo({
  title,
  description,
  ogImage,
}: {
  title: string;
  description?: string;
  ogImage?: string;
}) {
  document.title = title;

  const setMeta = (name: string, content: string, isOg = false) => {
    const attr = isOg ? "property" : "name";
    let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  const desc = description ?? DEFAULT_DESCRIPTION;
  const image = ogImage ?? getOgImageUrl();
  const url = window.location.href;

  setMeta("description", desc);

  setMeta("og:title", title, true);
  setMeta("og:description", desc, true);
  setMeta("og:image", image, true);
  setMeta("og:image:width", "1200", true);
  setMeta("og:image:height", "630", true);
  setMeta("og:url", url, true);
  setMeta("og:type", "website", true);
  setMeta("og:site_name", "Vendor Infra", true);

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", desc);
  setMeta("twitter:image", image);
}

export function resetPageSeo() {
  setPageSeo({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION });
}

export function usePageSeo(title: string, description?: string) {
  useEffect(() => {
    setPageSeo({ title, description });
    return () => resetPageSeo();
  }, [title, description]);
}
