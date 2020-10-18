import store from '../../store/index.js';
import {Common} from './index.js';

export const countessAction = (payload) => {
    //TURN INFO
    let game = store.state.Game;
    let playedPlayer = game.playerTurn;
    let playedCard = game.playedCard;
    console.log("Countess")
    console.log(payload)
    //LOGIC

    //DISMISS CARD
    Common.dismissCard(playedPlayer, playedCard);
}