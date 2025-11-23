// logica_formulario.js
document.addEventListener("DOMContentLoaded", () => {
    const formulariosContacto = document.querySelectorAll(".formulario-joan");
    if (!formulariosContacto.length) return;

    const claveMensajesGuardados = "registros_contacto_joan";
    const nombrePaginaActual = document.body.dataset.pagina || "";

    formulariosContacto.forEach((formularioActual) => {
        formularioActual.addEventListener("submit", (eventoFormulario) => {
            eventoFormulario.preventDefault();

            const entradaNombre = formularioActual.querySelector("input[name='nombre']");
            const entradaCorreo = formularioActual.querySelector("input[name='correo']");
            const entradaMensaje = formularioActual.querySelector("textarea[name='mensaje']");

            const etiquetaErrorNombre = formularioActual.querySelector(".alerta-error-nombre");
            const etiquetaErrorCorreo = formularioActual.querySelector(".alerta-error-correo");
            const etiquetaErrorMensaje = formularioActual.querySelector(".alerta-error-mensaje");
            const etiquetaExito = formularioActual.querySelector(".texto-exito");

            if (etiquetaExito) etiquetaExito.textContent = "";
            if (etiquetaErrorNombre) etiquetaErrorNombre.textContent = "";
            if (etiquetaErrorCorreo) etiquetaErrorCorreo.textContent = "";
            if (etiquetaErrorMensaje) etiquetaErrorMensaje.textContent = "";

            const valorNombre = (entradaNombre?.value || "").trim();
            const valorCorreo = (entradaCorreo?.value || "").trim();
            const valorMensaje = (entradaMensaje?.value || "").trim();

            let datosSonValidos = true;

            const patronNombreSoloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
            if (!valorNombre) {
                if (etiquetaErrorNombre) {
                    etiquetaErrorNombre.textContent = "El nombre es obligatorio.";
                }
                datosSonValidos = false;
            } else if (!patronNombreSoloLetras.test(valorNombre)) {
                if (etiquetaErrorNombre) {
                    etiquetaErrorNombre.textContent = "El nombre solo puede contener letras y espacios.";
                }
                datosSonValidos = false;
            }

            const patronCorreoBasico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!valorCorreo) {
                if (etiquetaErrorCorreo) {
                    etiquetaErrorCorreo.textContent = "El correo es obligatorio.";
                }
                datosSonValidos = false;
            } else if (!patronCorreoBasico.test(valorCorreo)) {
                if (etiquetaErrorCorreo) {
                    etiquetaErrorCorreo.textContent = "Ingresa un correo electrónico válido.";
                }
                datosSonValidos = false;
            }

            if (!valorMensaje) {
                if (etiquetaErrorMensaje) {
                    etiquetaErrorMensaje.textContent = "El mensaje es obligatorio.";
                }
                datosSonValidos = false;
            } else if (valorMensaje.length > 100) {
                if (etiquetaErrorMensaje) {
                    etiquetaErrorMensaje.textContent = "El mensaje no puede tener más de 100 caracteres.";
                }
                datosSonValidos = false;
            }

            if (!datosSonValidos) {
                return;
            }

            const nuevoMensajeGuardado = {
                nombre: valorNombre,
                correo: valorCorreo,
                mensaje: valorMensaje,
                instante: new Date().toISOString()
            };

            const listaMensajesPrevios =
                JSON.parse(localStorage.getItem(claveMensajesGuardados) || "[]");

            listaMensajesPrevios.push(nuevoMensajeGuardado);
            localStorage.setItem(
                claveMensajesGuardados,
                JSON.stringify(listaMensajesPrevios)
            );

            if (nombrePaginaActual === "contacto") {
                window.location.href = "agradecimiento.html";
                return;
            }

            if (etiquetaExito) {
                etiquetaExito.textContent = "Mensaje enviado con éxito.";
            }

            formularioActual.reset();
        });
    });
});
