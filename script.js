// DOM elements
const paper = document.getElementById('script-paper');
const paperFront = document.getElementById('script-paper-front');
const paperBack = document.getElementById('script-paper-back');
const heart = document.getElementById('script-heart');
const flapTop = document.getElementById('script-flap-top');
const envelope = document.getElementById('script-envelope-container');
const decorationLx = document.getElementById('script-decoration-lx');
const decorationCx = document.getElementById('script-decoration-cx');
const decorationRx = document.getElementById('script-decoration-rx');
const wallpaper = document.getElementById('script-wallpaper');
const sceneWrapper = document.getElementById('script-scene-wrapper');

// States
const states = ['outside', 'closed', 'opened', 'zoomed', 'flipped', 'END'];
let stateIndex = 0;

// Mapping between elements and states in which they are clickable
const clickTransitions = new Map([
  [wallpaper, ['outside']],
  [heart, ['closed']],
  [paper, ['opened', 'zoomed']]
]);

// Mapping between states and their targetted elements
const transitionsByClickTarget = new Map([
  ['closed', [sceneWrapper]],
  ['opened', [sceneWrapper, flapTop, decorationLx, decorationCx, decorationRx]],
  ['zoomed', [sceneWrapper, paper, envelope]],
  ['flipped', [sceneWrapper, paper, paperFront, paperBack, envelope]]
])

// If an element gets clicked in a valid state, transition to the next state
clickTransitions.forEach((validStates, element) => {
  element.addEventListener('click', () => {
    if (validStates.includes(getCurrentState())) nextState();
  });
});

function getCurrentState() {
  return states[stateIndex];
}

// Call the transitionTo() function with correct param
function nextState() {
  if (stateIndex >= states.length - 1) return;
  stateIndex++;
  transitionTo(states[stateIndex]);
}

// Listen for the end of the flap-top opening animation and then reveal the paper
flapTop.addEventListener('animationend', (e) => {
  if (e.animationName === "open-flap-top" && getCurrentState() === 'opened') {
    paper.classList.add('opened');
  }
})

// Transition function based on <Map>transitionsByClickTarget
function transitionTo(state) {
  resetClasses();
  transitionsByClickTarget.get(state).forEach((element) => {
    element.classList.add(state);
  });

}

function resetClasses() {
  const allElements = [...new Set([...transitionsByClickTarget.values()].flat())];
  allElements.forEach(element => element.classList.remove(...states));
}