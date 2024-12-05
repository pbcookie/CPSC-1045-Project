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
                    console.log("Error: scoreTracker switch case 'playerType'");
                    break;
            }
            break;
        case -1:
        // player lost the round without folding
            if (points > 0) { // score cannot become negative
                drawScore(player, -1);
                player.removePoint();
            }
            if (player.playerType == "human") {
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
    let score = player.getScore();

    // change the score dots gray by default
    for (i = 0; i < 3; i++) {
        let dot = document.getElementById(player + "-point" + i);
        dot.style.backgroundColor = "gray";
    }

    // for each point the player has, turn a score dot green
    for (i = 0; i < score; i++) {
        let dot = document.getElementById(player + "-point" + i);
        dot.style.backgroundColor = "green";
    }
}

// call canvas clear function(s), call new game function
function endMatch() {
    // TODO: cleanup and prepare for next game
}