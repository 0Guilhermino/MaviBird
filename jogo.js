console.log("Mavi Bird");

let frames = 0;
const somDeBatida = new Audio();
somDeBatida.src = "./efeitos/hit.wav";

const sprites = new Image();
sprites.src = "./sprites_mv.png";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenhar() {
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );

    context.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x + planoDeFundo.largura,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );
  },
};

function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;

      chao.x = movimentacao % repeteEm;
    },
    desenhar() {
      context.drawImage(
        sprites,
        chao.spriteX,
        chao.spriteY,
        chao.largura,
        chao.altura,
        chao.x,
        chao.y,
        chao.largura,
        chao.altura
      );

      context.drawImage(
        sprites,
        chao.spriteX,
        chao.spriteY,
        chao.largura,
        chao.altura,
        chao.x + chao.largura,
        chao.y,
        chao.largura,
        chao.altura
      );
    },
  };
  return chao;
}

function fazColisao(maviBird, chao) {
  const maviBirdY = maviBird.y + maviBird.altura;
  const chaoY = chao.y;

  if (maviBirdY >= chaoY) {
    return true;
  }

  return false;
}

function criaMaviBird() {
  const maviBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log("devo pular");
      console.log("[antes]", maviBird.velocidade);
      maviBird.velocidade = -maviBird.pulo;
      console.log("[depois]", maviBird.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if (fazColisao(maviBird, globais.chao)) {
        console.log("Fez colisao");
        som_HIT.play();

        setTimeout(() => {
          mudaParaTela(Telas.INICIO);
        }, 500);
        return;
      }

      maviBird.velocidade = maviBird.velocidade + maviBird.gravidade;
      maviBird.y = maviBird.y + maviBird.velocidade;
    },
    movimentos: [
      { spriteX: 0, spriteY: 0 },
      { spriteX: 0, spriteY: 26 },
      { spriteX: 0, spriteY: 52 },
      { spriteX: 0, spriteY: 26 },
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;
      //console.log('passouOIntervalo', passouOIntervalo)

      if (passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + maviBird.frameAtual;
        const baseRepeticao = maviBird.movimentos.length;
        maviBird.frameAtual = incremento % baseRepeticao;
      }
    },
    desenhar() {
      maviBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = maviBird.movimentos[maviBird.frameAtual];

      context.drawImage(
        sprites,
        spriteX,
        spriteY,
        maviBird.largura,
        maviBird.altura,
        maviBird.x,
        maviBird.y,
        maviBird.largura,
        maviBird.altura
      );
    },
  };
  return maviBird;
}

const maviBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  pulo: 4.6,
  pula() {
    maviBird.velocidade = -maviBird.pulo;
  },
  gravidade: 0.25,
  velocidade: 0,
  atualiza() {
    if (fazColisao(maviBird, chao)) {
      console.log("Fez Colisao");

      mudaParaTela(telas.inicio);
      return;
    }

    maviBird.velocidade += maviBird.gravidade;
    maviBird.y = maviBird.y + maviBird.velocidade;
  },
  desenhar() {
    context.drawImage(
      sprites,
      maviBird.spriteX,
      maviBird.spriteY,
      maviBird.largura,
      maviBird.altura,
      maviBird.x,
      maviBird.y,
      maviBird.largura,
      maviBird.altura
    );
  },
};

const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,
  desenhar() {
    context.drawImage(
      sprites,
      mensagemGetReady.sX,
      mensagemGetReady.sY,
      mensagemGetReady.w,
      mensagemGetReady.h,
      mensagemGetReady.x,
      mensagemGetReady.y,
      mensagemGetReady.w,
      mensagemGetReady.h
    );
  },
};

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenhar() {
      canos.pares.forEach(function (par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        context.drawImage(
          sprites,
          canos.ceu.spriteX,
          canos.ceu.spriteY,
          canos.largura,
          canos.altura,
          canoCeuX,
          canoCeuY,
          canos.largura,
          canos.altura
        );
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        context.drawImage(
          sprites,
          canos.chao.spriteX,
          canos.chao.spriteY,
          canos.largura,
          canos.altura,
          canoChaoX,
          canoChaoY,
          canos.largura,
          canos.altura
        );
      });
    },
    temColisaoComOMaviBird(par){

      if(globais.maviBird.x >= par.x){
        
      }

      return false
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames) {
        console.log("passou 100 frames");
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function (par) {
        par.x = par.x -2;

        if(canos.temColisaoComOMaviBird(par)){
          console.log('você perdeu');
        }

        if(par.x + canos.largura<= 0) {
          canos.pares.shift();
        }
      });


    },
  };
  return canos;
}

const globais = {};
let telaAtiva = {};
function mudaParaTela(novatela) {
  telaAtiva = novatela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const telas = {
  inicio: {
    inicializa() {
      globais.maviBird = criaMaviBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenhar() {
      planoDeFundo.desenhar();
      globais.maviBird.desenhar();
      globais.canos.desenhar();
      globais.chao.desenhar();
      // mensagemGetReady.desenhar();
    },
    click() {
      mudaParaTela(telas.jogo);
    },
    atualiza() {
      globais.chao.atualiza();
      globais.canos.atualiza();
    },
  },
};

telas.jogo = {
  desenhar() {
    planoDeFundo.desenhar();
    globais.chao.desenhar();
    globais.maviBird.desenhar();
  },
  click() {
    globais.maviBird.pula();
  },
  atualiza() {
    globais.maviBird.atualiza();
  },
};

function loop() {
  telaAtiva.desenhar();
  telaAtiva.atualiza();

  frames += 1;
  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(telas.inicio);
loop();
