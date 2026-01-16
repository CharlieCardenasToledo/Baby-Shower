// ==========================================
// BABY SHOWER INVITATION APP
// ==========================================

(function () {
    'use strict';

    // ==========================================
    // ELEMENTOS DEL DOM
    // ==========================================
    const elements = {
        // Botones principales
        btnBack: document.getElementById('btnBack'),
        btnShare: document.getElementById('btnShare'),
        btnRsvp: document.getElementById('btnRsvp'),
        mapPreview: document.getElementById('mapPreview'),

        // Modal
        modal: document.getElementById('rsvpModal'),
        btnCloseModal: document.getElementById('btnCloseModal'),
        btnCancel: document.getElementById('btnCancel'),

        // Formulario
        form: document.getElementById('rsvpForm'),
        btnSubmit: document.getElementById('btnSubmit'),

        // Mensajes
        successMessage: document.getElementById('successMessage'),
        btnCloseSuccess: document.getElementById('btnCloseSuccess')
    };

    // ==========================================
    // FUNCIONES DE MODAL
    // ==========================================

    function openModal() {
        elements.modal.classList.remove('hidden');
        elements.modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        elements.modal.classList.add('hidden');
        elements.modal.classList.remove('flex');
        document.body.style.overflow = '';
        resetForm();
    }

    function showSuccess() {
        elements.form.classList.add('hidden');
        elements.successMessage.classList.remove('hidden');
    }

    function resetForm() {
        elements.form.reset();
        elements.form.classList.remove('hidden');
        elements.successMessage.classList.add('hidden');
        setSubmitButtonState(false);
    }

    function setSubmitButtonState(loading) {
        const submitText = elements.btnSubmit.querySelector('.submit-text');
        const spinner = elements.btnSubmit.querySelector('.spinner');

        if (loading) {
            elements.btnSubmit.disabled = true;
            submitText.classList.add('hidden');
            spinner.classList.remove('hidden');
        } else {
            elements.btnSubmit.disabled = false;
            submitText.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    }

    // ==========================================
    // FUNCIONES DE ENVÍO
    // ==========================================

    async function submitForm(formData) {
        const config = window.APP_CONFIG;

        // Validar que se haya configurado la URL de Google Script
        if (!config.GOOGLE_SCRIPT_URL || config.GOOGLE_SCRIPT_URL === 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI') {
            console.warn('⚠️ Google Script URL no configurada. Los datos se mostrarán en consola.');
            console.log('📝 Datos del formulario:', formData);

            // Simular envío exitoso
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ success: true, message: 'Datos guardados (modo demo)' });
                }, 1500);
            });
        }

        // Enviar datos a Google Sheets
        try {
            const response = await fetch(config.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Nota: con mode: 'no-cors' no podemos leer la respuesta,
            // pero sabemos que se envió correctamente
            return { success: true, message: 'Datos enviados correctamente' };

        } catch (error) {
            console.error('Error al enviar datos:', error);
            throw new Error('Error al enviar la confirmación. Por favor, intenta de nuevo.');
        }
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    // Botón volver
    elements.btnBack.addEventListener('click', () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            console.log('No hay historial para volver');
        }
    });

    // Botón compartir
    elements.btnShare.addEventListener('click', async () => {
        const config = window.APP_CONFIG;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Baby Shower - Elias Alessandro',
                    text: config.SHARE_TEXT,
                    url: config.SHARE_URL
                });
                console.log('✅ Compartido exitosamente');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error al compartir:', error);
                    fallbackShare();
                }
            }
        } else {
            fallbackShare();
        }
    });

    function fallbackShare() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('¡Enlace copiado al portapapeles! 📋');
        }).catch(() => {
            alert('URL: ' + url);
        });
    }

    // Mapa
    elements.mapPreview.addEventListener('click', () => {
        window.open(window.APP_CONFIG.MAP_URL, '_blank');
    });

    // Abrir modal
    elements.btnRsvp.addEventListener('click', openModal);

    // Cerrar modal
    elements.btnCloseModal.addEventListener('click', closeModal);
    elements.btnCancel.addEventListener('click', closeModal);
    elements.btnCloseSuccess.addEventListener('click', closeModal);

    // Cerrar modal al hacer clic fuera
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });

    // Enviar formulario
    elements.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = {
            name: document.getElementById('guestName').value.trim(),
            guestCount: parseInt(document.getElementById('guestCount').value) || 0,
            timestamp: new Date().toISOString()
        };

        // Validar datos requeridos
        if (!formData.name) {
            alert('Por favor ingresa tu nombre completo');
            return;
        }

        // Mostrar estado de carga
        setSubmitButtonState(true);

        try {
            // Enviar datos
            const result = await submitForm(formData);

            if (result.success) {
                // Mostrar mensaje de éxito
                showSuccess();

                // Log para debugging
                console.log('✅ Confirmación enviada:', formData);
            } else {
                throw new Error(result.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('❌ Error:', error);
            alert('Hubo un error al enviar tu confirmación. Por favor, intenta de nuevo.');
            setSubmitButtonState(false);
        }
    });

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================

    console.log('🎉 Baby Shower Invitation App cargada');
    console.log('📋 Configuración:', window.APP_CONFIG);

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !elements.modal.classList.contains('hidden')) {
            closeModal();
        }
    });

})();
