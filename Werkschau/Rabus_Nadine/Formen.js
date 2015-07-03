
var yoff = 5.0;        // 2nd dimension of perlin noise


function setup() {
    //createCanvas(1385, 705);
    createCanvas(innerWidth, innerHeight);
}

function draw() {
    background(10, 40, 280, 10, 150);

    fill(900);
    beginShape();

    var xoff = 0;


    for (var x = 0; x <= width; x += 10) {
        var y = map(noise(xoff, yoff), 0, 1, 200,750);

        vertex(x, y);

        xoff += 0.05;
    }

    yoff += 0.01;
    vertex(width, height);
    vertex(10, height);
    endShape(CLOSE);
}