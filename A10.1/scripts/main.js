var s = function (p) {
  p.setup = function () {
    canvas1 = p.createCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
    canvas1.parent("canvases");

    p.timeOff = 0;

    p.windBlow = p.random(-1, 1);
    p.rainDensity = Math.round(p.random(1, 12));
    p.waterLine = 0.5 * p.height;

    p.c1 = p.color(p.abs(200 * p.windBlow), p.abs(200 * p.windBlow), 240);
    p.background(p.c1);
    p.c2 = p.color(5, 5, 240);
    p.c3 = p.color(15 * p.rainDensity, 15 * p.rainDensity, 15 * p.rainDensity);
    p.buildingDensity = 0.95;

    p.noLoop();
  };

  function drawWater(bottom, fade) {
    for (let i = fade; i <= bottom; i++) {
      let inter = p.map(i, fade, bottom, 0, 1);
      let c = p.lerpColor(p.c1, p.c2, inter);
      p.stroke(c);
      p.line(0, i, p.width, i);
    }
  }

  function drawRain(left, ground, width, sky, wind) {
    for (let x = left; x < left + width; x += p.rainDensity) {
      const dropLength =
        p.min(
          p.random(0, p.height),
          p.random(0, p.height),
          p.random(0, p.height)
        ) / 10;
      const dropStart = p.random(sky, ground);
      p.stroke(255, 255, 255);
      p.noFill();
      p.strokeWeight(0.5);
      p.line(x, dropStart, dropLength * wind + x, dropStart + dropLength);

      if (dropStart + dropLength > ground) {
        p.ellipse(
          dropLength * wind + x,
          dropStart + dropLength,
          1.5 * p.sqrt(12 - p.rainDensity) * (dropLength / 10),
          p.min(
            1.5 * p.sqrt(12 - p.rainDensity),
            1.5 * p.sqrt(12 - p.rainDensity) * (dropLength / 10)
          )
        );
        p.ellipse(
          dropLength * wind + x,
          dropStart + dropLength,
          2 * p.sqrt(12 - p.rainDensity) * (dropLength / 10),
          p.min(
            2 * p.sqrt(12 - p.rainDensity),
            2 * p.sqrt(12 - p.rainDensity) * (dropLength / 10)
          )
        );
        p.ellipse(
          dropLength * wind + x,
          dropStart + dropLength,
          5 * p.sqrt(12 - p.rainDensity) * (dropLength / 10),
          p.min(
            5 * p.sqrt(12 - p.rainDensity),
            5 * p.sqrt(12 - p.rainDensity) * (dropLength / 10)
          )
        );
      }
    }
  }

  function drawGrass(left, top, width, height) {
    for (let x = left; x < left + width; x++) {
      const y = top + height;
      const bladeHeight = p.min(
        p.random(0, height),
        p.random(0, height),
        p.random(0, height)
      );

      const bladeHeightShade = bladeHeight / height;
      p.stroke(0, bladeHeightShade * 255, 0);
      p.line(x, y, x + p.random(0.1, 0.4) * p.windBlow, y - bladeHeight);
    }
  }

  p.draw = function () {
    p.fill(220, 220, 220);
    p.rect(0, p.waterLine, p.width, p.waterLine);

    drawWater(p.height, p.waterLine);
    drawRain(0, p.height * 0.8, p.width, 0, p.windBlow);
    drawGrass(0, 0.85 * p.height, p.width, 0.15 * p.height);
  };
};
var myp1 = new p5(s, "c1");

//base sketch end
//================================================================================
//================================================================================
//================================================================================
//================================================================================
//loop sketch start

