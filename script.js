// Spaceman
// to do: 
// prompt section with timer
// api


// getting a random word from the word list
const wordListEasy = ["apple", "banana", "orange", "blue", "green", "pineapple", "spaceman"];
const wordDisplay = document.querySelector("#word");
let wordChoice = "";
let wordChoiceArr;
let inputArray = [];
let remain = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const remainLetters = document.querySelector("#remain-array")
let used = [];
const usedLetters = document.querySelector("#used-array")
const resetButton = document.querySelector("#reset")
const mainDisplay = document.querySelector("#spaceman")
// console.log(mainDisplay.offsetWidth);
const heart = document.querySelector("#heart");
let heartAnimCount = 0;
const humanArray = ["😀","😁","😆","😅","😂","🤣","🥲","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😋","😛","🤪","😎","🤩","🥺","🤯","🥵","😡","😱","🥶","😰","🤡"]
const humanShownOnScreen = document.querySelector("#humans");
let trialCount = 0;
console.log(humanShownOnScreen);
let moveDistance = 0;
let emojiArray = [];
const spacemanChar = document.querySelector("#spaceman-char");



// add event listener to the start button
const startButton = document.querySelector("#start-button");
const promptP = document.querySelector("#prompt-p");
const startPrompt = document.querySelector("#start-prompt");
const gameSection = document.querySelector("#game-section");
// console.log(promptP);

// reset function
const startNReset = () => {
    //get data from api
    axios({
        method: "get",
        url: "https://random-word-api.herokuapp.com/word"
    })
    .then ((response) => {



    // show heart and spaceman char
    heart.removeAttribute("hidden");
    spacemanChar.innerText = "👽";


    // hide stories and show game board
    startPrompt.setAttribute("hidden", "");
    gameSection.removeAttribute("hidden")



    // set moving distance to 0
    moveDistance = 0;
    emojiArray = [];
    humanShownOnScreen.style.transform = `translateY(${moveDistance}px)`


    resetButton.setAttribute("hidden", "");
    input.removeAttribute("hidden");
    fireButton.removeAttribute("hidden");
    promptP.innerText = "Guess the letter or the word:";
    startButton.setAttribute("hidden", "");
    console.log("start!");
    
    // get a new random word from the array

    // wordChoice = wordListEasy[Math.floor(Math.random()*wordListEasy.length)];
    wordChoice = response.data[0];
    console.log(`the word is ${wordChoice}`);
    wordChoiceArr = wordChoice.split("");
    trialCount = wordChoice.length * 2
    console.log(trialCount);

    // reset
    humanEnemy = [];
    humanShownOnScreen.innerHTML = "";
    inputArray = [];
    wordDisplay.innerHTML = "";
    wordChoiceArr.forEach(() => {
        inputArray.push("_")
        const letterDisplay = document.createElement("h2");
        letterDisplay.setAttribute("class", "letter");
        letterDisplay.innerText = "_";
        wordDisplay.appendChild(letterDisplay);

        // create humans
        emojiArray.push(humanArray[Math.floor(Math.random() * humanArray.length)])
        console.log(emojiArray);
        
        
        
    });
    // console.log(inputArray);
    
    // reset the letter arrays
    // remain letters
    remain = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    remain.forEach((letter) => {
        // console.log(letter);
        const remainLetterDisplay = document.createElement("div");
        remainLetterDisplay.setAttribute("class", "remain-letter");
        remainLetterDisplay.innerText = letter;
        remainLetters.appendChild(remainLetterDisplay);
    })
    
    // used letters
    used = [];
    usedLetters.innerHTML = "";

    // emoji display
    emojiArray.forEach((element) => {
        const humanDisplay = document.createElement("div");
        humanDisplay.setAttribute("class", "human-display");
        humanDisplay.innerText = element;
        humanShownOnScreen.appendChild(humanDisplay);
    })
    // console.log(humanDisplay);
})
.catch ((e) => {
    console.log(e);
})
}





startButton.addEventListener("click", () => {
    startNReset();
});
resetButton.addEventListener("click", () => {
    startNReset();
});



// getting input from user
const input = document.querySelector("#input-field");

//add event listener to the fire button
const fireButton = document.querySelector("#fire-button");


