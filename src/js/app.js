//Nos Aseguramos Que Ya Se Halla Cargado Todo El DOM
document.addEventListener('DOMContentLoaded', function () {
    inciarApp();
});

function inciarApp() {
    seleccionarImagen();
    animacionArquitectura();
}

//Se encarga de seleccionar las imagenes a mostrar
function seleccionarImagen() {
    const imagenes = document.querySelectorAll('.Vproyectos__img'); // Selecciona todas las imágenes
    imagenes.forEach(imagen => { //Iteramos cada imagen y le asignamos el evento click
        imagen.addEventListener('click', function (e) {
            const rutaCompleta = e.target.src; //Extraemos la ruta
            // Eliminamos la parte no deseada y la extensión del archivo
            const rutaCortada = rutaCompleta.replace('http://127.0.0.1:5500/', '').replace(/\.[^/.]+$/, '');
            mostrarImagen(rutaCortada); //Llamamos la función y pasamos de parámetro la ruta
        });
    });
}

function animacionArquitectura() {
    const cards = document.querySelectorAll('.arquitectura__card'); //Seleccionamos La Card
    cards.forEach(card => { //Iteramos Cada Card Para Asignar AddEventListener

        card.addEventListener('click', function (e) { //Asignamos AddEventListener En Cada Card            
            // Evitamos que el evento afecte a los hijos, como el h3 o p
            e.stopPropagation();
            // Si la card clickeada ya tiene la clase activa, se la quitamos (desactivamos)
            if (card.classList.contains('arquitectura__card--activo')) {
                card.classList.remove('arquitectura__card--activo');
            } else {
                // Si no tiene la clase activa, primero eliminamos la clase de las otras cards
                cards.forEach(c => c.classList.remove('arquitectura__card--activo'));

                // Luego agregamos la clase activa solo a la card clickeada
                card.classList.add('arquitectura__card--activo');
            }
        });

    })
}

//Crea los elementos necesarios para mostrar la imagen seleccionada en la funcion anterior
function mostrarImagen(ruta) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="${ruta}.webp" type="image/webp">
    <img  loading="lazy" width="200" height="300" src="../${ruta}.png"
     alt="Imagen Proyecto">
     `;
    //Crea el overlay con la imagen
    const overlayImagen = document.createElement('DIV');
    overlayImagen.appendChild(imagen);
    overlayImagen.classList.add('overlay-imagen');
    //Cerrar imagen presionando fuerade ella
    overlayImagen.onclick = function () {
        overlayImagen.remove();
    }

    //Boton para cerra ventana modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlayImagen.remove();
    }

    overlayImagen.appendChild(cerrarModal);

    //La agrega al HTML
    const body = document.querySelector('body');
    body.appendChild(overlayImagen);
    body.classList.add('fijar-body');
}

// // MENÚ MOBILE
const abrirMenu = document.querySelector('#abrirMenu');
const cerrarMenu = document.querySelector('#cerrarMenu');
const navegacion = document.querySelector('#navegacion');
const links = document.querySelectorAll('.navegacion__enlace');

//Función para abrir el menú
abrirMenu.addEventListener('click', function(){
    //Agrego la clase .mostrar a la nav
    navegacion.classList.add('mostrar');
});

//Función para cerrar el menú
cerrarMenu.addEventListener('click', function(){
    //Elimino la clase .mostrar a la nav
    navegacion.classList.remove('mostrar');
});

//Función para cerrar el menú al hacer click en un enlace
links.forEach(link => {
    //Agrego el evento click a cada enlace
    link.addEventListener('click', function(){
        //Agrego la clase .esconder a la navegacion
        navegacion.classList.add('esconder');
        //Elimino la clase .mostrar a la navegacion
        navegacion.classList.remove('mostrar');
        //Elimino la clase .esconder a la navegacion después de 300ms
        setTimeout(() => {
            navegacion.classList.remove('esconder');
        }, 300);
    });
});