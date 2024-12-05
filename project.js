// Set the player names
let playerName = prompt("Greetings, player! Enter your name:");
document.getElementById("human-name").innerHTML = playerName;

let computerNameArr = ["Queen", "Jack", "King", "Ace", "Shark", "Negreanu"]
let computerName = computerNameArr[parseInt(Math.random() * 6)];

document.getElementById("computer-name").innerHTML = computerName;

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

// 2d array 
//coordinate of location of card 
let coordinate_x, coordinate_y;

const deckLocation = [coordinate_x, coordinate_y];
const firstPlayerCardLocation = [coordinate_x, coordinate_y];
const secondPlayerCardLocation = [coordinate_x, coordinate_y];
const firstComputerCardLocation = [coordinate_x, coordinate_y];
const secondComputerCardLocation = [coordinate_x, coordinate_y];
const firstCommunityCardLocation = [coordinate_x, coordinate_y];
const secondCommunityCardLocation = [coordinate_x, coordinate_y];
const thirdCommunityCardLocation = [coordinate_x, coordinate_y];
const cardLocation = [deck, firstPlayerCardLocation, secondPlayerCardLocation, firstComputerCardLocation, secondComputerCardLocation, firstCommunityCardLocation, secondCommunityCardLocation, thirdCommunityCardLocation];
const tableLocation = cardLocation.slice(6);// including [firstCommunityCardLocation, secondCommunityCardLocation, thirdCommunityCardLocation]

class Player {
    //name is the player's name, playertype is either computer or human
    constructor(name, playertype) {
        this.name = name;
        this.cardArr = [];
        this.point = 0;
        this.playertype = playertype;
        this.handcardLocation = [];
        if (playertype == "human") {
            this.handcardLocation.push(cardLocation[1]);//firstPlayerCardLocation
            this.handcardLocation.push(cardLocation[2]);//secondPlayerCardLocation
        }
        if (playertype == "computer") {
            this.handcardLocation.push(cardLocation[3]);//firstComputerCardLocation
            this.handcardLocation.push(cardLocation[4]);//secondComputerCardLocation
        }
    }
    addCard(newCard) {
        newCard.setLocation(this.handcardLocation[this.cardArr.length]);//change card loction
        this.cardArr.push(newCard);
        newCard.setFace(true);
    }
    clearHandCard() {
        this.cardArr = [];
    }
    getHandCards() { return this.cardArr; }  //return a reference of the handcard
    showHandCards() {
        let arr = this.getHandCards();
        console.log(
            (
                function () {
                    let result = [];
                    for (let i = 0; i < arr.length; i++) {
                        result.push(arr[i].number + arr[i].type);
                    }
                    return result;
                }
            )()
        )
    }
    getName() { return this.name; }
    getScore() { return this.point; }
    addPoint() { this.point += 1; }
    removePoint() { this.point -= 1; }
    displayHandCard() {
        let arr = []
        for (let i = 0; i < this.cardArr.length; i++) {
            arr.push(this.cardArr[i].display());
        }
        console.log(arr);
    }
    /*draw player's handcards*/
    draw() {
        for (let i = 0; i < this.cardArr.length; i++) {
            this.cardArr[i].draw();
        }
    }
}

let humanPlayer = new Player(playerName, "human");
let ComputerPlayer = new Player(computerName, "computer");