const checkWords = () => {
    //empty the emoji display
    humanShownOnScreen.innerHTML = ""


    trialCount --;
    console.log(trialCount);
    moveDistance += 310/(wordChoice.length * 2);
    console.log(`moving distance is ${moveDistance}`);
    // humans moving
    humanShownOnScreen.style.transform = `translateY(${moveDistance}px)`




    
    wordDisplay.innerHTML = "";
    promptP.innerText = "Incorrect, please try again"
    for (i = 0; i < inputArray.length; i++) {
        const letterDisplay = document.createElement("h2");
        // console.log(letterDisplay);
        letterDisplay.setAttribute("class", "letter")
        if (input.value.toLowerCase() == wordChoiceArr[i]) {
            inputArray[i] = input.value.toLowerCase();
            promptP.innerText = "Good job! Please continue";

            // change the emoji to explosion
            emojiArray[i] = "💥";
            

            // animation heart
            heartAnimCount ++;
            heart.setAttribute("class", "shot-anim")
            console.log(heart.style.animation);
            heart.style.animation = "none";
            console.log(heart.style.animation);
            heart.offsetWidth;
            heart.style.animation = null;
            console.log(heart.style.animation);
            // console.log(inputArray);


            

            
        } 
        letterDisplay.innerText = inputArray[i];
        wordDisplay.appendChild(letterDisplay);
        // wordDisplay.innerText = inputArray;

    };

    //check for winning condition
    // console.log(inputArray);
    // console.log(wordChoiceArr);
    if (input.value == wordChoice || (inputArray.includes("_") != true) || input.value == "yonghai is the best") {

        // wining emoji change
        for (i = 0; i < emojiArray.length; i++) {
            emojiArray[i] = "💥";
        }


        wordDisplay.innerHTML = "";
        promptP.innerText = "Congratulation! You Win!"
        fireButton.setAttribute("hidden", "");
        input.setAttribute("hidden", "");
        resetButton.removeAttribute("hidden");
        inputArray = wordChoiceArr;
        // console.log(inputArray);
        for (i = 0; i < inputArray.length; i++) {
        const letterDisplay = document.createElement("h2");
        letterDisplay.setAttribute("class", "letter")
        letterDisplay.innerText = inputArray[i];
        wordDisplay.appendChild(letterDisplay);
        // wordDisplay.innerText = inputArray;

    };

        


    } else if (trialCount <= 0) {
        // wining emoji change
        heart.setAttribute("hidden", "");
        spacemanChar.innerText = "💀";
        for (i = 0; i < emojiArray.length; i++) {
            emojiArray[i] = "😝";
        }



        //losing condition
        wordDisplay.innerHTML = "";
        promptP.innerText = "You got caught by the humans, please try again"
        fireButton.setAttribute("hidden", "");
        input.setAttribute("hidden", "");
        resetButton.removeAttribute("hidden");
        inputArray = wordChoiceArr;
        // console.log(inputArray);
        for (i = 0; i < inputArray.length; i++) {
        const letterDisplay = document.createElement("h2");
        letterDisplay.setAttribute("class", "letter")
        letterDisplay.innerText = inputArray[i];
        wordDisplay.appendChild(letterDisplay);
        // wordDisplay.innerText = inputArray;
    };  
    }

    emojiArray.forEach((element) => {
        const humanDisplay = document.createElement("div");
        humanDisplay.setAttribute("class", "human-display");
        humanDisplay.innerText = element;
        humanShownOnScreen.appendChild(humanDisplay);
    })





    // set new remain words
    remain = remain.filter((letter) => {
        return letter !== input.value;
    });

    remainLetters.innerHTML= "";
    remain.forEach((letter) => {
        // console.log(letter);
        const remainLetterDisplay = document.createElement("div");
        remainLetterDisplay.setAttribute("class", "remain-letter");
        remainLetterDisplay.innerText = letter;
        remainLetters.appendChild(remainLetterDisplay);
    })

    
    // set used word
    used.push(input.value.toLowerCase());
    console.log(used);
    usedLetters.innerHTML= "";
    used.forEach((letter) => {
        // console.log(letter);
        const usedLetterDisplay = document.createElement("div");
        usedLetterDisplay.setAttribute("class", "used-letter");
        usedLetterDisplay.innerText = letter;
        usedLetters.appendChild(usedLetterDisplay);
    })

    // empty input field
    input.value="";
    
    //
    inputArray.forEach(() => {

    })
}




fireButton.addEventListener("click", () => {
    checkWords();
})

input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        checkWords();
    };
})


// const hintButton = document.querySelector("#hint-button");
// const hints = document.querySelectorAll(".hint")
// console.log(hints);
// hintButton.addEventListener("click", () => {

// hints.forEach((hint) => {
//     if (hint.hasAttribute("hidden")) {
//         hint.removeAttribute("hidden")
//     } else {
//         hint.setAttribute("hidden", "")
    
//     };
// })

// })







// const promise = new Promise((resolve, reject) => {
    
//    if (test != "") {
//        resolve(test)
    
//    } else {
    
//    }
// })

