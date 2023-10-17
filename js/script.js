/* --- Pomodoro App ---

- 1 pomodoro is 25:00
- Normal breaks are 5:00
- If there are over 3 pomodoros, after the third one, the break will be 15:00

- There's one break in between two pomodoros. That means, there won't be a break if the user only set one pomodoro.
- User needs to first select how many pomodoros they'd like, the duration of each break (5:00 or 15:00), and the tasks they'd like to work on.
- It will let them know what time it'll end
- The user can choose to end it early, or let it finish running by itself.
- Give a summary of the session whenever it ends: time spent, tasks completed, breaks taken.
- Store data in web local storage.
- "Dings" when pomodoro starts and ends.
- "Ticks" the last 3 seconds.
- Play button changes to a pause button when clicked.
- An alert that says "Are you sure you want to reset your pomodoro?" when the reset button is clicked.

Extras: 
- Create a dark mode option.
- Allow users to turn sound off.
- An about pop-up that explains how to use it. 
- Add tasks
- Add gradient or a more interesting picture to the background
- Progress bar/circle
- Timer digits change to red in the last 3 seconds.
*/




/*----- constants -----*/
const pomodoro = 3; // 10 seconds for testing
const shortBreak = 3; // 5 seconds for testing

/*----- app's state -----*/
let timer;
let remainingTime = 0;
let timerDigits = document.getElementById('timer-digits');
let isPaused = false; // track whether the timer was paused
let isPomodoro = true; // track the current phase (Pomodoro or break)

/*----- cached elements -----*/
const title = document.querySelector('h2');
const timerBackground = document.getElementById('timer-container');
const startPauseButton = document.getElementById('startpause-button');
const resetButton = document.getElementById('reset-button');

/*----- event listeners -----*/
startPauseButton.addEventListener('click', toggleCountdown);
resetButton.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  clearInterval(timer)
  startPauseButton.innerHTML = ('Start');
  isPaused = false;
  timerDigits.innerHTML = `00:03`;
  remainingTime = pomodoro;
  isPomodoro = true; // Set the initial phase to Pomodoro
}

function toggleCountdown() {
  if (isPaused === true) {
    start();
  } else {
    pause();
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
        title.innerHTML = "Pomodoro";
        timerBackground.style.backgroundColor = '#eb3c27';
        countdown(pomodoro);
      } else {
        title.innerHTML = "Break Time";
        timerBackground.style.backgroundColor = '#35953e';
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
    }
    timerDisplay(time);
  }, 1000);
}

function timerDisplay(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timerDigits.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
}
