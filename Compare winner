//Convert the players' handcard to a string of numbers and then compare. 
//display palyers' handcard
//return the winner's name

//playerA and playerB are the instances of class Player
CompareCard(playerA,playerB){
    let handcardA = ArrToStr(playerA.getHandCards());
    let handcardB = ArrToStr(playerB.getHandCards());
    if( Number(handcardA) > Number(handcardB)){
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
    return string
}
