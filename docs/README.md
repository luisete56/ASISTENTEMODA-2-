# Asistente de Moda Inteligente

Sistema distribuido de gestión de armario inteligente que combina IoT, Inteligencia Artificial y una aplicación móvil.

## 📋 Descripción

Trabajo Fin de Grado (TFG) en Diseño de Producto que implementa un sistema completo para gestionar un armario de forma inteligente mediante:

- **App Móvil**: Interfaz de conversación con IA para consultas de moda
- **Objeto Físico IoT**: Sensor con visión artificial para detección automática de prendas
- **Servidor Central**: Backend que coordina toda la lógica del sistema

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 18+ 
- npm o yarn
- PostgreSQL (para producción)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/luisete56/ASISTENTEMODA-2-.git
cd ASISTENTEMODA-2-
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:
```env
PORT=5000
DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_base_datos
NODE_ENV=production
```

4. **Configurar base de datos**

```bash
npm run db:push
```

5. **Compilar el proyecto**

```bash
npm run build
```

6. **Iniciar el servidor**

```bash
npm start
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm run build` - Compila el proyecto para producción
- `npm start` - Inicia el servidor en modo producción
- `npm run check` - Verifica tipos TypeScript
- `npm run db:push` - Sincroniza el esquema de base de datos

## 📁 Estructura del Proyecto

```
├── client/          # Frontend React + TypeScript
├── server/          # Backend Express + Node.js
├── shared/          # Esquemas compartidos (Zod + Drizzle)
├── attached_assets/ # Imágenes y recursos
└── script/          # Scripts de build
```

## 🔌 API Endpoints

- `POST /api/chat` - Envía mensajes al asistente de moda
- `GET /api/wardrobe` - Obtiene el inventario del armario
- `POST /api/wardrobe` - Añade una nueva prenda
- `POST /api/wardrobe/event` - Recibe eventos del objeto físico
- `POST /api/generate-outfit` - Genera imagen de outfit

## 🏗️ Stack Tecnológico

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express 5, TypeScript
- **Base de Datos**: PostgreSQL, Drizzle ORM
- **Validación**: Zod
- **Estado**: TanStack Query

## 📝 Notas para Hostinger

### Configuración Recomendada

1. **Node.js**: Asegúrate de que Hostinger tenga Node.js 18+ disponible
2. **Base de Datos**: Configura PostgreSQL en el panel de Hostinger
3. **Puerto**: El servidor usa el puerto especificado en `PORT` (por defecto 5000)
4. **Build**: Ejecuta `npm run build` antes de desplegar
5. **Variables de Entorno**: Configura las variables en el panel de Hostinger

### Archivos Importantes

- `package.json` - Dependencias y scripts
- `tsconfig.json` - Configuración TypeScript
- `vite.config.ts` - Configuración de Vite
- `drizzle.config.ts` - Configuración de base de datos
- `.gitignore` - Archivos a ignorar

## 📄 Licencia

MIT

## 👤 Autor

Luis Rabal Pérez - Trabajo Fin de Grado
