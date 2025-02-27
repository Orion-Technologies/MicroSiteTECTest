// Configuración de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';

// Función para cargar y renderizar el PDF
function cargarPDF(url) {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(pdf => {
        pdf.getPage(1).then(page => {
            const canvas = document.getElementById('visorPDF');
            const context = canvas.getContext('2d');
            const viewport = page.getViewport({ scale: 1.5 });

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext);
        });
    });
}

// Cargar JSON y gestionar eventos de clic
fetch('../data/pdfs.json')
    .then(response => response.json())
    .then(data => {
        document.querySelectorAll('.contentMobile').forEach(item => {
            item.addEventListener('click', () => {
                const company = item.getAttribute('data-company');
                const pdfData = data.pdfs.find(pdf => pdf.company === company);

                if (pdfData) {
                    cargarPDF(pdfData.url);
                    document.querySelector('.pdf-viewer').style.display = 'block';
                    const descargarBtn = document.getElementById('descargarPDF');
                    descargarBtn.href = pdfData.url;
                    descargarBtn.download = pdfData.name;
                }
            });
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

// Cerrar el visor de PDF
document.getElementById('cerrarPDF').addEventListener('click', () => {
    document.querySelector('.pdf-viewer').style.display = 'none';
});