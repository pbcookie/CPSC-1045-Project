//Convert the combination of the players' handcard and the commnunication card into a string of numbers and then compare. 
//display palyers' handcard
//return the winner's name

//playerA and playerB are the instances of class Player
//cCardArr is the array of communication card
CompareCard(playerA,playerB,cCardArr){
    let fivecardA = ArrToStr(playerA.getHandCards().concat(cCardArr));
    let fivecardB = ArrToStr(playerB.getHandCards().concat(cCardArr));
    if( Number(fivecardA) > Number(fivecardB)){
        return playerA.getName();
    }else if( Number(handcardA) < Number(handcardB)){
        return playerB.getName();
    }else{
        return "draw";
    }
}

//translate array of card into a string of number

//We can use a "+" string to convert five cards into a 6-digit number. Start by adding the five cards to an array, then sort them. Depending on the hand type, prefix the string with a number to indicate its rank, followed by the values of the cards in order. Here’s the breakdown:
1.Straight Flush: Prefix with "6" and then append the five card values in order.
2.Full House: Prefix with "5". First, append the value of the three matching cards, then append the pair’s value.
3.Flush: Prefix with "4" and then append all five card values in order.
4.Three of a Kind: Prefix with "3". Append the value of the three matching cards, followed by the other two card values in order.
5.High Card: Simply append the five card values in descending order.
After converting both hands into 6-digit strings, we can directly compare the two strings to determine the winner.
//

function ArrToStr(arr){
    //first, sort the array of cards
    //because the card is not string,but object, we need function in sort method
    arr.sort(function(a,b){return a.number - b.number});
    let str;
    //identify which type the cards are
    if(IsStraightFlush(arr)){
        str = "6";
    }else{
        if(IsFullHouse(arr)){
            str = "5";
        }else{
            if(IsFlush(arr)){
                str = "4";
            }else{
                if(IsThreeofKind(arr)){
                    str = "3";
                }else{
                    if(IsTwoPair(arr)){
                        str = "2";
                    }else{
                        if(IsOnePair(arr)){
                            str ="1";
                        }
                    }
                }
            }
        }
    }
    //add rest number to the str
    for(i=0;i<arr.length;i++){
        str += arr[i];
    }
    return str;
}


//five of funtions identying the type of cards and sorting them in order by the type of cards

function IsStraightFlush(arr){
    for(i=1;i<arr.length;i++){
        if(arr[0].type !== arr[i].type ){return false;}
        if(arr[0].number - arr[i].number !== i){return false;} 
    }
    return true;
}

function IsFullHouse(arr){
    //if arr is fullhouse, arr is XXYYY or XXXYY, no other case
    if( arr[0].number === arr[1].number && arr[0].number === arr[2].number && arr[3].number === arr[4].number){return true;}
    if( arr[0].number === arr[1].number && arr[2].number === arr[3].number && arr[2].number === arr[4].number){
        [arr[0],arr[4]] = [arr[4],arr[0]];
        [arr[1],arr[3]] = [arr[3],arr[1]];
        return true;}
    //other case
    return false;
}


function IsFlush(arr){
    for(i=1;i<arr.length;i++){
        if(arr[0].type !== arr[i].type ){return false;}
    }
    return true;
}

function IsThreeofKind(arr){
    //only three case:
    //01234
    //YYYXZ
    //XYYYZ
    //XZYYY
    if(arr[0].number === arr[1].number && arr[0].number === arr[2].number){return true;}
    if(arr[1].number === arr[2].number && arr[1].number === arr[3].number){
        [arr[0],arr[3]] = [arr[3],arr[0]];
        return true;
    }
    if(arr[2].number === arr[3].number && arr[2].number === arr[4].number){
        [arr[0],arr[3]] = [arr[3],arr[0]];
        [arr[1],arr[4]] = [arr[4],arr[1]];
        return true;
    }
    return false;
}

function IsTwoPair(arr){
    //three case
    //01234
    //ZXXYY
    //XXZYY
    //XXYYZ
    if(arr[1].number === arr[2].number && arr[3].number === arr[4].number){
        [arr[0],arr[4]] = [arr[4],arr[0]];
        [arr[0].arr[2]] = [arr[2],arr[0]];
        return true;
    }
    if(arr[0].number === arr[1].number && arr[3].number === arr[4].number){
        [arr[2],arr[4]] = [arr[4],arr[2]];
        return true;
    }
    if(arr[0].number === arr[1].number && arr[2].number === arr[3].number){return true;}
    return false;
}

function IsOnePair(arr){
    //01234
    //XXqwe
    //qXXwe
    //qwXXe
    //qweXX
    for(i=0;i<arr.length-1;i++){
        if(arr[i].number === arr[i+1].number){
            if(i !== 0){
                [arr[0].arr[i]] = [arr[i],arr[0]];
                [arr[1],arr[i+1]] = [arr[i+1],arr[1]];
            }
            return true;
        }
    }
    return false;
}


