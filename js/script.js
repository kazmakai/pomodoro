/* --- Pomodoro App ---

- 1 pomodoro is 25:00
- Short breaks are 5:00
- "Dings" when pomodoro starts and ends.
- Play button changes to a pause button when clicked.

Extras: 
- Create a dark mode option.
- Allow users to turn sound off.
*/


/*----- constants -----*/
const pomodoro = 5; // 10 seconds for testing
const shortBreak = 5; // 5 seconds for testing

/*----- app's state -----*/
let timer;
let remainingTime = 0;
let timerDigits = document.getElementById('timer-digits');
let isPaused = true; // track whether the timer was paused
let isPomodoro = true; // track the current phase (Pomodoro or break)

/*----- cached elements -----*/
const title = document.querySelector('h2');
const timerBackground = document.getElementById('timer-container');
const startPauseButton = document.getElementById('startpause-button');
const resetButton = document.getElementById('reset-button');

const soundButton = document.getElementById('play-sound')

/*----- event listeners -----*/
startPauseButton.addEventListener('click', toggleCountdown);
resetButton.addEventListener('click', init);
soundButton.addEventListener('playSound');

/*----- functions -----*/
init();

function init() {
  const ding = new Audio();
  ding.src = "./sounds/click_sound.wav"
  ding.play();  
  clearInterval(timer)
  startPauseButton.innerHTML = ('Start');
  isPaused = true;
  isPomodoro = true; // Set the initial phase to Pomodoro
  title.innerHTML = "Pomodoro!";
  timerBackground.style.backgroundColor = '#eb503f';
  timerDigits.innerHTML = `00:05`;
  remainingTime = pomodoro;
}

function toggleCountdown() {
  if (isPaused === true) {
    start();
    const ding = new Audio();
    ding.src = "./sounds/click_sound.wav"
    ding.play();
  } else {
    pause();
    const ding = new Audio();
    ding.src = "./sounds/click_sound.wav"
    ding.play();
  }
}

function start() {
  isPaused = false;
  startPauseButton.innerHTML = ('Pause');
  if (remainingTime > 0) {
    // If the timer was paused, continue from the remaining time
    countdown(remainingTime);
  } else {
    countdown(isPomodoro ? pomodoro : shortBreak); // Start with Pomodoro or break based on the current phase
  }
}

function pause() {
  isPaused = true;
  startPauseButton.innerHTML = ('Start');
  clearInterval(timer);
}

function countdown(time) {
  timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      isPomodoro = !isPomodoro; // Switch between Pomodoro and break phases
      if (isPomodoro) {
        const ding = new Audio();
        ding.src = "./sounds/pomodoro_sound.mp3"
        ding.play();
        title.innerHTML = "Pomodoro!";
        timerBackground.style.backgroundColor = '#eb503f';
        countdown(pomodoro);
      } else {
        const ding = new Audio();
        ding.src = "./sounds/break_sound.wav"
        ding.play();
        title.innerHTML = "Short break";
        timerBackground.style.backgroundColor = '#808c45';
        countdown(shortBreak);
      }
    } else {
      if (isPaused === true) {
        remainingTime = time; // Update remainderTime as the timer counts down
        clearInterval(timer);
      } else {
        remainingTime = time; // Update remainderTime as the timer counts down
        time--;
      }
      timerDisplay(time);
    }
  }, 1000);
}

function timerDisplay(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timerDigits.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
}
