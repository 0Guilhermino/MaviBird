console.log("[DevSoutinho] Flappy Bird");

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

const maviBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,
  atualiza() {
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
let telaAtiva = {};
function mudaParaTela(novatela){
  telaAtiva = novatela
}
const telas = {
  inicio: {
    desenhar() {
      planoDeFundo.desenhar();
      chao.desenhar();
      maviBird.desenhar();
      mensagemGetReady.desenhar();
    },
    click(){
      mudaParaTela(telas.jogo);
    },
    atualiza() {},
  },
};

telas.jogo = {
    desenhar() {
      planoDeFundo.desenhar();
      chao.desenhar();
      maviBird.desenhar();
    },
    atualiza() {
      maviBird.atualiza();
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
