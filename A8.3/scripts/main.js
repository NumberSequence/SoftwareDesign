console.log("hello, rain");

function setup() {
  console.log("setup, rain");
  createCanvas(windowWidth * 0.8, windowHeight * 0.8);

  noLoop();
  windBlow = random(-1, 1);
  rainDensity = Math.round(random(1, 12));
  console.log(rainDensity);
  c1 = color(abs(200 * windBlow), abs(200 * windBlow), 240);
  background(c1);
  c2 = color(5, 5, 240);
  c3 = color(15 * rainDensity, 15 * rainDensity, 15 * rainDensity);
}

function draw() {
  console.log("draw, rain");
  fill(220, 220, 220);
  rect(0, height * 0.75, width, height * 0.75);

  drawClouds(0, 0, 0);
  drawWater(height, 0.75 * height);
  drawRain(0, height * 0.8, width, /*height * .1*/ 0, windBlow);
  drawGrass(0, 0.85 * height, width, 0.15 * height);
}

function drawClouds(color, speed, density) {
  for (let i = 0; i <= 0.2 * height; i++) {
    console.log("cloud");
    let inter = map(i, 0.2 * height, 0, 0, 1);
    let c = lerpColor(c1, c3, inter);
    stroke(c);
    line(0, i, width, i);
    console.log("cloud2");
  }
}

function drawWater(bottom, fade) {
  console.log(bottom);
  for (let i = fade; i <= bottom; i++) {
    let inter = map(i, fade, bottom, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function drawRain(left, ground, width, sky, wind) {
  for (let x = left; x < left + width; x += rainDensity) {
    const dropLength =
      min(random(0, height), random(0, height), random(0, height)) / 10;
    const dropStart = random(sky, ground);
    stroke(255, 255, 255);
    noFill();
    strokeWeight(0.5);
    line(x, dropStart, dropLength * wind + x, dropStart + dropLength);

    if (dropStart + dropLength > ground) {
      ellipse(
        dropLength * wind + x,
        dropStart + dropLength,
        1.5 * sqrt(12 - rainDensity) * (dropLength / 10),
        min(
          1.5 * sqrt(12 - rainDensity),
          1.5 * sqrt(12 - rainDensity) * (dropLength / 10)
        )
      );
      ellipse(
        dropLength * wind + x,
        dropStart + dropLength,
        2 * sqrt(12 - rainDensity) * (dropLength / 10),
        min(
          2 * sqrt(12 - rainDensity),
          2 * sqrt(12 - rainDensity) * (dropLength / 10)
        )
      );
      ellipse(
        dropLength * wind + x,
        dropStart + dropLength,
        5 * sqrt(12 - rainDensity) * (dropLength / 10),
        min(
          5 * sqrt(12 - rainDensity),
          5 * sqrt(12 - rainDensity) * (dropLength / 10)
        )
      );
    }
  }
}

function drawGrass(left, top, width, height) {
  console.log("grass");

  for (let x = left; x < left + width; x++) {
    const y = top + height;
    const bladeHeight = min(
      random(0, height),
      random(0, height),
      random(0, height)
    );
    console.log("grass2");
    const bladeHeightShade = bladeHeight / height;
    stroke(0, bladeHeightShade * 255, 0);
    line(x, y, x + random(0.1, 0.4) * windBlow, y - bladeHeight);
  }
  console.log("grass3");
}
