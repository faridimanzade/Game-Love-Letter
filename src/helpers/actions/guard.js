import store from '../../store/index.js';
import {Common} from './index.js';

export const guardAction = (payload) => {
    //TURN INFO
    let game = store.state.Game;
    let playedPlayer = game.playerTurn;
    let playedCard = game.playedCard;
    let selectedPlayer = payload.selectedPlayer;
    let predictedCard = payload.predictedCard;

    console.log("Guard")
    console.log(payload)
    //LOGIC
    //CHECK IF NO PLAYER LEFT, BYPASS CARD
    if(selectedPlayer < 0){
    }else{
        let player = game.players.find(x => x && x.id == selectedPlayer);
        let isPredicted = player.cards.find(x => x && x.strength == predictedCard);
        
        //CHECK FOR UNTOUCHABLE FOR USER PLAYING, AI IS HANDLING ON EASY AI FUNCTION
        if(isPredicted && !player.isUntouchable){
            player.isOutOfGame=true;
            player.dismissedCards.push(player.cards.pop());
        }else{
        }
    }

    //DISMISS CARD
    Common.dismissCard(playedPlayer, playedCard);
}