import {words} from "./word.js"
window.addEventListener("load", init)


// levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}
//to cahnge level
let currentLevel = levels.medium;

// slider
var slider = document.getElementById("slider");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value
  
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  if (this.value == 1){
    currentLevel = levels.easy
    seconds.innerHTML = currentLevel;
  } else if (this.value == 3){
    currentLevel = levels.hard
    seconds.innerHTML = currentLevel;
  } else {
    currentLevel = levels.medium
    seconds.innerHTML = currentLevel;
  }
}

// Globals
let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
 
  // init game
  function init() {
    //load word from array
    showWord(words);
    //start matching on word input
    wordInput.addEventListener('input', startMatch);
    // call countdown every sec
    setInterval(countdown, 1000);  
    //check game status
    setInterval(checkStatus, 50);     
  }
  //start matching
  function startMatch() {
    if(matchWords()){
      isPlaying = true
      time = currentLevel + 1;
      showWord(words)
      wordInput.value = ""
      score++
    }
    if (score === -1){
      scoreDisplay.innerHTML = 0
    } else { 
      scoreDisplay.innerHTML = score
    }  
  }
  //match current word to input
  function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
      message.innerHTML="Correct!";
      return true;
    } else {
      message.innerHTML = ""
      return false
    }
  }

  // pick and show random word
  function showWord(words){
    // generate random index number
    const randomIndex = Math.floor(Math.random() * words.length);
    // output random word with index
    currentWord.innerHTML = words[randomIndex];
  }

  //countdown timer
  function countdown() {
    // check if time not runout
    if(time > 0) {
      time--;
    } else if (time === 0) {
      isPlaying = false
    }
    // return time
    timeDisplay.innerHTML = time;
  }

  //check status
  function checkStatus() {
    if(!isPlaying && time === 0){
      message.innerHTML = "Game Over"
      score = -1;
    }
  }



