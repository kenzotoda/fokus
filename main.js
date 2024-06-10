const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const musicaInput = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const startPauseBt = document.querySelector('#start-pause');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarImg = document.querySelector('#start-pause img');

const tempoNaTela = document.querySelector('#timer');


let temporDecorridoEmSegundos = 1500;
let intervaloId = null;

const contagemRegressiva = function() {
    if (temporDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
            }
            alert('Tempo finalizado');
            zerar();
        return;
    }
    temporDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener("click", iniciarOuPausar);

// a cada 1 segundo ele executa a função
// 1000 milisegundos = 1 segundo
function iniciarOuPausar() {
    if (intervaloId) {
        zerar();
        audioPause.play();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    audioPlay.play();
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarImg.src = "/imagens/pause.png";    
}

// interromper a contagem
// "clearInterval" para interromper o intervalo
function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarImg.src = "/imagens/play_arrow.png";
    intervaloId = null;
}



// "change" normalmente usado com input do tipo "checkbox"
// dar pause e play na música
musicaInput.addEventListener("change", function() {    
    if (musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
});


focoBt.addEventListener("click", function() {
    alterarContexto('foco');
    focoBt.classList.add('active');
    curtoBt.classList.remove('active');
    longoBt.classList.remove('active');
    temporDecorridoEmSegundos = 1500;
    mostrarTempo();
});

curtoBt.addEventListener("click", function() {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    focoBt.classList.remove('active');
    longoBt.classList.remove('active');
    temporDecorridoEmSegundos = 300;
    mostrarTempo();
});

longoBt.addEventListener("click", function() {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
    focoBt.classList.remove('active');
    curtoBt.classList.remove('active');
    temporDecorridoEmSegundos = 900;
    mostrarTempo();
});

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    if (contexto === 'foco') {
        titulo.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`;
    }
    else if (contexto === 'descanso-curto') {
        titulo.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
    }
    else {
        titulo.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa</strong>`;
    }
}

function mostrarTempo() {
    const tempo = new Date(temporDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
