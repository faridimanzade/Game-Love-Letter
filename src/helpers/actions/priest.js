import store from '../../store/index.js';
import {Common} from './index.js';

function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}

export const priestAction = (payload) => {
    //TURN INFO
    let game = store.state.Game;
    let playedPlayer = game.playerTurn;
    let playedCard = game.playedCard;
    let selectedPlayer = payload.selectedPlayer;
    console.log("Priest")
    console.log(payload)

    if(playedPlayer.id == 0){
        let findImageOfPlayer = game.players[selectedPlayer];
        let imageOfCard = "back-card";
        if(findImageOfPlayer && findImageOfPlayer.cards && findImageOfPlayer.cards.length != 0)
            imageOfCard = findImageOfPlayer.cards[0].name;

        if (selectedPlayer == 1) {
            //TODO/DONE FIX IMAGES
            setTimeout(function () {
                $(".user-1>img").attr("src", `src/assets/images/${imageOfCard}.jpg`);
            }, 50);
        } else if (selectedPlayer == 2) {
            setTimeout(function () {
                $(".user-2>img").attr("src", `src/assets/images/${imageOfCard}.jpg`);
            }, 50);
        } else if (selectedPlayer == 3) {
            setTimeout(function () {
                $(".user-3>img").attr("src", `src/assets/images/${imageOfCard}.jpg`);
            }, 50);
        }
    }


    //TODO FIX THIS PROBLEM, IT SHOWS CARD AFTER AI IS PLAYED
    setTimeout(function () {
        if(playedPlayer.id == 0){
            sleep(3); 
            $(".user-1>img, .user-2>img, .user-3>img").attr("src", "src/assets/images/back-card.jpg");
        }
    },500);
    

    //LOGIC
    //CHECK IF NO PLAYER LEFT, BYPASS CARD
    if(selectedPlayer < 0){
    }else{
        let player = game.players.find(x => x && x.id == selectedPlayer);
        playedPlayer.brain.push({ playerId: player.id, playerCard: player.cards[0].strength })
    }

    //DISMISS CARD
    Common.dismissCard(playedPlayer, playedCard);
}