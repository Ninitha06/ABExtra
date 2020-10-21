class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    Matter.Body.setMass(this.body,this.body.mass*6);
    this.body.restitution = 0.2;
    this.body.frictionAir - 0.001;
    this.image = loadImage("sprites/bird.png");
    this.smokeImage = loadImage("sprites/smoke.png");
    this.trans1 = loadImage("sprites/trans1.png");
    this.trans2 = loadImage("sprites/trans2.png");
    this.trajectory =[];
    this.Visiblity = 255;
  }

  display() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;

    super.display();
    

    if(this.body.velocity.x > 10 && this.body.position.x > 270){
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }
   
   
    for(var i=0; i<this.trajectory.length; i++){
     ///push();
     this.Visiblity = this.Visiblity - 0.05;
    // tint(255,this.Visiblity);
    if(this.Visiblity > 150)
      image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
    else if(this.Visiblity >50 && this.Visiblity < 150)
      image(this.trans1, this.trajectory[i][0], this.trajectory[i][1]);
    else if(this.Visiblity <50 && this.Visiblity >-20)
       image(this.trans2, this.trajectory[i][0], this.trajectory[i][1]);
      //noTint();
     // pop ();
    }
    
  }
}
