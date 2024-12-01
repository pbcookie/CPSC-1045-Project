// depend on ClassCard.js , ClassPlayer.js and CompareWinner.js

///player test
let playerA = new Player("Jack");
let playerB = new Player("Queen");
let commnunicationCard = [];

let newCard;

for(k=0;k<2;k++){
    let typecolor;
    switch(Math.floor(Math.random() * (3 - 1 + 1)) + 1){
        case 1:
            typecolor = "red";
            break;
        case 2:
            typecolor = "blue";
            break;
        case 3:
            typecolor = "green";
    }
    newCard = new Card(Math.floor(Math.random() * (8 - 1 + 1)) + 1,typecolor);
    playerA.addCard(newCard);
}
console.log("player "+playerA.getName()+" handcards is ");
playerA.showHandCards();

for(let k=0;k<2;k++){
    let typecolor;
    switch(Math.floor(Math.random() * (3 - 1 + 1)) + 1){
        case 1:
            typecolor = "red";
            break;
        case 2:
            typecolor = "blue";
            break;
        case 3:
            typecolor = "green";
    }
    newCard = new Card(Math.floor(Math.random() * (8 - 1 + 1)) + 1,typecolor);
    playerB.addCard(newCard);
}
console.log("player "+playerB.getName()+" handcards is ");
playerB.showHandCards();

for(let k=0;k<3;k++){
    let typecolor;
    switch(Math.floor(Math.random() * (3 - 1 + 1)) + 1){
        case 1:
            typecolor = "red";
            break;
        case 2:
            typecolor = "blue";
            break;
        case 3:
            typecolor = "green";
    }
    newCard = new Card(Math.floor(Math.random() * (8 - 1 + 1)) + 1,typecolor);
    commnunicationCard.push(newCard);
}
console.log("commnunication card is :");
console.log(
        (
            function(){
                let arr = commnunicationCard;
                let result = [];
                for(let i=0;i<arr.length;i++){
                    result.push(arr[i].number + arr[i].type);
                }
                return result;
            }
        )()
)

let result = CompareCard(playerA,playerB,commnunicationCard);
console.log("winner is "+result);
