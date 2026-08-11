const imagensCarrosel = [
    "./imgs/Propriedade 1=Frame 1.png",
    "./imgs/Propriedade 1=Frame 2.png",
    "./imgs/Propriedade 1=Frame 3.png",
    "./imgs/Rectangle 69.png",
    "./imgs/Rectangle 13.png"
];

function iniciarCarrosel() {
    const track = document.getElementById('carrosel-track');
    if (!track || imagensCarrosel.length === 0) return;

    imagensCarrosel.forEach((src) => {
        track.appendChild(criarImagemCarrosel(src));
    });

    imagensCarrosel.forEach((src) => {
        track.appendChild(criarImagemCarrosel(src));
    });
}

function criarImagemCarrosel(src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.addEventListener('error', () => {
        console.warn('Falha ao carregar imagem do carrossel:', src);
    });
    return img;
}


document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrosel();
});