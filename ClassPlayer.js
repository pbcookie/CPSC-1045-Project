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
    getName(){return this.name;} 
    getPoint(){return this.point;}
    addPoint(){this.point += 1;}
}
