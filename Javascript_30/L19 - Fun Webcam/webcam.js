const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  navigator.mediaDevices.getUserMedia({video: true, audio:false})
    .then(localMediaStream =>{
      //console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();           //Play video method
    })
    .catch(err => {
      console.error('OH NO!', err);
    });
}
function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);

      // take the pixels out
      let pixels = ctx.getImageData(0, 0, width, height);

      //Quẩy thôi
      //pixels = redEffect(pixels);
      //pixels = rgbEffect(pixels);
      pixels = greenScreen(pixels);
      ctx.globalAlPha = .4;

      //put the image back after edit
      ctx.putImageData(pixels, 0, 0);
      //console.log(pixels);
      // debugger;
      //0: is red; 1: is green; 3: is blue; 4: alpha (rgba) and so on, a huge array show the image for each pixel in rgba.
    },16);
  }

  function takePhoto(){
    //Played the sound
    snap.currentTime = 0;
    snap.play();

    //Take the data out of the canvas
    var count = 0;
    count += 1
    const  data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    const img = document.createElement('img');
    link.href = data;
    link.setAttribute('download', 'handsome or nut');
    link.innerHTML = `<img id="photo${count}" src="${data}" alt="Cool">`;
    // link.textContent = 'Download Image';
    // link.appendChild(img);
    // img.setAttribute('src', `${data}`);
    strip.insertBefore(link, strip.firsChild);
     // console.log(data);

  }

//redEffect
function redEffect(pixels){
  for (var i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 68; //red
    pixels.data[i + 1] = pixels.data[i + 0] - 10; //green
    pixels.data[i + 2] = pixels.data[i + 0] * 0.5;//blue
  }
  return pixels;
}

//rgbEffect
function rgbEffect(pixels){
  for (var i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 255] = pixels.data[i + 0]; //red
    pixels.data[i + 150] = pixels.data[i + 0]; //green
    pixels.data[i - 255] = pixels.data[i + 0];//blue
    //i-100 is a position of Image
  }
  return pixels;
}

//greenScreen
function greenScreen(pixels){
  const levels = {};
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;

  }); //First loop


//Second Loop inside First Loop
for (var i = 0; i < pixels.data.length; i+=4) {
  red = pixels.data[i + 0];
  green = pixels.data[i + 1];
  blue = pixels.data[i + 2];
  alpha = pixels.data[i + 3];
//console.log(levels);
  if (red >= levels.rmin
    && green >= levels.gmin
    && blue >= levels.bmin
    && red <= levels.rmax
    && green <= levels.gmax
    && blue <= levels.bmax) {;
      //take it out
      pixels.data[i+3] = 0;

    }
  }
  // var valueInput = document.querySelectorAll('.rgb input')
  // console.log(valueInput);
  return pixels;
}



getVideo();
video.addEventListener('canplay', paintToCanvas);


// createElement inside element have number of container
function createDiv(numberOfDivs) {
  var i = 0;
  var newElement = [];
  var mainContainer = document.getElementById('main');

  for (i; i < numberOfDivs; i++) {
    newElement[i] = document.createElement('div');
    newElement[i].style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    newElement[i].className = 'box';
    newElement[i].id = (i + 1);
//  newElement[i].textContent = 'this is div number: ' + (i + 1);
    mainContainer.appendChild(newElement[i]);
  }
};

createDiv(5);
