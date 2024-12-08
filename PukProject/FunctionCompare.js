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
