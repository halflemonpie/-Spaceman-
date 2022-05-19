// Spaceman
// to do:
// prompt section with timer
// grammar check

// getting a random word from the word list
// use the array below if the API is not working
const wordListEasy = [
  "apple",
  "banana",
  "orange",
  "blue",
  "green",
  "pineapple",
  "spaceman",
];

// set up variable that I need to change
// variable behind the sense
let wordChoice = "";
let wordChoiceArr;
let inputArray = [];
let remain = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let used = [];
const humanArray = [
  "😀",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "🥲",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😋",
  "😛",
  "🤪",
  "😎",
  "🤩",
  "🥺",
  "🤯",
  "🥵",
  "😡",
  "😱",
  "🥶",
  "😰",
  "🤡",
];
let emojiArray = [];
let heartAnimCount = 0;
let moveDistance = 0;
let trialCount = 0;
let humanEnemy;

// DOM
const mainDisplay = document.querySelector("#spaceman");
const startPrompt = document.querySelector("#start-prompt");
const humanShownOnScreen = document.querySelector("#humans");
const spacemanChar = document.querySelector("#spaceman-char");
const heart = document.querySelector("#heart");
const promptP = document.querySelector("#prompt-p");
const wordDisplay = document.querySelector("#word");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset");
const remainLetters = document.querySelector("#remain-array");
const usedLetters = document.querySelector("#used-array");
const gameSection = document.querySelector("#game-section");
const input = document.querySelector("#input-field");
const fireButton = document.querySelector("#fire-button");

