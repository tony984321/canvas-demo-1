window.onload = () => {
  const canvas = document.getElementById("canvas");

  canvas.onclick = (e) => {
    const point = document.createElement('div');

    point.className = "point";
    point.style.left = e.clientX + 'px';
    point.style.top = e.clientY + 'px';

    return canvas.appendChild(point);
  };
};
