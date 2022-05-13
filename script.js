// Spaceman
// getting a random word from the word list
const wordListEasy = ["apple", "banana", "orange", "blue", "green"];
const wordDisplay = document.querySelector("#word");
let wordChoice = "";
let wordChoiceArr;
let newArray = []
// add event listener to the start button
const startButton = document.querySelector("#start-button")
startButton.addEventListener("click", () => {
    console.log("start!");
    wordChoice = wordListEasy[Math.floor(Math.random()*wordListEasy.length)];
    console.log(`the word is ${wordChoice}`);
    wordChoiceArr = wordChoice.split("");
    newArray = [];
    wordChoiceArr.forEach(() => {
        newArray.push("_")
    });
    wordDisplay.innerText = newArray;
    console.log(newArray);

    
    
});



// getting input from user
const input = document.querySelector("#input-field");
const checkMatch = () => {
    console.log(input.value);
    for (i = 0; i < newArray.length; i++) {
        if (input.value == wordChoiceArr[i]) {
            newArray[i] = input.value; 
            console.log(newArray);
        }
    };
    
}

//add event listener to the fire button
const fireButton = document.querySelector("#fire-button");
fireButton.addEventListener("click", () => {
    checkMatch();
    wordDisplay.innerText = newArray
})


console.log(wordDisplay.innerHTML);