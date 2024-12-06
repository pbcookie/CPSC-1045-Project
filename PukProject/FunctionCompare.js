//Convert the combination of the players' handcard and the community card into a string of numbers and then compare. 
//display palyers' handcard
//return the winner's name

//playerA and playerB are the instances of class Player
//cCardArr is the array of Community cards

function CompareCard(playerA, playerB, comcards) {
    let fiveArrA = playerA.getHandCards().concat(comcards.cardArr);
    let fiveArrB = playerB.getHandCards().concat(comcards.cardArr);
    let fivecardA = ArrToStr(fiveArrA);
    let fivecardB = ArrToStr(fiveArrB);
    //display the result of the cardarray
    for(let i=0;i<5;i++){
        let cardA = fiveArrA[i];
        drawCard(displayA[0]+i*(cardA.cw + 10)   ,displayA[1],cardA.cw,cardA.ch,cardA.number,cardA.type);
    }
    for(let i=0;i<5;i++){
        let cardB = fiveArrB[i];
        drawCard(displayB[0]+i*(cardB.cw + 10)   ,displayB[1],cardB.cw,cardB.ch,cardB.number,cardB.type);
    }
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    let textA;
    switch(Number(fivecardA[0])){
        case 7:
            textA = "StraightFlush";
            break;
        case 6:
            textA = "FullHouse";
            break;
        case 5:
            textA = "Flush";
            break;
        case 4:
            textA = "Straight";
            break;
        case 3:
            textA = "ThreeofKind";
            break;
        case 2:
            textA = "TwoPair";
            break;
        case 1:
            textA = "OnePair";
            break;
        case 0:
            textA = "HighCard";
            break;
    }
    ctx.fillText(textA, 830, 730);
    let textB;
    switch(Number(fivecardB[0])){
        case 7:
            textB = "StraightFlush";
            break;
        case 6:
            textB = "FullHouse";
            break;
        case 5:
            textB = "Flush";
            break;
        case 4:
            textB = "Straight";
            break;
        case 3:
            textB = "ThreeofKind";
            break;
        case 2:
            textB = "TwoPair";
            break;
        case 1:
            textB = "OnePair";
            break;
        case 0:
            textB = "HighCard";
            break;
    }
    ctx.fillText(textB,830,75);



    //comparing the str
    if (Number(fivecardA) > Number(fivecardB)) {
        return playerA;
    } else if (Number(fivecardA) < Number(fivecardB)) {
        return playerB;
    } else {
        return "draw";
    }
}
 

//translate array of card into a string of number

/*We can use a "+" string to convert five cards into a 6-digit number. Start by adding the five cards to an array, then sort them. Depending on the hand type, prefix the string with a number to indicate its rank, followed by the values of the cards in order. Here’s the breakdown:
1.Straight Flush: Prefix with "6" and then append the five card values in order.
2.Full House: Prefix with "5". First, append the value of the three matching cards, then append the pair’s value.
3.Flush: Prefix with "4" and then append all five card values in order.
4.Three of a Kind: Prefix with "3". Append the value of the three matching cards, followed by the other two card values in order.
5.High Card: Simply append the five card values in descending order.
After converting both hands into 6-digit strings, we can directly compare the two strings to determine the winner.
*/

function ArrToStr(arr) {
    //first, sort the array of cards
    //because the card is not string,but object, we need function in sort method
    arr.sort(function (a, b) { return b.number - a.number });
    console.log("The five number arr is " + arr);
    let str;
    //identify which type the cards are

    if (IsStraightFlush(arr)) {
        console.log("StraightFlush");
        str = "7";
    } else {
        if (IsFullHouse(arr)) {
            str = "6";
            console.log("FullHouse");
        } else {
            if (IsFlush(arr)) {
                str = "5";
                console.log("Flush");
            } else {
                if (IsStraight(arr)) {
                    str = "4";
                    console.log("Straight");
                } else {
                    if (IsThreeofKind(arr)) {
                        str = "3";
                        console.log("ThreeofKind");
                    } else {
                        if (IsTwoPair(arr)) {
                            str = "2";
                            console.log("TwoPair");
                        } else {
                            if (IsOnePair(arr)) {
                                str = "1";
                                console.log("OnePair");
                            } else {
                                str = "0";
                                console.log("HighCard");
                            }
                        }
                    }
                }
            }
        }
    }

    //add rest number to the str
    for (i = 0; i < arr.length; i++) {
        str += arr[i].number;
    }
    return str;
}

