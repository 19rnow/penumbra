$root = Split-Path $PSScriptRoot -Parent
$port = if ($env:PORT) { [int]$env:PORT } else { 8766 }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Penumbra dev server: http://localhost:$port/" -ForegroundColor Cyan

$mimeTypes = @{
  ".html"=  "text/html; charset=utf-8"
  ".css"=   "text/css"
  ".js"=    "application/javascript"
  ".jpg"=   "image/jpeg"
  ".jpeg"=  "image/jpeg"
  ".png"=   "image/png"
  ".webp"=  "image/webp"
  ".svg"=   "image/svg+xml"
  ".json"=  "application/json"
  ".ico"=   "image/x-icon"
  ".woff2"= "font/woff2"
  ".woff"=  "font/woff"
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  $p   = $req.Url.LocalPath.TrimStart('/')
  if ($p -eq '') { $p = 'index.html' }
  $file = Join-Path $root ($p -replace '/', '\')
  if (Test-Path $file -PathType Leaf) {
    $ext  = [IO.Path]::GetExtension($file).ToLower()
    $mime = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { "application/octet-stream" }
    $bytes = [IO.File]::ReadAllBytes($file)
    $res.ContentType     = $mime
    $res.ContentLength64 = $bytes.Length
    $res.StatusCode      = 200
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $res.StatusCode = 404
    $msg = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $p")
    $res.ContentLength64 = $msg.Length
    $res.OutputStream.Write($msg, 0, $msg.Length)
  }
  $res.Close()
}
