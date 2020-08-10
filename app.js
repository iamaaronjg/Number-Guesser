/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain number of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if they lose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 5;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max values (initially placed in the HTML spans but removed after assignment)
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener (using event delegation to target parent element)
game.addEventListener('mousedown', function(e) { // Using 'click' event is activated automatically for a click, which we don't want
    if (e.target.className === 'play-again') {
        window.location.reload(); // Reload web page
    }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate user input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if (guess === winningNum) {
        // Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!!!`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game is over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        } else {
            // Game continues - answer wrong

            // Change border colour
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';

            // Notify user of incorrect guess
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// Game over
function gameOver(won, msg) {
    let colour;
    won === true ? color = 'green' : color = 'red'; // Determines colour based on win or lose

    // Disable input
    guessInput.disabled = true;
    // Change border colour
    guessInput.style.borderColor = colour;

    // Set text colour
    message.style.color = color;

    // Display winning message
    setMessage(msg);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Generate winning number
function getRandomNum(min, max) {
    console.log(Math.floor(Math.random() * (max - min + 1) + min));
}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;

    setTimeout(clearMessage, 5000);
};

// Clear message function
function clearMessage() {
    message.style.display = 'none';
}