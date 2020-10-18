import store from '../../store/index.js';
import {Common} from './index.js';

export const princessAction = (payload) => {
    //TURN INFO
    let game = store.state.Game;
    let playedPlayer = game.playerTurn;
    let playedCard = game.playedCard;
    console.log("Princess")
    console.log(payload)
    //LOGIC
    playedPlayer.isOutOfGame=true;

    //DISMISS CARD
    Common.dismissCard(playedPlayer, playedCard);

    //DISMISS CARD ON HAND
    playedPlayer.dismissedCards.push(playedPlayer.cards.pop());
}