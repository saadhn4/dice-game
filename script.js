/* Rules:
-- Game is playing 

 1. Player 1 rolls dice first

 2. A random dice value is added to player 1's current score 

 3. Continue rolling until either of the player scores 20 points 

 4. Whoever scores 20 points first wins, and then they get the player winner class added 

 5. If the score of either player hasnt reached 20 yet, switch the player. So basically, till someone eventually reaches 20... keep switching. First to 20 wins!

 6. Once someone wins set playing to false
 */

//  Selecting DOM elements
const rollDiceEl = document.querySelector(".roll-dice-btn");
const newGameBtnEl = document.querySelector(".new-game-btn");
const msgEl = document.querySelector(".js-msg");

// Initial values
let scores = [0, 0];
let activePlayer = 0;
let playing = true;

// Generates a number between 1-6
function generateDiceValue() {
  return Math.trunc(Math.random() * 6) + 1;
}

rollDiceEl.addEventListener("click", () => {
  if (playing) {
    let diceValue = generateDiceValue();
    msgEl.textContent = `Player ${activePlayer + 1} rolled ${diceValue}`;
    scores[activePlayer] += diceValue;
    document.querySelector(`.player-${activePlayer}-score`).textContent =
      scores[activePlayer];
    // Check for winning condition; true -> stop game ; false-> switch player
    // As long as the active player's score is 20 or below, the player will keep switching
    // Once its >= 20, we set the playing variable to false, and put it in a big if statement
    // This way the dice cannot be rolled once a player hits 20 points
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");

      msgEl.textContent = `Player ${activePlayer + 1} won!`;
      playing = false;
    } else {
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
      activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-active");
    }
  }
});

// Reset to initial values
newGameBtnEl.addEventListener("click", () => {
  scores = [0, 0];
  document.querySelector(`.player-0-score`).textContent = 0;
  document.querySelector(`.player-1-score`).textContent = 0;
  document.querySelector(`.player-0`).classList.add("player-active");
  document.querySelector(`.player-1`).classList.remove("player-active");
  document.querySelector(`.player-1`).classList.remove("player-winner");
  document.querySelector(`.player-0`).classList.remove("player-winner");
  msgEl.textContent = "Click on Roll Dice !";
  // Set playing to true, so game's logic works again
  playing = true;
});
