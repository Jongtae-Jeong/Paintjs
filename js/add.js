const cavas = document.querySelector(".js-cavas");
const colors = document.getElementsByClassName("control__color");
const range = document.querySelector(".jsRange");
const mode = document.querySelector(".js-fill");
const save = document.querySelector(".js-save");
let paint=false;
let filling = false;
const ctx = cavas.getContext("2d");
ctx.fillStyle = "white";
const CANVAS_SIZE = 700;
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)


cavas.width=CANVAS_SIZE;
cavas.height=CANVAS_SIZE;
const INIT_COLOR ="#2c2c2c"; 
ctx.strokeStyle=INIT_COLOR;
ctx.fillStyle = INIT_COLOR;
ctx.lineWidth=2.5;

function paintingStop(){
    paint=false;
}

function onMouseMove(event){
    const x= event.offsetX;
    const y= event.offsetY;
    if(!(paint)){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function paintingStart(){
    paint=true;
}
function onMouseUp(event){
    paintingStop()
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;

    ctx.strokeStyle=color;
    ctx.fillStyle = color;
}

function handleRange(event){
    const size = event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(event){
    if(filling){
        filling=false;
        mode.innerText="Fill"
    }else{
        filling=true;
        mode.innerText="Paint"
    }
}
function fillCanvas(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = cavas.toDataURL();
    const link = document.createElement("a");

    link.href = image;
    link.download="image";
    link.click();
}

if(cavas){
    cavas.addEventListener("mousemove", onMouseMove);
    cavas.addEventListener("mousedown", paintingStart);
    cavas.addEventListener("mouseup", paintingStop);
    cavas.addEventListener("mouseleave", paintingStop);
    cavas.addEventListener("click", fillCanvas);
    cavas.addEventListener("contextmenu", handleCM);

}
Array.from(colors).forEach(color=>color.addEventListener("click", handleColorClick));
if(range){
    range.addEventListener("input", handleRange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){

    save.addEventListener("click", handleSaveClick);
}