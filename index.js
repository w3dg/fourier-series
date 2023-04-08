// Fourier Series - breakdown a wave into smaller individual waves with frequencies to add up to the original wave

let time = 0;
let radius = 100;

let ys = [];

let sel;
let slider;
let currentFunction = squareWaveFourierSeries;
function setup() {
  createCanvas(1000, 700);
  slider = createSlider(1, 100, 20);

  sel = createSelect();
  sel.option("Square Wave");
  sel.option("Saw Tooth Wave");

  createP("Fourier Series Computation for a square wave and a sawtooth wave");
  createP("Select from the drop down menu to choose the wave pattern.");
  createP("Shift the slider to add/remove circles (terms) in the fourier series to be added.");
  createP("More the circles (terms) , the more accurate the output becomes.");
  a = createA("https://en.wikipedia.org/wiki/Fourier_series#Convergence", "Wikipedia", "_blank");
}

function changeSeriesAnimation() {
  clear();
  ys = [];
  let selectedOption = sel.value();
  if (selectedOption == "Saw Tooth Wave") {
    currentFunction = sawToothWaveFourierSeries;
  } else {
    currentFunction = squareWaveFourierSeries;
  }
}

function draw() {
  currentFunction();
  sel.changed(changeSeriesAnimation);
}

// For a square wave, we have the series as (4/pi)*((sin a)/1 + (sin 3a) / 3 + (sin 5a) / 5 ...)
function squareWaveFourierSeries() {
  background(0);
  translate(350, 350);

  let prevX = 0;
  let prevY = 0;

  let limit = slider.value();
  for (let i = 0; i < limit; i++) {
    let n = 2 * i + 1;

    radius = 100 * (4 / (n * PI)); // 4/n*pi magnitude
    noFill();
    stroke(150);
    ellipse(prevX, prevY, radius * 2); // circle
    let X = radius * cos(n * time); // cos n_theta
    let Y = radius * sin(n * time); // sin n_theta
    fill(255, 255, 255, 1);
    noStroke();
    prevX += X;
    prevY += Y;
    ellipse(prevX, prevY, 2);
    stroke(255);

    if (i == limit - 1) {
      ys.unshift(prevY);
      line(prevX, ys[0], 250, ys[0]);
    }
    if (ys.length > 500) {
      ys.pop();
    }
  }

  noFill();
  beginShape();
  for (let i = 0; i < ys.length; i++) {
    vertex(250 + i, ys[i]);
  }
  endShape();
  time += 0.01;
}

// For a square wave, we have the series as (2/pi)*((sin a)/-1 + (sin 2a) / 2 + (sin 3a) / -3 + (sin 4a) / 4 ...)
function sawToothWaveFourierSeries() {
  background(0);
  translate(350, 350);

  let prevX = 0;
  let prevY = 0;

  let limit = slider.value();
  for (let i = 1; i < limit; i++) {
    let n = i % 2 == 0 ? i : -i;
    radius = 150 * (2 / (n * PI)); // 2/n*pi*(-1)^n magnitude
    noFill();
    stroke(150);
    ellipse(prevX, prevY, abs(radius * 2)); // circle
    let X = radius * cos(n * time); // cos n_theta
    let Y = radius * sin(n * time); // sin n_theta
    fill(255);
    noStroke();
    prevX += X;
    prevY += Y;
    ellipse(prevX, prevY, 2);

    if (i == limit - 1) {
      ys.unshift(prevY);
      stroke(255);
      line(prevX, ys[0], 250, ys[0]);
    }
    if (ys.length > 500) {
      ys.pop();
    }
  }

  noFill();
  beginShape();
  for (let i = 0; i < ys.length; i++) {
    vertex(250 + i, ys[i]);
  }
  endShape();
  time += 0.05; // faster time step
}