// reset function for start button and reset button
const startNReset = () => {
  //get data from api
  axios({
    method: "get",
    url: "https://random-word-api.herokuapp.com/word",
  })
    .then((response) => {
      // show heart and spaceman char
      heart.removeAttribute("hidden");
      spacemanChar.innerText = "👽";

      // hide stories and show game board
      startPrompt.setAttribute("hidden", "");
      gameSection.removeAttribute("hidden");

      // set moving distance to initial, empty the emoji array
      moveDistance = 0;
      humanShownOnScreen.style.transform = `translateY(${moveDistance}px)`;
      emojiArray = [];

      // hide the rest and start button, show the input field and the fire button, change the prompt
      resetButton.setAttribute("hidden", "");
      startButton.setAttribute("hidden", "");
      input.removeAttribute("hidden");
      fireButton.removeAttribute("hidden");
      promptP.innerText = "Guess the letter or the word:";

      // get a new random word from the array only use if API is not working
      // wordChoice = wordListEasy[Math.floor(Math.random()*wordListEasy.length)];

      // set the random word and split it into an array, set the trial count
      wordChoice = response.data[0];
      wordChoiceArr = wordChoice.split("");
      trialCount = wordChoice.length * 2;
      console.log(`the word is ${wordChoice}`);

      // reset the array of the humans and empty them on the screen first
      humanEnemy = [];
      humanShownOnScreen.innerHTML = "";

      // reset the input array and the word word display section
      inputArray = [];
      wordDisplay.innerHTML = "";

      // perform actions base on the
      wordChoiceArr.forEach(() => {
        // 1. push space filler to the input array
        // 2. create h2 element and set the inner text to filler
        // 3. append the element to the word display section
        inputArray.push("_");
        const letterDisplay = document.createElement("h2");
        letterDisplay.setAttribute("class", "letter");
        letterDisplay.innerText = "_";
        wordDisplay.appendChild(letterDisplay);

        // create random emoji humans
        emojiArray.push(
          humanArray[Math.floor(Math.random() * humanArray.length)]
        );
      });

      // reset the letter arrays
      // remain letters

      remain = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];

      remain.forEach((letter) => {
        // create the remain letter section
        const remainLetterDisplay = document.createElement("div");
        remainLetterDisplay.setAttribute("class", "remain-letter");
        remainLetterDisplay.innerText = letter;
        remainLetters.appendChild(remainLetterDisplay);
      });

      // used letters
      used = [];
      usedLetters.innerHTML = "";

      // emoji display for each item in the emoji array
      emojiArray.forEach((element) => {
        const humanDisplay = document.createElement("div");
        humanDisplay.setAttribute("class", "human-display");
        humanDisplay.innerText = element;
        humanShownOnScreen.appendChild(humanDisplay);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

// add the function to reset button and start button
startButton.addEventListener("click", () => {
  startNReset();
});
resetButton.addEventListener("click", () => {
  startNReset();
});

// function for fire button and enter
const checkWords = () => {
  //empty the emoji display
  humanShownOnScreen.innerHTML = "";

  // decrease the trial count
  trialCount--;

  // set the moving distance and move the enemy by translation
  moveDistance += 310 / (wordChoice.length * 2);
  humanShownOnScreen.style.transform = `translateY(${moveDistance}px)`;

  // empty the prompt and change the prompt
  wordDisplay.innerHTML = "";
  promptP.innerText = "Incorrect, please try again";
  for (i = 0; i < inputArray.length; i++) {
    // create the h2 element to the display section
    const letterDisplay = document.createElement("h2");
    letterDisplay.setAttribute("class", "letter");

    // if the input match the letter of the word
    if (input.value.toLowerCase() == wordChoiceArr[i]) {

      // change the input array to the to the input value, change the prompt, and change the emoji to explosion
      inputArray[i] = input.value.toLowerCase();
      promptP.innerText = "Good job! Please continue";
      emojiArray[i] = "💥";

      // animation heart
      heartAnimCount++;
      heart.setAttribute("class", "shot-anim");
      heart.style.animation = "none";
      heart.offsetWidth;
      heart.style.animation = null;
    }

    // change the letter display and append the child
    letterDisplay.innerText = inputArray[i];
    wordDisplay.appendChild(letterDisplay);
  }

  //check for winning condition and losing condition
  if (
    input.value == wordChoice ||
    inputArray.includes("_") != true ||
    input.value == "yonghai is the best"
  ) {
    // wining emoji change
    for (i = 0; i < emojiArray.length; i++) {
      emojiArray[i] = "💥";
    }

    // change prompt and word display, hide fire button and input field, show play again button 
    wordDisplay.innerHTML = "";
    promptP.innerText = "Congratulation! You Win!";
    fireButton.setAttribute("hidden", "");
    input.setAttribute("hidden", "");
    resetButton.removeAttribute("hidden");
    inputArray = wordChoiceArr;

    // change the input array and show it
    for (i = 0; i < inputArray.length; i++) {
      const letterDisplay = document.createElement("h2");
      letterDisplay.setAttribute("class", "letter");
      letterDisplay.innerText = inputArray[i];
      wordDisplay.appendChild(letterDisplay);
    }
  } else if (trialCount <= 0) {

    // losing condition
    // set the emoji for the character and the enemy
    heart.setAttribute("hidden", "");
    spacemanChar.innerText = "💀";
    for (i = 0; i < emojiArray.length; i++) {
      emojiArray[i] = "😝";
    }

    // change the prompt, hide and show buttons, change input array to the actual word
    wordDisplay.innerHTML = "";
    promptP.innerText = "You got caught by the humans, please try again";
    fireButton.setAttribute("hidden", "");
    input.setAttribute("hidden", "");
    resetButton.removeAttribute("hidden");
    inputArray = wordChoiceArr;
    for (i = 0; i < inputArray.length; i++) {
      const letterDisplay = document.createElement("h2");
      letterDisplay.setAttribute("class", "letter");
      letterDisplay.innerText = inputArray[i];
      wordDisplay.appendChild(letterDisplay);
    }
  }

  // change the emoji display based on the condition of the array
  emojiArray.forEach((element) => {
    const humanDisplay = document.createElement("div");
    humanDisplay.setAttribute("class", "human-display");
    humanDisplay.innerText = element;
    humanShownOnScreen.appendChild(humanDisplay);
  });

  // set new remain words
  // remove the input value from the remain array
  remain = remain.filter((letter) => {
    return letter !== input.value;
  });

  // change the display based on the array
  remainLetters.innerHTML = "";
  remain.forEach((letter) => {
    const remainLetterDisplay = document.createElement("div");
    remainLetterDisplay.setAttribute("class", "remain-letter");
    remainLetterDisplay.innerText = letter;
    remainLetters.appendChild(remainLetterDisplay);
  });

  // set used word by pushing the input into the array, then change the display
  used.push(input.value.toLowerCase());
  usedLetters.innerHTML = "";
  used.forEach((letter) => {
    const usedLetterDisplay = document.createElement("div");
    usedLetterDisplay.setAttribute("class", "used-letter");
    usedLetterDisplay.innerText = letter;
    usedLetters.appendChild(usedLetterDisplay);
  });

  // empty input field
  input.value = "";

};

fireButton.addEventListener("click", () => {
  checkWords();
});

input.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    checkWords();
  }
});

