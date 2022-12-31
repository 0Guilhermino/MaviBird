console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites_mv.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenhar() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
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
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
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
    atualiza(){
      maviBird.velocidade += maviBird.gravidade;
      maviBird.y = maviBird.y + maviBird.velocidade;
    },
    desenhar(){
      contexto.drawImage(
        sprites,
        maviBird.spriteX, maviBird.spriteY,
        maviBird.largura, maviBird.altura,
        maviBird.x, maviBird.y,
        maviBird.largura, maviBird.altura
      );
    }
  }


    
  
    function loop(){
      maviBird.atualiza();


      planoDeFundo.desenhar();
      chao.desenhar();
      maviBird.desenhar();

      
      requestAnimationFrame(loop);
    }
    
    loop();
