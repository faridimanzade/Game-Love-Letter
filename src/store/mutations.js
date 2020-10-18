import {
    entities,
    actions,
    AI
} from '../helpers/index.js';

export default {
    initializeGame(state, payload) {
        let game = payload;
        state.Game = game;
        return state;
    },

    startTurn(state, payload) {
        state.Game.playerTurn.cards.push(state.Game.deck.cards.pop());

        return state;
    },

    makeTurn(state, payload) {
        state.Game.playedCard = payload;

        return state;
    },

    playTurn(state, payload) {
        let game = state.Game;

        //DONE MAKE PLAYER LOSE IF IT PLAYED PRINCE OR KING INSTEAD OF COUNTESS
        let playedCard = state.Game.playedCard;
        let selectedPlayer = payload.playedTo || null;
        let predictedCard = payload.predictedCard || null;

        let userPlayer = game.players[0];
        //CHECK IF PLAYER HAS COUNTESS AND PRINCE OR KING AT THE SAME TIME
        let hasCountess = userPlayer.cards.find(x => x && x.strength == 7);
        let hasPrinceOrKing = userPlayer.cards.find(x => x && x.strength == 5 || x.strength == 6);

        //ELIMINATE PLAYER IF HE PLAYED COUNTESS INSTEAD OF PRINCE OR KING
        if(hasCountess && hasPrinceOrKing && playedCard != 7){
            for(var i=0; i<userPlayer.cards; i++)
                userPlayer.dismissedCards.push(userPlayer.cards.pop())
                userPlayer.isOutOfGame = true;
        }else{
            let clearPayload;
            state.Game.playedTo = selectedPlayer;
            state.Game.predictedCard = predictedCard;
    
            if (selectedPlayer && predictedCard) clearPayload = {
                selectedPlayer,
                predictedCard
            };
            else if (selectedPlayer) clearPayload = {
                selectedPlayer
            };
            else clearPayload = null;
    
            switch (playedCard) {
                case 1: //Guard
                    actions.Guard.guardAction(clearPayload);
                    break;
                case 2: //Priest
                    actions.Priest.priestAction(clearPayload);
                    break;
                case 3: //Baron
                    actions.Baron.baronAction(clearPayload);
                    break;
                case 4: //Handmaid
                    actions.Handymaid.handymaidAction(clearPayload);
                    break;
                case 5: //Prince
                    actions.Prince.princeAction(clearPayload);
                    break;
                case 6: //King
                    actions.King.kingAction(clearPayload);
                    break;
                case 7: //Countess
                    actions.Countess.countessAction(clearPayload);
                    break;
                case 8: //Princess
                    actions.Princess.princessAction(clearPayload);
                    break;
                default:
            }
        }


        $('.preloaderAIplay').fadeIn().delay(1000).fadeOut(1000);
        $(".dashBoardModal").delay(2000).fadeIn(1000);
        setTimeout(function () {
            $(".dashBoardModal").css("display", "flex");
        }, 2000);


        AI.Easy.easyActions();

        //CHECK IF PLAYER IS OUT OF GAME FINISH THE ROUND
        if (game.playerTurn.isOutOfGame) {
            while (!game.isRoundFinished) {
                AI.Easy.easyActions();
            }
        }

        return state;
    },
};