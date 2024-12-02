//Create an array of cards containing three suits for a total of 24 cards. 
//Create a variable to represent the number of cards in the deck. 
//Create a function that  draws the first card from the deck array, returns this card, shifts the remaining cards in the array forward by one position。
//decreases the deck count by one.
function dealCards(deck, player){
  player.addCard(deck.reverse().pop());
  deck.reverse();
}
