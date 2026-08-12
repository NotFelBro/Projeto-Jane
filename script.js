const imagensCarrosel = [
    "./imgs/Propriedade 1=Frame 1.png",
    "./imgs/Propriedade 1=Frame 3.png",
    "./imgs/Rectangle 69.png",
    "./imgs/Rectangle 13.png"
];

const imagensColuna = [
    "./imgs/Rectangle 20.png",
    "./imgs/Rectangle 21.png",
    "./imgs/Rectangle 72.png",
    "./imgs/Rectangle 73@2x.png",
    "./imgs/Rectangle 74.png",
    "./imgs/Rectangle 75.png",
    "./imgs/Rectangle 76.png",
    "./imgs/Rectangle 78.png",
    "./imgs/Rectangle 79.png",
    "./imgs/Rectangle 80.png",
    "./imgs/Rectangle 81.png"
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

function iniciarColuna() {
    const track = document.getElementById('coluna-track');
    if (!track || imagensColuna.length === 0) return;

    imagensColuna.forEach((src) => {
        track.appendChild(criarImagemCarrosel(src));
    });

    // Duplica o conjunto para permitir o loop infinito (mesma lógica do carrossel horizontal)
    imagensColuna.forEach((src) => {
        track.appendChild(criarImagemCarrosel(src));
    });
}

const cortesDisponiveis = [
    { nome: "Long Bob", preco: 35, imagem: "./imgs/Rectangle 9.png" },
    { nome: "Chanel de Bico", preco: 25, imagem: "./imgs/Rectangle 11.png" },
    { nome: "Borboleta", preco: 45, imagem: "./imgs/Rectangle 8.png" },
    { nome: "PixieCut", preco: 15, imagem: "./imgs/Rectangle 6.png" },
    { nome: "ShagHair", preco: 25, imagem: "./imgs/Rectangle 7.png" },
    { nome: "Camadas Longas", preco: 50, imagem: "./imgs/Rectangle 10.png" }
];

const horariosDisponiveis = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00"
];

const agendamentoData = {
    nome: '',
    corte: null,
    horario: null
};

function btnAgenda() {
    document.querySelector('.btn').hidden = true;
    document.getElementById('agendamento').hidden = false;
    mostrarEtapa('etapa-nome');
    document.getElementById('inputNome').focus();
}

function mostrarEtapa(idEtapaVisivel) {
    document.querySelectorAll('.etapa').forEach((etapa) => {
        etapa.hidden = etapa.id !== idEtapaVisivel;
    });
}

function confirmarNome() {
    const input = document.getElementById('inputNome');
    const nome = input.value.trim();

    if (!nome) {
        input.style.outline = '2px solid crimson';
        input.focus();
        return;
    }

    input.style.outline = 'none';
    agendamentoData.nome = nome;

    montarCardsCorte();
    mostrarEtapa('etapa-corte');
}

function montarCardsCorte() {
    const grupo = document.getElementById('grupo-agendamento');
    grupo.innerHTML = '';

    cortesDisponiveis.forEach((corte) => {
        const card = document.createElement('div');
        card.className = 'card-agendamento';

        if (agendamentoData.corte && agendamentoData.corte.nome === corte.nome) {
            card.classList.add('selecionado');
        }

        const img = document.createElement('img');
        img.src = corte.imagem;
        img.alt = corte.nome;

        const nomeEl = document.createElement('p');
        nomeEl.textContent = corte.nome;

        const precoEl = document.createElement('p');
        precoEl.textContent = `R$ ${corte.preco.toFixed(2)}`;

        card.appendChild(img);
        card.appendChild(nomeEl);
        card.appendChild(precoEl);

        card.addEventListener('click', () => selecionarCorte(card, corte));
        grupo.appendChild(card);
    });
}

function selecionarCorte(elementoClicado, corte) {
    document.querySelectorAll('.card-agendamento').forEach((card) => {
        card.classList.remove('selecionado');
    });
    elementoClicado.classList.add('selecionado');
    agendamentoData.corte = corte;
}

