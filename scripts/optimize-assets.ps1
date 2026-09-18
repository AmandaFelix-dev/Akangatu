# Generate delivery assets without modifying the original artwork.
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$assetRoot = Join-Path $projectRoot 'src/assets/images'
$coverTarget = Join-Path $assetRoot 'optimized/covers'
$faunaTarget = Join-Path $assetRoot 'optimized/fauna'
New-Item -ItemType Directory -Force $coverTarget, $faunaTarget | Out-Null
function Save-OptimizedImage($image, $target, $width) {
    $height = [int][Math]::Round($image.Height * $width / $image.Width)
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
        $graphics.Clear([System.Drawing.Color]::FromArgb(245, 241, 231))
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($image, 0, 0, $width, $height)
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -EQ 'image/jpeg'
        $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
        try { $bitmap.Save($target, $codec, $parameters) } finally { $parameters.Dispose() }
    } finally { $graphics.Dispose(); $bitmap.Dispose() }
}
foreach ($cover in @(
    @{ Name = 'Animals'; Source = 'themes/Animals/2.svg' },
    @{ Name = 'Flowers'; Source = 'themes/Flowers/1.svg' },
    @{ Name = 'Xilogravura'; Source = 'themes/Xilogravura/1.svg' }
)) {
    $svg = [System.IO.File]::ReadAllText((Join-Path $assetRoot $cover.Source))
    $encoded = [regex]::Match($svg, 'data:image/png;base64,([^"\s]+)').Groups[1].Value
    if (!$encoded) { throw "Missing cover image: $($cover.Source)" }
    $stream = New-Object System.IO.MemoryStream(,[Convert]::FromBase64String($encoded))
    $image = [System.Drawing.Image]::FromStream($stream)
    try { Save-OptimizedImage $image (Join-Path $coverTarget "$($cover.Name).jpg") 650 } finally { $image.Dispose(); $stream.Dispose() }
}
foreach ($source in Get-ChildItem -LiteralPath (Join-Path $assetRoot 'themes/Animals') -Filter '*.svg') {
    $svg = [System.IO.File]::ReadAllText($source.FullName)
    $encoded = [regex]::Match($svg, 'data:image/png;base64,([^"\s]+)').Groups[1].Value
    if (!$encoded) { throw "Missing embedded image: $($source.Name)" }
    $stream = New-Object System.IO.MemoryStream(,[Convert]::FromBase64String($encoded))
    $image = [System.Drawing.Image]::FromStream($stream)
    try { Save-OptimizedImage $image (Join-Path $faunaTarget "$($source.BaseName).jpg") 400 } finally { $image.Dispose(); $stream.Dispose() }
}
