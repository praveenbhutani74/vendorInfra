Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $root "public\brand\Logo-Blue-1.png"
$png32Path = Join-Path $root "public\favicon-32x32.png"
$png16Path = Join-Path $root "public\favicon-16x16.png"
$icoPath = Join-Path $root "public\favicon.ico"
$svgPath = Join-Path $root "public\favicon.svg"

function New-ResizedPng($source, $dest, $size) {
  $src = [System.Drawing.Image]::FromFile($source)
  try {
    # The Vendor Infra symbol is the left square-ish mark in the full wordmark.
    $cropW = [Math]::Min(78, $src.Width)
    $cropH = $src.Height
    $crop = New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH

    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $pad = [Math]::Max(2, [int]($size * 0.1))
    $target = New-Object System.Drawing.Rectangle $pad, $pad, ($size - $pad * 2), ($size - $pad * 2)
    $g.DrawImage($src, $target, $crop, [System.Drawing.GraphicsUnit]::Pixel)
    $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
  } finally {
    $src.Dispose()
  }
}

function New-Ico($pngPath, $icoPath) {
  $bytes = [System.IO.File]::ReadAllBytes($pngPath)
  $fs = [System.IO.File]::Create($icoPath)
  try {
    $bw = New-Object System.IO.BinaryWriter $fs
    $bw.Write([UInt16]0)
    $bw.Write([UInt16]1)
    $bw.Write([UInt16]1)
    $bw.Write([Byte]32)
    $bw.Write([Byte]32)
    $bw.Write([Byte]0)
    $bw.Write([Byte]0)
    $bw.Write([UInt16]1)
    $bw.Write([UInt16]32)
    $bw.Write([UInt32]$bytes.Length)
    $bw.Write([UInt32]22)
    $bw.Write($bytes)
    $bw.Dispose()
  } finally {
    $fs.Dispose()
  }
}

New-ResizedPng $sourcePath $png32Path 32
New-ResizedPng $sourcePath $png16Path 16
New-Ico $png32Path $icoPath

@'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#00274d"/>
  <path d="M8 10h22L18 32h12L10 58l7-22H7z" fill="#f5b400"/>
  <path d="M27 10h28L39 32h14L25 58l10-24H22z" fill="#1fbf7a" opacity=".95"/>
  <path d="M17 10h18L13 54 7 40z" fill="#ef3f61" opacity=".95"/>
  <path d="M33 10h22L24 58l-4-13z" fill="#7b2bbf" opacity=".95"/>
</svg>
'@ | Set-Content -LiteralPath $svgPath -Encoding UTF8

Write-Host "Updated favicon.ico, favicon-32x32.png, favicon-16x16.png, and favicon.svg from Vendor Infra logo."
