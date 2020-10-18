import Deck from './deck.js'
import Player from './player.js'

export default class Game {
    constructor(playerCount) {
        this.deck = new Deck();
        if(playerCount==4){
            this.players = [
                new Player([this.deck.cards.pop()], 0),
                new Player([this.deck.cards.pop()], 1),
                new Player([this.deck.cards.pop()], 2),
                new Player([this.deck.cards.pop()], 3)
            ]
        }else if(playerCount==3){
            this.players = [
                new Player([this.deck.cards.pop()], 0),
                new Player([this.deck.cards.pop()], 1),
                null,
                new Player([this.deck.cards.pop()], 3),
            ]
        }else if(playerCount==2){
            this.players = [
                new Player([this.deck.cards.pop()], 0),
                null,
                new Player([this.deck.cards.pop()], 2),
                null
            ]

            this.openCards = [
                this.deck.cards.pop(),
                this.deck.cards.pop(),
                this.deck.cards.pop()
            ]
        }
        
        this.chosenCard = this.deck.cards.pop();
        
        this.playerTurn = this.players[0];
        this.playedCard = null;
        this.playedTo = null;
        this.predictedCard = null;

        this.playerCount = playerCount;
        this.comments=[];
        this.turn=1;
        this.round=1;
        this.isRoundFinished=false;
        this.previousRoundWinner=null;
    }

    //DONE MAKE CONSTRUCTORS FOR 2 AND 3 PLAYERS
    //DONE FIX ERROR ON EASY AI AFTER SECOND TURN
    //DONE CREATE COMMENTS OBJECT IN GAME AND WRITE COMMENTS WHILE AI PLAYING
    //DONE SHOW CARDS OF PLAYERS AFTER LOSING
}