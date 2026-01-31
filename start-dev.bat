@echo off
cd /d "%~dp0"
set NODE_ENV=development
npx tsx core/index.ts