/*************deck class******************** */
class Deck {
    constructor(t1, t2, t3, num) {
        this.cardArr = [];
        for (let i = 0; i < num; i++) {
            this.cardArr.push(new Card(i + 1, t1));
        }
        for (let i = 0; i < num; i++) {
            this.cardArr.push(new Card(i + 1, t2));
        }
        for (let i = 0; i < num; i++) {
            this.cardArr.push(new Card(i + 1, t3));
        }
        this.location = deckLocation;
    }
    /*****************method*************** */
    display() {
        let arr = [];
        for (let i = 0; i < this.cardArr.length; i++) {
            arr.push(this.cardArr[i].getNum() + " " + this.cardArr[i].getType());
        }
        console.log(arr);
    }
    shuffle() {
        let i = this.cardArr.length;

        while (i != 0) {
            let j = Math.floor(Math.random() * i);
            i--;
            [this.cardArr[i], this.cardArr[j]] = [this.cardArr[j], this.cardArr[i]];
        }
    }
    dealPlayer(player, num) {
        this.cardArr.reverse();
        for (let i = 0; i < num; i++) {
            let newCard = this.cardArr.pop();
            player.addCard(newCard);
            newCard.setLocation(player.handcardLocation[i]); //change the card's location into player's handcard loction
        }
        this.cardArr.reverse();
    }
    dealTable(comCard, num) {
        this.cardArr.reverse();
        for (let i = 0; i < num; i++) {
            let newCard = this.cardArr.pop();
            comCard.addCard(newCard);
        }
        this.cardArr.reverse();
    }
    draw() { };
}

class Card {
    //number is Int  from 1 to 8
    //type is string, eg:circle
    //ch is the height of card
    //cw is the width of card
    constructor(number, type, ch = 120, cw = 80) {
        this.number = number;
        this.type = type;
        this.location = cardLocation[0]; //this card is initial in the deck
        this.faceUp = false;// this card is face down
        this.ch = ch;
        this.cw = cw;
    }

    getType() { return this.type; }
    getNum() { return this.number; }
    getLocation() { return this.location; }
    setLocation(newLocation) { this.location = newLocation; }
    isFace() { return this.faceUp; }
    setFace(cover) { this.faceUp = cover; }//If you want to reveal this card. use this method to set faceUp to true
    draw() {
        if (this.location != cardLocation[0]) {//this card is  in deck, no need to be drawed
            if (this.faceUp) {//this card is face up
                drawCard(this.location[0], this.location[1], this.cw, this.ch, this.number, this.type);
                // this.location[0] is the coordinate-x
                // this.location[1] is the coordinate-y
            } else {
                //this card is face down
                drawback(ctx, this.location[0], this.location[1], this.ch, this.cw);
            }
        }
    }
    display() {
        return this.number + " " + this.type;
    }
}
class comCard {
    constructor() {
        this.cardArr = [];
        this.cardLocation = tableLocation;
    }
    addCard(newCard) {
        newCard.setLocation(this.cardLocation[this.cardArr.length]);//change the card's location
        this.cardArr.push(newCard);
        newCard.setFace(true);
    }
    display() {
        let arr = []
        for (let i = 0; i < this.cardArr.length; i++) {
            arr.push(this.cardArr[i].getNum() + " " + this.cardArr[i].getType());
        }
        console.log(arr);
    }
    clear() {
        this.cardArr = [];
    }
    draw() {
        for (let i = 0; i < this.cardArr.length; i++) {
            this.cardArr[i].draw();
        }
    }
}

let player1Score = 0;
let player2Score = 0;

let player1Rounds = 0;
let player2Rounds = 0;

let currentDeck;

// Start the game
newGame();

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

//Convert the combination of the players' handcard and the community card into a string of numbers and then compare. 
//display palyers' handcard
//return the winner's name

//playerA and playerB are the instances of class Player
//cCardArr is the array of Community cards
function CompareCard(playerA, playerB, cCardArr) {
    let fivecardA = ArrToStr(playerA.getHandCards().concat(cCardArr));
    let fivecardB = ArrToStr(playerB.getHandCards().concat(cCardArr));
    if (Number(fivecardA) > Number(fivecardB)) {
        return playerA.getName();
    } else if (Number(fivecardA) < Number(fivecardB)) {
        return playerB.getName();
    } else {
        return "draw";
    }
}

//translate array of card into a string of number

