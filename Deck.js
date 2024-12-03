//create a array of cards as deck


//using "type1" "type2" "type3" to represent the type of card
const deckArray = creatNewDeck(8,"type1","type2","type3");
displayDeck(deckArray);

function creatNewDeck(num,t1,t2,t3){
    let deckArr = [];
    for(let i=0;i<num;i++){
        deckArr.push(new Card(i+1,t1));
    }
    for(let i=0;i<num;i++){
        deckArr.push(new Card(i+1,t2));
    }
    for(let i=0;i<num;i++){
        deckArr.push(new Card(i+1,t3));
    }
    return deckArr;
}

function displayDeck(deckArr){
    let arr = [];
    for(let i = 0; i<deckArr.length;i++){
        arr.push(deckArr[i].getNum()+ " " +deckArr[i].getType());
    }
    console.log(arr);
}
