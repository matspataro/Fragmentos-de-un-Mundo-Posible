//función para desplegar el menú hamburguesa//
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
const menuLinks = document.querySelectorAll('.nav-menu a');
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('nav-menu_visible');
    menuBtn.classList.toggle('open');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () =>{
        menuBtn.classList.remove('open');
        navMenu.classList.remove('nav-menu_visible');
    });
});

//función para escuchar el audio//
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

const audio = new Howl({
    src: ['/Audio/Fragmentos - Obertura Loopeo.mp3'],
    loop: true,
    volume: 0,
});

let lastSeek = 0;
let sonidoHabilitado = false;

const primeraImagen = document.querySelector('.maquina-escribir');
const botonSonido = document.querySelector('.sound-toggle');
const soundIcon = document.querySelector('.sound-icon');

const textoHabilitar = window.location.pathname.includes("/en/") ? "Enable sound" : "Habilitar sonido";
const textoDeshabilitar = window.location.pathname.includes("/en/") ? "Disable sound" : "Deshabilitar sonido";

const toggleSound = (event) => {
    sonidoHabilitado = !sonidoHabilitado;
    
    if (sonidoHabilitado) {
        botonSonido.textContent = textoDeshabilitar;
        if (isTouchDevice()) {
            if (!audio.playing()) {
                audio.play();
                audio.fade(0, 0.8, 650);
            }
        }
    } else {
        botonSonido.textContent = textoHabilitar;
        soundIcon.src = "Imagenes/Auriculares.png";
        if (audio.playing()) {
            audio.fade(0.8, 0, 650);
            setTimeout(() => audio.pause(), 650);
        }
    }
};

botonSonido.addEventListener('pointerup', toggleSound);

if (!isTouchDevice()) {
    primeraImagen.addEventListener('mouseover', () => {
        if (sonidoHabilitado) {
            if (!audio.playing()) {
                audio.play();
                audio.fade(0, 0.8, 650);
            } else {
                audio.seek(lastSeek);
                audio.fade(0, 0.8, 650);
            }
        }
    });

    primeraImagen.addEventListener('mouseout', () => {
        if (sonidoHabilitado && audio.playing()) {
            lastSeek = audio.seek();
            audio.fade(0.8, 0, 650);
            setTimeout(() => audio.pause(), 650);
        }
    });
}

// Glightbox
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = GLightbox({
        selector: '.glightbox',
        openEffect: 'fade',
        closeEffect: 'fade',
        loop: true,
        preload: 2,
        zoomable: false, 
        effect: 'fade',        
    });
});