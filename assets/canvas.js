window.onload = () => {
  let state = { painting: false };
  const setState = (newState) => { return state = newState };
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  canvas.onmousedown = () => {
    return setState({
      painting: true
    });
  };

  canvas.onmouseup = () => {
    return setState({
      painting: false
    });
  };

  canvas.onmousemove = (e) => {
    if(state.painting) {
      ctx.fillStyle = "red"
      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, 6, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  };
};
