import { constants } from '../index.js'

export default class Deck {
    constructor() {
        this.cards = constants.Set.map(x => x);
        this.shuffle();
    }


    shuffle = () => {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}