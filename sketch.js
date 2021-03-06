const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;

var engine, world;
var box1, pig1,pig2;
var backgroundImg,platform;
var  slingshot;
var gameState = "onsling";
var mConstraint;
var score = 0;

var birds = [];

var bird1,bird2,bird3;

var selectSound, flySound, snortSound;

function preload() {
    getBackgroundImg();
    bgAlternate = loadImage("sprites/bg.png");
    sling1Img = loadImage("sprites/sling1.png");
    sling2Img = loadImage("sprites/sling2.png");

    selectSound = loadSound("sounds/select_bird.mp3");
    flySound = loadSound("sounds/bird_fly.mp3");
    snortSound = loadSound("sounds/pig_snort.mp3");
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,590,1200,20);
    platform = new Ground(150, 475, 300, 240);

    box1 = new Box(800,540,70,70);
    box2 = new Box(1000,540,70,70);
    pig1 = new Pig(900, 540);
    log1 = new Log(900,500,280, PI/2);

    box3 = new Box(800,450,70,70);
    box4 = new Box(1000,450,70,70);
    pig2 = new Pig(900, 450);

    log3 =  new Log(900,410,280, PI/2);

    box5 = new Box(900,360,70,70);
    log4 = new Log(840,360,150, PI/7);
    log5 = new Log(960,360,150, -PI/7);
   
        
    bird1 = new Bird(270,170); 

    bird2 = new Bird(225,320);

    bird3 = new Bird(170,320);
    
    birds = [bird3, bird2, bird1];

    
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(birds[birds.length-1].body,{x:270, y:170});


    let canvasmouse = Mouse.create(canvas.elt);
     canvasmouse.pixelRatio = pixelDensity();
        let options = {
        mouse: canvasmouse
        }
        mConstraint = MouseConstraint.create(engine, options);
        World.add(world, mConstraint);

        //displaying the refresh button
    refresh = createImg("sprites/refresh.png");
    refresh.position(15, 10);
        
       // console.log(mConstraint)  

    
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    else
        background(bgAlternate);

        noStroke();
        textSize(35);
        fill("white");
        textSize(20);
        text( score, width-200, 30);

        refresh.mousePressed(reset);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

   
    platform.display();

    

    image (sling1Img,270,160);
    for(var i=0;i<birds.length;i++)
        birds[i].display();
    image (sling2Img,245,160);

    slingshot.display();        

    pig1.score();
    pig2.score();

    fill("red");
    
    //instructions
    if(gameState==="launched"){
        strokeWeight(3);
        World.remove(world,mConstraint);
        if(birds.length-1>0){
              text("Press 'Space' for Next Bird", 480, 100);        
        }
        else{
            text("Click on 'Reload' to play again!",450, 100);
        }

        //when the score reaches 400 then game ends
        if(score === 400){
            gameState = "end";
        }  

    }

    //end state
    if(gameState==="end"){
        strokeWeight(3);
        World.remove(world,mConstraint);
        birds = [];
        text("Game Over!!!Click on 'Reload' to play again!",450,100);
    }
   
}

//reset function to reload the page
function reset(){
    location.reload();
}

// function mouseDragged(){
//     if(gameState !== "launched"){
//         Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
//     }
// }


function mouseReleased(){
    setTimeout(() => {
        slingshot.fly();        
      }, 150);
    gameState = "launched";
}

function keyPressed(){
        if(keyCode === 32 &&  gameState==="launched" && birds.length>0){
         //   birds[birds.length-1].trajectory = [];    
            World.remove(world,birds[birds.length-1].body);
            birds.pop();
            if(birds.length>0){
                Matter.Body.setVelocity(birds[birds.length-1].body, { x : 0, y: 0});
                Matter.Body.setPosition(birds[birds.length-1].body,{x:270,y:170});
                slingshot.attach(birds[birds.length-1].body);
                Matter.Body.setAngle(birds[birds.length-1].body,0);
                selectSound.play();
                gameState = "onsling";
                World.add(world,mConstraint);
            }
        }
}

async function getBackgroundImg()
{
    var bg;
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
   // console.log(response);
    var responseJSON = await response.json();
    var dateTime = responseJSON.datetime;
    var hour = dateTime.slice(11,13);
    //console.log(hour);

    if(hour>=6 && hour<=19){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
    //console.log(dateTime);
}
