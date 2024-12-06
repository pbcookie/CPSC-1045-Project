// Call any functions related to the beginning of the game (only keeping Players)
/*
function newGame() {
    resetScores();
    currentDeck = new Deck("circle", "triangle", "diamond", 8);
    newRound();
}


// Calls all of the necessary functions to start a new round
function newRound(currentDeck,humanPlayer,ComputerPlayer) {
    for(let i=0;i<randomNum(1,10);i++){
        currentDeck.shuffle();
    }
    currentDeck.dealPlayer(humanPlayer, 2);
    currentDeck.dealPlayer(ComputerPlayer, 2);
    currentDeck.dealTable(3);
}
*/

function randomNum(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game{
    constructor(player1,player2){
        this.player1 = player1;
        this.player2 = player2;
        this.comcard = new comCard();;
        this.deck =new Deck("Circle", "Diamond", "Triangle", 8);
        
        
    }
    newRound(){
        
        this.clearUp();
        
        this.comcard = new comCard();
        this.deck = new Deck("Circle", "Diamond", "Triangle", 8);
        this.deck.draw();
        for(let i=0;i<randomNum(1,10);i++){
            this.deck.shuffle();
        }
        this.deck.dealPlayer(this.player1, 2);
        this.player1.draw();//draw handcards
        this.deck.dealPlayer(this.player2, 2);
        this.player2.draw();//draw handcards
        this.deck.dealTable(this.comcard, 3);
        this.comcard.draw();
    }
    clearUp(){
        this.player1.clearUp();
        this.player2.clearUp();
        this.comcard.clearUp();
        this.deck.clearUp();
    }
    calculate(){
        let winner = CompareCard(this.player1,this.player2,this.comcard);
        
        if(winner == "draw"){
            console.log("this round is draw");
            output.style.color = 'lightgreen';
            output.innerHTML = "this round is draw";
            NextRoundbutton.style.display ="block";
        }
        else{
            winner.addPoint();
            if(winner == this.player1){
                updateScore('player1', this.player1.getScore());
                output.style.color = 'lightblue';
                output.innerHTML = "You Win Round";
                
            }
            else if(winner == this.player2){
                updateScore('player2', this.player2.getScore());
                output.style.color = 'pink';
                output.innerHTML = "You Lose Round"
            }
            ///check who get 3 points
            if(winner.getScore() === 3){
                console.log(winner.name + " is winner!");
                output.style.color = 'lightyellow';
                output.innerHTML = winner.name + " is winner!";
                NextRoundbutton.style.display ="none";
            }else{
                NextRoundbutton.style.display ="block";
            }
        }

    }
}

function bet(game){
    output.innerHTML = "";
    let comcard = game.comcard;
    let cpt = game.player2;
    if( comcard.cardArr[2].isFace()  ){
        for(let i=0;i<2;i++){
            cpt.cardArr[i].reveal();
            cpt.cardArr[i].clearUp();
            cpt.cardArr[i].draw();
        }
        game.calculate();
        betbutton.style.display = "none";
        foldbutton.style.display ="none";
        
    }
    else if( comcard.cardArr[1].isFace() ){
        comcard.cardArr[2].reveal();
        comcard.cardArr[2].clearUp();
        comcard.cardArr[2].draw();
    }
    else if( comcard.cardArr[0].isFace() ){
        comcard.cardArr[1]. reveal();
        comcard.cardArr[1].clearUp();
        comcard.cardArr[1].draw();
    }
    else {
        comcard.cardArr[0].reveal();
        comcard.cardArr[0].clearUp();
        comcard.cardArr[0].draw();
    }
}


function fold( game ){
    output.innerHTML = "";
    ctx.clearRect(displayA[0]-5,displayA[1]-5,610,130);
    ctx.clearRect(displayB[0]-5,displayB[1]-5,610,130);
    game.newRound();
    betbutton.style.display = "block";
    foldbutton.style.display ="block";
    NextRoundbutton.style.display ="none";
}




function playNewGame(player1,player2){
    output.innerHTML = "";
    console.log("Button clicked");
    newgame = new Game(player1,player2);
    fold(newgame);
    player1.point = 0;
    player2.point = 0;
    resetScores()
}