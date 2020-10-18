import store from '../../store/index.js';
import {constants, actions, entities} from '../index.js'

//CHECK IN EVERY FILE AND EVERY FUNCTION FOR x &&, because of undefined error
const createRandomPayload = (player) => {
    let game = store.state.Game;

    //CHOOSE RANDOM PLAYER WHO IS ALIVE AND NOT UNTOUCHABLE(INCLUDING HIMSELF FOR PRINCE AND EXCEPT HIMSELF FOR OTHERS)
    let alivePlayersExceptHimself = game.players.filter(x => x && x.isOutOfGame == false && x.isUntouchable == false && x.id != player.id);
    let alivePlayersIncludingHimself = game.players.filter(x => x && x.isOutOfGame == false && x.isUntouchable == false);

    let randomPlayerExcHimself = alivePlayersExceptHimself[Math.floor(Math.random() * alivePlayersExceptHimself.length)];
    let randomPlayerIncHimself = alivePlayersIncludingHimself[Math.floor(Math.random() * alivePlayersIncludingHimself.length)];

    //CHECK IF PLAYERS AVAILABLE TO PLAY AGAINST
    if(!randomPlayerExcHimself || randomPlayerExcHimself.length == 0){
        randomPlayerExcHimself = {id: -1}
    }

    //MAKE PLAYERTURN GIVEN PLAYER AND TAKE CARD FROM DECK
    game.playerTurn = player;
    player.cards.push(game.deck.cards.pop());

    //CHECK IF PLAYER HAS COUNTESS AND PRINCE OR KING AT THE SAME TIME
    let hasCountess = player.cards.find(x => x && x.strength == 7);
    let hasPrinceOrKing = player.cards.find(x => x && x.strength == 5 || x.strength == 6);

    //CHOOSE RANDOM NONGUARD PREDICTED CARD FOR GUARD ONLY
    let cardsExceptGuards = constants.Set.filter(x => x && x.strength != 1);
    let predictedCard = cardsExceptGuards[Math.floor(Math.random() * cardsExceptGuards.length)]

    //CHOOSE CARD TO PLAY
    let card;
    if(hasCountess && hasPrinceOrKing){
        card = player.cards.find(x => x && x.strength == 7);
    }else{
        card = player.cards[Math.floor(Math.random() * player.cards.length)]
    }

    return {
        card,
        randomPlayerExcHimself,
        randomPlayerIncHimself,
        predictedCard
    }
}

const playTurn = (payload) => {
    let playedCard = payload.card.strength;
    store.state.Game.playedCard = playedCard;
    let clearPayload = null;
    switch(playedCard) {
        case 1://Guard
            clearPayload = {
                selectedPlayer: payload.randomPlayerExcHimself.id,
                predictedCard: payload.predictedCard.strength
            }
            actions.Guard.guardAction(clearPayload);
            break;
        case 2://Priest
            clearPayload = {
                selectedPlayer: payload.randomPlayerExcHimself.id,
            }
            actions.Priest.priestAction(clearPayload);
            break;
        case 3://Baron
            clearPayload = {
                selectedPlayer: payload.randomPlayerExcHimself.id,
            }
            actions.Baron.baronAction(clearPayload);
            break;
        case 4://Handmaid
            actions.Handymaid.handymaidAction(clearPayload);
            break;
        case 5://Prince
            clearPayload = {
                selectedPlayer: payload.randomPlayerIncHimself.id,
            }
            actions.Prince.princeAction(clearPayload);
            break;
        case 6://King
            clearPayload = {
                selectedPlayer: payload.randomPlayerExcHimself.id,
            }
            actions.King.kingAction(clearPayload);
            break;
        case 7://Countess
            actions.Countess.countessAction(clearPayload);
            break;
        case 8://Princess
            actions.Princess.princessAction(clearPayload);
            break;
        default:
    }

    writeComment(clearPayload);
}

const writeComment = (payload) => {
    const playedPlayer = store.state.Game.playerTurn;
    const playedCard = store.state.Game.playedCard;
    let playedTo = -1;

    let comments = store.state.Game.comments;
    let comment;
    let turn = store.state.Game.turn;
    if(payload) playedTo=payload.selectedPlayer;

    if(playedTo>=0) comment = `${returnUser(playedPlayer.id)} &nbsp; <span class="stati18n s18n-dashboard-played"></span> &nbsp; ${returnCard(playedCard)} &nbsp; <span class="stati18n s18n-dashboard-against"></span> &nbsp; ${returnUser(playedTo)}`
    else comment = `${returnUser(playedPlayer.id)} &nbsp; <span class="stati18n s18n-dashboard-played"></span> &nbsp; ${returnCard(playedCard)}`

    //DONE HANDLE UNDEFINED ERROR HERE
    if(comments && comments[turn-1]) 
        comments[turn-1].push(comment);
}

