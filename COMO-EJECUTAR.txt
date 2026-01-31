============================================
  ASISTENTE DE MODA - GUÍA DE EJECUCIÓN
============================================

Este proyecto es una aplicación NODE.JS (Express + React).
NO se abre con Apache/XAMPP como una carpeta normal.

============================================
  OPCIÓN 1: EJECUTAR LOCALMENTE (desarrollo)
============================================

1. Abre una terminal (CMD o PowerShell) en ESTA carpeta del proyecto.

2. Instala dependencias (solo la primera vez):
   npm install

3. Arranca el servidor de desarrollo:
   npm run dev

4. Abre en el navegador:
   http://localhost:5000

   (No uses http://localhost/ ni la ruta de XAMPP/htdocs)

5. Si la página no carga bien, recarga con Ctrl+Shift+R
   para vaciar la caché del navegador.

============================================
  OPCIÓN 2: EJECUTAR EN HOSTINGER (producción)
============================================

CONFIGURACIÓN EN HOSTINGER:
---------------------------
- Preajuste del marco: Express
- Rama: main
- Versión de Node: 22.x
- Directorio raíz: ./
- Archivo de entrada: server.js
- Gestor de paquetes: npm

CÓMO FUNCIONA EL DESPLIEGUE:
----------------------------
Hostinger ejecuta automáticamente:

1. npm install        → Instala dependencias
2. npm run build      → Compila cliente (React) y servidor (Express)
3. npm start          → Ejecuta server.js

ARCHIVOS IMPORTANTES:
---------------------
- server.js       → Entry point (punto de entrada para Hostinger)
- server.cjs      → Lógica de arranque del servidor
- dist/index.cjs  → Aplicación compilada (generada por npm run build)

PARA REDESPLEGAR:
-----------------
1. Haz cambios en el código
2. git add -A && git commit -m "descripción" && git push origin main
3. Hostinger detectará el push y redesplegará automáticamente

============================================
  REQUISITOS
============================================
- Node.js 18+ instalado (local)
- Cuenta de Hostinger con hosting Node.js (producción)
- Repositorio GitHub conectado a Hostinger

============================================
