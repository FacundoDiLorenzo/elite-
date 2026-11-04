# Élite Centro Deportivo — rediseño web

Rediseño de [entrenaconelite.com](https://entrenaconelite.com/): sitio estático (HTML + CSS + JS, sin dependencias ni build).

## Estructura
- `index.html` — portada (hero, servicios, método, centro, contacto)
- `assets/css/styles.css` — estilos y diseño responsive
- `assets/js/main.js` — menú móvil, header al hacer scroll, animaciones

## Ver en local
Abrí `index.html` en el navegador, o serví la carpeta:

```bash
python3 -m http.server 8000
```

Las imágenes y el logo se cargan por ahora desde el sitio actual (`entrenaconelite.com/wp-content/...`). Antes de publicar conviene copiarlas a `assets/img/` (idealmente en WebP) y actualizar las rutas.
