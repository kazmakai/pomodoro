/*----- constants -----*/
let pomodoro = 10; // 10 secs for testing
let shortBreak = 5; // 5 sec for texting
// let longBreak = 10 // not working yet
let soundEffect = new Audio(); // include sound effects when rest button is clicked

/*----- app's state -----*/
let timer;
let remainingTime = 0;
let timerDigits = document.getElementById('timer-digits');
let isPaused = true; // track whether the timer was paused
let isPomodoro = true; // track the current phase (Pomodoro or break)

/*----- cached elements -----*/
const title = document.querySelector('h1');
const timerBackground = document.getElementById('timer-container');
const startPauseButton = document.getElementById('startpause-button');
const resetButton = document.getElementById('reset-button');

/*----- event listeners -----*/
startPauseButton.addEventListener('click', toggleCountdown);
resetButton.addEventListener('click', reset);

/*----- functions -----*/
reset();

// reset to default state
function reset() {
  soundEffect.src = "./sounds/click_sound.wav"
  soundEffect.play();  
  clearInterval(timer) 
  startPauseButton.innerHTML = ('Start');
  isPaused = true;
  isPomodoro = true; // Set the initial phase to Pomodoro
  title.innerHTML = "Pomodoro!";
  timerBackground.style.backgroundColor = '#eb503f';
  timerDigits.innerHTML = `00:10`;
  remainingTime = pomodoro;
}

// toggle between Pomodoro and Break modes
function toggleCountdown() {
  if (isPaused === true) {
    start();
    soundEffect.src = "./sounds/click_sound.wav"
    soundEffect.play();
  } else {
    pause();
    const ding = new Audio();
    ding.src = "./sounds/click_sound.wav"
    ding.play();
  }
}

// start timer
function start() {
  isPaused = false;
  startPauseButton.innerHTML = ('Pause');
  if (remainingTime > 0) { // If the timer is paused, count down from remaining time
    countdown(remainingTime);
  } else {
    countdown(isPomodoro ? pomodoro : shortBreak); // if the current state is Pomodoro, countdown from the Pomodoro time, else with the break time
  }
}

// pause timer
function pause() {
  isPaused = true;
  startPauseButton.innerHTML = ('Start');
  clearInterval(timer);
}

// if (pomodoro === 0) {
//   pomodoroCount ++;
// }

// if (pomodoroCount === 4) {
//   longBreak();
// }

// countdown logic
function countdown(time) {
  timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      isPomodoro = !isPomodoro; // Switch between Pomodoro and break phases
      if (isPomodoro) {
        // pomodoroCount ++;
        soundEffect.src = "./sounds/break_sound.wav"
        soundEffect.play();
        title.innerHTML = "Pomodoro!";
        timerBackground.style.backgroundColor = '#eb503f';
        timerDigits.innerHTML = `00:${pomodoro}`;
        countdown(pomodoro);
      } else {
        soundEffect.src = "./sounds/pomodoro_sound.mp3"
        soundEffect.play();
        title.innerHTML = "Short break";
        timerBackground.style.backgroundColor = '#808c45';
        timerDigits.innerHTML = `00:0${shortBreak}`;
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



// formating the display so that min and sec have 2 digits
function timerDisplay(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timerDigits.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
}
