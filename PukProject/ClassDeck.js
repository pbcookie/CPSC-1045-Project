/*************deck class******************** */
class Deck {
    constructor(t1, t2, t3, num) {
        this.cardArr = [];
        for (let i = 0; i < num; i++) {
            this.cardArr.push(new Card(i + 1, t1));
        }
        for (let i = 0; i < num; i++) {
            this.cardArr.push(new Card(i + 1, t2));
        }
        for (let i = 0; i < num; i++) {
            this.cardArr.push(new Card(i + 1, t3));
        }
        this.location = deckLocation;
    }
    /*****************method*************** */
    display() {
        let arr = [];
        for (let i = 0; i < this.cardArr.length; i++) {
            arr.push(this.cardArr[i].getNum() + " " + this.cardArr[i].getType());
        }
        console.log(arr);
    }
    shuffle() {
        let i = this.cardArr.length;

        while (i != 0) {
            let j = Math.floor(Math.random() * i);
            i--;
            [this.cardArr[i], this.cardArr[j]] = [this.cardArr[j], this.cardArr[i]];
        }
    }
    dealPlayer(player, num) {
        this.cardArr.reverse();
        for (let i = 0; i < num; i++) {
            let newCard = this.cardArr.pop();
            player.addCard(newCard);
            newCard.setLocation(player.handcardLocation[i]); //change the card's location into player's handcard loction
        }
        this.cardArr.reverse();
    }
    dealTable(comCard, num) {
        this.cardArr.reverse();
        for (let i = 0; i < num; i++) {
            let newCard = this.cardArr.pop();
            comCard.addCard(newCard);
        }
        this.cardArr.reverse();
    }
    draw() { };
}