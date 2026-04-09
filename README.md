# Sara — Tienda Online Argentina

Tienda online responsive con panel de administracion integrado. Catalogo de mochilas, auriculares y accesorios tech. HTML/CSS/JS puro con animaciones GSAP. Sin frameworks ni dependencias de build.

## Funcionalidades

- Catalogo con colecciones Hombre y Mujer y productos destacados
- Panel admin (/admin.html) para gestion de contenido
- Seccion newsletter
- Responsive — mobile, tablet y desktop
- Animaciones GSAP para scroll reveal y transiciones

## Stack

- HTML5 + CSS3 + JavaScript vanilla
- GSAP (animaciones)
- Panel admin separado (admin.html + admin.js + admin.css)
- Deploy: Vercel

## Archivos

| Archivo | Funcion |
|---------|---------|
| index.html | Tienda publica |
| style.css | Estilos de la tienda |
| main.js | Logica de la tienda |
| admin.html | Panel de administracion |
| admin.css | Estilos del panel |
| admin.js | Logica del panel |

## Seguridad

El panel admin tiene X-Robots-Tag: noindex en vercel.json para evitar indexacion.
