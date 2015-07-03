var rSlider, gSlider, bSlider, twSlider;
var out = true;
var schlt= false;
var schltK = false;
var schltB = false;
var arX = [];
var arY = [];



function setup() {
    // create canvas
    var canvas = createCanvas(1200,innerHeight);
    canvas.position(250,0);

    // create sliders
    rSlider = createSlider(0, 255, 0 );
    rSlider.position(20, 20);

    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 50);

    bSlider = createSlider(0, 255, 0);
    bSlider.position(20, 80);

    umfSlider = createSlider(5,200,10);
    umfSlider.position(20,110);





    //create Button
    Outbutton = createButton('Outline');
    Outbutton.position(120, 145);
    Outbutton.mouseClicked(rand);

    RadButton = createButton("clearen");
    RadButton.position(50, 145);
    RadButton.mouseClicked(rad);

    KREISButton = createButton("KREIS");
    KREISButton.position(50, 220);
    KREISButton.mouseClicked(kreis);

    QuatButton = createButton("QUADRAT");
    QuatButton.position(50, 250);
    QuatButton.mouseClicked(quat);

    BeButton = createButton("LINIE");
    BeButton.position(50,280);
    BeButton.mouseClicked(be);

    SaveButton = createButton("SAVE!");
    SaveButton.position(50,450);
    SaveButton.mouseClicked(sav);

    TextButton = createButton("TEXT!");
    TextButton.position(120,220);
    TextButton.mouseClicked(te);


    //create drop
    canvas.drop(bild);


}

function draw() {

    cl();


}

function rand(){
    if(out == true){
        out = false;
    } else if (out == false){
        out= true;
    }
}

function rad() {
    clear();
}



function bild(file){
    if(file.type=="image"){
        var img = createImg(file.data).hide();
        image(img,0,0,width, height);
    } else{
        printIn("not an image!");
    }
}

function cl(){
    if(mouseIsPressed && mouseButton == LEFT ){
        var r = rSlider.value();
        var g = gSlider.value();
        var b = bSlider.value();
        var umf = umfSlider.value();


        if(out ==true){
            stroke();
        } else if (out == false){
            noStroke();
        }

        if(schlt == true) {
            fill(r, g, b);
            rect(mouseX, mouseY, umf, umf)
        }
        if(schltK == true){
            fill(r,g,b);
            ellipse(mouseX,mouseY,umf,umf);
        }

        if(schltB == true && mouseX >= 0){
                var preX = mouseX;
                var preY = mouseY;
                append(arY, preY);
                append(arX, preX);

                for(var i = 0 ; i <= arX.length; i++){
                stroke(r,g,b);
                strokeWeight(umf);
                line(arX[i+1],arY[i+1],arX[i+2],arY[i+2]);
                }

        }



    }

}


function kreis(){
    schltK = true;
    schlt = false;
    schltB = false;
}

function quat(){
    schlt = true;
    schltK = false;
    schltB = false;

}

function be(){
    schltB = true;
    schltK = false;
    schlt = false;
}

function sav(){
    save("canvas.jpg");
}

function te(){

    var t = document.getElementById("text");
    t.innerHTML =prompt("text?");
   // t.style.backgroundColor = "rgba(10,10,10,0.1)";


}





