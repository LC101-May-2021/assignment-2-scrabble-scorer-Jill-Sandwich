// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userInput = input.question("Let's play some scrabble! Enter a word: ");
   //console.log(oldScrabbleScorer(userInput));
   return userInput;
}

let simpleScore = function(word) {
  word = word.toUpperCase();
  let numericalScore = 0;
  for (let i = 0; i < word.length; i++) {
    numericalScore++;
  }
  return numericalScore;
};

let vowelBonusScore = function(word) {
  word = word.toUpperCase();
  let vowels = ["A", "E", "I", "O", "U"];
  let score = 0;
  for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i].toUpperCase())) {
        score += 3;
      } else {
        score++;
      }
    }
  return score;
};

let scrabbleScore = function(word) {
  let newScrabbleScore = 0;
  for (let i = 0; i < word.length; i++) {
      let newLetter = word[i];
      newScrabbleScore += newPointStructure[newLetter];
    }
  return newScrabbleScore;
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScore
  }, 
   {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScore
  }, 
   {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScore
  }
  ];

function scorerPrompt() {
   let userSelectionInput = input.question(`\nWhich scoring algorithm would you like to use?\n\n0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description} \n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description} \n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description} \nEnter 0, 1, or 2: `);
  if (userSelectionInput === "0") {
    return scoringAlgorithms[0].scorerFunction;
  } else if (userSelectionInput === "1") {
    return scoringAlgorithms[1].scorerFunction;
  } else if (userSelectionInput === "2") {
    return scoringAlgorithms[2].scorerFunction;
  } else {
    scorerPrompt();
  }
}

function transform(object) {
  let newPointsObject = {};
  for (number in object) {
    for (let i = 0; i < object[number].length; i++) {
      let theValue = object[number][i];
      newPointsObject[theValue.toLowerCase()] = Number(number);
      //objectName["new-key"] = propertyValue;
    }
  }
  return newPointsObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word = initialPrompt();
  let scorerFunction = scorerPrompt();
  let score = scorerFunction(word);
  console.log(score);   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

