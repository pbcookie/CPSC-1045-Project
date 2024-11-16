function shuffle(deck) {
    let i = deck.length;
  
    while (i != 0) {
      let j = Math.floor(Math.random() * i);
      i--;
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}