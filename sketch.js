//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//Sons do JOGO
let raquetada;
let ponto;
let trilha; 

function preload(){
  trilha = loadSound("trilha.mp3"); 
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//velocidade da bolinha
let speedXBolinha = 3;
let speedYBolinha = 3;


//variáveis da raquetes
let xRaquete    = 2;
let yRaquete    = 150;
let xRaqueteBot = 588;
let yRaqueteBot = 150;
let raqueteH    = 10;
let raqueteV    = 90;
let colidiu     = false
let moviybot;
let iabot       = 30;

//Placar 
let player1  = 0
let bot      = 0

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteBot, yRaqueteBot);
  movimentaMinhaRaquete();
//  verificaColisaoRaquete();
  colidiubilioteca(xRaquete, yRaquete);
  colidiubilioteca(xRaqueteBot, yRaqueteBot);
  moviraquetebot();
  incluiplacar();
  marcaponto();
  
}

function marcaponto(){
  if (xBolinha < 9) {
    bot += 1
    ponto.play()
  }
  if (xBolinha > 591){
    player1 +=1
    ponto.play()  
  }
}

function incluiplacar(){
  stroke(255)
  textSize(20)
  textAlign(CENTER)
  fill(color(255,200, 00))
  rect(130, 8, 40, 30)
  rect(430, 8, 40, 30)
  fill(255)
  text(player1, 150, 30)
  text(bot, 450, 30)
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += speedXBolinha;
  yBolinha += speedYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    speedXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    speedYBolinha *= -1 
   }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteH, 
      raqueteV);
}

function moviraquetebot(){
  
  moviybot = yBolinha - yRaqueteBot - raqueteV  / 2 - iabot  ;
  yRaqueteBot += moviybot
}

function colidiubilioteca(x,y){
  colidiu = collideRectCircle(x, y, raqueteH, raqueteV, xBolinha, yBolinha, raio);  
  if (colidiu){
    speedXBolinha *= -1
    raquetada.play()
    iabot = Math.floor(Math.random() * ((7 - 3 + 1) + 3) * 10);
  }
}

function movimentaMinhaRaquete(){
  if ((keyIsDown(UP_ARROW)) && yRaquete > -50){
    yRaquete -= 10;
  }
  if ((keyIsDown(DOWN_ARROW)) && yRaquete < 350){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteH && 
      yBolinha - raio < yRaquete + raqueteV && 
      yBolinha + raio > yRaquete){
    speedXBolinha *= -1;
  }
}