class Player{
    //name is the player's name
    constructor(name){
        this.name = name;
        this.handCards = [];
        this.point = 0;
    }
    addCard( newCard ){
        this.handCards.push(newCard);
    }
    clearHandCard(){
        this.handCards = [];
    }
    getHandCards(){return this.handCards;}  //return a reference of the handcard
    showHandCards(){
        let arr = this.getHandCards();
        console.log(
            (
                function(){
                    let result = [];
                    for(let i=0;i<arr.length;i++){
                        result.push(arr[i].number + arr[i].type);
                    }
                    return result;
                }
            )()
        )
    }
    getName(){return this.name;} 
    getPoint(){return this.point;}
    addPoint(){this.point += 1;}
}

// 2d array 
//coodinator of location of card 
let coodinator_x,coodinator_y;

const deck = [coodinator_x,coodinator_y];
const firstPlayerCard = [coodinator_x,coodinator_y];
const secondPlayerCard = [coodinator_x,coodinator_y];
const firstComputerCard = [coodinator_x,coodinator_y];
const secondComputerCard = [coodinator_x,coodinator_y];
const firstCommunicationCards = [coodinator_x,coodinator_y];
const secondCommunicationCards = [coodinator_x,coodinator_y];
const thirdCommunicationCards = [coodinator_x,coodinator_y];
const cardLocation = [deck,firstPlayerCard,secondPlayerCard,firstComputerCard,secondComputerCard,firstCommunicationCards, secondCommunicationCards, thirdCommunicationCards ];

class Card{
  //number is Int  from 1 to 8
  //type is string, eg:circle
  //ch is the height of card
  //cw is the width of card
  constructor(number, type, ch = 120, cw = 80){
    this.number = number;
    this.type = type;
    this.location = cardLocation[0]; //this card is initial in the deck
    this.faceUp = false;// this card is face down
    this.ch = ch;
    this.cw = cw;
  }
 
  getType(){return this.type;}
  getNum(){return this.number;}
  getLocation(){return this.location;}
  setLocation( newLocation ){this.location = newLocation;}
  isFace(){return this.faccUp;}  
  setFace( cover ){this.faceUp = cover;}//If you want to reveal this card. use this method to set faceUp to true
  draw(ctx){
    if(this.location != cardLocation[0]){//this card is  in deck, no need to be drawed
      if(this.faceUp){//this card is face up
        drawface(ctx, this, this.location[0], this.location[1], this.ch, this.cw);
        // this.location[0] is the coodination-x
        // this.location[1] is the coodination-y
      }else{
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
function CompareCard(playerA,playerB,cCardArr){
    let fivecardA = ArrToStr(playerA.getHandCards().concat(cCardArr));
    let fivecardB = ArrToStr(playerB.getHandCards().concat(cCardArr));
    if( Number(fivecardA) > Number(fivecardB)){
        return playerA.getName();
    }else if( Number(fivecardA) < Number(fivecardB)){
        return playerB.getName();
    }else{
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

function ArrToStr(arr){
    //first, sort the array of cards
    //because the card is not string,but object, we need function in sort method
    arr.sort(function(a,b){return b.number - a.number});
    let str;
    //identify which type the cards are
    if(IsStraightFlush(arr)){
        console.log("StraightFlush");
        str = "6";
    }else{
        if(IsFullHouse(arr)){
            str = "5";
            console.log("FullHouse");
        }else{
            if(IsFlush(arr)){
                str = "4";
                console.log("Flush");
            }else{
                if(IsThreeofKind(arr)){
                    str = "3";
                    console.log("ThreeofKind");
                }else{
                    if(IsTwoPair(arr)){
                        str = "2";
                        console.log("TwoPair");
                    }else{
                        if(IsOnePair(arr)){
                            str ="1";
                            console.log("OnePair");
                        }else{
                            str = "0";
                            console.log("HighCard");
                        }
                    }
                }
            }
        }
    }
    //add rest number to the str
    for(i=0;i<arr.length;i++){
        str += arr[i].number;
    }
    return str;
}


//five of funtions identying the type of cards and sorting them in order by the type of cards

function IsStraightFlush(arr){
    for(let i=1;i<arr.length;i++){
        if(arr[0].type !== arr[i].type ){return false;}
        if(arr[0].number - arr[i].number !== i){return false;} 
    }
    return true;
}

function IsFullHouse(arr){
    //if arr is fullhouse, arr is XXYYY or XXXYY, no other case
    if( arr[0].number === arr[1].number && arr[0].number === arr[2].number && arr[3].number === arr[4].number){return true;}
    if( arr[0].number === arr[1].number && arr[2].number === arr[3].number && arr[2].number === arr[4].number){
        [arr[0],arr[4]] = [arr[4],arr[0]];
        [arr[1],arr[3]] = [arr[3],arr[1]];
        return true;}
    //other case
    return false;
}


function IsFlush(arr){
    for(let i=1;i<arr.length;i++){
        if(arr[0].type !== arr[i].type ){return false;}
    }
    return true;
}

function IsThreeofKind(arr){
    //only three case:
    //01234
    //YYYXZ
    //XYYYZ
    //XZYYY
    if(arr[0].number === arr[1].number && arr[0].number === arr[2].number){return true;}
    if(arr[1].number === arr[2].number && arr[1].number === arr[3].number){
        [arr[0],arr[3]] = [arr[3],arr[0]];
        return true;
    }
    if(arr[2].number === arr[3].number && arr[2].number === arr[4].number){
        [arr[0],arr[3]] = [arr[3],arr[0]];
        [arr[1],arr[4]] = [arr[4],arr[1]];
        return true;
    }
    return false;
}

function IsTwoPair(arr){
    //three case
    //01234
    //ZXXYY
    //XXZYY
    //XXYYZ
    if(arr[1].number === arr[2].number && arr[3].number === arr[4].number){
        [arr[0],arr[4]] = [arr[4],arr[0]];
        [arr[0],arr[2]] = [arr[2],arr[0]];
        return true;
    }
    if(arr[0].number === arr[1].number && arr[3].number === arr[4].number){
        [arr[2],arr[4]] = [arr[4],arr[2]];
        return true;
    }
    if(arr[0].number === arr[1].number && arr[2].number === arr[3].number){return true;}
    return false;
}

function IsOnePair(arr){
    //01234
    //XXqwe
    //qXXwe
    //qwXXe
    //qweXX
    for(let i=0;i<arr.length-1;i++){
        if(arr[i].number === arr[i+1].number){
            if(i !== 0){
                [arr[0],arr[i]] = [arr[i],arr[0]];
                [arr[1],arr[i+1]] = [arr[i+1],arr[1]];
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
