// Spaceman


// getting a random word from the word list
const wordListEasy = ["apple", "banana", "orange", "blue", "green"];
const wordDisplay = document.querySelector("#word");
let wordChoice = "";
let wordChoiceArr;
let inputArray = [];
let remain = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const remainLetters = document.querySelector("#remain-array")
let used = [];
const usedLetters = document.querySelector("#used-array")



// add event listener to the start button
const startButton = document.querySelector("#start-button")
startButton.addEventListener("click", () => {
    startButton.setAttribute("hidden", "");
    console.log("start!");

    // get a new random word from the array
    wordChoice = wordListEasy[Math.floor(Math.random()*wordListEasy.length)];
    console.log(`the word is ${wordChoice}`);
    wordChoiceArr = wordChoice.split("");

    // reset
    inputArray = [];
    wordDisplay.innerHTML = "";
    wordChoiceArr.forEach(() => {
        inputArray.push("_")
        const letterDisplay = document.createElement("h2");
        letterDisplay.setAttribute("class", "letter");
        letterDisplay.innerText = "_";
        wordDisplay.appendChild(letterDisplay);
    });
    console.log(inputArray);

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
    
    
});



// getting input from user
const input = document.querySelector("#input-field");

//add event listener to the fire button
const fireButton = document.querySelector("#fire-button");


const checkWords = () => {
    wordDisplay.innerHTML = "";
    for (i = 0; i < inputArray.length; i++) {
        const letterDisplay = document.createElement("h2");
        console.log(letterDisplay);
        letterDisplay.setAttribute("class", "letter")
        if (input.value == wordChoiceArr[i]) {
            inputArray[i] = input.value; 
            // console.log(inputArray);
            
        }
        letterDisplay.innerText = inputArray[i];
        wordDisplay.appendChild(letterDisplay);
        // wordDisplay.innerText = inputArray;

    };

    //check for winning condition
    console.log(inputArray);
    console.log(wordChoiceArr);
    if (input.value == wordChoice || (inputArray.includes("_") != true)) {
        wordDisplay.innerHTML = "";
        console.log("you win");
        inputArray = wordChoiceArr;
        console.log(inputArray);
        for (i = 0; i < inputArray.length; i++) {
        const letterDisplay = document.createElement("h2");
        letterDisplay.setAttribute("class", "letter")
        letterDisplay.innerText = inputArray[i];
        wordDisplay.appendChild(letterDisplay);
        // wordDisplay.innerText = inputArray;

    };
    } 
    
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

    
    
    used.push(input.value);
    console.log(used);
    usedLetters.innerHTML= "";
    used.forEach((letter) => {
        // console.log(letter);
        const usedLetterDisplay = document.createElement("div");
        usedLetterDisplay.setAttribute("class", "used-letter");
        usedLetterDisplay.innerText = letter;
        usedLetters.appendChild(usedLetterDisplay);
    })

    input.value="";
}




fireButton.addEventListener("click", () => {
    checkWords();
})

input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        checkWords();
    };
})


const hintButton = document.querySelector("#hint-button");
const hints = document.querySelectorAll(".hint")
console.log(hints);
hintButton.addEventListener("click", () => {

hints.forEach((hint) => {
    if (hint.hasAttribute("hidden")) {
        hint.removeAttribute("hidden")
    } else {
        hint.setAttribute("hidden", "")
    
    };
})

})

// input.addEventListener("keydown", (event) => {
//     console.log(event.key);
// })


