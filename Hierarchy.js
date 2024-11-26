// CPSC 1405 | Shehzad | Project | hand hierarchy

// first check where the hand is in the hierarchy
// Straight Flush = 0
// Full House = 1
// Flush = 2
// Straight = 3
// Three of a kind = 4
// Two Pair = 5
// Pair = 6
// High card = 7
let hierarchy = ["Straight Flush", "Full House", "Flush", "Straight", "Three of a Kind", "Two Pair", "Pair", "High Card"];

// then if hand strengths are tied, compare values of the cards
// Two Pair vs Two Pair: the better pair wins; compare the second pair only if first pair is tied
// Full House vs Full House: highest 3 of a Kind wins; compare the pair only if 3 of a Kind is tied

//console.log(OfAKind(testHand));

let testSort = [5,4,3,2,1]; // [1,2,3,4,5] [3,2,1,5,4] [4,1,5,3,2] [1,1,3,2,2] [5,1,1,1,1] [1,2,1,2,1]

console.log(sortHand([5,4,3,2,1]));

//console.log(straightCheck([1,2,3,4,6]))

// test hands
let testHighCard = [1,2,3,4,5]; // [5,4,3,2,1] [2,4,1,5,3]
let testOnePair = [1,2,3,4,1]; // [1,1,2,3,4] [2,3,4,1,1] [2,3,1,4,1] 
let testTwoPair = [1,1,3,2,2]; // [1,1,2,3,2] [1,1,2,2,3] [1,2,1,2,3] [1,2,1,3,2] [1,2,3,2,1] [3,1,1,2,2] [3,1,2,1,2] [1,2,3,2,1]
let testThreeOfAKind = [3,2,3,4,3]; // [3,3,2,4,3] [3,2,3,3,4] [3,2,4,3,3] [3,3,2,3,4] [2,4,3,3,3] [3,2,3,4,3] [2,3,3,3,4] [2,3,4,3,3]
let testFullHouse = [3,3,3,2,2]; // [3,3,2,2,3] [3,2,3,3,2] [3,2,2,3,3] [3,3,2,3,2] [2,2,3,3,3] [3,2,3,2,3] [2,3,3,3,2] [2,3,2,3,3]

function countRepeats(playerHand, card) {
    let count = 1;
    for (j = 1; j < playerHand.length; j++) { 
        // if (card.value() = playerHand[j].value()) {
        if (card == playerHand[j]) {
            count++;
        }
    }
    return count;
}

function OfAKind(playerHand) {
    // counts the number of times a card value repeats
    let onePair = false;
    let twoPair = false;
    let threeOfAKind = false;

    handType = "";
    for (i = 0; i < playerHand.length - 1; i++) { // loop through the entire hand
        let count = countRepeats(playerHand, playerHand[i]);
        console.log("card: " + playerHand[i]);
        console.log(count);
        console.log("onePair: " + onePair);
        if (count == 2) {
            if (!onePair) { // if a pair has not yet been counted
                onePair == true;
            }
            else { // a pair has already been counted, making this the second pair
                twoPair == true;
            }
        }
        else if (count == 3) {
            threeOfAKind == true;
        }
    }
    if (threeOfAKind && onePair) { // this is a Full House type of hand
        handType = hierarchy[1];
    }
    else if (threeOfAKind) {
        handType = hierarchy[4];
    }
    else if (twoPair) {
        handType = hierarchy[5];
    }
    else if (onePair) {
        handType = hierarchy[6];
    }
    else { // no pairs, only a high card
        handType = hierarchy[7];
    }
    return handType;
}

function sortHand(playerHand) {
    // sorts the given array in ascending order

    for (i = 0; i < playerHand.length - 1; i++) {
        let currentMin = playerHand[i];
        let mindex = i;
        for (j = i + 1; i < playerHand.length; j++) {
            if (playerHand[j] < currentMin) {
                mindex = j;
                currentMin = playerHand[j];
            }
        }
        if (mindex != i) {
            playerHand[mindex] = playerHand[i];
            playerHand[i] = currentMin;
        }
    }

    return playerHand;
}

function straightCheck(playerHand) {
    // checks if hand contains a straight
    let sorted = sortHand(playerHand.slice(0, (playerHand.length - 1)));
    let isStraight = true;
    for (i = 0; i < sorted.length - 1; i++) {
        if ((sorted[i] + 1) != sorted[i + 1]) {
            return isStraight = false;
        }
    }
    return isStraight;
}

function flushCheck(playerHand) {
    // checks if hand contains a flush, i.e. all cards have the same symbol
    let isFlush = true;
    for (i = 0; i < playerHand.length - 1; i++) {
        if (playerHand[i].type != playerHand[i + 1].type) {
            return isFlush = false;
        }
    }
    return isFlush;
}