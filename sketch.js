var alien, alien1, alien2, fruit, fruit1, fruit2, fruit3, fruit4, gameover, gameover_image, gameover_sound, knife_sound, knife, knife_image, score, FG, AG
var gameState = "play"
var score
function preload(){
  knife_image=loadImage("knife.png")
  alien1=loadImage("alien1.png")
  alien2=loadImage("alien2.png")
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  gameover_image=loadImage("gameover.png")
  gameover_sound=loadSound("gameover.mp3")
  knife_sound=loadSound("knifeSwoosh.mp3")
}
function setup(){
  createCanvas(400,400)
  knife=createSprite(200,200,1,1)
  knife.addImage("_knife_",knife_image)
  knife.scale = 0.5
  score = 0
  FG = createGroup();
  AG = createGroup();
  score = 0
}
function draw(){
  background("lightblue")
  drawSprites()
      textSize(25);
    text("score = "+score,150,50)
  if(gameState == "play"){
    knife.x = mouseX
  knife.y = mouseY

    fruit_summon()
    alien_summon()
    if(knife.isTouching(FG)){
      FG.destroyEach();
      score = score + 1
      knife_sound.play()
    }
    if(knife.isTouching(AG)){
      gameover=createSprite(200,200,1,1)
      gameover.addImage("_gameover_",gameover_image)
      gameover_sound.play()
      gameState = "end"
    }
  }
  if(gameState == "end"){
       alien.velocityX = 0
   fruit.velocityX = 0 
    alien.lifetime = -140
    fruit.lifetime = -140
    text("press R to restart",100,150)
    if(keyWentDown("r"))
    {game_reset()}
  }
}
function fruit_summon(){
  if(frameCount % 100 == 0)
  {fruit=createSprite(-50,random(50,350),1,1)
  fruit.velocityX = 5
  var a = Math.round(random(1,4))
  fruit.lifetime = 140
  switch(a)
  {
    case 1 : fruit.addImage("_fruit_",fruit1)
      break
      case 2 : fruit.addImage("_fruit_",fruit2)
      break
      case 3 : fruit.addImage("_fruit_",fruit3)
      break
      case 4 : fruit.addImage("_fruit_",fruit4)
      break
  }
      fruit.scale = 0.2
  FG.add(fruit)}
}
function alien_summon(){
  if(frameCount % 200 == 150)
  {alien=createSprite(450,random(50,350),1,1)
  alien.velocityX = -5
  var a = Math.round(random(1,2))
  alien.lifetime = 140
  switch(a)
  {
    case 1 : alien.addImage("_alien_",alien1)
      break
      case 2 : alien.addImage("_alien_",alien2)
      break
  }
      alien.scale = 1
  AG.add(alien)}
  
}
  function game_reset(){
 FG.destroyEach();
    AG.destroyEach();
    score = 0
    gameover.destroy();
    gameState = "play"
  }