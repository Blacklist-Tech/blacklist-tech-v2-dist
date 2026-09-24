# Blacklist Tech single-page production build.
$ErrorActionPreference = "Stop"

$sourceDir = $PSScriptRoot
$distDir = Join-Path $sourceDir "dist"
New-Item -ItemType Directory -Path $distDir -Force | Out-Null

Write-Host ">>> Building single-page Blacklist Tech site..." -ForegroundColor Cyan

foreach ($item in @("index.html", "site-assets")) {
    $sourcePath = Join-Path $sourceDir $item
    $destinationPath = Join-Path $distDir $item

    if (-not (Test-Path $sourcePath)) {
        throw "Required production item is missing: $sourcePath"
    }

    if (Test-Path $destinationPath -PathType Container) {
        Copy-Item -Path (Join-Path $sourcePath "*") -Destination $destinationPath -Recurse -Force
    } elseif (Test-Path $sourcePath -PathType Container) {
        Copy-Item -Path $sourcePath -Destination $distDir -Recurse -Force
    } else {
        Copy-Item -Path $sourcePath -Destination $destinationPath -Force
    }

    Write-Host "Copied $item"
}

Write-Host ">>> Build complete: $distDir" -ForegroundColor Green
