console.log("Mavi Bird");

const somDeBatida = new Audio();
somDeBatida.src = './efeitos/hit.wav'

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

const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
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

function fazColisao(maviBird, chao){
    const maviBirdY = maviBird.y + maviBird.altura;
    const chaoY = chao.y;

    if(maviBirdY >= chaoY) {
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
    pula(){
      maviBird.velocidade = - maviBird.pulo;
    } ,
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if(fazColisao(maviBird, chao)) {
        console.log("Fez Colisao");
        somDeBatida.play();

        setTimeout(() => {
          mudaParaTela(telas.inicio);
        }, 500);

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
  }
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
  pula(){
    maviBird.velocidade = - maviBird.pulo;
  } ,
  gravidade: 0.25,
  velocidade: 0,
  atualiza() {
    if(fazColisao(maviBird, chao)) {
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

const globais = {};
let telaAtiva = {};
function mudaParaTela(novatela){
  telaAtiva = novatela

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const telas = {
  inicio: {
    inicializa(){
      globais.maviBird = criaMaviBird();
    },
    desenhar() {
      planoDeFundo.desenhar();
      chao.desenhar();
      globais.maviBird.desenhar();
      mensagemGetReady.desenhar();
    },
    click(){
      mudaParaTela(telas.jogo);
    },
    atualiza() {

    }
  },
};

telas.jogo = {
    desenhar() {
      planoDeFundo.desenhar();
      chao.desenhar();
      globais.maviBird.desenhar();
    },
    click(){
      globais.maviBird.pula();
    },
    atualiza() {
      globais.maviBird.atualiza();
    },
};

function loop() {

  telaAtiva.desenhar();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(telaAtiva.click){
    telaAtiva.click();
  }
})

mudaParaTela(telas.inicio);
loop();
