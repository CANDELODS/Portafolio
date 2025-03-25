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
// const mobileMenuBtn = document.querySelector('#mobile-menu');
// const navegacionDiv = document.querySelector('.navegacion__derecha');
// // const proyectosDiv = document.querySelector('.proyectos'); // Selecciona el contenedor de proyectos

// mobileMenuBtn.addEventListener('click', function () {
//     // Verificar si estamos en index.html
//     const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';

//     if (mobileMenuBtn.classList.contains('mostrar')) {
//         mobileMenuBtn.classList.remove('mostrar'); // Toggle para añadir y quitar la clase
//         navegacionDiv.classList.remove('activa');
//     } else {
//         mobileMenuBtn.classList.add('mostrar');
//         navegacionDiv.classList.add('activa');
//     }

//     if (navegacionDiv) {
//         navegacionDiv.addEventListener('click', function () {
//             navegacionDiv.classList.add('oculta');

//             setTimeout(() => {
//                 mobileMenuBtn.classList.remove('mostrar');
//                 navegacionDiv.classList.remove('activa');
//                 navegacionDiv.classList.remove('oculta');
//             }, 1000);
//         });
//     }

//     // Aplicar la clase .mostrar--proyectos en todas las páginas excepto index.html
//     if (!isIndexPage) {
//         mobileMenuBtn.classList.add('mostrar--proyectos');
//     } else {
//         mobileMenuBtn.classList.remove('mostrar--proyectos');
//     }

//     // Elimina la clase de mostrar en un tamaño de tablet o mayor
//     window.addEventListener('resize', function () {
//         const anchoPantalla = document.body.clientWidth;
//         if (anchoPantalla >= 768) {
//             mobileMenuBtn.classList.remove('mostrar');
//             navegacionDiv.classList.remove('activa');
//         }
//     });
// });