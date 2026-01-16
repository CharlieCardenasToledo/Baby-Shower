# 🎉 Invitación Baby Shower - Elias Alessandro

Invitación web interactiva con temática Dragon Ball para el Baby Shower de Elias Alessandro.

## 🚀 Características

- ✨ Diseño moderno con TailwindCSS
- 🌙 Modo oscuro activado por defecto
- 📱 Totalmente responsive
- 🎨 Animaciones suaves y efectos visuales
- 📝 Formulario de confirmación de asistencia
- 📊 Integración con Google Sheets para guardar respuestas
- 🔗 Función para compartir la invitación

## 📋 Configuración de Google Sheets

Para que las confirmaciones se guarden en Google Sheets, sigue estos pasos:

### 1. Crear la hoja de cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Baby Shower - Confirmaciones" (o el nombre que prefieras)

### 2. Configurar Google Apps Script

1. En tu hoja de cálculo, ve a **Extensiones** > **Apps Script**
2. Borra el código predeterminado
3. Copia y pega el siguiente código:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Agregar encabezados si es la primera fila
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Fecha y Hora', 'Nombre', 'Acompañantes']);
    }
    
    // Agregar los datos
    sheet.appendRow([
      new Date(),
      data.name,
      data.guestCount
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Datos guardados correctamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Guarda el proyecto (Ctrl+S o Cmd+S)
5. Ponle un nombre al proyecto, por ejemplo: "Baby Shower RSVP"

### 3. Implementar como aplicación web

1. Haz clic en **Implementar** > **Nueva implementación**
2. Haz clic en el ícono de engranaje ⚙️ junto a "Selecciona el tipo"
3. Selecciona **Aplicación web**
4. Configura lo siguiente:
   - **Descripción**: "Baby Shower RSVP Handler" (opcional)
   - **Ejecutar como**: "Yo" (tu cuenta)
   - **Quién tiene acceso**: "Cualquier persona"
5. Haz clic en **Implementar**
6. Autoriza los permisos necesarios
7. **Copia la URL de la aplicación web** que aparece

### 4. Configurar la aplicación

1. Abre el archivo `js/config.js`
2. Busca la línea que dice:
   ```javascript
   GOOGLE_SCRIPT_URL: 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI',
   ```
3. Reemplaza `'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI'` con la URL que copiaste
4. Guarda el archivo

## 🎯 Uso

1. Abre el archivo `index.html` en tu navegador
2. Comparte la URL con tus invitados
3. Los invitados pueden confirmar su asistencia mediante el formulario
4. Las respuestas se guardarán automáticamente en tu Google Sheet

## 🌐 Publicación

Para compartir la invitación con tus invitados, puedes:

### Opción 1: GitHub Pages (Gratis)
1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y la carpeta `/ (root)`
4. GitHub te dará una URL pública

### Opción 2: Netlify (Gratis)
1. Ve a [Netlify](https://www.netlify.com)
2. Arrastra y suelta la carpeta del proyecto
3. Netlify te dará una URL pública

### Opción 3: Vercel (Gratis)
1. Ve a [Vercel](https://vercel.com)
2. Importa el proyecto desde GitHub o sube los archivos
3. Vercel te dará una URL pública

## 📁 Estructura del proyecto

```
baby-shower-invitation/
├── index.html          # Página principal
├── js/
│   ├── config.js      # Configuración (URL de Google Script)
│   └── app.js         # Lógica de la aplicación
├── assets/            # Carpeta para recursos adicionales
└── README.md          # Este archivo
```

## 🎨 Personalización

### Cambiar colores
Los colores están definidos en la configuración de TailwindCSS en `index.html`:
- `primary`: Color principal (naranja Dragon Ball)
- `background-light`: Fondo en modo claro
- `background-dark`: Fondo en modo oscuro

### Cambiar información del evento
Edita directamente el HTML en `index.html` para cambiar:
- Fecha y hora del evento
- Ubicación
- Nombres de los padres
- Nombre del bebé

## 🐛 Solución de problemas

### Las confirmaciones no se guardan
1. Verifica que hayas configurado correctamente la URL en `js/config.js`
2. Asegúrate de que el script de Google Apps esté implementado como "Aplicación web"
3. Verifica que el acceso esté configurado como "Cualquier persona"
4. Revisa la consola del navegador (F12) para ver errores

### El modo demo
Si no configuras la URL de Google Script, la aplicación funcionará en "modo demo":
- Los datos se mostrarán en la consola del navegador
- No se guardarán en Google Sheets
- Útil para probar la aplicación

## 📝 Licencia

Este proyecto es de uso personal. Siéntete libre de modificarlo según tus necesidades.

## 💝 Créditos

Diseño inspirado en Dragon Ball para celebrar la llegada de nuestro pequeño Saiyajin.

---

¡Hecho con ❤️ para Elias Alessandro!