//five of funtions identying the type of cards and sorting them in order by the type of cards

function IsStraightFlush(arr) {
    if (IsStraight(arr) && IsFlush(arr)) {
        return true;
    }
    return false;
}

function IsFullHouse(arr) {
    //if arr is fullhouse, arr is XXYYY or XXXYY, no other case
    if (arr[0].number === arr[1].number && arr[0].number === arr[2].number && arr[3].number === arr[4].number) { return true; }
    if (arr[0].number === arr[1].number && arr[2].number === arr[3].number && arr[2].number === arr[4].number) {
        [arr[0], arr[4]] = [arr[4], arr[0]];
        [arr[1], arr[3]] = [arr[3], arr[1]];
        return true;
    }
    //other case
    return false;
}

function IsFlush(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[0].type !== arr[i].type) { return false; }
    }
    return true;
}

function IsStraight(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[0].number - arr[i].number !== i) { return false; }
    }
    return true;
}

function IsThreeofKind(arr) {
    //only three case:
    //01234
    //YYYXZ
    //XYYYZ
    //XZYYY
    if (arr[0].number === arr[1].number && arr[0].number === arr[2].number) { return true; }
    if (arr[1].number === arr[2].number && arr[1].number === arr[3].number) {
        [arr[0], arr[3]] = [arr[3], arr[0]];
        return true;
    }
    if (arr[2].number === arr[3].number && arr[2].number === arr[4].number) {
        [arr[0], arr[3]] = [arr[3], arr[0]];
        [arr[1], arr[4]] = [arr[4], arr[1]];
        return true;
    }
    return false;
}

function IsTwoPair(arr) {
    //three case
    //01234
    //ZXXYY
    //XXZYY
    //XXYYZ
    if (arr[1].number === arr[2].number && arr[3].number === arr[4].number) {
        [arr[0], arr[4]] = [arr[4], arr[0]];
        [arr[0], arr[2]] = [arr[2], arr[0]];
        return true;
    }
    if (arr[0].number === arr[1].number && arr[3].number === arr[4].number) {
        [arr[2], arr[4]] = [arr[4], arr[2]];
        return true;
    }
    if (arr[0].number === arr[1].number && arr[2].number === arr[3].number) { return true; }
    return false;
}

function IsOnePair(arr) {
    //01234
    //XXqwe
    //qXXwe
    //qwXXe
    //qweXX
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].number === arr[i + 1].number) {
            switch(i){
                case 3:
                    [arr[2],arr[4]]=[arr[4],arr[2]];
                    [arr[1],arr[3]]=[arr[3],arr[1]];
                    [arr[0],arr[2]]=[arr[2],arr[0]];
                    break;
                case 2:
                    [arr[0],arr[2]]=[arr[2],arr[0]];
                    [arr[1],arr[3]]=[arr[3],arr[1]];
                    break;
                case 1:
                    [arr[0],arr[2]]=[arr[2],arr[0]];
                    break;
                case 0:
                    break;
                default:
                    console.log("No case matched");
            }
            return true;
        }
    }
    return false;
}
/** HIERARCHY CODE (Brian's work)

// hand strength hierarchy: strongest to weakest, left to right
let hierarchy = ["Straight Flush", "Full House", "Flush", "Straight", "Three of a Kind", "Two Pair", "Pair", "High Card"];

// If hand strengths are tied, compare values of the cards
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
    // counts number of times the given card value appears in the hand
    let count = 0;

    for (j = startIndex; j < playerHand.length; j++) {

        if (playerHand[startIndex].getNum() == playerHand[j].getNum()) {
            count++;
        }
        else {
            break;
        }

    }
    return count;
}

function OfAKind(playerHand) {
    // assigns hand types and strength based on number of repeats
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
    // checks if hand contains a straight and returns boolean
    let sorted = playerHand.sort()
    let isStraight = true;
    for (i = 0; i < sorted.length - 1; i++) {
        if ((sorted[i].getNum() + 1) != sorted[i + 1].getNum()) {
            return isStraight = false;
        }
    }
    return isStraight;
}

function flushCheck(playerHand) {
    // checks if hand contains a flush, i.e. all cards have the same symbol and returns boolean
    let isFlush = true;
    for (i = 0; i < playerHand.length - 1; i++) {
        if (playerHand[i].getType() != playerHand[i + 1].getType()) {
            return isFlush = false;
        }
    }
    return isFlush;
}

function bestHand(playerHand) {
    // evaluates the hand based on hierarchies of strength
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
*/