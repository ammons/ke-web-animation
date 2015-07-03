// SETUP
var W = window.innerHeight,
    H = window.innerWidth;

var scene     = new THREE.Scene(),
    camera    = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1, 100000),
    controls  = new THREE.TrackballControls( camera ),
    renderer  = new THREE.WebGLRenderer({antialias: true});


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
 
var selectObject;
var selected = false;
var object1;
var object2;
var object3;

var groupalt;

var selectedO1;
var selectedO2
var selectedO3;

var container, stats;


      var group, text;

      var targetRotation = 0;
      var targetRotationOnMouseDown = 0;

var cindex = 0;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x121218, 1)
document.body.appendChild(renderer.domElement);


// ASTRONOMY
var G = 6.67384e-11; // m3 kg-1 s-2
var SEC_PER_STEP = 8;
var STEPS_PER_FRAME = 10000;
var METERS_PER_UNIT = 1000000000;

// PLANETS
var p = [
  {
    n:'sun', sz:0.6955, mass:1.988435e30,	o:0.00000,
   	d:0.0000,	speed:0, oe:0.000, color:'#f3fc47'
  },
  {
    n:'mercury', sz:0.0024397, mass:3.30104e23, o:0.00024,
    d:50.320, speed:4.74e-5, oe:0.206, color:'#B58612'
  },
  {
    n:'venus', sz:0.0060519, mass:4.86732e24, o:0.00062,
    d:108.80, speed:3.5e-5, oe:0.007, color:'#B54400'
  },
  {
    n:'earth', sz:0.0063674447, mass:5.9721986e24, o:0.00100,
    d:150.00, speed:2.963e-5, oe:0.017, color:'#109B69'
  },
  {
    n:'mars', sz:0.003386, mass:6.41693e23, o:0.00188,
    d:227.940, speed:0.0000228175, oe:0.093, color:'#EB413B'  
  },
  {
    n:'jupiter', sz:0.069173, mass:1.89813e27, o:0.01186,
    d:778.330, speed:0.0000129824, oe:0.048, color:'#B5124F'  
  },
  {
    n:'saturn', sz:0.057316, mass:5.68319e26, o:0.02946,
    d:1429.40, speed:9.280e-6, oe:0.054, color:'#B5FF4F'
  },
  {
    n:'uranus', sz:0.15266, mass:8.68103e25, o:0.08401,
    d:2870.99, speed:6.509e-6, oe:0.047, color:'#0DFFEC'
  },
  {
    n:'neptune', sz:0.224553, mass:1.0241e26, o:0.16480,
    d:4504.00, speed:5.449e-6, oe:0.009, color:'#0CC9F5'
  },
  {
    n:'pluto', sz:0.1184, mass:1.0241e26, o:0.16480,
    d:6504.00, speed:5.449e-6, oe:0.009, color:'#9B1C00'
  }
]




// ADD LIGHT
hemiLight = new THREE.HemisphereLight(0xFFFFFF,0xFFFFFF, 1); 
scene.add(hemiLight);

var light = new THREE.PointLight( 0xffffff, 0.25, 10000 );
light.position.set(0,0,0);
scene.add(light);

camera.position.x = 0;
camera.position.y = -200;
camera.position.z = 200;

var listener = new THREE.AudioListener();
        camera.add( listener );



// Extra lighting.
var light = new THREE.PointLight( 0xffffff, 0.5, 100 );
light.position.set(0, 0, 50);
scene.add( light );


