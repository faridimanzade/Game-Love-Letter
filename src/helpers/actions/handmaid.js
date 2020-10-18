import store from '../../store/index.js';
import {Common} from './index.js';

export const handymaidAction = (payload) => {
    //TURN INFO
    let game = store.state.Game;
    let playedPlayer = game.playerTurn;
    let playedCard = game.playedCard;
    console.log("Handmaid")
    console.log(payload)
    //LOGIC
    playedPlayer.isUntouchable = true;

    //DISMISS CARD
    Common.dismissCard(playedPlayer, playedCard);
}