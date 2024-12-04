class Player {
    //name is the player's name
    constructor(name) {
        this.name = name;
        this.handCards = [];
        this.point = 0;
    }
    addCard(newCard) {
        this.handCards.push(newCard);
    }
    clearHandCard() {
        this.handCards = [];
    }
    getHandCards() { return this.handCards; }  //return a reference of the handcard
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
    getPoint() { return this.point; }
    addPoint() { this.point += 1; }
}

// 2d array 
//coodinator of location of card 
let coodinator_x, coodinator_y;

const deck = [coodinator_x, coodinator_y];
const firstPlayerCard = [coodinator_x, coodinator_y];
const secondPlayerCard = [coodinator_x, coodinator_y];
const firstComputerCard = [coodinator_x, coodinator_y];
const secondComputerCard = [coodinator_x, coodinator_y];
const firstCommunicationCards = [coodinator_x, coodinator_y];
const secondCommunicationCards = [coodinator_x, coodinator_y];
const thirdCommunicationCards = [coodinator_x, coodinator_y];
const cardLocation = [deck, firstPlayerCard, secondPlayerCard, firstComputerCard, secondComputerCard, firstCommunicationCards, secondCommunicationCards, thirdCommunicationCards];

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
    isFace() { return this.faccUp; }
    setFace(cover) { this.faceUp = cover; }//If you want to reveal this card. use this method to set faceUp to true
    draw(ctx) {
        if (this.location != cardLocation[0]) {//this card is  in deck, no need to be drawed
            if (this.faceUp) {//this card is face up
                drawface(ctx, this, this.location[0], this.location[1], this.ch, this.cw);
                // this.location[0] is the coodination-x
                // this.location[1] is the coodination-y
            } else {
                //this card is face down
                drawback(ctx, this.location[0], this.location[1], this.ch, this.cw);
            }
        }
    }
}

//Convert the combination of the players' handcard and the commnunication card into a string of numbers and then compare. 
//display palyers' handcard
//return the winner's name

//playerA and playerB are the instances of class Player
//cCardArr is the array of communication card
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
        str = "6";
    } else {
        if (IsFullHouse(arr)) {
            str = "5";
            console.log("FullHouse");
        } else {
            if (IsFlush(arr)) {
                str = "4";
                console.log("Flush");
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
    //add rest number to the str
    for (i = 0; i < arr.length; i++) {
        str += arr[i].number;
    }
    return str;
}

// Hierarchy code (Brian's work)

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


//five of funtions identying the type of cards and sorting them in order by the type of cards

function IsStraightFlush(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[0].type !== arr[i].type) { return false; }
        if (arr[0].number - arr[i].number !== i) { return false; }
    }
    return true;
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

//test



///player test
let playerA = new Player("Jack");
let playerB = new Player("Queen");
let commnunicationCard = [];

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
    commnunicationCard.push(newCard);
}
console.log("commnunication card is :");
console.log(
    (
        function () {
            let arr = commnunicationCard;
            let result = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(arr[i].number + arr[i].type);
            }
            return result;
        }
    )()
)

let result = CompareCard(playerA, playerB, commnunicationCard);
console.log("winner is " + result);


const guideButton = document.getElementById('guide-button');
guideButton.addEventListener('click', function() {
    alert(
        "Welcome to the poker game!\n\n" +
        "Here's how to play:\n" +
        "1. Each player is dealt two cards.\n" +
        "2. The dealer places five community cards on the table.\n" +
        "3. Players take turns betting, calling, raising, or folding."
    );
});
let player1Score = 0;
let player2Score = 0;

let player1Rounds = 0;
let player2Rounds = 0;

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
