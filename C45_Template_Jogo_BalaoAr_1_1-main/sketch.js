var bg,bgImg;
var baloon,baloonImg;
var bottonGround;
var topGround;
var obstacle1,obstacle2;
var obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImg,restart,restartImg;
var score = 0; 

function preload(){
    bgImg = loadImage("./assets/cityImage.png");
    baloonImg = loadAnimation("./assets/balloon1.png","./assets/balloon2.png","./assets/balloon3.png");
    obstacle1 = loadImage("./assets/obsTop1.png");
    obstacle2 = loadImage("./assets/obsTop2.png");
    gameOverImg = loadImage("./assets/fimdejogo.png")
    restartImg = loadImage("./assets/restart.png")

}

function setup(){
    createCanvas(700,560);

    //imagem de fundo
    bg = createSprite(350,280);
    bg.addImage(bgImg);
    bg.scale = 0.4;

    //criando balão
    baloon = createSprite(100,200,20,50);
    baloon.addAnimation("baloon",baloonImg);
    baloon.scale = 0.25;

    //criando as bordas superiores e inferiores
    bottonGround = createSprite(350,560,700,10);
    bottonGround.visible = true;

    topGround = createSprite(350,0,700,10);
    topGround.visible = true;

    obstaclesGroup = new Group();

    gameOver = createSprite(350,280);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    restart = createSprite(350,320);
    restart.addImage(restartImg);
    restart.scale = 0.7;

    rectMode(CENTER)

}

function draw() {
    background("black");

    if(gameState == PLAY){
        gameOver.visible = false;
        restart.visible = false;

        score = score+Math.round(frameCount/60)

        
        bg.velocityX = -1;
    
        //fazendo o fundo se repetir
        if(bg.x < 200){
            bg.x = bg.width/2-750;
        }

        //fazendo o balão de ar pular
        if(keyDown("space")){
            baloon.velocityY = -4;
        }

        //gravidade
        baloon.velocityY += 0.5;

        spawnObstacles();

        if(obstaclesGroup.isTouching(baloon)|| baloon.isTouching(bottonGround)|| baloon.isTouching(topGround)){
            gameState = END;
        }

    }
    if(gameState==END){
        gameOver.visible = true;
        restart.visible = true;       

        baloon.velocityX = 0;
        baloon.velocityY = 0;
        bg.velocityX = 0;

        obstaclesGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);

       
        
        if(mousePressedOver(restart)){
            reset()
        }

    }

    
  
   

    drawSprites();

    //cofiguração do texto
    push();
    fill(0)
    textSize(20);
    text("distancia percorrida: "+score,400,100);
    pop()
}
function spawnObstacles(){
    if(frameCount % 50 == 0){
        var obstacle = createSprite(650,50,40,50)
        obstacle.velocityX = -4;
        obstacle.scale = 0.1;
        obstacle.y = Math.round(random(50,550));

        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obstacle.addImage(obstacle1);
            break;

            case 2: obstacle.addImage(obstacle2);
            break;

            default:
                break;
        }

        obstacle.lifetime = 250;
        obstaclesGroup.add(obstacle);
    }
}

function reset(){
    gameState=PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    bg.velocityX = -1;
    baloon.y = 200;
    score = 0;
}
