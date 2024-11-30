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
  //ch is the height of card
  //cw is the width of card
  constructor(number, type, ch, cw){
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
  draw(){
    if(this.location != cardLocation[0]){//this card is  in deck, no need to be drawed
      if(this.faceUp){//this card is face up
        drawface( ctx, this, this.location[0],this.location[1] , this.ch, this.cw);
        // this.location[0] is the coodination-x
        // this.location[1] is the coodination-y
      }else{
        //this card is face down
        drawback( ctx, this.ch, this.cw);
      }
    }
  }
}