/*We can use a "+" string to convert five cards into a 6-digit number. Start by adding the five cards to an array, then sort them. Depending on the hand type, prefix the string with a number to indicate its rank, followed by the values of the cards in order. Here’s the breakdown:
1.Straight Flush: Prefix with "6" and then append the five card values in order.
2.Full House: Prefix with "5". First, append the value of the three matching cards, then append the pair’s value.
3.Flush: Prefix with "4" and then append all five card values in order.
4.Three of a Kind: Prefix with "3". Append the value of the three matching cards, followed by the other two card values in order.
5.High Card: Simply append the five card values in descending order.
After converting both hands into 6-digit strings, we can directly compare the two strings to determine the winner.
*/

function ArrToStr(arr) {
    //first, sort the array of cards
    //because the card is not string,but object, we need function in sort method
    arr.sort(function (a, b) { return b.number - a.number });
    let str;
    //identify which type the cards are
    if (IsStraightFlush(arr)) {
        console.log("StraightFlush");
        str = "7";
    } else {
        if (IsFullHouse(arr)) {
            str = "6";
            console.log("FullHouse");
        } else {
            if (IsFlush(arr)) {
                str = "5";
                console.log("Flush");
            } else {
                if (IsStraight(arr)) {
                    str = "4";
                    console.log("Straight");
                } else {
                    if (IsThreeofKind(arr)) {
                        str = "3";
                        console.log("ThreeofKind");
                    } else {
                        if (IsTwoPair(arr)) {
                            str = "2";
                            console.log("TwoPair");
                        } else {
                            if (IsOnePair(arr)) {
                                str = "1";
                                console.log("OnePair");
                            } else {
                                str = "0";
                                console.log("HighCard");
                            }
                        }
                    }
                }
            }
        }
    }
    //add rest number to the str
    for (i = 0; i < arr.length; i++) {
        str += arr[i].number;
    }
    return str;
}

//five of funtions identying the type of cards and sorting them in order by the type of cards

function IsStraightFlush(arr) {
    if (IsStraight(arr) && IsFlush(arr)) {
        return true;
    }
    return false;
}

function IsFullHouse(arr) {
    //if arr is fullhouse, arr is XXYYY or XXXYY, no other case
    if (arr[0].number === arr[1].number && arr[0].number === arr[2].number && arr[3].number === arr[4].number) { return true; }
    if (arr[0].number === arr[1].number && arr[2].number === arr[3].number && arr[2].number === arr[4].number) {
        [arr[0], arr[4]] = [arr[4], arr[0]];
        [arr[1], arr[3]] = [arr[3], arr[1]];
        return true;
    }
    //other case
    return false;
}

function IsFlush(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[0].type !== arr[i].type) { return false; }
    }
    return true;
}

function IsStraight(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[0].number - arr[i].number !== i) { return false; }
    }
    return true;
}

function IsThreeofKind(arr) {
    //only three case:
    //01234
    //YYYXZ
    //XYYYZ
    //XZYYY
    if (arr[0].number === arr[1].number && arr[0].number === arr[2].number) { return true; }
    if (arr[1].number === arr[2].number && arr[1].number === arr[3].number) {
        [arr[0], arr[3]] = [arr[3], arr[0]];
        return true;
    }
    if (arr[2].number === arr[3].number && arr[2].number === arr[4].number) {
        [arr[0], arr[3]] = [arr[3], arr[0]];
        [arr[1], arr[4]] = [arr[4], arr[1]];
        return true;
    }
    return false;
}

function IsTwoPair(arr) {
    //three case
    //01234
    //ZXXYY
    //XXZYY
    //XXYYZ
    if (arr[1].number === arr[2].number && arr[3].number === arr[4].number) {
        [arr[0], arr[4]] = [arr[4], arr[0]];
        [arr[0], arr[2]] = [arr[2], arr[0]];
        return true;
    }
    if (arr[0].number === arr[1].number && arr[3].number === arr[4].number) {
        [arr[2], arr[4]] = [arr[4], arr[2]];
        return true;
    }
    if (arr[0].number === arr[1].number && arr[2].number === arr[3].number) { return true; }
    return false;
}

