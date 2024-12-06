



function updateScore(player, round) {
    const scoreCircle = document.getElementById(`${player}-round${round}`);
    if (scoreCircle) {
        scoreCircle.classList.add('won');
    }
}
/*
//this function have been combined into game class
function roundWin(winner) {
    if (winner === 'player1') {
        player1Rounds++;
        updateScore('player1', player1Rounds);
    } else if (winner === 'player2') {
        player2Rounds++;
        updateScore('player2', player2Rounds);
    }

    if (player1Rounds === 3) {
        alert('Player 1 wins the match!');
        resetScores();
    } else if (player2Rounds === 3) {
        alert('Player 2 wins the match!');
        resetScores();
    }
}
*/
function resetScores() {
    /*
    player1Rounds = 0;
    player2Rounds = 0;
    */
    document.querySelectorAll('.score-circle').forEach(circle => {
        circle.classList.remove('won');
        circle.classList.remove('lost');
    });
}



/************************************************************Score tracker******************************************************************/
/*
// Player is the player whose tracker is being changed; Score is the value passed from the round result
function scoreTracker(player, score) {
    // note: no change to score if player folded
    let points = player.getScore();
    let lastPoint = false;

    switch (score) {
        case 1:
            // player won the round
            drawScore(player, 1);
            player.addPoint();
            switch (player.playertype) {
                case "human":
                    // human player won their 3rd point
                    if (points >= 3) {
                        alert("You won the match! Great game!");
                        lastPoint = true;
                    }
                    else {
                        alert("You won the hand!");
                        newRound();
                    }
                    break
                case "computer":
                    // computer player won their 3rd point
                    if (points >= 3) {
                        alert("You lost the match. Try a new game!")
                        lastPoint = true;
                    }
                    break;
                default:
                    console.log("Error: scoreTracker switch case 'playertype'");
                    break;
            }
            break;
        case -1:
            // player lost the round without folding
            if (points > 0) { // score cannot become negative
                drawScore(player, -1);
                player.removePoint();
            }
            if (player.playertype == "human") {
                alert("You lost the hand.");
                newRound();
            }
            break;
        case 0:
            // human and computer hands strengths are equal
            alert("Tie round!");
            newRound();
            break;
        default:
            console.log("Error: scoreTracker switch case 'score'");
            break;
    }

    if (lastPoint) {
        endMatch();
    }
}



// Player is the player whose tracker is being changed; Score is the value representing win or loss
function drawScore(player, score) {
    let playerScore = player.getScore();

    // change the score dots gray by default
    for (i = 0; i < 3; i++) {
        let dot = document.getElementById(player + "-point" + i);
        dot.style.backgroundColor = "gray";
    }

    // for each point the player has, turn a score dot green
    for (i = 0; i < playerScore; i++) {
        let dot = document.getElementById(player + "-point" + i);
        dot.style.backgroundColor = "green";
    }
}

// call canvas clear function(s), call new game function
function endMatch() {
    // TODO: cleanup and prepare for next game
}
*/