import store from '../../store/index.js';
import {Common} from './index.js';

export const princeAction = (payload) => {
    //TURN INFO
    let game = store.state.Game;
    let playedPlayer = game.playerTurn;
    let playedCard = game.playedCard;
    let selectedPlayer = payload.selectedPlayer;
    console.log("Prince")
    console.log(payload)
    //DISMISS CARD
    Common.dismissCard(playedPlayer, playedCard);

    //LOGIC
    let player = game.players.find(x => x && x.id == selectedPlayer);
    
    //NOTE: NO CASE FOR NO PLAYERS LEFT, AS IT IS INCLUDING ITSELF
    //DONE: HANDLE IF PRINCESS OUT OF GAME
    //CHECK FOR UNTOUCHABLE FOR USER PLAYING, AI IS HANDLING ON EASY AI FUNCTION
    if(!player.isUntouchable){
        let dismissedCard2 = player.cards.pop();
        if(dismissedCard2.strength == 8) player.isOutOfGame = true;
        else player.cards.push(game.deck.cards.pop());
        player.dismissedCards.push(dismissedCard2);
    }
}