function IsOnePair(arr) {
    //01234
    //XXqwe
    //qXXwe
    //qwXXe
    //qweXX
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].number === arr[i + 1].number) {
            if (i !== 0) {
                [arr[0], arr[i]] = [arr[i], arr[0]];
                [arr[1], arr[i + 1]] = [arr[i + 1], arr[1]];
            }
            return true;
        }
    }
    return false;
}

///player test
let playerA = new Player("Jack");
let playerB = new Player("Queen");
let communityCard = [];

let newCard;

for (let k = 0; k < 2; k++) {
    let typecolor;
    switch (Math.floor(Math.random() * (3 - 1 + 1)) + 1) {
        case 1:
            typecolor = "red";
            break;
        case 2:
            typecolor = "blue";
            break;
        case 3:
            typecolor = "green";
    }
    newCard = new Card(Math.floor(Math.random() * (8 - 1 + 1)) + 1, typecolor);
    playerA.addCard(newCard);
}
console.log("player " + playerA.getName() + " handcards is ");
playerA.showHandCards();

for (let k = 0; k < 2; k++) {
    let typecolor;
    switch (Math.floor(Math.random() * (3 - 1 + 1)) + 1) {
        case 1:
            typecolor = "red";
            break;
        case 2:
            typecolor = "blue";
            break;
        case 3:
            typecolor = "green";
    }
    newCard = new Card(Math.floor(Math.random() * (8 - 1 + 1)) + 1, typecolor);
    playerB.addCard(newCard);
}
console.log("player " + playerB.getName() + " handcards is ");
playerB.showHandCards();

for (let k = 0; k < 3; k++) {
    let typecolor;
    switch (Math.floor(Math.random() * (3 - 1 + 1)) + 1) {
        case 1:
            typecolor = "red";
            break;
        case 2:
            typecolor = "blue";
            break;
        case 3:
            typecolor = "green";
    }
    newCard = new Card(Math.floor(Math.random() * (8 - 1 + 1)) + 1, typecolor);
    communityCard.push(newCard);
}
console.log("community card is :");
console.log(
    (
        function () {
            let arr = communityCard;
            let result = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(arr[i].number + arr[i].type);
            }
            return result;
        }
    )()
)

let result = CompareCard(playerA, playerB, communityCard);
console.log("winner is " + result);

/************************************************************draw function******************************************************************/


// Card dimensions
const CARD_WIDTH = 90;
const CARD_HEIGHT = 160;

// Shapes 
const SHAPES = {
    Circle: drawCircle,
    Diamond: drawDiamond,
    Triangle: drawTriangle,
};

// Draw cards
function drawDeck() {
    let x = 10, y = 20;
    const padding = 40;

    // Loop through numbers and shapes
    for (let number = 1; number <= 8; number++) {
        for (const shapeName in SHAPES) {
            drawCard(x, y, CARD_WIDTH, CARD_HEIGHT, number, shapeName);
            x += CARD_WIDTH + padding;

            // Move to the next row if the row is full
            if (x + CARD_WIDTH + padding > canvas.width) {
                x = 10;
                y += CARD_HEIGHT + padding;
            }
        }
    }
}

// Draw a card
function drawCard(x, y, width, height, number, shapeName) {
    // Background
    ctx.fillStyle = 'beige';
    ctx.fillRect(x, y, width, height);

    // Border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Draw number at the top left
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(number, x + 10, y + 8);

    // Draw in the center
    const shapeFunc = SHAPES[shapeName];
    shapeFunc(x + width / 2, y + height / 2, number);
}

