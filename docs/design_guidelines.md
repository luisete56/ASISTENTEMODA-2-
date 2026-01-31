# Guía de Diseño: Asistente de Moda Inteligente

## Enfoque de Diseño

**Inspiración**: Apple product pages + Stripe documentation aesthetic - limpio, moderno, centrado en producto con jerarquía visual clara.

**Principios clave**: Claridad sobre ornamentación, presentación profesional académica, comunicación visual directa de los tres componentes del sistema.

## Tipografía

**Fuentes**: Inter (via Google Fonts CDN)
- Títulos principales: font-semibold, text-4xl md:text-6xl
- Subtítulos: font-medium, text-2xl md:text-3xl
- Texto descriptivo: font-normal, text-lg md:text-xl
- Detalles/etiquetas: font-medium, text-sm uppercase tracking-wide

## Sistema de Espaciado

**Unidades Tailwind primarias**: 4, 8, 12, 16, 20
- Secciones verticales: py-20 (móvil: py-12)
- Espaciado entre elementos: space-y-8 o gap-8
- Contenedores: max-w-6xl mx-auto px-4

## Estructura de Contenido

### 1. Hero Section (100vh)
- Headline impactante: "Asistente de Moda Inteligente"
- Subheadline: "Tecnología IoT + IA para gestionar tu armario"
- Etiqueta superior: "Trabajo Fin de Grado - Ingeniería"
- CTA: "Descubrir el Sistema"
- **Hero Image**: Visualización conceptual del sistema completo (app móvil + objeto físico en armario + conexión cloud). Imagen hero de ancho completo, altura 60-70vh, con overlay sutil oscuro para legibilidad del texto.

### 2. Sistema en 3 Partes
Layout: Grid de 3 columnas (md:grid-cols-3, base: grid-cols-1)
Cada columna contiene:
- Icono/número identificador
- Título del componente
- Descripción breve (3-4 líneas)
- Imagen ilustrativa pequeña del componente

**Componentes**:
1. **App Móvil**: "Interfaz de conversación con ChatGPT para consultas de moda"
2. **Objeto Físico**: "Sensor inteligente en el armario con visión artificial"
3. **Servidor Central**: "Backend que coordina toda la lógica y decisiones"

### 3. Arquitectura del Sistema
- Diagrama de flujo visual mostrando comunicación
- Texto explicativo: "El servidor es el único punto de comunicación"
- Lista de características técnicas: Node.js, Express, ChatGPT API, Computer Vision

### 4. Funcionalidades Clave
Layout: 2 columnas (md:grid-cols-2)
- Gestión de inventario de prendas
- Consultas de moda con IA
- Detección automática de prendas
- Generación de looks personalizados

Cada funcionalidad: icono + título + descripción

### 5. Tecnología
Grid de logos/badges tecnológicos:
- Node.js + Express
- ChatGPT API
- Computer Vision (placeholder)
- REST API

### 6. Footer Académico
- Información del proyecto TFG
- Año académico
- Enlaces a documentación (si aplica)
- Disclaimer académico simple

## Componentes UI

**Cards**: rounded-lg border shadow-sm p-8, fondo blanco/neutral
**Badges**: rounded-full px-4 py-2 text-sm
**Botones**: rounded-lg px-8 py-4 text-lg font-medium con backdrop-blur-sm cuando sobre imágenes
**Iconos**: Heroicons vía CDN, tamaño h-8 w-8 para features, h-6 w-6 para detalles

## Imágenes Requeridas

1. **Hero**: Composición mostrando smartphone + objeto IoT en armario + iconos de conexión cloud (landscape, 1920x1080)
2. **App móvil mockup**: Pantalla de chat con asistente (portrait, 400x800)
3. **Objeto físico**: Dispositivo IoT en contexto de armario (square, 600x600)
4. **Diagrama de arquitectura**: Flujo de datos entre componentes (landscape, ilustración simple)
5. **Funcionalidades**: 4 imágenes conceptuales pequeñas (300x200 cada una)

## Navegación

Header fijo: Logo/título proyecto + navegación simple (Inicio, Sistema, Tecnología, Contacto)
Móvil: menú hamburguesa

## Responsive

- Móvil: stack vertical, hero 100vh, secciones py-12
- Desktop: grids multi-columna, hero 100vh, secciones py-20
- Breakpoint principal: md (768px)

## Idioma

**Todo el contenido en español**: títulos, descripciones, labels, CTAs. Mantener tono profesional-académico pero accesible.