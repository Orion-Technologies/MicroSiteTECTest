document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");

    if (!container) {
        console.error("Error: No se encontró el elemento .container en el DOM.");
        return;
    }

    // Función para ajustar la altura del contenedor al tamaño de la ventana
    function ajustarAltura() {
        const alturaVisible = window.innerHeight;
        container.style.height = `${alturaVisible}px`;
    }

    // Ajustar la altura al cargar y cuando se redimensiona la ventana
    window.addEventListener('load', ajustarAltura);
    window.addEventListener('resize', ajustarAltura);

    // Detectar si el usuario está en un dispositivo móvil
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        // Si es un móvil, insertar directamente el HTML dentro de container
        container.innerHTML = `
            <a href="./src/pages/categories.html">
                <img src="../../src/assets/logo-tec/landing-1-portada.png" alt="TEC">
            </a>
        `;
    } else {
        // Si es un dispositivo de escritorio, mostrar la imagen estática del QR
        container.innerHTML = `
            <img src="../../src/assets/logo-tec/img-qr-code.jpeg" alt="Escanea este código QR para acceder desde tu celular" 
                 style="display: block; margin: auto; cursor: pointer;">
        `;
    }
});