// CPSC 1405 | Shehzad | Project | hand hierarchy

// hand strength hierarchy
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

// test hands
// let testHand = [1,2,3,4,8]; // high card
// let testHand = [1,2,3,4,1]; // one pair
// let testHand = [1,1,3,2,2]; // [1,1,2,3,3] [1,1,2,2,3] [1,2,2,3,3] // two pair
// let testHand = [3,2,3,4,3]; // three of a kind
// let testHand = [2,3,2,3,3]; // fullhouse

// console.log(testHand);

function countRepeats(playerHand, startIndex) {
    let count = 0;

    for (j = startIndex; j < playerHand.length; j++) { 

        if (playerHand[startIndex].number == playerHand[j].number) {
            count++;
        }
        else {
            break;
        }

    }
    return count;
}

function OfAKind(playerHand) {
    // counts the number of times a card value repeats
    let onePair = false;
    let twoPair = false;
    let threeOfAKind = false;
    let countingArray = playerHand.slice(); // create a copy of array so the manipulations are nondestructive
    countingArray.sort(); // sort so that the following counting algorithm works

    handType = "";

    for (i = 0; i < countingArray.length - 1; i++) { // loop through the entire hand

        let count = countRepeats(countingArray, i);

        i += count - 1;

        if (count == 3) {
            threeOfAKind = true;
        }
        else if (count == 2) {
            if (onePair) { // if a pair has already been counted, this is the second pair
                twoPair = true;
            }
            else { // if a pair has not yet been counted
                onePair = true;
            }
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

function straightCheck(playerHand) {
    // checks if hand contains a straight
    let sorted = playerHand.sort() 
    let isStraight = true;
    for (i = 0; i < sorted.length - 1; i++) {
        if ((sorted[i].number + 1) != sorted[i + 1].number) {
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

function bestHand(playerHand) {
    if (flushCheck(playerHand) && straightCheck(playerHand)) {
        handType = hierarchy[0];
    }
    else if (flushCheck(playerHand)) {
        handType = hierarchy[2];
    }
    else if (straightCheck(playerHand)) {
        handType = hierarchy[3];
    }
    else {
        handType = OfAKind(playerHand);
    }
    return handType;
}