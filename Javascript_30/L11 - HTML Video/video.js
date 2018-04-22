// Get Our Elements
const player = document.querySelector('.player');
const fullscreen = document.querySelector('.fullscreen');
const playerButton= document.querySelector('.player__button');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
function togglePlay(){
  const method = video.paused ? 'play' : 'pause';
  video[method]();

    //
    // if(video.player){
    //   video.play();
    // }else {
    //   video.pause();
    // }
}
function updateButton(){
  const icon = this.paused ? '►' : '❚❚';
  console.log(icon);
  toggle.textContent = icon;
  console.log('Update the button');
}

function skip(){
  console.log('Skipping');
  console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip)
}
function handleRanfeUpdate(){
  video[this.name] = this.value;
  console.log(this.value);
  console.log(this.name);

}
function handleProgress(){
  const percent = (video.currentTime/video.duration)*100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime
//  console.log(e);

}

function makeBig() {
   var myVideo = document.getElementsByTagName('video')[0];
   myVideo.height = myVideo.videoHeight * 2;
   myVideo.width = myVideo.videoWidth * 2;  //Take out "2" to turn normal

}

function toggleFullScreen(){
	if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
}

function exitFullscreen(){
    if (video.exitFullscreen) {
        video.exitFullscreen();
    } else if (video.webkitExitFullscreen) {
        video.webkitExitFullscreen();
    } else if (video.mozCancelFullScreen) {
        video.mozCancelFullScreen();
    } else if (video.msExitFullscreen) {
        video.msExitFullscreen();
    }
}

// $('.viewer').hover(function toggleControls() {
//     if ($('.player__controls').hasClass("controls")) {
//         $('.player__controls').removeClass("controls")
//     } else {
//         $('.player__controls').addClass("controls")
//     }
// })



// Hook up the event listeners

  fullscreen.addEventListener('click', toggleFullScreen, false);
  video.addEventListener('mouseover', exitFullscreen, true);

  video.addEventListener('click',togglePlay);
  video.addEventListener('play',updateButton);
  video.addEventListener('pause',updateButton);
  video.addEventListener('timeupdate',handleProgress);

//order event call PROGRESS beside pause play
  toggle.addEventListener('click',togglePlay);
  skipButtons.forEach(button => button.addEventListener('click', skip));
  ranges.forEach(range => range.addEventListener('change', handleRanfeUpdate));
  ranges.forEach(range => range.addEventListener('mousemove', handleRanfeUpdate));
  progress.addEventListener('click',scrub);  //ondrag cóc được

  let mousedown = false;
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
