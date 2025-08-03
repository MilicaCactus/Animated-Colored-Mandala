let mandalaLayers = [];
let rotation = 0;
let baseHue;
let bgGradient;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  noStroke();
  generateMandala();
}

function draw() {
  drawBackgroundGradient();
  translate(width / 2, height / 2);
  rotate(rotation);
  drawMandala();
  rotation += 0.1;
}

function mousePressed() {
  generateMandala(); 
}

function generateMandala() {
  mandalaLayers = [];
  baseHue = random(360);
  bgGradient = {
    from: color((baseHue + 30) % 360, 60, 20),
    to: color((baseHue + 200) % 360, 30, 90)
  };

  let numLayers = int(random(5, 12));

  for (let i = 0; i < numLayers; i++) {
    mandalaLayers.push({
      points: int(random(6, 20)),
      radius: map(i, 0, numLayers, 40, 350),
      amp: random(10, 40),
      freq: random(2, 6),
      phaseOffset: random(1000),
      weight: random(0.5, 2),
      hueOffset: i * 20
    });
  }
}

function drawMandala() {
  for (let layer of mandalaLayers) {
    strokeWeight(layer.weight);
    let c = color((baseHue + layer.hueOffset) % 360, 80, 90, 80);
    stroke(c);
    noFill();
    beginShape();
    for (let a = 0; a <= 360; a += 360 / layer.points) {
      let wave = sin(a * layer.freq + frameCount * 0.5 + layer.phaseOffset) * layer.amp;
      let r = layer.radius + wave;
      let x = r * cos(a);
      let y = r * sin(a);
      curveVertex(x, y);
    }
    endShape(CLOSE);
  }
}

function drawBackgroundGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(bgGradient.from, bgGradient.to, inter);
    stroke(c);
    line(0, y, width, y);
  }
}
