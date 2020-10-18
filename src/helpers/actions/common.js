export const dismissCard = (playedPlayer, playedCard) => {
    let dismissedCard;
    for (var i = 0; i < playedPlayer.cards.length; i++) {
        if (playedPlayer.cards[i].strength == playedCard) {
            dismissedCard = playedPlayer.cards[i];
            playedPlayer.cards.splice(i, 1);
            break;
        }
    }
    playedPlayer.dismissedCards.push(dismissedCard);
}