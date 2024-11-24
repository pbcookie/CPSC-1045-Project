// All functions will be copy/pasted into a single js file. They are only being
// kept separate right now while multiple people are working on different components.

let playerScore = 0;
let computerScore = 0;

// new game function calls all of the initialization functions at the start of the game
function NewGame() {
    player1 = Player.Human; // grab info from the Player class
    computer = Player.Computer; // grab info from the Player class
    alert(rules); // tell player how to play with a popup dialog
    NewRound();
}

// new round function calls the initialization functions at the start of the round
function NewRound() {
    ctx.clearRect(x, y, w, h); // reset the canvas
    drawTable(); // call function that draws a new table
    ScoreTracker(player1, playerScore); // call function that draws a new score tracker for player
    ScoreTracker(computer, computerScore); // call function that draws a new score tracker for computer
    Shuffle(); // call function which randomizes the deck array
    DealCards(player, 2); // call function which pops values from the deck array and assigns them to hand arrays
    DealCards(computer, 2);
    DealCards(table, 3);
}