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
