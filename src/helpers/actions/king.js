import store from '../../store/index.js';
import {Common} from './index.js';

export const kingAction = (payload) => {
    //TURN INFO
    let game = store.state.Game;
    let playedPlayer = game.playerTurn;
    let playedCard = game.playedCard;
    let selectedPlayer = payload.selectedPlayer;
    console.log("King")
    console.log(payload)
    //DISMISS CARD
    Common.dismissCard(playedPlayer, playedCard);

    //LOGIC
    //CHECK IF NO PLAYER LEFT, BYPASS CARD
    if(selectedPlayer < 0){
    }else{
        let player = game.players.find(x => x && x.id == selectedPlayer);
        //CHECK FOR UNTOUCHABLE FOR USER PLAYING, AI IS HANDLING ON EASY AI FUNCTION
        if(!player.isUntouchable){
            let temp = player.cards.pop();
            player.cards.push(playedPlayer.cards.pop());
            playedPlayer.cards.push(temp);
        }
    }
}   