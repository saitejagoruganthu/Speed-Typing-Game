window.addEventListener('load', init);

//Globals

//Available Levels
const levels={
    easy: 5,
    medium: 3,
    hard:2
}

let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

//DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const selectedLevel = document.querySelector('#levelSelect');
const restartBtn = document.querySelector('#restartBtn');

const words = ['retirement', 'possession', 'illustrate', 'plagiarize', 'constraint', 'competence', 'brilliance', 'temptation', 'proportion', 'pedestrian', 'homosexual', 'diplomatic', 'definition', 'multimedia', 'vegetarian', 'conclusion', 'commitment', 'accessible', 'allocation', 'girlfriend'];

restartBtn.addEventListener('click', restart);

//Initialize
function init()
{
    //Hide the restart button
    restartBtn.style.display = 'none';

    //Load word from array
    showWord(words);

    wordInput.value = '';

    //Add change event listener
    selectedLevel.addEventListener('change',()=>{
        currentLevel = levels[selectedLevel.value];
        seconds.innerHTML = currentLevel;
        wordInput.value = '';
    });

    //Update seconds according to level
    seconds.innerHTML = currentLevel;

    //Start matching on word input
    wordInput.addEventListener('input', startMatch);

    //Call countdown every second
    setInterval(countdown,1000);

    //Check Status
    setInterval(checkStatus, 50);
}

//Pick and show random word
function showWord(words)
{
    //Generate random array index
    const randIndex = Math.floor(Math.random()*words.length);

    currentWord.innerHTML = words[randIndex];
}

//Countdown Timer
function countdown()
{
    //Make sure time is not run out
    if(time > 0)
    {
        //Decrement
        time--;
    }
    else if(time === 0)
    {
        //Game over
        isPlaying = false;
    }

    //Show Time
    timeDisplay.innerHTML = time;
}

//Check game status
function checkStatus()
{
    if(!isPlaying && time===0)
    {
        message.innerHTML = "GAME OVER!!!";
        score = -1;
        //Show the restart button
        restartBtn.style.display = '';
        //clearInterval(countdown);
    }
}

//Start match
function startMatch()
{
    if(matchWords())
    {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    if(score === -1)
    scoreDisplay.innerHTML = 0;
    else
    scoreDisplay.innerHTML = score;
}

//Match currentword to wordinput
function matchWords()
{
    if(wordInput.value === currentWord.innerHTML)
    {
        message.innerHTML = 'Correct!!!';
        return true;
    }
    else
    {
        message.innerHTML = '';
        return false;
    }
}

//Restart Function
function restart()
{
    clearInterval(countdown);
    clearInterval(checkStatus);
    isPlaying=true;
    time = currentLevel;
    message.innerHTML = "";
    score = -1;
    //Hide the restart button
    restartBtn.style.display = 'none';

    //Load word from array
    showWord(words);

    wordInput.value = ''; 

    //Update seconds according to level
    seconds.innerHTML = currentLevel;

    //Start matching on word input
    wordInput.addEventListener('input', startMatch);

    wordInput.focus();
}