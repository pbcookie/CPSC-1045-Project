///player test
/*
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
*/
/**************************draw testing***************/
deckLocation = [250,340];
firstPlayerCardLocation = [515, 520];
secondPlayerCardLocation = [605, 520];

firstComputerCardLocation = [515, 160];
secondComputerCardLocation = [605, 160];

firstCommunityCardLocation = [470, 340];
secondCommunityCardLocation = [560, 340];
thirdCommunityCardLocation = [650, 340];
cardLocation = [deckLocation, firstPlayerCardLocation, secondPlayerCardLocation, firstComputerCardLocation, secondComputerCardLocation, firstCommunityCardLocation, secondCommunityCardLocation, thirdCommunityCardLocation];
tableLocation = cardLocation.slice(5);// including [firstCommunityCardLocation, secondCommunityCardLocation, thirdCommunityCardLocation]
/*
testCard = new Card(8,"Circle");
console.log("testcard's loction is "+testCard.getLocation());
console.log(testCard.display());
*/

const canvas = document.getElementById('pokerCanvas');
const ctx = canvas.getContext('2d');

/*
drawCard(515, 520, 80, 120, 8, "Circle");
/*
drawBack(605, 520, 80, 120);
drawDeck(250,340,80,120);
*/
/*
let newdeck = new Deck("Circle", "Diamond", "Triangle", 8);
newdeck.draw();
for (let i = 0; i < 5; i++) {
    newdeck.display();
    newdeck.shuffle();
}
newdeck.display();
let newguy = new Player("Ben", "human");
let tableCards = new comCard();
let newcpt = new Player("q","computer");

newdeck.dealPlayer(newguy, 2);
newguy.draw();
newdeck.dealTable(tableCards, 3);
tableCards.draw();
newdeck.dealPlayer(newcpt,2);
newcpt.draw();


newguy.displayHandCard();
tableCards.display();
newdeck.display();
*/
/****************************************************/

//test
/*
drawScore(playerName, 1);

updateScore('player1', 1);
*/
let output = document.getElementById("output");

let newgame;
let play1 = new Player("Jack","human");
let play2 = new Player("mary","computer");
let playbutton = document.getElementById("play");
playbutton.addEventListener('click',() =>playNewGame(play1,play2));
let betbutton = document.getElementById('bet');
betbutton.addEventListener('click',() =>bet(newgame),);
betbutton.style.display = "none";
let foldbutton = document.getElementById('fold');
foldbutton.addEventListener('click',() =>fold(newgame),);
foldbutton.style.display ="none";
let NextRoundbutton = document.getElementById('nextround');
NextRoundbutton.addEventListener('click',() =>fold(newgame),);
NextRoundbutton.style.display ="none";


