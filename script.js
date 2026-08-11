const imagensCarrosel = [
    "./imgs/Propriedade 1=Frame 1.png",
    "./imgs/Propriedade 1=Frame 2.png",
    "./imgs/Propriedade 1=Frame 3.png",
    "./imgs/Rectangle 69.png",
    "./imgs/Rectangle 13.png"
];

const imagensColuna = [
    "./imgs/Rectangle 20.png",
    "./imgs/Rectangle 21.png",
    "./imgs/Rectangle 72.png",
    "./imgs/Rectangle 73_2x.png",
    "./imgs/Rectangle 74.png",
    "./imgs/Rectangle 75.png",
    "./imgs/Rectangle 76.png",
    "./imgs/Rectangle 78.png",
    "./imgs/Rectangle 79.png",
    "./imgs/Rectangle 80.png",
    "./imgs/Rectangle 81.png"
]

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

function iniciarColuna() {
    const track = document.getElementById('coluna-track');
    if (!track || imagensColuna.length === 0) return;

    imagensColuna.forEach((src) => {
        track.appendChild(criarImagemCarrosel(src));
    })
}


document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrosel();
    iniciarColuna();
});