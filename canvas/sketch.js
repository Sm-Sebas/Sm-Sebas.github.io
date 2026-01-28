// // canvas/sketch.js
// let noiseOffset = 0;

// function setup() {
//   const c = createCanvas(windowWidth, windowHeight);
//   c.parent("canvas");
//   pixelDensity(1);
// }

// function draw() {
//   clear();
//   loadPixels();

//   for (let i = 0; i < pixels.length; i += 4) {
//     let n = noise(noiseOffset) * 255;
//     pixels[i] = n;
//     pixels[i + 1] = n;
//     pixels[i + 2] = n;
//     pixels[i + 3] = 12; // grano sutil
//     noiseOffset += 0.00001;
//   }

//   updatePixels();
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
