Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

function Ensure-Dir($path) {
  if (!(Test-Path $path)) {
    New-Item -ItemType Directory -Path $path | Out-Null
  }
}

function C($hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

function New-Canvas($path, $theme, [scriptblock]$draw) {
  $w = 1920
  $h = 1080
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear((C "#eef3f7"))

  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush -ArgumentList $rect, (C $theme.bg1), (C $theme.bg2), 90
  $g.FillRectangle($bg, $rect)
  $bg.Dispose()

  $sun = New-Object System.Drawing.SolidBrush ((C "#f4b63f"))
  $g.FillEllipse($sun, 1450, 95, 180, 180)
  $sun.Dispose()

  & $draw $g $w $h $theme

  $shade = New-Object System.Drawing.Drawing2D.LinearGradientBrush -ArgumentList $rect, ([System.Drawing.Color]::FromArgb(0, 0, 39, 77)), ([System.Drawing.Color]::FromArgb(82, 0, 39, 77)), 90
  $g.FillRectangle($shade, $rect)
  $shade.Dispose()

  $dir = Split-Path -Parent $path
  Ensure-Dir $dir
  $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
  if ($ext -eq ".jpg" -or $ext -eq ".jpeg") {
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $params = New-Object System.Drawing.Imaging.EncoderParameters 1
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 92L
    $bmp.Save($path, $codec, $params)
    $params.Dispose()
  } else {
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  }

  $g.Dispose()
  $bmp.Dispose()
}

function Brush($hex) { New-Object System.Drawing.SolidBrush (C $hex) }
function Pen($hex, $width) { New-Object System.Drawing.Pen (C $hex), $width }

function Poly($g, $color, [int[]]$pts) {
  $points = @()
  for ($i = 0; $i -lt $pts.Length; $i += 2) {
    $points += New-Object System.Drawing.Point $pts[$i], $pts[$i + 1]
  }
  $b = Brush $color
  $g.FillPolygon($b, $points)
  $b.Dispose()
}

function Line($g, $color, $width, $x1, $y1, $x2, $y2) {
  $p = Pen $color $width
  $g.DrawLine($p, $x1, $y1, $x2, $y2)
  $p.Dispose()
}

function Rect($g, $color, $x, $y, $w, $h) {
  $b = Brush $color
  $g.FillRectangle($b, $x, $y, $w, $h)
  $b.Dispose()
}

function Ellipse($g, $color, $x, $y, $w, $h) {
  $b = Brush $color
  $g.FillEllipse($b, $x, $y, $w, $h)
  $b.Dispose()
}

function Skyline($g, $baseY, $color) {
  $x = 70
  $widths = @(95, 140, 78, 120, 165, 92, 130, 105, 160, 86, 125)
  foreach ($bw in $widths) {
    $bh = 130 + (($x * 37) % 310)
    Rect $g $color $x ($baseY - $bh) $bw $bh
    for ($wx = $x + 18; $wx -lt $x + $bw - 18; $wx += 34) {
      for ($wy = $baseY - $bh + 25; $wy -lt $baseY - 35; $wy += 54) {
        Rect $g "#d9ebf6" $wx $wy 13 24
      }
    }
    $x += $bw + 28
  }
}

function RoadScene($g) {
  Poly $g "#1f2f3f" @(0,1080,760,520,1160,520,1920,1080)
  Poly $g "#374a5d" @(230,1080,820,570,1100,570,1690,1080)
  Line $g "#f4b63f" 10 960 600 960 1080
  Line $g "#f4b63f" 8 865 670 720 1080
  Line $g "#f4b63f" 8 1055 670 1200 1080
  Line $g "#ffffff" 7 820 650 520 1080
  Line $g "#ffffff" 7 1100 650 1400 1080
  Line $g "#d9e5ee" 18 1040 520 1580 360
  Line $g "#d9e5ee" 18 880 520 340 360
  Line $g "#d9e5ee" 9 960 518 960 335
  Line $g "#d9e5ee" 9 520 410 1400 410
  Skyline $g 610 "#15324b"
}

function RailScene($g) {
  Skyline $g 600 "#183650"
  Poly $g "#2b3745" @(0,1080,750,585,1170,585,1920,1080)
  for ($i = 0; $i -lt 8; $i++) {
    $y = 650 + ($i * 58)
    Line $g "#9eb0bd" 9 (650 - $i * 55) $y (1270 + $i * 55) $y
  }
  Line $g "#cfd8df" 16 820 600 560 1080
  Line $g "#cfd8df" 16 1100 600 1360 1080
  Line $g "#f4b63f" 7 910 602 760 1080
  Line $g "#f4b63f" 7 1010 602 1160 1080
  Rect $g "#d9e5ee" 620 445 690 145
  Rect $g "#0b2a45" 640 470 650 58
  Rect $g "#f4b63f" 1190 548 80 22
}

function AirportScene($g) {
  Skyline $g 570 "#17324c"
  Poly $g "#2c3947" @(0,1080,700,620,1220,620,1920,1080)
  Line $g "#ffffff" 10 960 650 960 1080
  for ($i = 0; $i -lt 7; $i++) { Line $g "#f4b63f" 5 (725 + $i * 85) (760 + $i * 45) (775 + $i * 95) (760 + $i * 45) }
  Rect $g "#dfe8ef" 230 505 500 85
  Rect $g "#6f8799" 270 455 160 50
  Line $g "#e8eef4" 14 1160 410 1515 285
  Line $g "#e8eef4" 14 1160 410 925 285
  Line $g "#e8eef4" 10 1160 410 1160 230
}

function MetroScene($g) {
  Skyline $g 620 "#173550"
  Line $g "#879bad" 24 0 680 1920 555
  Line $g "#596b7c" 20 0 725 1920 600
  Rect $g "#e6edf2" 410 510 840 130
  Rect $g "#0b2a45" 455 535 620 42
  Rect $g "#f4b63f" 1115 535 80 42
  for ($x=200; $x -le 1650; $x += 260) { Rect $g "#415467" $x 625 28 455 }
}

function TransmissionScene($g) {
  Skyline $g 690 "#173550"
  foreach ($x in @(360, 900, 1440)) {
    Line $g "#d7e0e8" 12 $x 270 ($x - 150) 920
    Line $g "#d7e0e8" 12 $x 270 ($x + 150) 920
    Line $g "#d7e0e8" 9 ($x - 220) 470 ($x + 220) 470
    Line $g "#d7e0e8" 9 ($x - 160) 650 ($x + 160) 650
  }
  Line $g "#f4b63f" 5 0 470 1920 470
  Line $g "#f4b63f" 5 0 650 1920 650
  Rect $g "#1e3b56" 0 870 1920 210
}

function IndustrialScene($g) {
  Rect $g "#23394f" 0 780 1920 300
  Rect $g "#cfd8df" 280 545 1280 235
  for ($x=330; $x -lt 1480; $x += 140) { Rect $g "#0b2a45" $x 600 80 86 }
  Rect $g "#6f8799" 520 450 170 330
  Rect $g "#6f8799" 1220 410 190 370
  foreach ($x in @(560,1260,1330)) { Line $g "#dfe8ef" 22 $x 420 $x 245; Ellipse $g "#dfe8ef" ($x - 28) 215 56 56 }
  Line $g "#f4b63f" 16 100 820 1820 820
}

function SmartCityScene($g) {
  Skyline $g 760 "#183650"
  for ($i=0; $i -lt 9; $i++) {
    $x = 250 + $i * 170
    Ellipse $g "#f4b63f" $x (500 + (($i * 41) % 160)) 18 18
    if ($i -gt 0) { Line $g "#f4b63f" 4 ($x - 152) (509 + ((($i-1) * 41) % 160)) ($x + 9) (509 + (($i * 41) % 160)) }
  }
  Rect $g "#23394f" 0 785 1920 295
  Line $g "#73b7d9" 5 180 870 1740 870
  Line $g "#73b7d9" 5 180 930 1740 930
}

function PortScene($g) {
  Rect $g "#1d5b78" 0 725 1920 355
  for ($i=0; $i -lt 6; $i++) { Line $g "#7fb7cf" 4 0 (780 + $i * 48) 1920 (760 + $i * 48) }
  foreach ($x in @(360, 720, 1180, 1500)) {
    Line $g "#f4b63f" 18 $x 315 $x 725
    Line $g "#f4b63f" 16 ($x - 120) 350 ($x + 230) 350
    Line $g "#f4b63f" 10 ($x + 170) 350 ($x + 235) 500
  }
  Rect $g "#d3483e" 520 650 180 70
  Rect $g "#2c7a57" 710 650 180 70
  Rect $g "#2f6fa3" 900 650 180 70
  Rect $g "#d3483e" 760 575 180 70
  Rect $g "#e6edf2" 1130 610 410 100
}

function WaterScene($g) {
  Rect $g "#1d5b78" 0 760 1920 320
  foreach ($x in @(340, 620, 900, 1180, 1460)) {
    Ellipse $g "#dfe8ef" $x 500 190 190
    Ellipse $g "#8fb5c9" ($x + 28) 528 134 134
  }
  Rect $g "#23394f" 230 680 1460 100
  Line $g "#f4b63f" 12 200 610 1720 610
  Line $g "#dfe8ef" 14 200 900 1720 900
}

function RenewableScene($g) {
  Rect $g "#2c5a57" 0 745 1920 335
  for ($row=0; $row -lt 5; $row++) {
    for ($col=0; $col -lt 8; $col++) {
      Poly $g "#244e73" @((170+$col*210), (760+$row*58), (325+$col*210), (742+$row*58), (365+$col*210), (780+$row*58), (205+$col*210), (802+$row*58))
    }
  }
  foreach ($x in @(420, 910, 1400)) {
    Line $g "#e6edf2" 16 $x 710 $x 270
    Line $g "#e6edf2" 10 $x 300 ($x - 150) 220
    Line $g "#e6edf2" 10 $x 300 ($x + 150) 220
    Line $g "#e6edf2" 10 $x 300 $x 125
  }
}

function PowerScene($g) {
  Rect $g "#223a51" 0 760 1920 320
  foreach ($x in @(410, 710, 1040, 1360)) { Rect $g "#dfe8ef" $x 500 130 260; Ellipse $g "#dfe8ef" ($x - 10) 470 150 58 }
  Line $g "#f4b63f" 12 250 760 1640 760
  foreach ($x in @(520, 1180)) { Line $g "#91a5b6" 18 $x 760 ($x + 160) 335; Line $g "#91a5b6" 18 ($x + 300) 760 ($x + 160) 335 }
}

function BuildingsScene($g) {
  Skyline $g 800 "#173550"
  Rect $g "#dfe8ef" 840 330 390 470
  for ($x=880; $x -lt 1190; $x += 70) { for ($y=380; $y -lt 760; $y += 70) { Rect $g "#8fb5c9" $x $y 34 38 } }
  Line $g "#f4b63f" 18 300 300 780 300
  Line $g "#f4b63f" 16 390 300 390 820
  Line $g "#f4b63f" 10 780 300 900 390
  Rect $g "#23394f" 0 800 1920 280
}

function OilGasScene($g) {
  Rect $g "#23394f" 0 740 1920 340
  foreach ($x in @(380, 650, 1010, 1290)) {
    Rect $g "#dfe8ef" $x 475 95 265
    Ellipse $g "#dfe8ef" ($x - 5) 445 105 55
  }
  for ($x=250; $x -lt 1600; $x += 220) { Line $g "#f4b63f" 12 $x 730 ($x + 170) 640 }
  Line $g "#d3483e" 18 220 850 1700 850
  Line $g "#91a5b6" 10 900 460 1080 250
}

function TunnelScene($g) {
  Rect $g "#315e58" 0 710 1920 370
  Ellipse $g "#172636" 620 330 680 760
  Ellipse $g "#394857" 690 420 540 610
  Poly $g "#1f2f3f" @(810,1080,900,620,1020,620,1110,1080)
  Line $g "#f4b63f" 8 960 650 960 1080
  Line $g "#73b7d9" 14 80 790 680 850
  Line $g "#73b7d9" 14 1240 850 1840 790
}

function WasteScene($g) {
  Rect $g "#2d5b53" 0 760 1920 320
  Rect $g "#dfe8ef" 330 540 900 220
  Rect $g "#6f8799" 1260 470 260 290
  foreach ($x in @(420, 560, 700, 840, 980)) { Ellipse $g "#2c7a57" $x 620 95 95 }
  Line $g "#f4b63f" 14 260 690 1600 690
  foreach ($x in @(1330, 1430)) { Line $g "#dfe8ef" 18 $x 470 $x 315; Ellipse $g "#dfe8ef" ($x - 35) 275 70 70 }
}

$themes = @{
  day = @{ bg1 = "#d9edf7"; bg2 = "#6d91ad" }
  dusk = @{ bg1 = "#c8dbe8"; bg2 = "#264965" }
  clean = @{ bg1 = "#e7f2f5"; bg2 = "#4d7d8e" }
}

$wp = Join-Path $root "public\images\wp"
$services = Join-Path $root "public\images\services"
$blog = Join-Path $root "public\images\blog"
Ensure-Dir $wp
Ensure-Dir $services
Ensure-Dir $blog

$sectorJobs = @(
  @("ROADS-AND-BRIDGES.png", ${function:RoadScene}),
  @("URBAN-TRANSPORT.png", ${function:MetroScene}),
  @("RAILWAYS.png", ${function:RailScene}),
  @("AIRPORTS.png", ${function:AirportScene}),
  @("TRANSMISSION-LINE.png", ${function:TransmissionScene}),
  @("INDUSTRIAL-CORRIDOR.png", ${function:IndustrialScene}),
  @("smart-city-3.png", ${function:SmartCityScene}),
  @("PORTS.png", ${function:PortScene}),
  @("WATER-AND-WASTE-WATER.png", ${function:WaterScene}),
  @("RENEWABLE-POWER.png", ${function:RenewableScene}),
  @("Power.png", ${function:PowerScene}),
  @("BUILDINGS-INDUSTRIAL-PROJECTS.png", ${function:BuildingsScene}),
  @("OIL-GAS.png", ${function:OilGasScene}),
  @("Irrigation-Tunnel-Project.png", ${function:TunnelScene}),
  @("Solid-Waste-Management.png", ${function:WasteScene})
)

foreach ($job in $sectorJobs) {
  New-Canvas (Join-Path $wp $job[0]) $themes.day $job[1]
}

New-Canvas (Join-Path $services "smart-price-discovery.jpg") $themes.clean ${function:SmartCityScene}
New-Canvas (Join-Path $services "plants-equipment-marketplace.jpg") $themes.day ${function:IndustrialScene}
New-Canvas (Join-Path $services "project-insurance.jpg") $themes.dusk ${function:BuildingsScene}
New-Canvas (Join-Path $services "sector-intelligence.jpg") $themes.clean ${function:TransmissionScene}

New-Canvas (Join-Path $wp "3-1.png") $themes.clean ${function:SmartCityScene}
New-Canvas (Join-Path $wp "ChatGPT-Image-May-8-2026-03_39_45-PM.png") $themes.day ${function:IndustrialScene}
New-Canvas (Join-Path $wp "6-1.png") $themes.dusk ${function:BuildingsScene}
New-Canvas (Join-Path $wp "8-1.png") $themes.clean ${function:TransmissionScene}

New-Canvas (Join-Path $blog "plants-equipment-marketplace.jpg") $themes.day ${function:IndustrialScene}
New-Canvas (Join-Path $blog "construction-saas-platform.jpg") $themes.clean ${function:RoadScene}
New-Canvas (Join-Path $blog "construction-digitalisation.jpg") $themes.dusk ${function:SmartCityScene}
New-Canvas (Join-Path $blog "ai-business-infrastructure.jpg") $themes.clean ${function:TransmissionScene}

New-Canvas (Join-Path $wp "photo_2025-09-03_23-17-56.png") $themes.day ${function:IndustrialScene}
New-Canvas (Join-Path $wp "Plants-and-equipments-blog-image.png") $themes.clean ${function:RoadScene}
New-Canvas (Join-Path $wp "photo_2025-09-03_23-03-06.png") $themes.dusk ${function:SmartCityScene}

Write-Host "Generated infrastructure images in public/images/wp, public/images/services, and public/images/blog."
