//This class depends on DrawCard.js

// 2d array 
//coodinator of location of card 
let coodinator_x,coodinator_y;

const deckLocation = [coodinator_x,coodinator_y];
const firstPlayerCardLocation = [coodinator_x,coodinator_y];
const secondPlayerCardLocation = [coodinator_x,coodinator_y];
const firstComputerCardLocation = [coodinator_x,coodinator_y];
const secondComputerCardLocation = [coodinator_x,coodinator_y];
const firstCommunicationCardLocation = [coodinator_x,coodinator_y];
const secondCommunicationCardLocation = [coodinator_x,coodinator_y];
const thirdCommunicationCardLocation = [coodinator_x,coodinator_y];
const cardLocation = [deckLocation,firstPlayerCardLocation,secondPlayerCardLocation,firstComputerCardLocation,secondComputerCardLocation,firstCommunicationCardLocation, secondCommunicationCardLocation, thirdCommunicationCardLocation ];

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
  isFace(){return this.faceUp;}  
  setFace(cover){this.faceUp = cover;}//If you want to reveal this card. use this method to set faceUp to true
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

//draw card 
//card is the object of class card
//x , y is the coordinates
//ch is the height of card
//cw is the width of card
function drawface(ctx, card, x, y, ch, cw){
  switch( card.getType() ){
    case 'circle':
      switch( card.getNum() ){
        case 1:
        //draw card here
        break;
        case 2:
        //draw card here
        break;
        case 3:
        //draw card here
        break;
        case 4:
        //draw card here
        break;
        case 5:
        //draw card here
        break;
        case 6:
        //draw card here
        break;
        case 7:
        //draw card here
        break;
        case 8:
        //draw card here
        break;
    }
    break;
    case 'triangle':
      switch( card.getNum() ){
        case 1:
        //draw card here
        break;
        case 2:
        //draw card here
        break;
        case 3:
        //draw card here
        break;
        case 4:
        //draw card here
        break;
        case 5:
        //draw card here
        break;
        case 6:
        //draw card here
        break;
        case 7:
        //draw card here
        break;
        case 8:
        //draw card here
        break;
    }

    break;
    case 'diamond':
      switch( card.getNum() ){
        case 1:
        //draw card here
        break;
        case 2:
        //draw card here
        break;
        case 3:
        //draw card here
        break;
        case 4:
        //draw card here
        break;
        case 5:
        //draw card here
        break;
        case 6:
        //draw card here
        break;
        case 7:
        //draw card here
        break;
        case 8:
        //draw card here
        break;
    }
    break
  }
}
