@echo off

cd /d %~dp0 #ve al directorio donde está este script

echo Construyendo shell...
docker build -t tiendamf/shell:latest -f projects/shell/Dockerfile .

echo Construyendo productos...
docker build -t tiendamf/productos:latest -f projects/productos/Dockerfile .

echo Construyendo carrito...
docker build -t tiendamf/carrito:latest -f projects/carrito/Dockerfile .

echo Construyendo perfil...
docker build -t tiendamf/perfil:latest -f projects/perfil/Dockerfile .

echo.
echo Build completado
pause