const checkIfFinished = () => {
    let game = store.state.Game;
    let turn = store.state.Game.turn;
    let comments = store.state.Game.comments;
    let remainedPlayers = game.players.filter(x => x && x.isOutOfGame == false && x.cards[0]);
    let bestPlayer;


    if(remainedPlayers.length == 1){
        bestPlayer = remainedPlayers.pop();
        let comment = `${returnUser(bestPlayer.id)} <span class='stati18n s18n-winner-message'></span>`;
        comments[turn-1].push(comment);

        //SET ALL DATA IN FINISH OF ROUND AND SET ROUND SHOWER
        $(".turnNumContainer h2 span").last().text(game.round++);
        bestPlayer.token++;
        renewRound(bestPlayer)
        return true;
    }

    if(game.deck.cards.length == 0){
        bestPlayer = remainedPlayers.pop();
        //FOR CASE SOMEONE PLAYED PRINCE AGAINS FIRST USER IN LAST ROUND
        if(bestPlayer.cards.length == 0)
            bestPlayer = remainedPlayers.pop();
        if(bestPlayer.cards.length == 0)
            bestPlayer = remainedPlayers.pop();
        
        if(remainedPlayers.length > 0){
            remainedPlayers.forEach(player => {
                //DONE FIX ERROR
                //FOR CASE THAT LAST PLAYER USED PRINCE AND THERE IS NO CARD TO TAKE FROM
                console.log("CATCH ERROR")
                console.log(JSON.parse(JSON.stringify(player)))
                console.log(JSON.parse(JSON.stringify(bestPlayer)))
                if(player.cards.length != 0){
                    if(player.cards[0].strength > bestPlayer.cards[0].strength)
                        bestPlayer = player;
                    else if(player.cards[0].strength == bestPlayer.cards[0].strength){
                        let compared=player.dismissedCards.reduce((a, b) => a + (b.strength || 0), 0);
                        let best=bestPlayer.dismissedCards.reduce((a, b) => a + (b.strength || 0), 0);
                        
                        if(compared>best) bestPlayer=player;
                    }
                }
            });
        }

        let comment = `${returnUser(bestPlayer.id)} <span class='stati18n s18n-winner-message'></span>`;
        comments[turn-1].push(comment);


        //SET ALL DATA IN FINISH OF ROUND AND SET ROUND SHOWER
        $(".turnNumContainer h2 span").last().text(game.round++);
        bestPlayer.token++;
        renewRound(bestPlayer)

        return true;
    }

    return false;
}

const renewRound = (winner) => {
    //TODO: CREATE GAMES ARRAY, PUSH EACH ROUND TO IT, AND TAKE LAST ELEMENT(GAME) IN EACH ROUND
    //TODO: MAKE THE WINNER TO START ROUND FIRST - CALL EASYACTIONS FUNCTION, CHECK IF THERE IS WINNERPLAYER, IN FOR LOOP CONTINUE TILL IT FINDS WINNER
    let game = store.state.Game;
    const playerCount = game.playerCount;
    const round = game.round;

    let newGame = new entities.Game(playerCount);

    //SET ROUND AND TOKENS OF PLAYERS
    newGame.round = round;
    newGame.previousRoundWinner = winner;

    //NOTE: SET BACK TO FALSE IN COMMENTS SECTION
    newGame.isRoundFinished = true;
    let newPlayer;
    game.players.forEach((player) => {
        if(player){
            newPlayer = newGame.players.find(x => x && x.id == player.id);
            newPlayer.token = player.token;
        }
    })

    // SET NEW GAME
    store.state.Game = newGame;

    console.log("NEW GAME")
    console.log(newGame)
}

export const easyActions = (payload) => {
    //TURN INFO
    let game = store.state.Game;
    game.comments.push([]);

    //FOR CASE THAT USER PLAYED LAST CARD
    if(checkIfFinished()){
        game.isRoundFinished = true;
    }else{
        for(let player of game.players){
            if(player != null && player.id != 0){
                //FOR CASE THAT THE USER IS UNTOUCHABLE BEFORE HE LOST IN LAST ROUND
                if(player.isOutOfGame != false){
                    //MAKE PLAYER TOUCHABLE AGAIN ON START OF ROUND
                    player.isUntouchable = false;
                }else{
                    //MAKE PLAYER TOUCHABLE AGAIN ON START OF ROUND
                    player.isUntouchable = false;
        
                    let payload = createRandomPayload(player);
                    playTurn(payload);
        
                    if(checkIfFinished()){
                        game.isRoundFinished = true;
                        break;
                    };
                }
            }
        };
    }


    //MAKE USER TOUCHABLE AGAIN
    game.players[0].isUntouchable = false;

    game.turn++;
    game.playerTurn = game.players[0];
}

const returnUser = (id) => {
    switch (id) {
        case 0:
            return "<span class='stati18n s18n-dashboard-against-you'></span>";
        case 1:
            return "<span class='stati18n s18n-user-number-one'></span>"
        case 2: 
            return "<span class='stati18n s18n-user-number-two'></span>"
        case 3:
            return "<span class='stati18n s18n-user-number-three'></span>"       
        default:
            break;
    }
}

const returnCard = (strength) => {
    switch (strength) {
        case 1:
            return "<span class='stati18n s18n-guard'></span>";
        case 2: 
            return "<span class='stati18n s18n-priest'></span>"
        case 3:
            return "<span class='stati18n s18n-baron'></span>"
        case 4:
            return "<span class='stati18n s18n-handmaid'></span>"
        case 5:
            return "<span class='stati18n s18n-prince'></span>"
        case 6:
            return "<span class='stati18n s18n-king'></span>"
        case 7:
            return "<span class='stati18n s18n-countess'></span>"
        case 8:
            return "<span class='stati18n s18n-princess'></span>"
        default:
            break;
    }
}