// Different shape count and positions
function drawShapes(centerX, centerY, count, drawShape) {
    const colSpacing = 40;
    const rowSpacing = 40;

    let positions = [];
    switch (count) {
        case 1:
            positions = [{ x: centerX, y: centerY }];
            break;
        case 2:
            positions = [
                { x: centerX, y: centerY - rowSpacing / 2 },
                { x: centerX, y: centerY + rowSpacing / 2 }
            ];
            break;
        case 3:
            positions = [
                { x: centerX, y: centerY - rowSpacing },
                { x: centerX, y: centerY },
                { x: centerX, y: centerY + rowSpacing }
            ];
            break;
        case 4:
            positions = [
                { x: centerX - colSpacing / 2, y: centerY - rowSpacing / 2 },
                { x: centerX + colSpacing / 2, y: centerY - rowSpacing / 2 },
                { x: centerX - colSpacing / 2, y: centerY + rowSpacing / 2 },
                { x: centerX + colSpacing / 2, y: centerY + rowSpacing / 2 }
            ];
            break;
        case 5:
            positions = [
                { x: centerX - colSpacing / 2, y: centerY - rowSpacing / 1.3 },
                { x: centerX + colSpacing / 2, y: centerY - rowSpacing / 1.3 },
                { x: centerX, y: centerY },
                { x: centerX - colSpacing / 2, y: centerY + rowSpacing / 1.3 },
                { x: centerX + colSpacing / 2, y: centerY + rowSpacing / 1.3 }
            ];
            break;
        case 6:
            positions = [
                { x: centerX - colSpacing / 2, y: centerY - rowSpacing },
                { x: centerX + colSpacing / 2, y: centerY - rowSpacing },
                { x: centerX - colSpacing / 2, y: centerY },
                { x: centerX + colSpacing / 2, y: centerY },
                { x: centerX - colSpacing / 2, y: centerY + rowSpacing },
                { x: centerX + colSpacing / 2, y: centerY + rowSpacing }
            ];
            break;
        case 7:
            positions = [
                { x: centerX - colSpacing / 2.5, y: centerY - rowSpacing * 1 },
                { x: centerX + colSpacing / 1.6, y: centerY - rowSpacing * 1 },
                { x: centerX + colSpacing / 10, y: centerY - rowSpacing * 0.3 },
                { x: centerX - colSpacing / 2.5, y: centerY + rowSpacing * 0.5 },
                { x: centerX + colSpacing / 1.6, y: centerY + rowSpacing * 0.5 },
                { x: centerX - colSpacing / 2.4, y: centerY + rowSpacing * 1.5 },
                { x: centerX + colSpacing / 1.6, y: centerY + rowSpacing * 1.5 }
            ];
            break;
        case 8:
            const tighterColSpacing = colSpacing / 2.3;
            const tighterRowSpacing = rowSpacing / 1.65;
            const yOffset = 6;
            positions = [
                { x: centerX - tighterColSpacing, y: centerY - tighterRowSpacing * 2 + yOffset },
                { x: centerX + tighterColSpacing, y: centerY - tighterRowSpacing * 2 + yOffset },
                { x: centerX, y: centerY - tighterRowSpacing + yOffset },
                { x: centerX - tighterColSpacing, y: centerY + yOffset },
                { x: centerX + tighterColSpacing, y: centerY + yOffset },
                { x: centerX, y: centerY + tighterRowSpacing + yOffset },
                { x: centerX - tighterColSpacing, y: centerY + tighterRowSpacing * 2 + yOffset },
                { x: centerX + tighterColSpacing, y: centerY + tighterRowSpacing * 2 + yOffset }
            ];
            break;
    }
    // Draw shapes based on calculated positions
    positions.forEach(({ x, y }) => drawShape(x, y));
}

// Shape drawing functions 
function drawCircle(centerX, centerY, count) {
    drawShapes(centerX, centerY, count, (x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, 13.5, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
    });
}

function drawDiamond(centerX, centerY, count) {
    drawShapes(centerX, centerY, count, (x, y) => {
        const size = 25;
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x - size / 2, y);
        ctx.lineTo(x, y + size / 2);
        ctx.lineTo(x + size / 2, y);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
    });
}

