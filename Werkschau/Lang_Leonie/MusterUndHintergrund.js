/**
 * Created by Leo on 11.05.2015.
 */

var xspacing = 0.05;
var w;
var theta = 0.5;
var amplitude = 55.0;
var period = 500.0;
var dx;
var yvalues;

function setup() {
    createCanvas(innerWidth, innerHeight);
    w = width+10;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w/xspacing));
    frameRate(30);
}

function draw() {
    calcWave();
    renderWave();
}

function calcWave() {
    theta += 55.05;


    var x = theta;
    for (var i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x)*amplitude;
        x+=dx;
    }
}

function renderWave() {
    noStroke();
    fill(255);

    for (var x = 0; x < yvalues.length; x++) {
        ellipse(x*xspacing, height/2+yvalues[x], 10, 10);
    }
}











