var player1, player2;
var island, bullet, ground, islandGroup;
var player2Img,islandImage, bg, bgImage;
var changeDirection;
var bullet, bulletImg, bulletGroup, invsableGround;
var keyState = "noState";
var score = 0, frames;
var c1, c2, c3, x = 510, y = 100;

var invisibleground, center, endImage;
var gameState = "notStarted";
//var energy, energyImage, energyGroup;
var energyCount = 3;
var islandGroup;
function preload() {
  endImage = loadImage("gameOver.png");

  player2Img = loadImage("tank.jpg")
  bgImage = loadImage("bg.jpg")
  islandImage = loadImage("islandImage.jpg")
  bulletImg = loadImage("bullet1.png")
 

  //energyImage = loadImage("energy.png")
}

function setup() {
  createCanvas(600,800);
 invisibleground=createSprite(0,800,800,1);
 invisibleground.visible= true;

  bg = createSprite(300,400);
  bg.addImage(bgImage);
  bg.velocityY = 3;
  bg.scale = 3;

  center = createSprite(300,400,1,1);
  invisibleground.visible= true;

  
  
  var player1_options = {
    isStatic: true
  }
  player1 = createSprite(280,700,20,20,player1_options);
  player1.shapeColor = "yellow";

  player2 = createSprite(280,50,20,20);
  player2.shapeColor = "blue"
  
  bulletGroup = createGroup();
  //energyGroup = createGroup();
  islandGroup = createGroup();
  score = 0;


}

function draw() {
  
  background(0);

  if(frameCount % y === 0) {
    x = x - 20;
    y = y*10;
  }
 
 
  if (player1.x > 600 || player1.x < 0) {
    player1.x = 300;
  }
  score = score + Math.round(getFrameRate()/60);
  if(player1.collide(invisibleground) && gameState === "play") {
    gameState = "end";
  }

  if(player1.collide(bulletGroup) && gameState === "notStarted") {
    gameState = "end";
  }
  if(gameState === "end") {
    center.addImage(endImage);
  }
  console.log(player1.x);

  
  player2.x = player1.x;

  
  console.log(energyCount);
  if (bg.y > 600) {
    bg.y = 500;
  }

  if(frameCount % 125 === 0){
    shootBullet();
  }

  if(bullet > length) {
    bulletGroup.destroyEach()
  }

  
  player1.velocityY=player1.velocityY+0.8;

  //if(player1.isTouching(energy)){
    //energyGroup.destroyEach();
    //energyCount = energyCount +1;
    //}
    //energySpawn();
    
    islands(); 

    if(player1.collide(islandGroup)){
      player1.velocityY=0;
      energyCount = 3;
    }
    if(gameState === "notStarted") {
    player1.collide(invisibleground)
    }

  drawSprites();
  textSize(20);
  stroke("red");
  text("Score: " + score, x,35);
}

function islands() {

  if (frameCount % 50 === 0) {
  island = createSprite(200,200,5,5);
  island.addImage(islandImage);
  island.scale = 0.25
  island.velocityY = 5;
  islandGroup.add(island);
  island.y = Math.round(random(1,10));
  island.x = Math.round(random(80,400));
  }
  }

function keyPressed() {
  
  if (keyIsDown(LEFT_ARROW)) {
    player1.velocityX = -5;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player1.velocityX = 5;
  }

  else if (keyIsDown(DOWN_ARROW)) {
    player1.velocityX = 0;
  }

  else if(keyIsDown(UP_ARROW) && player1.y >=100 && energyCount >= 1){
    player1.velocityY = -10;
    energyCount = energyCount -1;
    gameState = "play";

    }
  
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.x= player2.x-20
  bullet.y= player2.y
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityY= 7
  bulletGroup.add(bullet)
}
//function energySpawn(){

  //if (frameCount % 70 === 0) {
    //energy= createSprite(150, width/2, 50,20)
    //energy.addImage(energyImage)
    //energy.scale=0.3
    //energy.velocityY= 7
    //energyGroup.add(energy)

    //energy.y = Math.round(random(1,10));
    //energy.x = Math.round(random(50,600));
    //}
    
//}

