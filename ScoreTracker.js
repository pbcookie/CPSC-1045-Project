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
    
}

function drawScore(player, score) {
    // draws the dots on the score tracker
    let tracker = document.getElementById(player + "tracker");
    let canvas = document.getElementById("");
    let ctx = canvas.getContext("2d");
    let score = player.getScore();
    ctx.beginPath;
    ctx.translate(x + score * 100, y); // replace x and y with proper coordinates
    ctx.arc(); // draw a small circle in score tracker to represent point change
}

function win() {
    scoreTracker(player, 1);
    alert("You won the hand!");
    if (ClassPlayer[human].getScore >= 3) {
        endRound();
    }
}

function lose() {
    scoreTracker(player, -1);
    alert("You lost the hand.");
    if (ClassPlayer[computer].getScore >= 3) {
        endRound();
    }
}

function endRound() {
    // 
}