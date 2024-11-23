// 2d array 
//coodinator of location of card 
Const cardLocation = [deck,firstPlayerCard,secondPlayerCard,firstComputerCard,secondComputerCard,firstCommunicationCards, secondCommunicationCards, thirdCommunicationCards ];
Const deck = [coodinator-x,coodinator- y];
Const firstPlayerCard = [coodinator-x,coodinator- y];
Const secondPlayerCard = [coodinator-x,coodinator- y];
Const firstComputerCard = [coodinator-x,coodinator- y];
Const secondComputerCard = [coodinator-x,coodinator- y];
Const firstCommunicationCards = [coodinator-x,coodinator- y];
Const secondCommunicationCards = [coodinator-x,coodinator- y];
Const thirdCommunicationCards = [coodinator-x,coodinator- y];

class Card{
  //number is Int  from 1 to 8
  //type is string, eg:circle
  constructor(number, type){
    this.number = number;
    this.type = type;
    this.location = cardLocation[0]; //this card is initial in the deck
    this.faceUp = false;// this card is face down
    this.draw = false;// because this card is the deck, don't draw this card
  }
  getType(){return this.type;}
  getValue(){return this.value;}
  getLocation(){return this.location;}
  setLocation( newLocation ){this.location = newLocation;}
  isFace(){return this.faccUp;}
  shouldDraw(){return this.draw;}
  decideDraw ( newDecision ){this.draw = newDecision;}
}
