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