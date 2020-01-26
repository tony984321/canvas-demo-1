const COLORS = ["#000", "#5fcbe6", "#e65f75", "#ff9933", "#76a65e", "#e2d75b"];

// canvas code
let state = { painting: false };
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const isTouchDivce = 'ontouchstart' in document.documentElement;

const setState = (newState) => {
  return state = { ...state, ...newState };
};

const drawLine = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
ctx.lineWidth = 10;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

if(isTouchDivce) { //mobile and tablet
  canvas.ontouchstart = (e) => {
    const touch = e.touches[0];

    setState({
      lastGrid: [touch.clientX, touch.clientY]
    });
  }

  canvas.ontouchmove = (e) => {
    const touch = e.touches[0];
    const x1 = state.lastGrid[0];
    const y1 = state.lastGrid[1];

    drawLine(x1, y1, touch.clientX, touch.clientY);

    setState({
      lastGrid: [touch.clientX, touch.clientY]
    });
  };
}else {//desktop
  canvas.onmousedown = (e) => {
    setState({
      painting: true,
      lastGrid: [e.clientX, e.clientY]
    });
  };

  canvas.onmouseup = () => {
    setState({
      painting: false
    });
  };

  canvas.onmousemove = (e) => {
    if(state.painting) {
      const x1 = state.lastGrid[0];
      const y1 = state.lastGrid[1];

      drawLine(x1, y1, e.clientX, e.clientY);

      setState({
        lastGrid: [e.clientX, e.clientY]
      });
    }
  };
}

//color selector
const colors = document.getElementById("colors");
const selectColor = (id, color) => {
  const childs = document.getElementById("colors").childNodes;

  ctx.strokeStyle = color;
  for(let i = 0; i < childs.length; i++) {
    childs[i].style.border = "none";
  };
  document.getElementById(id).style.border = "2px solid red";
}

const colorBoxes = COLORS.map((c, index) => {
  return `<div id="color${index}" class="colorWrapper" style = "background: ${c}" onClick = "selectColor('color${index}', '${c}')"></div>`
}).join('');

colors.innerHTML = colorBoxes;
document.getElementById("color0").style.border = "2px solid red";

//clear canvas
const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

document.getElementById("clear").onclick = () => clearCanvas();
