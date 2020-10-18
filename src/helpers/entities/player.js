export default class Player {
    constructor(cards, id) {
        this.id = id;
        this.cards = cards;
        this.dismissedCards = [];
        this.isOutOfGame = false;
        this.isUntouchable = false;

        this.token = 0;
        this.brain = [];
    }
}