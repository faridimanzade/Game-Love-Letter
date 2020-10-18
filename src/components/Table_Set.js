import Component from '../lib/component.js';
import store from '../store/index.js';

export default class TableSet extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.cardsStore')
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
            let deck = store.state.Game.deck;

            if(deck.cards.length >= 3){
                self.element.innerHTML = `
                    <img src="src/assets/images/back-card.jpg" alt="Image Here">
                    <img src="src/assets/images/back-card.jpg" alt="Image Here">
                    <img src="src/assets/images/back-card.jpg" alt="Image Here">
                    <h1> <span class="stati18n s18n-cards-left"></span>  &nbsp;<span>${deck.cards.length}</span></h1>
                `;
            }else if(deck.cards.length == 2){
                self.element.innerHTML = `
                    <img src="src/assets/images/back-card.jpg" alt="Image Here">
                    <img src="src/assets/images/back-card.jpg" alt="Image Here">
                    <h1> <span class="stati18n s18n-cards-left"></span>  &nbsp;<span>${deck.cards.length}</span></h1>
                `;
            }else if(deck.cards.length == 1){
                self.element.innerHTML = `
                    <img src="src/assets/images/back-card.jpg" alt="Image Here">
                    <h1> <span class="stati18n s18n-cards-left"></span>  &nbsp;<span>${deck.cards.length}</span></h1>
                `;
            }else{
                self.element.innerHTML = `
                    <h1> <span class="stati18n s18n-cards-left"></span>  &nbsp;<span>${deck.cards.length}</span></h1>
                `;
            }
        }
    }
}
