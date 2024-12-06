class comCard {
    constructor() {
        this.cardArr = [];
        this.cardLocation = tableLocation;
    }
    addCard(newCard) {
        newCard.setLocation(this.cardLocation[this.cardArr.length]);//change the card's location
        this.cardArr.push(newCard);
        
    }
    display() {
        let arr = []
        for (let i = 0; i < this.cardArr.length; i++) {
            arr.push(this.cardArr[i].getNum() + " " + this.cardArr[i].getType());
        }
        console.log(arr);
    }
    clearCard() {
        this.cardArr = [];
    }
    draw() {
        for (let i = 0; i < this.cardArr.length; i++) {
            this.cardArr[i].draw();
        }
    }
    clearUp(){
        for (let i = 0; i < this.cardArr.length; i++) {
            this.cardArr[i].clearUp();
        }
        this.clearCard();
    }
}