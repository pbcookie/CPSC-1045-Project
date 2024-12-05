// Call any functions related to the beginning of the game (only keeping Players)
function newGame() {
    resetScores();
    currentDeck = new Deck("circle", "triangle", "diamond", 8);
    newRound();
}

// Calls all of the necessary functions to start a new round
function newRound() {
    currentDeck.shuffle();
    currentDeck.dealPlayer(humanPlayer, 2);
    currentDeck.dealPlayer(ComputerPlayer, 2);
    currentDeck.dealTable(3);
}
