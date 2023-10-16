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



/*----- app's state (variables) -----*/
const digits = document.getElementById('time-digits');
let startButton = document.getElementById('start-button');
let resetButton = document.getElementById('reset-button');
let pomodoroTime = 5; //25 minutes
let breakTime = 5; //5 minutes

let pauseButton


/*----- cached elements  -----*/
title = document.querySelector('h2');


/*----- event listeners -----*/
startButton.addEventListener('click', countdown);
resetButton.addEventListener('click', init);
//input to enter tasks to an unordered list
//once checked off, they disappear

//start button to start countdown and change text to pause
//reset button to change everything to initial state. Prompt user if they're really sure they want to reset with a pop-up.

/*----- functions -----*/
init();

//default state
function init() {
    digits.innerHTML = `00:05`;
    clearInterval(timer);
}

function pause() {
    startButton.innerHTML = ('Pause');

}

function breakCountdown() {
    title.innerHTML = ("Break!");
    const background = document.getElementById('time-container');
    background.style.backgroundColor = '#35953e';
    let timer = setInterval(() => {
        if (breakTime <= 0) {
            clearInterval(timer);
        } else {
            breakTime--;
        }
        timeDisplay(breakTime)
    }, 1000)
}

function countdown() {
    let timer = setInterval(() => {
        if (pomodoroTime <= 0) {
            clearInterval(timer);
            breakCountdown();
        } else {
            pomodoroTime--;
        }
        //startButton.innerHTML = ('Pause');
        timeDisplay(pomodoroTime);
    }, 1000)
}


//countdown function
// function countdown() {
//     const timer = setInterval(() => {
//         if (timeSeconds <= 0) {
//             clearInterval(timer);
//         } else {
//             timeSeconds--;
//         }
//         startButton.innerHTML = ('Pause');
//         timeDisplay(timeSeconds);
//     }, 1000)
// }




//formatting the display of the digits to min and sec
function timeDisplay(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    digits.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
}

// //reset pomodoro
// function reset() {

// }