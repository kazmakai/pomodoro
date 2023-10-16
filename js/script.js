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




//*----- constants -----*/
let pomodoro = 10; //25 minutes
let shortBreak = 5; //5 minutes
const longBreak = 15; //15 minutes
let isPaused = false;
let timer;


/*----- app's state (variables) -----*/
const timerDigits = document.getElementById('timer-digits');
let startPauseButton = document.getElementById('startpause-button');
let resetButton = document.getElementById('reset-button');

/*----- cached elements  -----*/
title = document.querySelector('h2');


/*----- event listeners -----*/
startPauseButton.addEventListener('click', startPauseTimer);//dont call countdown. call a function with an if statement that either calls countdown or pause
resetButton.addEventListener('click', init);
//input to enter tasks to an unordered list
//once checked off, they disappear

//start button to start countdown and change text to pause
//reset button to change everything to initial state. Prompt user if they're really sure they want to reset with a pop-up.

/*----- functions -----*/
init();

//default state
function init() {
    timerDigits.innerHTML = `00:10`;

}

function startPauseTimer() {
    if (startPauseButton.innerHTML === ('Start')) {
        pomodoroCountdown();
    } else {
        pause();
    }
}


function breakCountdown() {
    title.innerHTML = ("Time for a break!");
    const background = document.getElementById('timer-container');
    background.style.backgroundColor = '#35953e';
    let timer = setInterval(() => {
        if (shortBreak <= 0) {
            clearInterval(timer);
        } else {
            shortBreak--;
        }
        timeDisplay(shortBreak)
    }, 1000)
}


function pomodoroCountdown() {
    startPauseButton.innerHTML = ('Pause')
    isPaused = false;
    let timer = setInterval(() => {
        if (pomodoro <= 0) {
            clearInterval(timer);
            breakCountdown();
        } else {
            if (isPaused === true) {
            } else {
                pomodoro--;
            }
        }
        timeDisplay(pomodoro);
    }, 1000)
}

function pause() {
    startPauseButton.innerHTML = ('Start')
    isPaused = true;
}


//formatting the display of the digits to min and sec
function timeDisplay(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timerDigits.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
}

// //reset pomodoro
// function reset()
