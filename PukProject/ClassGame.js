function randomNum(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const audioShuffle = document.getElementById("audio-shuffle");
const audioFlip = document.getElementById("audio-flip");
const audioChips = document.getElementById("audio-chips");
const audioWin = document.getElementById("audio-win");
const audioLose = document.getElementById("audio-lose");

class Game{
    constructor(player1,player2){
        this.player1 = player1;
        this.player2 = player2;
        this.comcard = new comCard();;
        this.deck =new Deck("Circle", "Diamond", "Triangle", 8);
        
        
    }
    newRound(){
        
        this.clearUp();
        audioShuffle.play();
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
            output.innerHTML = "This round is draw";
            NextRoundbutton.style.display ="block";
        }
        else{
            winner.addPoint();
            if(winner == this.player1){
                updateScore('player1', this.player1.getScore());
                output.style.color = 'lightblue';
                output.innerHTML = "You won the hand!";
            }
            else if(winner == this.player2){
                updateScore('player2', this.player2.getScore());
                output.style.color = 'pink';
                output.innerHTML = "You lost the hand!"
            }
            ///check who get 3 points
            if(winner.getScore() === 3){
                if(winner == this.player1){
                    audioWin.play();
                }
                else {
                    audioLose.play();
                }
                console.log(winner.name + " wins!");
                output.style.color = 'lightyellow';
                output.innerHTML = winner.name + " wins!";
                NextRoundbutton.style.display ="none";
                showHidePlayButton();
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
    audioChips.play();
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
    audioFlip.play();
    output.innerHTML = "";
    ctx.clearRect(displayA[0]-5,displayA[1]-5,610,130);
    ctx.clearRect(displayB[0]-5,displayB[1]-5,610,130);
    betbutton.style.display = "block";
    foldbutton.style.display ="block";
    NextRoundbutton.style.display ="none";
    setTimeout(game.newRound(), 1000);
}


function playNewGame(player1,player2){
    output.innerHTML = "";
    console.log("Button clicked");
    newgame = new Game(player1,player2);
    fold(newgame);
    player1.point = 0;
    player2.point = 0;
    resetScores()
    showHidePlayButton();
}

let playButton = document.getElementById("play");

// don't display the Play button during a live round. This function hides the button if currently shown, and shows if hidden.
function showHidePlayButton() {
    if (playButton.style.display == "none") {
        playButton.style.display = "block";
    }
    else {
        playButton.style.display = "none";
    }
}