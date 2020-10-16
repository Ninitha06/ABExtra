class SlingShot{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.sling3Img = loadImage('sprites/sling3.png');
        this.pointB = pointB
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }
    attach(body){
        this.sling.bodyA = body;
    }
    
    fly(){
        this.sling.bodyA = null;
    }

    display(){
        if(this.sling.bodyA){
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            push ();
            stroke(48,22,8);
            if(pointA.x < 265) {
                strokeWeight(7);
                
                line(pointA.x - 15, pointA.y, pointB.x-20, pointB.y+15);
                image(this.sling3Img,pointA.x-30, pointA.y-15,15,30);
                line(pointA.x - 15, pointA.y, pointB.x+20, pointB.y+15);
                
            }
            else if(pointA.x>280){
                strokeWeight(3);
                line(pointA.x+20, pointA.y+5, pointB.x -10, pointB.y+15);
                line(pointA.x+20, pointA.y+5, pointB.x + 30, pointB.y+15);
                image(this.sling3Img,pointA.x + 20, pointA.y-10,15,30);
            }
            pop ();
        }
    }
    
}