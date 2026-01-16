# 🔧 Solución al Error 401 - Google Apps Script

## Problema
El error `401 (Unauthorized)` significa que Google Apps Script está rechazando las peticiones porque no tiene los permisos correctos.

## Solución Paso a Paso

### Opción 1: Editar la Implementación Existente

1. Ve a tu Google Apps Script
2. Haz clic en **"Implementar"** → **"Administrar implementaciones"**
3. Haz clic en el ícono de **lápiz (editar)** en la implementación actual
4. Verifica que esté configurado así:
   - **Ejecutar como**: Yo (tu email)
   - **Quién tiene acceso**: **Cualquier persona** ⚠️ IMPORTANTE
5. Haz clic en **"Implementar"**
6. **Autoriza los permisos** si te lo pide

### Opción 2: Crear Nueva Implementación (Recomendado)

Si la Opción 1 no funciona, crea una nueva implementación:

1. En Google Apps Script, haz clic en **"Implementar"** → **"Nueva implementación"**
2. Haz clic en el ícono de engranaje ⚙️ junto a "Selecciona el tipo"
3. Selecciona **"Aplicación web"**
4. Configura:
   - **Descripción**: "Baby Shower RSVP v2" (o cualquier nombre)
   - **Ejecutar como**: **Yo** (tu cuenta de Google)
   - **Quién tiene acceso**: **Cualquier persona** ⚠️ CRÍTICO
5. Haz clic en **"Implementar"**
6. **IMPORTANTE**: Copia la nueva URL que te da
7. Actualiza `js/config.js` con la nueva URL

### Verificar el Script

Asegúrate de que el código en Google Apps Script sea exactamente este:

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

## Prueba Rápida

Después de configurar los permisos:

1. Abre la invitación en tu navegador
2. Abre la consola (F12)
3. Llena el formulario y envía
4. Deberías ver: `✅ Confirmación enviada` sin el error 401
5. Verifica que los datos aparezcan en tu Google Sheet

## Si Sigue Sin Funcionar

1. **Verifica la URL**: Asegúrate de que la URL en `js/config.js` sea exactamente la que te dio Google Apps Script (termina en `/exec`)
2. **Revisa los permisos de la hoja**: La cuenta que ejecuta el script debe tener permisos de edición en la Google Sheet
3. **Prueba la URL directamente**: Abre la URL del script en tu navegador, debería mostrar un mensaje (aunque sea de error, significa que está accesible)

## Contacto

Si después de estos pasos sigue sin funcionar, comparte:
- Screenshot de la configuración de implementación
- El mensaje de error completo de la consola
