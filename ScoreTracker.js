function scoreTracker(player, score) {
    // note: no change to score if player folded
    
    if (score == 1) { // player won the round
        drawScore(player, 1);
        player.addPoint();
    }
    else if (score == -1) { // player lost the round without folding
        if (player.getScore > 0) { // score cannot become negative
            drawScore(player, -1);
            player.removePoint();
        }
    }
    else if (score == 0) {
        alert("Tie round!"); // human and computer hands strengths are equal
    }
}

function drawScore(player, score) {
    // draws the dots on the score tracker
    let tracker = document.getElementById(player + "tracker");
    let canvas = document.getElementById(""); // TODO: replace with the proper canvas element id 
    let ctx = canvas.getContext("2d");
    let score = player.getScore();
    ctx.beginPath;
    ctx.translate(x + score * 100, y); // TODO: replace x and y with proper coordinates
    ctx.arc(); // TODO: draw a small circle in score tracker to represent point change
}

function win() {
    // called when round ends and the human player wins
    scoreTracker(player, 1);
    alert("You won the hand!");
    endRound()
}

function lose() {
    // called when round ends and human player loses
    scoreTracker(player, -1);
    alert("You lost the hand.");
    endRound();
}

function endRound() {
    // called after winner/loser/tie is declared in a round or if the player folds
    if (Player[human].getScore >= 3) {
        endMatch(); 
    }
    else if (Player[computer].getScore >= 3) {
        endMatch();
    }
    else {
        // clean up table and set up next round
        newRound();
    }
}

function endMatch() {
    // TODO: cleanup and prepare for next game
}