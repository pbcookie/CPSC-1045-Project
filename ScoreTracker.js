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
            switch (player.playerType) {
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
    // draws the dots on the score tracker
    let tracker = document.getElementById(player + "tracker");
    // TODO: make sure the score tracker is named appropriately to work with the other functions being fed parameter "player"
    let canvas = document.getElementById(player);
    let ctx = canvas.getContext("2d");
    let score = player.getScore();

    // Draw gray circles representing empty score
    for (i = 0; i < 3; i++) {
        ctx.beginPath;
        ctx.translate(x + score * 100, y); // TODO: replace x and y with proper coordinates
        ctx.arc(); // TODO: draw a small gray circle representing an empty score
    }

    // for each point the player has, draw an according dot on the score tracker
    for (i = 0; i < score; i++) {
        ctx.beginPath;
        ctx.translate(x + score * 100, y); // TODO: replace x and y with proper coordinates
        ctx.arc(); // TODO: draw a small green circle in score tracker to represent point change   
    }
}

// call canvas clear function(s), call new game function
function endMatch() {
    // TODO: cleanup and prepare for next game
}