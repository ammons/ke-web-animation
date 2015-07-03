
var osc;

var playsong = false;
var trigger = 0;
var songring = 0;
var songnote = 0;


function setup() {
var canvas;
var context;

var totalRings = 9;
var rings = [];

var stage, sun, sunGrad;
var planets = [];
  
var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;

var t = 0;


  // Create Canvas
  createCanvas(windowWidth, windowHeight);

  // Create Planetenklänge
  planetenklang = new planetenklang(windowWidth/2, windowHeight/2, 64, 15);

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);

}

var ring = [{
	name: 0,
	x: 0,
	y: 0,
	radius: 0,
}]

var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;


  var degree = 0;
  var px,px2 = 0;
  var py,py2 = 0;
  var speed = 0.5;
  var radian = 0;
  var radian = 0;
  var radius = 160;
  var radius2 = 200;

var data = [{
  name: 'Mercury',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 60,
  speed: 0.8,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 10,
  planetColor: '#d94d15',
  tonepitch: 48 ,
  toneduration: 400,
  displayStatic:false,
  displayStaticColor:'#b2b2b2',
  isSatelite: false,
  satelites: []
}, {
  name: 'Venus',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 90,
  speed: 0.3,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 12.1,
  planetColor: '#f08800',
  tonepitch: 52 ,
  toneduration: 400,
  displayStatic:false,
  displayStaticColor:'#b2b2b2',
  isSatelite: false,
  satelites: []
}, {
  name: 'Earth',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 120,
  speed: 0.2,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 14,
  planetColor: '#5d3600',
  tonepitch: 60,
  toneduration: 400,
  displayStatic:false,
  displayStaticColor:'#b2b2b2',
  isSatelite: false,
  satelites: []
}, {
  name: 'Mars',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 150,
  speed: 0.1,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 10,
  planetColor: '#97c11d',
  tonepitch: 64,
  toneduration: 400,
  displayStatic:false,
  displayStaticColor:'#b2b2b2',
  isSatelite: false,
  satelites: []
}, {
  name: 'Jupiter',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 180,
  speed: 0.06,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 45,
  planetColor: '#e5007e',
  tonepitch: 67,
  toneduration: 400,
  displayStatic:false,
  displayStaticColor:'#b2b2b2',
  isSatelite: false,
  satelites: []
}, {
  name: 'Saturn',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 220,
  speed: 0.03,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 40.5,
  planetColor: '#3da435',
  tonepitch: 79 ,
  toneduration: 400,
  displayStatic:false,
  displayStaticColor:'#b2b2b2',
  isSatelite: false,
  satelites: []
}, {
  name: 'Uranus',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 250,
  speed: 0.05,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 31.1,
  planetColor: '#009ee2',
  tonepitch: 80 ,
  toneduration: 400,
  displayStatic:false,
  displayStaticColor:'#b2b2b2',
  isSatelite: false,
  satelites: []
}, {
  name: 'Neptune',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 280,
  speed: 0.03,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 29.5,
  planetColor: '#283582',
  tonepitch: 85 ,
  toneduration: 400,
  displayStatic:false,
  displayStaticColor:'#b2b2b2',
  isSatelite: false,
  satelites: []
}, {
  name: 'Pluto',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 320,
  speed: 0.03,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 6,
  planetColor: '#cc1719',
  tonepitch: 90 ,
  toneduration: 400,
  displayStatic:false,
  displayStaticColor:'#b2b2b2',
  isSatelite: false,
  satelites: []
}];





