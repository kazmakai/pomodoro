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
let seconds = 10;
let pomodoroTime; 
let breakTime;

/*----- cached elements  -----*/


/*----- event listeners -----*/
startButton.addEventListener('click', countDown);
//input to enter tasks to an unordered list
//once checked off, they disappear

//start button to start countdown and change text to pause
//reset button to change everything to initial state. Prompt user if they're really sure they want to reset with a pop-up.

/*----- functions -----*/
init();

//visualize the timer
function init() {
    pomodoroTime = `25:00`

}

function pause() {

}

//countdown function
function countDown() {
    const timer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timer);
        } else {
            seconds--;
        }
        startButton.innerHTML = ('Pause');
        digits.innerHTML = `00:${seconds}`;
    }, 1000)
}

// //reset pomodoro
// function reset() {

// }