//TEXT
// container
//container = document.createElement( 'div' );
        //document.body.appendChild( container );

        //var info = document.createElement( 'div' );
        //info.style.position = 'absolute';
        //info.style.top = '10px';
        //info.style.width = '100%';
        //info.style.textAlign = 'center';
        //info.innerHTML = 'Simple Dynamic 3D Text Example by <a href="http://www.lab4games.net/zz85/blog">zz85</a><br>Drag to spin the text';
        //container.appendChild( info );

       // camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
        //camera.position.set( 0, 150, 500 );

       // scene = new THREE.Scene();

        // Get text from hash

        //var theText = "Merkur und Venus ergebn eine Quinte";

        //var hash = document.location.hash.substr( 1 );

        //if ( hash.length !== 0 ) {

         // theText = hash;

        //}

        //var text3d = new THREE.TextGeometry( theText, {

         // size: 18,
         // height: 1,
          //curveSegments: 2,
         // font: "helvetiker"

        //});

        //text3d.computeBoundingBox();
        //var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

        //var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } );
        //text = new THREE.Mesh( text3d, textMaterial );

        //text.position.x = centerOffset;
        //text.position.y = 50;
        //text.position.z = 0;

       /* text.rotation.x = Math.PI * 0.5;
        text.rotation.y = Math.PI * 0;

        text.name = 'text1';
        group = new THREE.Group();
        group.name = 'text1';*/
        

        


//SOUND
  function Sound(name) {
    this.name = name;
    this.audio = document.createElement('audio');
    var source = document.createElement('source');
    source.src = '02_Project_threeJS/sounds/' + name + '.mp3';
    this.audio.appendChild(source);
  }
  
  Sound.prototype.play = function() {
    this.audio.play();
  };
    var Sounds = {
    all: [
      'grterz','cdur','oktave'
    ]
  };
    Sound.prototype.repeat = function() {
    this.audio.loop = true;
    this.audio.play();
  };

  Sound.prototype.stop = function() {
    this.audio.repeat = false;
    this.audio.currentTime = 0;
    this.audio.pause();
  };

  Sounds.all.forEach(function(sound) {
    Sounds[sound] = new Sound(sound);
  });


 

 // setTimeout(function(){Sounds.soundtest.stop();}, 8000);

//var esound1 = new sound('soundtest');
//sound('soundtest');
//sound.prototype.play();
// STARS
for(var i = 0; i < 500; i++){
  var sg = new THREE.SphereGeometry(Math.random()*5+5,6,6);
  var sm = new THREE.MeshLambertMaterial({ color: '#ffffff' });
  var smesh = new THREE.Mesh(sg,sm);
  smesh.position.x = Math.random()*20000 - 10000;
  smesh.position.y = Math.random()*20000 - 10000;
  smesh.position.z = Math.random()*20000 - 10000;
  scene.add(smesh);
}

// ADD PLANETS
$.each(p, function(i,el){
  var rnd = Math.random();
  // x, y, x radius, y radius, angle start, angle stop, clockwise
  var curve = new THREE.EllipseCurve(0,0,el.d,el.d,0,2*Math.PI,false);

  var path = new THREE.Path( curve.getPoints(128) );
  var geometry = path.createPointsGeometry(128);
  var material = new THREE.LineBasicMaterial( { color : 0x343438,linewidth: 3 } );

  // Create the final Object3d to add to the scene
  var ellipse = new THREE.Line( geometry, material );
  ellipse.name = 'curve-' + cindex;
  cindex = cindex+1;
  

  scene.add(ellipse);




  el.n !== 'sun'? el.g = new THREE.SphereGeometry(el.sz*350, 64, 64) : el.g = new THREE.SphereGeometry(el.sz*20, 64, 64)
  el.m = new THREE.MeshLambertMaterial({ color: el.color });
  el.mesh = new THREE.Mesh(el.g,el.m);
  el.mesh.rotation.x = Math.PI/2;
  el.mesh.rotation.y = 0;
  
  el.mesh.name = 'planet';

  scene.add(el.mesh);
  if(el.n == 'sun') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/sun.mp3' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  if(el.n == 'mercury') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/mercury.mp3' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  if(el.n == 'venus') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/venus.wav' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  if(el.n == 'earth') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/earth.mp3' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  if(el.n == 'mars') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/mars.mp3' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  if(el.n == 'jupiter') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/jupiter.mp3' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  if(el.n == 'saturn') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/saturn.mp3' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  if(el.n == 'uranus') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/uranus.mp3' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  if(el.n == 'neptune') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/neptune.mp3' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  if(el.n == 'pluto') {
    var sound1 = new THREE.Audio( listener );
    sound1.load( '02_Project_threeJS/sounds/pluto.mp3' );
    sound1.setRefDistance( 50 );
    sound1.autoplay = true;
    el.mesh.add( sound1 );
  }
  

  
});

