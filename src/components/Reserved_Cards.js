import Component from '../lib/component.js';
import store from '../store/index.js';

export default class TableSet extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.reservedCardsIMGContainer')
        });
    }
    
    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        
        if (store.state.Game.players) {
            let game = store.state.Game;

            if(game && game.openCards){
                self.element.innerHTML = `
                    <img src="src/assets/images/back-card.jpg" alt="Image Here">
                    ${game.openCards.map(card => {
                        return `
                            <img src="src/assets/images/${card.name}.jpg" alt="${card.name}">
                        `
                    }).join('')}
                `;
            }else{
                self.element.innerHTML = `
                    <img src="src/assets/images/back-card.jpg" alt="Image Here">
                `
            }
        }
    }
}
