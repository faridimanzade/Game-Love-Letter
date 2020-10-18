import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Player_1 extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.user-1')
        });
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;

        if (store.state.Game.players && store.state.Game.players[1]) {
            let isOutOfGame = store.state.Game.players[1].isOutOfGame;
            let token = store.state.Game.players[1].token;
            let cards = store.state.Game.players[1].cards;
            let dismissedCards = store.state.Game.players[1].dismissedCards;

            let x = -50;
            let z = 20;
            if (isOutOfGame) {
                self.element.innerHTML = `
                    <div class="discardedCardsContainer">
                        ${dismissedCards.map(card => {
                            return `
                                <img style='left:${x+=50}px; z-index: ${z-=1}' src="src/assets/images/${card.name}.jpg" alt="${card.name}">
                            `
                        }).join('')}
                    </div>
                    <h1>${token} - &nbsp; <span class="stati18n s18n-user-number-one"></span> &nbsp;- </h1>
                    <h3 class="stati18n s18n-out-of-game"></h3>
                `;
            }else{
                self.element.innerHTML = `
                    <div class="discardedCardsContainer">
                        ${dismissedCards.map(card => {
                            return `
                                <img style='left:${x+=50}px; z-index: ${z-=1}' src="src/assets/images/${card.name}.jpg" alt="${card.name}">
                            `
                        }).join('')}
                    </div>
                    <h1>${token} - &nbsp; <span class="stati18n s18n-user-number-one"></span> &nbsp;</h1>
                    ${cards.map(card => {
                        return `
                            <img src="src/assets/images/back-card.jpg" alt="Image Here">
                        `
                    }).join('')}
                `;
            }
        }
    }
}