function onMouseMove( event ) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;   

}
function render(){


  requestAnimationFrame(render);
  
  $.each(p, function(i,el){
    el.mesh.position.x = Math.cos(el.o) * el.d;
    el.mesh.position.y = Math.sin(el.o) * el.d;
//     el.mesh.rotation.y -= el.r;

    el.o -= el.speed * 50;
    el.o -= el.speed * 50;
  });
  // update the picking ray with the camera and mouse position  
  raycaster.setFromCamera( mouse, camera ); 

  // calculate objects intersecting the picking ray
var intersects = raycaster.intersectObjects(scene.children);
  if (selected == true){
    selectObject.material.color.set(0x343438);
    if (selectedO1 == true){
      object1.material.color.set(0x343438);
      selectedO1 = false;
    }
    if (selectedO2 == true){
      object2.material.color.set(0x343438);
      selectedO2 = false;
    }
    if (selectedO3 == true){
      object3.material.color.set(0x343438);
      selectedO3 = false;
    }
    
    selected = false;
  }

  
  for ( var i = 0; i < intersects.length; i++ ) {


  if (intersects[ i ].object.name.match('curve'))
   {
    intersects[ i ].object.material.color.set( 0xffff00 );
    selectObject = intersects[ i ].object;
    //console.log(selectObject);
    selected = true;
     if((selectObject.name == 'curve-1') || (selectObject.name == 'curve-2')) {
      object1 = scene.getObjectByName( "curve-1", true );
      object1.material.color.set(0xffffff);
      object2 = scene.getObjectByName( "curve-2", true );
      object2.material.color.set(0xffffff);
      selectedO1 = true;
      selectedO2 = true;
      Sounds.grterz.play();
      Sounds.cdur.stop();
      Sounds.oktave.stop();
      /*group.add( text );
      scene.add( group );*/


    }
     if((selectObject.name == 'curve-3') || (selectObject.name == 'curve-4') || (selectObject.name == 'curve-5')) {
      object1 = scene.getObjectByName( "curve-3", true );
      object1.material.color.set(0xffffff);
      object2 = scene.getObjectByName( "curve-4", true );
      object2.material.color.set(0xffffff);
      object3 = scene.getObjectByName( "curve-5", true );
      object3.material.color.set(0xffffff);
      selectedO1 = true;
      selectedO2 = true;
      selectedO3 = true;
      Sounds.cdur.play();
      Sounds.grterz.stop();
      Sounds.oktave.stop();


       /*groupalt = scene.getObjectByName( "text1", true );
       console.log (groupalt);
     groupalt.text.position.x = 100;
    groupalt.text.position.y = 100;*/
    

    }
     if((selectObject.name == 'curve-6') ) {
      object1 = scene.getObjectByName( "curve-6", true );
      object1.material.color.set(0xffffff);
      object2 = scene.getObjectByName( "curve-5", true );
      object2.material.color.set(0xffffff);
      selectedO1 = true;
      selectedO2 = true;
       Sounds.cdur.stop();
      Sounds.grterz.stop();
      Sounds.oktave.play();

    }
  }
    
    
  
  };

  controls.update();
  renderer.render(scene,camera);
}

render();



window.addEventListener( 'mousemove', onMouseMove, false );

window.requestAnimationFrame(render);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

$(window).on('resize', resize);