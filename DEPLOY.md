# 🚀 Deploy en Vercel - Baby Shower Invitation

## Pasos para Deploy

### 1. Acceder a Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub

### 2. Importar el Proyecto

1. Haz clic en **"Add New..."** → **"Project"**
2. Busca el repositorio **"Baby-Shower"**
3. Haz clic en **"Import"**

### 3. Configurar el Proyecto

En la página de configuración:

- **Project Name**: `baby-shower-elias` (o el nombre que prefieras)
- **Framework Preset**: `Other` (es un proyecto estático)
- **Root Directory**: `./` (dejar por defecto)
- **Build Command**: Dejar vacío (no necesita build)
- **Output Directory**: `./` (dejar por defecto)

### 4. Deploy

1. Haz clic en **"Deploy"**
2. Espera a que termine el deploy (1-2 minutos)
3. ¡Listo! Vercel te dará una URL como: `https://baby-shower-elias.vercel.app`

---

## 📝 Configurar Google Sheets (IMPORTANTE)

Después del deploy, necesitas configurar Google Sheets:

### 1. Crear Google Apps Script

Sigue las instrucciones del [README.md](../README.md) sección "Configuración de Google Sheets"

### 2. Actualizar la URL en Vercel

Una vez que tengas la URL de Google Apps Script:

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. **NO ES NECESARIO** agregar variables de entorno porque la URL está en el código

**OPCIÓN ALTERNATIVA**: Edita el archivo `js/config.js` directamente en GitHub:

1. Ve a tu repositorio en GitHub
2. Navega a `js/config.js`
3. Haz clic en el ícono de lápiz (editar)
4. Reemplaza `'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI'` con tu URL real
5. Haz commit de los cambios
6. Vercel automáticamente hará redeploy

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios en el código:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel automáticamente detectará los cambios y hará redeploy.

---

## 🌐 URL Final

Tu invitación estará disponible en:
- **URL de Vercel**: `https://baby-shower-elias.vercel.app` (o el nombre que elegiste)
- Puedes configurar un dominio personalizado en Vercel Settings

---

## ✅ Checklist Post-Deploy

- [ ] Verificar que la página carga correctamente
- [ ] Probar el formulario de confirmación
- [ ] Configurar Google Apps Script
- [ ] Actualizar la URL en `js/config.js`
- [ ] Hacer un test de confirmación real
- [ ] Compartir la URL con tus invitados

---

## 🆘 Solución de Problemas

### La página no carga
- Verifica que el deploy haya terminado exitosamente en Vercel
- Revisa los logs en Vercel Dashboard

### El formulario no guarda datos
- Asegúrate de haber configurado Google Apps Script
- Verifica que la URL en `js/config.js` sea correcta
- Revisa la consola del navegador (F12) para ver errores

### Necesito cambiar algo
- Edita los archivos en GitHub
- O clona el repositorio localmente, haz cambios, y push

---

## 📱 Compartir la Invitación

Una vez que todo esté funcionando:

1. Copia la URL de Vercel
2. Compártela por WhatsApp, email, etc.
3. Los invitados pueden confirmar directamente desde su celular

¡Disfruta tu Baby Shower! 🎉
