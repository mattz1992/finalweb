@echo off
REM ==========================================================
REM  Setup de estructura para SPA (React) - Desayunos Romana
REM  Ejecutar este .bat en la raíz del proyecto (donde está package.json)
REM ==========================================================

SETLOCAL ENABLEDELAYEDEXECUTION

REM Verificación mínima (opcional)
IF NOT EXIST "package.json" (
  echo [AVISO] No se encontro package.json en esta carpeta. Asegurate de ejecutar este .bat en la raiz del proyecto CRA.
  echo Continuando de todas formas...
)

REM Crear carpetas principales
FOR %%D IN (src src\api src\components src\pages src\routes src\styles src\utils) DO (
  IF NOT EXIST "%%D" (
    mkdir "%%D"
    echo [OK] Carpeta creada: %%D
  ) ELSE (
    echo [OK] Carpeta ya existe: %%D
  )
)

REM Crear archivos vacios o con placeholders simples
REM --- API
IF NOT EXIST "src\api\firebase.js" (
  > "src\api\firebase.js" echo // TODO: pegar config de Firebase (initializeApp, getFirestore)
  echo [OK] Archivo creado: src\api\firebase.js
)

IF NOT EXIST "src\api\items.js" (
  > "src\api\items.js" echo // TODO: pegar helpers CRUD (createItem, getItem, updateItem, removeItem, listItems)
  echo
