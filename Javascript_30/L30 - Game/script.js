const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let lastHole;
let score = 0;
function randomTime(min, max){
  return Math.round(Math.random() * (max - min) + min);

}

function randomHole(holes){
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if(hole === lastHole){
    //console.log('Ah nah thats the same one bud');
    return randomHole(holes);
  }
  lastHole = hole;
  //console.log(hole);
  lastHole = hole;
  return hole;
}

//   const time2 = randomTime(50, 300);  //Expert
// const time = randomTime(select.options.min, select.options.max);
// var select = document.getElementsByClassName("level");

function peep(){
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  //console.log(time, hole);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeup) peep();
  }, time);
  console.log(time);
  // console.log(select);
}

function startGame(){
  scoreBoard.textContent = 0;
  score = 0;
  timeup = false;
  peep();
  setTimeout(() => timeup = true, 10000);
}
function bonk(e){
  if(!e.isTrusted) return;
  score ++ ;
  this.classList.remove('up');
  scoreBoard.textContent = score;

}
moles.forEach(mole => mole.addEventListener('click', bonk));
