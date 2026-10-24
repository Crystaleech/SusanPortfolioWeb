$edge = @(
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $edge) { throw "Edge not found" }
$root = $PSScriptRoot
$html = (Join-Path $root "portfolio-guide.html")
$pdf = Join-Path $root "CelinePortfolio.pdf"
if (Test-Path -LiteralPath $pdf) { Remove-Item -LiteralPath $pdf -Force }
$uri = ([Uri]$html).AbsoluteUri
Write-Output $edge
Write-Output $uri
& $edge --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="$pdf" $uri
Start-Sleep -Seconds 1
if (Test-Path -LiteralPath $pdf) {
  $item = Get-Item -LiteralPath $pdf
  Write-Output ("pdf {0}" -f $item.Length)
} else {
  Write-Output "pdf missing"
  exit 1
}
