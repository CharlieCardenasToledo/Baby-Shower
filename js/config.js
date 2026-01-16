// ==========================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// ==========================================

// INSTRUCCIONES PARA CONFIGURAR GOOGLE SHEETS:
// 
// 1. Crea una nueva hoja de cálculo en Google Sheets
// 2. Ve a Extensiones > Apps Script
// 3. Copia y pega el siguiente código en el editor:

/*
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
*/

// 4. Guarda el proyecto (Ctrl+S)
// 5. Haz clic en "Implementar" > "Nueva implementación"
// 6. Selecciona tipo: "Aplicación web"
// 7. Configura:
//    - Ejecutar como: "Yo"
//    - Quién tiene acceso: "Cualquier persona"
// 8. Haz clic en "Implementar"
// 9. Copia la URL de la aplicación web y pégala abajo

// ==========================================
// CONFIGURACIÓN
// ==========================================

const CONFIG = {
  // Pega aquí la URL de tu Google Apps Script
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwW10c0hLPvk9w2v2qusDluXjGO7_pMqAZEudVi2CIRQ_Rd5I5Q3TSYZ1fRForUAs86_Q/exec',

  // Configuración del mapa (opcional)
  MAP_URL: 'https://maps.google.com/?q=Calle+Segundo+Ruiz+Padre+Juan+Gonzales+UTPL+Loja',

  // Configuración de compartir
  SHARE_TEXT: '¡Estás invitado al Baby Shower de Elias Alessandro! 🎉',
  SHARE_URL: window.location.href
};

// Exportar configuración
window.APP_CONFIG = CONFIG;