function draw() {
  // put drawing code here
  var offsetX = windowWidth/2;
  var offsetY = windowHeight/2;
  
background(0);

if (playsong && millis() > trigger){
 songnote = 0;   
  for (var l = songring; l < data.length; l += 1){
      if (data[l].displayStatic) {
          songnote = data[l].tonepitch;
          songring = l+1;
          l = data.length
      }
     }
  if (songnote == 0) {
    playsong = false;
    songring = 0;
  }
    else {   
    playNote(songnote, 400);
    trigger = millis() + 400;
  }
    // Move to the next note
  // We're at the end, stop autoplaying.
  } 

 // Creating the rings
    var cursoronring = false;

    for (var l = 0; l < data.length; l += 1){
      var item = data[l];
  
      ring.name = l;
      ring.x = CANVAS_WIDTH * 0.5;
      ring.y = CANVAS_HEIGHT * 0.5;
    if (planetenklang.contains(item.radius,mouseX, mouseY)) {
    cursoronring = true;
    strokeWeight(2);
    stroke(item.planetColor);
    fill(0, 0, 0, 0);
    textSize(32);
    fill(item.planetColor);
    noStroke();
    text(item.name, 20, 50);
    fill(0, 0, 0, 0);
    stroke(item.planetColor);
    
    if ((item.name == "Earth") && (item.displayStatic)) { 
     textSize(20);
     stroke(255,255,255);
     text("Earth + Mars + Jupiter = Dur-Dreiklang", 20,80)
     } 
    if ((item.name == "Saturn") && (item.displayStatic)) { 
     textSize(20);
     stroke(255,255,255);
     text("Jupiter + Saturn = Oktave", 20,80)
     } 
    if ((item.name == "Mercury") && (item.displayStatic)) { 
     textSize(20);
     stroke(255,255,255);
     text("Merkur + Venus = Grosse Terz", 20,80)
     } 
    //playNote(item.tonepitch, item.toneduration);
    }
    else {
      if (item.displayStatic) {
         strokeWeight(2);
         stroke(255, 255, 255);
         fill(0, 0, 0, 0) 
         if (item.name == "Earth") { 
          textSize(20);
          stroke(255,255,255);
          text("Earth + Mars + Jupiter = Dur-Dreiklang", 20,80)
        }
         if (item.name == "Saturn") { 
          textSize(20);
          stroke(255,255,255);
          text("Jupiter + Saturn = Oktave", 20,80)
        }
         if (item.name == "Mercury") { 
          textSize(20);
          stroke(255,255,255);
          text("Merkur + Venus = Grosse Terz", 20,80)
        }
      } else {
        strokeWeight(0.6);
        if ((data[0].displayStatic)||(data[1].displayStatic)||(data[2].displayStatic)||(data[3].displayStatic)||(data[4].displayStatic)||(data[5].displayStatic)||(data[6].displayStatic)||(data[7].displayStatic)||(data[8].displayStatic)) {
          stroke(0, 0, 0)
        } else {
          stroke(255, 255, 255)
        }
        fill(0, 0, 0, 0);
      }
    }
    if (cursoronring == true) {
      cursor(HAND)
    }
    else {
      cursor();
/*       item.displayStatic=false; */
    }
    

    ellipse(offsetX, offsetY, item.radius*2, item.radius*2);

      }

    for(var z = 0; z < data.length; z += 1) {

        var item = data[z];

        item.degree += item.speed;
        item.radian = (item.degree/180)*Math.PI;


        px = (Math.cos(item.radian) * item.radius) + offsetX;
        py = (-Math.sin(item.radian) * item.radius) + offsetY;
		
//Planeten zeichnen
    fill(item.planetColor, 255);
		stroke(255, 255, 255,0);
    ellipse(px, py, item.planetSize, item.planetSize);

//Sonne im Mitelpunkt zeichnen zeichnen
    fill('#ffec00', 255);
    stroke(255, 255, 255,0);
    ellipse(offsetX, offsetY, 40, 40);
  
   }

}



//Sound Objekte



// A Class to describe a "planetenklang" (really a button)
var planetenklang = function(x_, y_, r_, dr_) {
  // Location and size
  var x = x_;
  var y = y_;
  var r = r_;
  var dr = dr_;

  // Is a point inside the planetenklang? (used for mouse rollover, etc.)
  this.contains = function(pr, mx, my) {
    if ((dist(mx, my, x, y) < (pr+dr/2)) && (dist(mx, my, x, y) > (pr-dr/2))) {
      return true;
    } else {
      return false;
    }
  };

  // Show the planetenklang (hardcoded colors, could be improved)
  this.display = function(mx, my) {
    if (this.contains(mx, my)) {
      fill(100);
    } else {
      fill(175);
    }
    stroke(0);
    strokeWeight(4);
    ellipse(x, y, r, r);
  };
};

function mousePressed() {
  // If the user clicks on the doorbell, play the sound!
   var clickbetweenring = true;
   for (var l = 0; l < data.length; l += 1){
      var item = data[l]; 
    if (planetenklang.contains(item.radius,mouseX, mouseY)) {
      clickbetweenring= false;
      playNote(item.tonepitch, item.toneduration);
      if ((item.name=="Earth")||(item.name=="Mars")||(item.name=="Jupiter"&&data[2].displayStatic)){
/*      playNote(item.tonepitch, item.toneduration); */
      trigger = millis();
      playsong = true;
      data[2].displayStatic = true;
      data[3].displayStatic = true;
/*      playNote(data[3].tonepitch, data[3].toneduration);*/
      data[4].displayStatic = true;
/*      playNote(data[4].tonepitch, data[4].toneduration);*/
      data[5].displayStatic = false;
      data[0].displayStatic = false;
      data[1].displayStatic = false;
      }
      else {
      data[2].displayStatic = false;
      data[3].displayStatic = false;
      data[4].displayStatic = false;
      data[5].displayStatic = false;
        if ((item.name=="Venus")||(item.name=="Mercury")){
        trigger = millis();
        playsong = true;
        data[0].displayStatic = true;
        data[1].displayStatic = true;
        }
        else {
        data[0].displayStatic = false;
        data[1].displayStatic = false;
         if ((item.name=="Saturn")||(item.name=="Jupiter")&&(data[2].displayStatic==false)){
         trigger = millis();
         playsong = true;
         data[4].displayStatic = true;
         data[5].displayStatic = true;
         }
         else {
         data[4].displayStatic = false;
         data[5].displayStatic = false;
         }
        }
      }
    }
   }
   if (clickbetweenring) {
      for (var l = 0; l < data.length; l += 1){
          var item = data[l];
          item.displayStatic= false
          }
      }
} 


// A function to play a note
function playNote(note, duration) {

  osc.freq(midiToFreq(note));
  // Fade it in
 osc.fade(0.5,0.2);
  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}


// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}