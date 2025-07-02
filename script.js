const paper = document.getElementById('script-paper');
const heart = document.getElementById('script-heart');
const flapTop = document.getElementById('script-flap-top');
const envelope = document.getElementById('script-envelope-container');

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
  envelope.classList.add('flipped')
  paper.classList.add('flipped')
}

function resetClasses(){
  paper.classList.remove(...states);
  envelope.classList.remove(...states);
  flapTop.classList.remove(...states);
  heart.classList.remove(...states);
}


