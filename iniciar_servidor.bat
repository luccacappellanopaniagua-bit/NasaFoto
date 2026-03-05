@echo off
echo ==============================================
echo Iniciando o Servidor Backend NASA APOD Viewer
echo ==============================================
cd Backend
call .\venv\Scripts\activate.bat
echo Servidor iniciado! Acesse o index.html no navegador.
python main.py
pause
