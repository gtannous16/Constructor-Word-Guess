
let Word = require("./Word");
let inquirer = require("inquirer");
let chalk = require("chalk");
let guessedLetters = []
let mysteryWord = {};
let guesses = 10;
let SodaArray = ['Coke Zero', 'Coca Cola', 'Diet Coke', 'Sprite', 
'Vanilla Coke','Orange Vanilla Coke','PibbXtra','Powerade','Cherry Coke',  
'Fanta','Minute Maid','VitaminWater'];
let intro = "Welcome to the Coca Cola Brand Word Guess Game!"
let directions = "Guess which Coca Cola Product is the Mystery Word!"
let direction = "Type in any letter to get started! You only have 10 guesses!"


console.log("\n","\x1b[41m",                                                                                                                                                                    )
console.log("\n","\n","\x1b[37m","\x1b[41m","WELCOME TO THE WONDERFUL...                                                                                                                       ")
console.log("\n","\x1b[37m","\x1b[41m","   **              **                                              *******                             ***                                            ")
console.log("\x1b[37m","\x1b[41m","     **            **                **     **             *****    **   **          **   **  ******   *****                                               ")
console.log("\x1b[37m","\x1b[41m","      **          ** ******  **,**   **     **    ******   **  *    **       ******  **  **   **  **    ***                                                ") 
console.log("\x1b[37m","\x1b[41m","       **   **   **  **  **  **  **  **  *****    **  **  ****      **       **  **  ***      ******     *                                                 ")
console.log("\x1b[37m","\x1b[41m","        **  **  **   **  **  **      **  *  **    **  **   **       **   **  **  **  **  **   **                                                           ")
console.log("\x1b[37m","\x1b[41m","         **    **    ******  **      **  *****    ******   **       *******  ******  **    ** ******     *                                                 ")
console.log("\x1b[41m","\x1b[41m","                                                                                                                                                            ")
console.log("\n","\x1b[40m"                                                                                                                                                                     )
console.log("\n","\x1b[37m","\x1b[40m",intro);
console.log("\n","\x1b[31m","\x1b[40m",directions);
console.log("\n","\x1b[37m","\x1b[40m",direction);
console.log("\n");


wordGenerator();

function wordGenerator() {
	let randomWord = SodaArray[Math.floor(Math.random() * SodaArray.length)];
	mysteryWord = new Word(randomWord);
	mysteryWord.splitLetters = randomWord.toUpperCase().split("");
    mysteryWord.convert();
    getGuess();
}


function getGuess() {

	inquirer.prompt([
		{
			name: "letter",
			message: "Please Guess a Letter!",
			validate: function (value) {
				var letters = /^[A-Za-z]+$/;
				if (value.match(letters) && value.length === 1) {
					return true;
				}
				else {
					return false;
				}
			}
		}
	]).then(function (guess) {
		let ltr = guess.letter.toUpperCase()

		if (guessedLetters.includes(ltr)) {
			console.log(chalk.white("You've already picked this letter, try another one!" + "\n"));
		} else {

			mysteryWord.guesser(ltr);
			guessedLetters.push(ltr);

			if (mysteryWord.splitLetters.includes(ltr)) {
                console.log(chalk.white("Yes! You got the letter right!" + "\n"));
			} else {
				console.log(chalk.red("I'm sorry, wrong letter! Try Another one!" + "\n"))
				guesses--;
				console.log(chalk.white("You have " + guesses + " guesses left!" + "\n"));
			}
		}
		winChecker();
	});
}

function winChecker() {

	if (!mysteryWord.show.includes("_")) {
		console.log(chalk.red("You Got it!! The mystery Coke Product was: " + mysteryWord.word));
		playAgain()
	} else if (guesses > 0) {
		console.log(chalk.red("You've guessed: " + guessedLetters.join(", ") + "\n"));
		
		getGuess();
	} else {
		console.log(chalk.red("I'm Sorry, you have no more guesses left. The mystery Coke Product was:" + mysteryWord.word));
		playAgain();
	}

}

function playAgain() {
	inquirer.prompt([
		{
			name: "again",
			message: "Would You Like To Play Again" + "\n",
			type:"confirm",
			default: false,
		}

	]).then(function (answer) {
		if (answer.again === true) {
			mysteryWord.splitLetters = [];
			mysteryWord.convertedLetters = []
			mysteryWord.guessedLetters = [];
			mysteryWord.show = [];
			guessedLetters = []
			guesses = 10;
			wordGenerator();
		} else {
			console.log(chalk.red("Thank you for playing! I bet you're in the mood for a Coke product right now!" + "\n"));
		}

	});
}