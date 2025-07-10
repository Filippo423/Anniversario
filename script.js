const paper = document.getElementById('script-paper');
const heart = document.getElementById('script-heart');
const flapTop = document.getElementById('script-flap-top');
const envelope = document.getElementById('script-envelope-container');
const decorationLx = document.getElementById('script-decoration-lx');
const decorationCx = document.getElementById('script-decoration-cx');
const decorationRx = document.getElementById('script-decoration-rx');

const states = ['closed', 'opened', 'zoomed', 'flipped', 'END'];
let stateIndex = 0;

heart.addEventListener('click', () => {
  switch(getCurrentState()){
    case 'closed':
      nextState();
      break;
  }
});

paper.addEventListener('click', () => {
  console.log("clicked on paper");
  switch(getCurrentState()){
    case 'opened':
      nextState();
      break;
    
    case 'zoomed':
      nextState();
      break;

    case 'flipped':
      nextState();
      break;
  }
});

function getCurrentState(){
  return states[stateIndex];
}

function nextState(){
  stateIndex++;
  const state = states[stateIndex];
  console.log(state)
  switch(state){
    case 'opened':
      transitionToOpened();
      break;
    
    case 'zoomed':
      transitionToZoomed();
      break;

    case 'flipped':
      transitionToFlipped();
      break;

  }
}

function transitionToOpened(){
  resetClasses();

  decorationLx.classList.add('opened');
  decorationCx.classList.add('opened');
  decorationRx.classList.add('opened');
  flapTop.classList.add('opened');

  flapTop.addEventListener('animationend', (e) => {
    if (e.animationName === "open-flap-top"){
      paper.classList.add('opened');
    }
  })

}

function transitionToZoomed(){
  resetClasses();

  paper.classList.add('zoomed');
  envelope.classList.add('zoomed');
}

function transitionToFlipped(){
  resetClasses();
  envelope.classList.add('flipped');
  paper.classList.add('flipped');

  paperChildren = paper.children;
  for (const child of paperChildren){
    child.classList.add('flipped');
  }
}

function returnToZoomed(){
  
}

function resetClasses(){
  decorationLx.classList.remove(...states);
  decorationCx.classList.remove(...states);
  decorationRx.classList.remove(...states);
  paper.classList.remove(...states);
  envelope.classList.remove(...states);
  flapTop.classList.remove(...states);
  heart.classList.remove(...states);
}