var t = function (p) {
  p.setup = function () {
    p.cloudOffset = -0.8 * p.windowHeight;
    p.timeOff = 0;
    canvas2 = p.createCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
    canvas2.parent("canvases");

    canvas2.style(
      "z-index: 20; position:absolute; top:0; text-align: center;  left: 50%; transform: translate(-50%); margin: 0 auto;"
    );

    p.waterLine = 0.5 * p.height;
    p.buildingDensity = 0.95;

    let paramDiv = p.createDiv();
    paramDiv
      .id("params")
      .style(
        "display: flex; position:absolute; left: 50%; transform: translate(-50%); margin: 0 auto;"
      );

    p.createDiv("Resolution ").id("clarityDivID").parent("params");
    p.clarity = p.createSlider(50, 300, 150);
    p.clarity.id("ResolutionSliderID").parent("clarityDivID");

    p.createDiv("Frame Rate ").id("FPSDivID").parent("params");
    p.refreshRate = p.createSlider(2, 30, 20);
    p.refreshRate.id("FPSSliderID").parent("FPSDivID");

    p.createDiv("Sky Speed ").id("SpeedDivID").parent("params");
    p.cloudSpeed = p.createSlider(0, 8, 4);
    p.cloudSpeed.id("speedSliderID").parent("SpeedDivID");

    p.createDiv("Fog / Water Reflectivity ")
      .id("ReflectionID")
      .parent("params");
    p.reflectivity = p.createSlider(0, 200, 100);
    p.reflectivity.id("reflectionSliderID").parent("ReflectionID");

    p.createDiv("Mood (blended with sky) ").id("Mood").parent("params");
    p.cloudColor = p.createColorPicker("#FFFFFF");
    p.cloudColor.id("colorPickerID").parent("Mood");

    p.loop();
  };

  const array = Array(50)
    .fill()
    .map(() => p.random());

  function drawDramatic(
    dramaticDepth,
    cloudSpeed,
    reflectivity,
    FPS,
    resolution
  ) {
    let rowWidth = p.floor(p.width / resolution.value());

    let rows = (dramaticDepth * p.height) / rowWidth;
    let cols = p.width / rowWidth;
    let increment = 0.01;
    let yOff = 0;

    p.frameRate(FPS.value());
    for (let y = 0; y * rowWidth < dramaticDepth * p.height; y++) {
      p.noStroke();

      let xOff = 0;
      for (let x = 0; x < cols; x++) {
        let noiseVal = p.noise(xOff, yOff, p.timeOff);

        p.fill(
          noiseVal * p.red(p.cloudColor.color()),
          noiseVal * p.blue(p.cloudColor.color()),
          noiseVal * p.green(p.cloudColor.color()),

          255 -
            255 * (2 ** ((1 + y * rowWidth) / (dramaticDepth * p.height)) - 1)
        );

        p.rect(x * rowWidth, y * rowWidth, rowWidth);
        p.fill(
          noiseVal * p.red(p.cloudColor.color()),
          noiseVal * p.blue(p.cloudColor.color()),
          noiseVal * p.green(p.cloudColor.color()),

          (reflectivity.value() / 100) *
            (100 -
              100 *
                (2 ** ((1 + y * rowWidth) / (dramaticDepth * p.height)) - 1))
        );
        p.rect(x * rowWidth, p.height - y * rowWidth, rowWidth);
        xOff += increment;
      }
      yOff += increment;
    }

    p.timeOff += 0.01 * cloudSpeed.value();
  }

  function drawSkyline(freq, amp, reflectivity, FPS) {
    p.stroke(40);
    p.frameRate(FPS.value());
    p.fill(211, 211, 211);

    let i = 0;
    for (let x = 0.25 * p.width; x < p.width; x += 30) {
      let n;

      n = p.noise(x * 60 * amp);

      if (array[i] > 1 - p.buildingDensity) {
        p.fill(211, 211, 211);
        p.stroke(0);
        p.rect(x, p.waterLine - 150 * n, 30, 150 * n);

        p.stroke(150, 150, 150, (150 * reflectivity.value()) / 100);
        p.fill(211, 211, 211, 50 * (reflectivity.value() / 100));
        p.rect(x, p.waterLine + 30 * n, 30, -(30 * n));
      }
      i++;
    }
  }

  p.draw = function () {
    p.clear();
    drawDramatic(0.5, p.cloudSpeed, p.reflectivity, p.refreshRate, p.clarity);
    drawSkyline(0.5, 1, p.reflectivity, p.refreshRate);
  };
};
var myp2 = new p5(t, "c2");
