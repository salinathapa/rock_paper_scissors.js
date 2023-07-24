const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const c = require('ansi-colors');

console.log('Welcome to Rock, Paper, Scissors!');
playGame()

function generateComputerChoice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playGame() {
  const choices = ['r', 'p', 's'];

  readline.question('Choose rock (r), paper(p), or scissors(s): ', (userChoice) => {
    const computerChoice = choices[generateComputerChoice(0, 2)];
    userChoice = userChoice.toLowerCase();

    if (validateInput(userChoice, choices)) {
      console.log('Computer chooses: ' + computerChoice);

      if (userChoice === computerChoice) {
        console.log(c.yellow('It\'s a draw!'));
        draws++;
      } else if (
        (userChoice === 'r' && computerChoice === 's') ||
        (userChoice === 'p' && computerChoice === 'r') ||
        (userChoice === 's' && computerChoice === 'p')
      ) {
        console.log(c.green('You win!')); // Green
        userWins++;
      } else {
        console.log(c.red('You lose!')); // Red
        compWins++;
      }
  
      console.log('Current scores: User - ' + userWins + ', Computer - ' + compWins + ', Draws - ' + draws);
      playAgain();
    } else {
      console.log('Invalid input. Please try again.');
      playGame();
    }
  });
}

let userWins = 0;
let compWins = 0;
let draws = 0;

function validateInput(input, choices) {
  return choices.includes(input.toLowerCase())
}

function playAgain() {
  readline.question('Play again? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      playGame();
    } else if (answer.toLowerCase() === 'n') {
      readline.close();
      console.log('Thanks for playing!');
    } else {
      console.log('Invalid input. Please try again.');
      playAgain();
    }
  });
}