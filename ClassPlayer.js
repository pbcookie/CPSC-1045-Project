//This class depends on ClassCard.js

class Player{
    //name is the player's name
    constructor(name, playertype){
        this.name = name;
        this.cardArr = [];
        this.point = 0;
        this.playertype = playertype;
        this.handcardLocation = [];
        if(playertype == "player"){
            this.handcardLocation.push(cardLocation[1]);//firstPlayerCardLocation
            this.handcardLocation.push(cardLocation[2]);//secondPlayerCardLocation
        }
        if(playertype == "computer"){
            this.handcardLocation.push(cardLocation[3]);//firstComputerCardLocation
            this.handcardLocation.push(cardLocation[4]);//secondComputerCardLocation
        }
    }
    addCard( newCard ){
        newCard.setLocation(this.handcardLocation[this.cardArr.length]);//change card loction
        this.cardArr.push(newCard);
    }
    clearHandCard(){
        this.cardArr = [];
    }
    getHandCards(){return this.cardArr;}  //return a reference of the handcard
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
    getScore(){return this.point;}
    addPoint(){this.point += 1;}
    removePoint(){this.point -= 1;}
    displayHandCard(){
        let arr=[]
        for(let i=0;i<this.cardArr.length;i++){
            arr.push(this.cardArr[i].display());
        }
        console.log(arr);
    }
    draw(){}
}
