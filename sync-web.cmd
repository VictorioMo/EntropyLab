@echo off
cd /d "%~dp0entropylab-web"

call ng.cmd build --base-href ./
if errorlevel 1 exit /b 1

robocopy "dist\entropylab-web\browser" "%~dp0Resources\Raw\wwwroot" /MIR
if errorlevel 8 exit /b 1

echo Angular assets updated!