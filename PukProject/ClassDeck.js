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
            arr += this.cardArr[i].display() + "//"; 
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
    draw() { 
        let width = this.cardArr[0].cw;
        let height = this.cardArr[0].ch;
        drawDeck(this.location[0],this.location[1],width, height);
    };
    clearUp(){
        let width = this.cardArr[0].cw;
        let height = this.cardArr[0].ch;
        ctx.clearRect(this.location[0], this.location[1], width+10, height);
    }
}