function drawTriangle(centerX, centerY, count) {
    drawShapes(centerX, centerY, count, (x, y) => {
        const size = 25;
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x - size / 2, y + size / 2);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.closePath();
        ctx.fillStyle = 'green';
        ctx.fill();
    });
}

/****************************************************************************************************************************************/
/**************************draw testing***************/
firstPlayerCardLocation = [900, 780];
secondPlayerCardLocation = [1000, 780];
firstComputerCardLocation = [900, 580];
secondComputerCardLocation = [1000, 580];
firstCommunityCardLocation = [850, 680];
secondCommunityCardLocation = [950, 680];
thirdCommunityCardLocation = [1050, 680];

const canvas = document.getElementById('pokerCard');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let newdeck = new Deck("Circle", "Diamond", "Triangle", 8);
for (let i = 0; i < 5; i++) {
    newdeck.display();
    newdeck.shuffle();
}
newdeck.display();
let newguy = new Player("Ben", "player");
let tableCards = new comCard();

newdeck.dealPlayer(newguy, 2);
newguy.draw();
newdeck.dealTable(tableCards, 3);
/* waiting for drawbackcard() function
tableCards.draw();
*/
newguy.displayHandCard();
tableCards.display();
newdeck.display();

/****************************************************/

function updateScore(player, round) {
    const scoreCircle = document.getElementById(`${player}-round${round}`);
    if (scoreCircle) {
        scoreCircle.classList.add('won');
    }
}

function roundWin(winner) {
    if (winner === 'player1') {
        player1Rounds++;
        updateScore('player1', player1Rounds);
    } else if (winner === 'player2') {
        player2Rounds++;
        updateScore('player2', player2Rounds);
    }

    if (player1Rounds === 3) {
        alert('Player 1 wins the match!');
        resetScores();
    } else if (player2Rounds === 3) {
        alert('Player 2 wins the match!');
        resetScores();
    }
}

function resetScores() {
    player1Rounds = 0;
    player2Rounds = 0;

    document.querySelectorAll('.score-circle').forEach(circle => {
        circle.classList.remove('won');
        circle.classList.remove('lost');
    });
}

/************************************************************Score tracker******************************************************************/

// Player is the player whose tracker is being changed; Score is the value passed from the round result
function scoreTracker(player, score) {
    // note: no change to score if player folded
    let points = player.getScore();
    let lastPoint = false;

    switch (score) {
        case 1:
            // player won the round
            drawScore(player, 1);
            player.addPoint();
            switch (player.playertype) {
                case "human":
                    // human player won their 3rd point
                    if (points >= 3) {
                        alert("You won the match! Great game!");
                        lastPoint = true;
                    }
                    else {
                        alert("You won the hand!");
                        newRound();
                    }
                    break
                case "computer":
                    // computer player won their 3rd point
                    if (points >= 3) {
                        alert("You lost the match. Try a new game!")
                        lastPoint = true;
                    }
                    break;
                default:
                    console.log("Error: scoreTracker switch case 'playertype'");
                    break;
            }
            break;
        case -1:
            // player lost the round without folding
            if (points > 0) { // score cannot become negative
                drawScore(player, -1);
                player.removePoint();
            }
            if (player.playertype == "human") {
                alert("You lost the hand.");
                newRound();
            }
            break;
        case 0:
            // human and computer hands strengths are equal
            alert("Tie round!");
            newRound();
            break;
        default:
            console.log("Error: scoreTracker switch case 'score'");
            break;
    }

    if (lastPoint) {
        endMatch();
    }
}

//test
drawScore(playerName, 1);

// Player is the player whose tracker is being changed; Score is the value representing win or loss
function drawScore(player, score) {
    let playerScore = player.getScore();

    // change the score dots gray by default
    for (i = 0; i < 3; i++) {
        let dot = document.getElementById(player + "-point" + i);
        dot.style.backgroundColor = "gray";
    }

    // for each point the player has, turn a score dot green
    for (i = 0; i < playerScore; i++) {
        let dot = document.getElementById(player + "-point" + i);
        dot.style.backgroundColor = "green";
    }
}

