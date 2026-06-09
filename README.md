# Penumbra — Guía del propietario

Hola. Esta guía explica cómo ver la web, subirla a Hostinger y hacer cambios básicos sin tocar código.  
No necesitas saber programación. Solo el Bloc de notas.

---

## 1. Ver la web en tu ordenador

Haz doble clic en `index.html`. Se abrirá en tu navegador y la web se verá completa.

> **Si ves la web "plana" o sin animaciones:** es normal en Vista Previa local. Cuando la subas a Hostinger todo funcionará con los efectos completos.

---

## 2. Subir la web a Hostinger

1. Entra en tu panel de Hostinger.
2. Ve a **Archivos → Administrador de archivos** (o File Manager).
3. Entra en la carpeta `public_html`.
4. **Arrastra toda la carpeta `penumbra`** dentro de `public_html`.
   - O sube los archivos que hay DENTRO de `penumbra` directamente a `public_html`.
5. Espera a que cargue. Listo.

> **Tip:** Si cambias algo y al recargar no aparece el cambio, pulsa `Ctrl + F5` (Windows) o `Cmd + Shift + R` (Mac) para forzar recarga.

---

## 3. Cambiar textos, teléfono, horario y cócteles

Abre el archivo `lib/manifest.js` con el Bloc de notas.

Verás un bloque que empieza con `brand:`. Ahí puedes cambiar:

```
name:        "Penumbra"         → nombre del bar
tagline:     "Donde la noche…"  → eslogan
address:     "Calle del Pez 18" → dirección
phone:       "910 22 33 44"     → teléfono visible
whatsapp:    "34910223344"      → número de WhatsApp (sin espacios, sin +)
instagram:   "penumbra.madrid"  → usuario de Instagram (sin @)
hours:       "Miércoles a domingo"
hoursDetail: "19:00 → 02:30"
```

**Guarda el archivo** (Ctrl + S) y vuelve a subir `lib/manifest.js` a Hostinger.

### Cambiar un cóctel

En el mismo archivo, busca el bloque `cocktails:`. Cada cóctel tiene:

```
name:        "Penumbra"             → nombre de la copa
subtitle:    "La copa de la casa"   → subtítulo breve
ingredients: ["Mezcal", "Vermut"]   → lista de ingredientes (entre comillas, separados por coma)
description: "Ahumado, amargo…"     → texto descriptivo
```

Cambia solo los valores entre comillas `"..."`. No borres las comas ni los corchetes.

---

## 4. Cambiar el número de WhatsApp

El número de WhatsApp aparece en varios sitios. Para cambiarlo bien en todos:

1. **En `lib/manifest.js`:** cambia `whatsapp: "34910223344"` por tu número (sin +, sin espacios).
2. **En `index.html`:** busca (Ctrl+F) `34910223344` y reemplaza todas las ocurrencias por tu número.
3. Sube ambos archivos a Hostinger.

---

## 5. Cambiar las fotos del local

Las fotos están en la carpeta `assets/img/`. Los nombres que usa la web son:

| Archivo         | Dónde aparece                  |
|-----------------|-------------------------------|
| `hero.jpg`      | Foto de fondo del hero         |
| `local-1.jpg`   | Collage sección "El Local"     |
| `local-2.jpg`   | Collage sección "El Local"     |
| `local-3.jpg`   | Collage sección "El Local"     |
| `events.jpg`    | Sección Eventos privados       |
| `gal-1.jpg` … `gal-12.jpg` | Galería (carrusel) |

**Para sustituir una foto:**
1. Renombra tu foto con el mismo nombre del archivo que quieres reemplazar (p.ej. `hero.jpg`).
2. Cópiala en `assets/img/`.
3. Sube la carpeta `assets/img/` a Hostinger.

> Las fotos funcionan mejor en formato JPG, apaisadas (horizontal) para el hero y la galería.

---

## 6. Si cambias algo y no se actualiza (caché)

Cuando subes un archivo nuevo a Hostinger, el navegador puede mostrar la versión vieja durante un momento.

**Solución rápida:** pulsa `Ctrl + F5` (Windows) o `Cmd + Shift + R` (Mac).

**Si el problema persiste con JS o CSS:**  
Abre `index.html` con el Bloc de notas y busca `?v=20260607`. Cámbialo a la fecha de hoy, p.ej. `?v=20260615`. Así el navegador descargará los archivos nuevos.

---

## 7. Cambiar el mapa en el footer

El mapa usa Google Maps con la dirección "Calle del Pez 18, Malasaña, Madrid". Si cambias de local:

1. Abre `index.html` con el Bloc de notas.
2. Busca `maps.google.com/maps?q=`.
3. Cambia el texto después de `q=` por tu nueva dirección (reemplaza los espacios por `+`).

---

## Estructura de archivos

```
penumbra/
├── index.html          ← la web (no borres nada, solo edita textos)
├── styles.css          ← diseño visual (no tocar)
├── main.js             ← funciones y animaciones (no tocar)
├── .htaccess           ← configuración del servidor (no tocar)
├── lib/
│   ├── manifest.js     ← TUS DATOS (nombre, teléfono, cócteles, sesiones)
│   ├── gsap.min.js     ← librería de animaciones (no tocar)
│   └── ScrollTrigger.min.js
└── assets/
    ├── img/            ← TUS FOTOS (sustituye aquí las imágenes)
    └── credits.json    ← créditos de fotos de stock (no borrar)
```

---

## Contacto técnico

Si algo no funciona como esperas, escribe a quien te hizo la web con:
- Una captura de pantalla del problema.
- En qué dispositivo y navegador ocurre (p.ej. "iPhone 14, Chrome").

---

*Penumbra · EST. 2024 · MAD — Calle del Pez 18, Malasaña, Madrid*
