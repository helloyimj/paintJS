const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
// const CANVAS_SIZE_WIDTH = parseInt($(window).width() * 0.2) + 'px';;
const CANVAS_SIZE_WIDTH = 700;
const CANVAS_SIZE_HEIGHT = 550;


canvas.width = CANVAS_SIZE_WIDTH;
canvas.height = CANVAS_SIZE_HEIGHT;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, CANVAS_SIZE_WIDTH, CANVAS_SIZE_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// ctx.fillStyle = "green";
// ctx.fillRect(50, 20, 100, 49);
// ctx.fillStyle = "purple";
// ctx.fillRect(50, 80, 103, 49);


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        console.log("creating line in", x, y);
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
  if (filling === true){
      filling =false;
      mode.innerText= "Fill"
  } else {
    filling = true;
    mode.innerText= "Paint";
    // ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE_WIDTH, CANVAS_SIZE_HEIGHT);
    }
}

function handleCM(event){
    // console.log(event)
    // event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  console.log(link)
// link.click();

}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (range){
    range.addEventListener("input", handleRangeChange);
}
if (mode){
    mode.addEventListener("click", handleModeClick);
}
if (saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

// console.log(Array.from(colors));

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))