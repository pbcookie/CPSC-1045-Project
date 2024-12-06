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
    draw(){
      if(this.location != cardLocation[0]){//this card is  in deck, no need to be drawed
        if(this.faceUp){//this card is face up
          drawCard(this.location[0], this.location[1], this.cw, this.ch, this.number, this.type);
          // this.location[0] is the coodination-x
          // this.location[1] is the coodination-y
        }else{
          //this card is face down
          drawback(ctx, this.location[0], this.location[1], this.ch, this.cw);
        }
      }
    }
    display(){
      return this.number + " " + this.type + " Location:" + this.getLocation();
    }
  }