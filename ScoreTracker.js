function scoreTracker(player, score) {
    // note: no change to score if player folded
    
    if (score == 1) { // player won the round
        drawScore(player, 1);
        player.addPoint();
    }
    else if (score == -1) { // player lost the round without folding
        drawScore(player, -1);
        player.removePoint();
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