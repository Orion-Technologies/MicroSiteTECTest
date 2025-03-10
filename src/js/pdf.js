// Configuración de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';

// Función para cargar y renderizar el PDF
function cargarPDF(url) {
   
    const loadingMessage = document.getElementById("pdf-loading");
    const canvas = document.getElementById('visorPDF');
    const context = canvas.getContext('2d');

    loadingMessage.style.display = "block";



    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(pdf => {
        return pdf.getPage(1);
    })
        .then(page => {
            const viewport = page.getViewport({ scale: ajustarEscala() });

            canvas.height = viewport.height;
            canvas.width  = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            return page.render(renderContext).promise;
        })
        .then(() => {
            loadingMessage.style.display = "none";
        }).catch(error => {
            console.error("Error al cargar el PDF:", error);
            loadingMessage.style.display = "none";
        });
}

function ajustarEscala() {
    return window.innerWidth > window.innerHeight ? 1.2 : 1.5;
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
                    //probar con flex en lugar de block
                    document.querySelector('.pdf-viewer').style.display = 'flex';
                    const descargarBtn = document.getElementById('descargarPDF');
                    descargarBtn.href = pdfData.url;
                    descargarBtn.download = pdfData.name;
                } else {
                    console.error("No se encontro el PDF para la empresa", company);
                }
            });
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

    //Limpiar el visor del PDF
    document.getElementById('cerrarPDF').addEventListener('click', () => {
        const canvas = document.getElementById('visorPDF');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        document.querySelector('.pdf-viewer').style.display = 'none';
    });

    //Ajustar el visor cuando cambia lo orientación
    window.addEventListener("resize", () => {
        const visor = document.querySelector(".pdf-viewer");
        if (visor.style.display === "flex") {
            cargarPDF(document.getElementById('descargarPDF').href);
        }
    });

// Cerrar el visor de PDF
document.getElementById('cerrarPDF').addEventListener('click', () => {
    document.querySelector('.pdf-viewer').style.display = 'none';
});