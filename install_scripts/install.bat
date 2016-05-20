@echo on
cd %~dp0
echo Running server installation

echo Installing NodeJS...

echo "Current node version:"
node --version

cd Dependencies
node-v4.4.4-x64.msi

cd %HOMEPATH%
cd /

if not exist "data\db" mkdir data\db

echo "Current mongo version:"
/mongo/mongod --version

cd %~dp0
cd Dependencies
mongodb-win32-x86_64-3.2.6-signed.msi

cd..

cd ServerApp

start "Packages installation" cmd /c npm install

cd %~dp0

del mongo.bat
del run.bat

TIMEOUT 3

echo @echo off >> mongo.bat
echo cd %%ProgramFiles%% >> mongo.bat
echo cd MongoDB/Server/3.2/bin/ >> mongo.bat
echo mongod >> mongo.bat

echo @echo off >> run.bat
echo cd %~dp0 > run.bat
echo start "MongoDB" cmd /c mongo.bat >> run.bat
echo cd ServerApp >> run.bat
echo TIMEOUT 3 >> run.bat
echo sails lift >> run.bat

del %HOMEPATH%\Desktop\runServer.bat

mklink "%HOMEPATH%\Desktop\runServer.bat" "%~dp0run.bat"

pause