// call canvas clear function(s), call new game function
function endMatch() {
    // TODO: cleanup and prepare for next game
}

/** HIERARCHY CODE (Brian's work)

// hand strength hierarchy: strongest to weakest, left to right
let hierarchy = ["Straight Flush", "Full House", "Flush", "Straight", "Three of a Kind", "Two Pair", "Pair", "High Card"];

// If hand strengths are tied, compare values of the cards
// Two Pair vs Two Pair: the better pair wins; compare the second pair only if first pair is tied
// Full House vs Full House: highest 3 of a Kind wins; compare the pair only if 3 of a Kind is tied

// test hands
// let testHand = [1,2,3,4,8]; // high card
// let testHand = [1,2,3,4,1]; // one pair
// let testHand = [1,1,3,2,2]; // [1,1,2,3,3] [1,1,2,2,3] [1,2,2,3,3] // two pair
// let testHand = [3,2,3,4,3]; // three of a kind
// let testHand = [2,3,2,3,3]; // fullhouse

// console.log(testHand);

function countRepeats(playerHand, startIndex) {
    // counts number of times the given card value appears in the hand
    let count = 0;

    for (j = startIndex; j < playerHand.length; j++) {

        if (playerHand[startIndex].getNum() == playerHand[j].getNum()) {
            count++;
        }
        else {
            break;
        }

    }
    return count;
}

function OfAKind(playerHand) {
    // assigns hand types and strength based on number of repeats
    let onePair = false;
    let twoPair = false;
    let threeOfAKind = false;
    let countingArray = playerHand.slice(); // create a copy of array so the manipulations are nondestructive
    countingArray.sort(); // sort so that the following counting algorithm works

    handType = "";

    for (i = 0; i < countingArray.length - 1; i++) { // loop through the entire hand

        let count = countRepeats(countingArray, i);

        i += count - 1;

        if (count == 3) {
            threeOfAKind = true;
        }
        else if (count == 2) {
            if (onePair) { // if a pair has already been counted, this is the second pair
                twoPair = true;
            }
            else { // if a pair has not yet been counted
                onePair = true;
            }
        }
    }
    if (threeOfAKind && onePair) { // this is a Full House type of hand
        handType = hierarchy[1];
    }
    else if (threeOfAKind) {
        handType = hierarchy[4];
    }
    else if (twoPair) {
        handType = hierarchy[5];
    }
    else if (onePair) {
        handType = hierarchy[6];
    }
    else { // no pairs, only a high card
        handType = hierarchy[7];
    }
    return handType;
}

function straightCheck(playerHand) {
    // checks if hand contains a straight and returns boolean
    let sorted = playerHand.sort()
    let isStraight = true;
    for (i = 0; i < sorted.length - 1; i++) {
        if ((sorted[i].getNum() + 1) != sorted[i + 1].getNum()) {
            return isStraight = false;
        }
    }
    return isStraight;
}

function flushCheck(playerHand) {
    // checks if hand contains a flush, i.e. all cards have the same symbol and returns boolean
    let isFlush = true;
    for (i = 0; i < playerHand.length - 1; i++) {
        if (playerHand[i].getType() != playerHand[i + 1].getType()) {
            return isFlush = false;
        }
    }
    return isFlush;
}

function bestHand(playerHand) {
    // evaluates the hand based on hierarchies of strength
    if (flushCheck(playerHand) && straightCheck(playerHand)) {
        handType = hierarchy[0];
    }
    else if (flushCheck(playerHand)) {
        handType = hierarchy[2];
    }
    else if (straightCheck(playerHand)) {
        handType = hierarchy[3];
    }
    else {
        handType = OfAKind(playerHand);
    }
    return handType;
}
*/
