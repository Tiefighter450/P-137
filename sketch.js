video = "";
inputTextbox = "";
cocossdStatus = "notActive";
objects = [];
i = 0;
percent = 0;
function preload() {
  
}

function setup() {
  canvas = createCanvas(497, 398);
  video = createCapture(VIDEO);
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById('status').innerHTML = "Status: Detecting Objects";
  inputTextbox = document.getElementById('input').value;
}

function modelLoaded() {
  console.log("Model Loaded!");
  cocossdStatus = "Active";
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  canvas.center();
  image(video, 0, 0, 497, 398);
  if (cocossdStatus == "Active") {
    for (i = 0; i < objects.length; i++) {
      stroke('red');
      fill('red');
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if (objects[i].label == inputTextbox) {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById('objStatus').innerHTML = inputTextbox + " found";
        var synth = window.speechSynthesis;
        speakData = document.getElementById("input").value;
        var utterThis = new SpeechSynthesisUtterance(speakData);
        synth.speak(utterThis);
        console.log("Synth = " + synth + " || utterThis = " + utterThis);
      } else {
        document.getElementById('objStatus').innerHTML = inputTextbox + " not found";
      }
    }
  }
}
