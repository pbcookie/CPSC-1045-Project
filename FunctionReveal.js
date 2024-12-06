// PROBABLY WILL ADD TO TEST.JS
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("fold").addEventListener("click", fold);
    document.getElementById("bet").addEventListener("click", bet);
});

function reveal() {
    // Check and reveal player's cards
    document.querySelectorAll('.hand .card').forEach(card => {
        card.classList.add('revealed'); 
    });

    // Check and reveal computer's cards
    document.querySelectorAll('.computer-cards .card').forEach(card => {
        card.classList.add('revealed');
    });

    // Check and reveal community/table cards
    document.querySelectorAll('.table-cards .card').forEach(card => {
        card.classList.add('revealed');
    });

    console.log("All cards have been revealed!");
}


let currentStage = 0;

function bet() {
    console.log(currentStage);
    console.log(tableCards.cardArr.length);
    console.log(tableCards.cardArr);

    if (currentStage < tableCards.cardArr.length) {
        tableCards.cardArr[currentStage].setFace(true);
        tableCards.cardArr[currentStage].draw();
        currentStage++;
    } else {
        alert('all cards')
        reveal(); // Reveal all remaining cards
    }
}

function fold() {
    reveal(); // Reveal all cards
    alert("Player folded. Moving to the next round.");
    newGame(); // Reset for the next round
}

// WILL ADD TO CSS
// #pokerCard{
//     z-index: 0;
//     pointer-events: none;
// }

// .card.revealed {
//     background-color: beige; 
//     color: black; 
//     border: 2px solid black;
// }