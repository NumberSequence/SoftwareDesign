function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8);

  noLoop();
  c1 = color(240, 0, 0);
  c2 = color(0, 240, 0);
}

function draw() {
  drawEQ(20, 20, 0);
}

function drawEQ(size, box, type = 0) {
  let i = 0;
  for (let x = 2.5; x <= width - 2.5; x += size + 2.5) {
    yLevel = noise(0.5 * x) * height;
    //boxes
    if (type == 0) {
      for (let y = height; y >= yLevel; y -= box) {
        console.log(y);
        let inter = map(y, 0.1 * height, height, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(0);
        fill(c);
        rect(x, y, size, 10);
      }
    }
    //lines / continuous
    else {
      for (let y = height; y >= yLevel; y -= 1) {
        console.log(y);
        let inter = map(y, 0.1 * height, height, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, y, x + size, y);
      }
    }
  }
}
