// URL de la imagen de fondo
const backgroundUrl = 'fondix.png';

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1920;

    const backgroundImg = new Image();
    backgroundImg.src = backgroundUrl;
    backgroundImg.onload = function() {
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    };

    document.getElementById('imageUpload').addEventListener('change', function(event) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                // Redibujar el fondo y luego la nueva imagen encima
                ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
                
                // Tamaño fijo de la imagen cargada: 950x950 px
                const imgWidth = 950;
                const imgHeight = 950;

                // Posicionar la imagen a 320 px desde la parte superior, centrada horizontalmente
                const x = (canvas.width / 2) - (imgWidth / 2);
                const y = 320;
                ctx.drawImage(img, x, y, imgWidth, imgHeight);

                // Añadir los textos debajo de la imagen
                addTextToCanvas(ctx, y + imgHeight);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    });

    document.getElementById('downloadBtn').addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'imagen-compuesta.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    function addTextToCanvas(ctx, imgBottom) {
        // Obtener los valores de los casilleros
        const name = document.getElementById('nameInput').value || '';
        const sex = document.getElementById('sexInput').value || '';
        const age = document.getElementById('ageInput').value || '';
        const contact = document.getElementById('contactInput').value || '';
        const special = document.getElementById('specialInput').value || '';
        const zona = document.getElementById('zonaInput').value || '';

        // Configurar el texto
        ctx.font = '50px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = "center";

        // Posicionar los textos 35 px debajo de la imagen en el centro del canvas, con una altura de 70 px entre cada línea
        const textYStart = imgBottom + 70;
        ctx.fillText(`Nombre: ${name}`, canvas.width / 2, textYStart);
        ctx.fillText(`Sexo: ${sex}`, canvas.width / 2, textYStart + 70);
        ctx.fillText(`Edad: ${age}`, canvas.width / 2, textYStart + 140);
        ctx.fillText(`Número de contacto: ${contact}`, canvas.width / 2, textYStart + 210);
        ctx.fillText(`Característica especial: ${special}`, canvas.width / 2, textYStart + 280);
        ctx.fillText(`Zona: ${zona}`, canvas.width / 2, textYStart + 350);
    }
});