function confirmarCorte() {
    if (!agendamentoData.corte) {
        alert('Escolha um tipo de corte antes de confirmar.');
        return;
    }

    montarHorarios();
    mostrarEtapa('etapa-horario');
}

function montarHorarios() {
    const grupo = document.getElementById('grupo-horarios');
    grupo.innerHTML = '';

    horariosDisponiveis.forEach((horario) => {
        const item = document.createElement('div');
        item.className = 'horario-item';
        item.textContent = horario;

        if (agendamentoData.horario === horario) {
            item.classList.add('selecionado');
        }

        item.addEventListener('click', () => selecionarHorario(item, horario));
        grupo.appendChild(item);
    });
}

function selecionarHorario(elementoClicado, horario) {
    document.querySelectorAll('.horario-item').forEach((item) => {
        item.classList.remove('selecionado');
    });
    elementoClicado.classList.add('selecionado');
    agendamentoData.horario = horario;
}

function confirmarHorario() {
    if (!agendamentoData.horario) {
        alert('Escolha um horário antes de confirmar.');
        return;
    }

    const resumo = document.getElementById('resumoTexto');
    resumo.textContent =
        `Agendamento confirmado, ${agendamentoData.nome}! ` +
        `Corte: ${agendamentoData.corte.nome} - R$ ${agendamentoData.corte.preco.toFixed(2)} ` +
        `às ${agendamentoData.horario}`;

    mostrarEtapa('etapa-resumo');
}

function voltarParaCorte() {
    mostrarEtapa('etapa-corte');
}

function voltarParaNome() {
    mostrarEtapa('etapa-nome');
}

function reiniciarAgendamento() {
    agendamentoData.nome = '';
    agendamentoData.corte = null;
    agendamentoData.horario = null;
    document.getElementById('inputNome').value = '';

    document.getElementById('agendamento').hidden = true;
    document.querySelector('.btn').hidden = false;
}

function mostrarSecaoHeader(nome) {
    document.getElementById('secao-home').hidden = true;

    document.querySelectorAll('.secao-header').forEach((secao) => {
        secao.hidden = secao.id !== `secao-${nome}`;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function fecharSecaoHeader() {
    document.querySelectorAll('.secao-header').forEach((secao) => {
        secao.hidden = true;
    });

    document.getElementById('secao-home').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ajustarEspacoHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    document.body.style.paddingTop = header.offsetHeight + 'px';
}

// ==============================
// DIAGNÓSTICO DE IMAGENS (temporário)
// Mostra no console (F12) exatamente quais imagens não carregaram
// e qual caminho foi tentado, para identificar arquivos faltando
// ou com nome/maiúsculas diferentes na pasta imgs/.
// ==============================

function diagnosticarImagens() {
    const todasImagens = document.querySelectorAll('img');
    const quebradas = [];

    todasImagens.forEach((img) => {
        const verificar = () => {
            if (img.naturalWidth === 0) {
                quebradas.push(img.currentSrc || img.src);
                console.error('Imagem NÃO carregou:', img.currentSrc || img.src);
            }
        };

        if (img.complete) {
            verificar();
        } else {
            img.addEventListener('load', verificar);
            img.addEventListener('error', verificar);
        }
    });

    setTimeout(() => {
        if (quebradas.length === 0) {
            console.log('%cTodas as imagens carregaram com sucesso.', 'color: green; font-weight: bold;');
        } else {
            console.log(`%c${quebradas.length} imagem(ns) não carregaram. Veja a lista de caminhos acima em vermelho.`, 'color: red; font-weight: bold;');
        }
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrosel();
    iniciarColuna();
    ajustarEspacoHeader();
    diagnosticarImagens();

    const inputNome = document.getElementById('inputNome');
    if (inputNome) {
        inputNome.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter') {
                confirmarNome();
            }
        });
    }
});

window.addEventListener('resize', ajustarEspacoHeader);