import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Comments extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.dashBoardContainer')
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
            let allComments = store.state.Game.comments;
            let turn = store.state.Game.turn;
            let isRoundFinished = store.state.Game.isRoundFinished;
            let winner = store.state.Game.previousRoundWinner;
            //AS TURN IS 1, AND COMMENTS SHOULD FROM PREVIOUS TURN WE SUBSTITUTE 2
            let comments = allComments[turn - 2];

            if (comments && !store.state.Game.isRoundFinished) {
                self.element.innerHTML = `
                    ${comments.map(comments => {
                        return `
                            <p>${comments}</p>
                        `
                    }).join('')}
                    <div class="dashBoardContinue stati18n s18n-dashboard-continue"></div>
                `;

            }else if(store.state.Game.isRoundFinished){
                self.element.innerHTML = `
                    <p>${this.returnUser(winner.id)} <span class='stati18n s18n-winner-message'></span></p>
                    <div class="dashBoardContinue stati18n s18n-dashboard-start-new-round"></div>
                `;
            }else{
                self.element.innerHTML = `
                    <div class="dashBoardContinue stati18n s18n-dashboard-start-new-round"></div>
                `;
            }


            $(".dashBoardContinue").click(function () {
                $(".dashBoardModal").fadeOut(500);

                if(isRoundFinished){
                    store.state.Game.isRoundFinished=false;
                    $(".turnNumModal").fadeIn().delay(2000).fadeOut(500);
                    $(".turnNumModal").css("display", "flex");
                }
            });
        }
    }

    returnUser = (id) => {
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
}