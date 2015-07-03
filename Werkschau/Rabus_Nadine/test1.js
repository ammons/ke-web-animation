var bug1;  // Declare objects
var bug2;
var bug3;
var bug4;
var bug5;
var bug6;
var bug7;
var bug8;
var bug9;
var bug10;
var bug11;
var bug12;  // Declare objects
var bug13;
var bug14;
var bug15;
var bug16;
var bug17;
var bug18;
var bug19;
var bug20;
var bug21;
var bug22;

function setup() {
    createCanvas(innerWidth, innerHeight);
    // Create object
    bug1 = new Jitter();
    bug2 = new Jitter();
    bug3 = new Jitter();
    bug4 = new Jitter();
    bug5 = new Jitter();
    bug6 = new Jitter();
    bug7 = new Jitter();
    bug8 = new Jitter();
    bug9 = new Jitter();
    bug10 = new Jitter();
    bug11 = new Jitter();
    bug12 = new Jitter();
    bug13 = new Jitter();
    bug14 = new Jitter();
    bug15 = new Jitter();
    bug16 = new Jitter();
    bug17 = new Jitter();
    bug18 = new Jitter();
    bug19 = new Jitter();
    bug20 = new Jitter();
    bug21 = new Jitter();
    bug22 = new Jitter();

}

function draw() {
    background(10, 40, 280, 10, 150);
    bug1.move();
    bug1.display();
    bug2.move();
    bug2.display();
    bug3.move();
    bug3.display();
    bug4.move();
    bug4.display();
    bug5.move();
    bug5.display();
    bug6.move();
    bug6.display();
    bug7.move();
    bug7.display();
    bug8.move();
    bug8.display();
    bug9.move();
    bug9.display();
    bug10.move();
    bug10.display();
    bug11.move();
    bug11.display();
    bug12.move();
    bug12.display();
    bug13.move();
    bug13.display();
    bug14.move();
    bug14.display();
    bug15.move();
    bug15.display();
    bug16.move();
    bug16.display();
    bug17.move();
    bug17.display();
    bug18.move();
    bug18.display();
    bug19.move();
    bug19.display();
    bug20.move();
    bug20.display();
    bug21.move();
    bug21.display();
    bug22.move();
    bug22.display();
}

// Jitter class
function Jitter() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(7, 60);
    this.speed = 5;

    this.move = function() {         this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);
    };

    this.display = function() {
        ellipse(this.x, this.y, this.diameter, this.diameter);
    };
}