function updateScore(player, round) {
    const scoreCircle = document.getElementById(`${player}-round${round}`);
    if (scoreCircle) {
        scoreCircle.classList.add('won');
    }
}

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
