// 2d array 
//coodinator of location of card 
let coodinator_x = 0;
let coodinator_y = 0;


let deckLocation = [coodinator_x, coodinator_y];
let firstPlayerCardLocation = [coodinator_x, coodinator_y];
let secondPlayerCardLocation = [coodinator_x, coodinator_y];
let firstComputerCardLocation = [coodinator_x, coodinator_y];
let secondComputerCardLocation = [coodinator_x, coodinator_y];
let firstCommunityCardLocation = [coodinator_x, coodinator_y];
let secondCommunityCardLocation = [coodinator_x, coodinator_y];
let thirdCommunityCardLocation = [coodinator_x, coodinator_y];
let cardLocation = [deckLocation, firstPlayerCardLocation, secondPlayerCardLocation, firstComputerCardLocation, secondComputerCardLocation, firstCommunityCardLocation, secondCommunityCardLocation, thirdCommunityCardLocation];
let tableLocation = cardLocation.slice(5);// including [firstCommunityCardLocation, secondCommunityCardLocation, thirdCommunityCardLocation]

//loction for display result

let displayA=[350,670];
let displayB=[350,20];



/************************************************************************************ */
/*
// Set the player names
let playerName = prompt("Greetings, player! Enter your name:");
//ClassName("player-name")[0] is the player1
document.getElementsByClassName("player-name")[0].innerHTML = playerName;

let computerNameArr = ["Queen", "Jack", "King", "Ace", "Shark", "Negreanu"]
let computerName = computerNameArr[parseInt(Math.random() * 6)];
//ClassName("player-name")[1] is the player2
document.getElementsByClassName("player-name")[1].innerHTML = computerName;
document.getElementsByClassName

// 'how to play' text
let guideText = "How to play the game:\n" +
    "1. Each player is dealt two cards.\n" +
    "2. Dealer reveals three community cards, one at a time.\n" +
    "3. After each reveal, press Bet to continue or Fold to escape and deal a new hand.\n" +
    "4. If you win a hand, you get a point. If you lose a hand, you will lose a point!\n" +
    "5. Score three points against the computer and you win the match!\n" +
    "... (Press OK to see the hand strength guide or Cancel to close)";

let handStrengthText = "Hand strength:\n" +
    "Straight Flush > Full House (Pair + Three of a Kind)\n" +
    "Full House > Flush (all same suit)\n" +
    "Flush > Straight (all sequential)\n" +
    "Straight > Three of a Kind\n" +
    "Three of a Kind > Two Pair\n" +
    "Two Pair > Pair\n" +
    "If there's a tie in the type of hand, the higher card wins.";

// guide button opens the how to play text
const guideButton = document.getElementById('guide-button');
guideButton.addEventListener('click', function () {
    confirm(guideText);
});

if (confirm(guideText) == true) {
    alert(handStrengthText);
}



let humanPlayer = new Player(playerName, "human");
let ComputerPlayer = new Player(computerName, "computer");
let playbutton = document.getElementById("play");
playbutton.addEventListener('click',playNewGame(humanPlayer,ComputerPlayer));

let player1Score = 0;
let player2Score = 0;

let player1Rounds = 0;
let player2Rounds = 0;

let currentDeck;

// Start the game
newGame();

*/