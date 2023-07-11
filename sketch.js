const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher;
var playerArrows = [];
var playerMagic = [];
var board1, board2;
var numberOfArrows = 20;
var numberOfMana = 200;


function preload() {
  backgroundImg = loadImage("./assets/background.jpeg");
}

function setup() {
  canvas = createCanvas(2000, 1200);

  engine = Engine.create();
  world = engine.world;

  //steve
  playerBase = new PlayerBase(300, 600, 250, 250);
  player = new Player(310, playerBase.body.position.y -100, 400, 230);
  playerArcher = new PlayerArcher(350, playerBase.body.position.y -125, 400, 230);

  //alvos
  board1 = new Board(width -300, 330, 60, 200);
  board2 = new Board(width -300, height -300, 60, 200);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display();

  board1.display();
  board2.display();

  for(var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
    }
  }

  for(var i = 0; i < playerMagic.length; i++) {
    if (playerMagic[i] !== undefined) {
      playerMagic[i].display();
    }
  }

  // Título
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("ARQUEIRO ÉPICO", width / 2, 100);

  //Contagem de Flechas e Mana
  fill("red");
  textAlign("center");
  textSize(30);
  text("Flechas Restantes: " + numberOfArrows, 200, 100);

  fill("SkyBlue");
  textAlign("center");
  textSize(30);
  text("Mana Restante: " + numberOfMana, 200, 150);
}

function keyPressed(){
  if(keyCode === 69){
    if (numberOfArrows > 0 && numberOfMana > 0){
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX+45, posY, 90, 60, angle);

      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
      numberOfMana -= 10;
    }
  }
}

function keyReleased(){
  if(keyCode === 69){
    if(playerArrows.length){
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length -1].shoot(angle);
    }
  }
}
