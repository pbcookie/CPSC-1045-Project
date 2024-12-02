

//Create a function that  draws the first card from the deck array, returns this card, shifts the remaining cards in the array forward by one position。
//decreases the deck count by one.
//change the card's location from deck to the player


//deck is an array of object cards
//player is an object of class player
//num is the nunber of cards that are dealed to the player
function dealplayerCards(deck, player, num){
  deck.reverse();
  for(let i=0;i<num;i++){
    let newCard =deck.pop(); 
    player.addCard(newCard);
    newCard.setLocation(player.handcardLocation[i]); //change the card's location into player's handcard loction
  }
  deck.reverse();
}


//deck is an array of object cards
//table is an array of object cards
//num is the nunber of cards that are dealed to the table
//tableLocation is the tableCards loction in ClassCard.js
function dealTableCards(deck, table, num){
  deck.reverse();
  for(let i=0;i<num;i++){
    let newCard =deck.pop(); 
    table.push(newCard);
    newCard.setLocation(tableLocation[i])
  }
  deck.reverse();
}
