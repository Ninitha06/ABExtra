class Pig extends BaseClass {
  constructor(x, y){
    super(x,y,70,70);
    this.image = loadImage("sprites/enemy.png");
    this.Visiblity = 255;
  }

 display(){
   //console.log(this.body.speed);
   if(this.body.speed < 3){
    super.display();
   }
   else{
     World.remove(world, this.body);
    // push();
     this.Visiblity = this.Visiblity - 5;
     if(this.Visiblity<100 && this.Visiblity>75){
      snortSound.play();
    }
     tint(255,this.Visiblity);
     image(this.image, this.body.position.x, this.body.position.y, 70, 70);
     noTint();
    // pop();
   }
   
 }

score(){
  if(this.Visiblity<0 && this.Visiblity>-105){
    score=score+10;
  }
}

};