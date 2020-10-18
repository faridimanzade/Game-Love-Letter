import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Actions extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.doYourActionContainerImages')
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
            let cards = store.state.Game.players[0].cards;

            self.element.innerHTML = `
                ${cards.map(card => {
                    return `
                        <img data-id="${card.strength}" src="src/assets/images/${card.name}.jpg" alt="${card.name}">
                    `
                }).join('')}
            `;

            self.element.querySelectorAll('img').forEach((image, index) => {
                image.addEventListener('click', evt => {
                    let selectedCard = $(image).data("id");
                    store.dispatch("makeTurn", selectedCard)

                    $(".reservedCardsIMGContainer img").css({
                        "animation-name": "fromCenterToTopLeft",
                        "animation-fill-mode": "forwards"
                    });
                    document.querySelectorAll('.user > img').forEach((image, index) => {
                        $(image).css("top", "0")
                        $(image).css("opacity", "1")
                    });
                    //PROBLEM 3
                    if(store.state.Game.players){
                        let activePlayers = store.state.Game.players.filter(x => x)
                        if(activePlayers.length == 4){
                            document.querySelectorAll('.user-1 > img').forEach((image, index) => {
                                $(image).css("left", "0")
                                $(image).css("opacity", "1")
                            });
                            document.querySelectorAll('.user-2 > img').forEach((image, index) => {
                                $(image).css("top", "0")
                                $(image).css("opacity", "1")
                            });
                            document.querySelectorAll('.user-3 > img').forEach((image, index) => {
                                $(image).css("right", "0")
                                $(image).css("opacity", "1")
                            });
                        }else if(activePlayers.length == 3) {
                            document.querySelectorAll('.user-1 > img').forEach((image, index) => {
                                $(image).css("left", "0")
                                $(image).css("opacity", "1")
                            });
                            document.querySelectorAll('.user-3 > img').forEach((image, index) => {
                                $(image).css("right", "0")
                                $(image).css("opacity", "1")
                            });
                        }else if(activePlayers.length == 2) {
                            document.querySelectorAll('.user-2 > img').forEach((image, index) => {
                                $(image).css("top", "0")
                                $(image).css("opacity", "1")
                            });
                        }
                    }
                    $(".doYourActionSelectAI").fadeIn(500);
                    $(".doYourActionSelectAI").css("display","flex");
                });
            });

            document.querySelector(".doActionGoBack").addEventListener('click', () => {
                const playerSelect = document.querySelector('#doYourActionSelectPlayer');
                const cardPredict = document.querySelector('#doYourActionSelect');
                $(".doYourActionSelectAI").fadeOut(500);

                playerSelect.value = "";
                cardPredict.value = "";
            });

            $(".doYourActionContainerImages img").click(function () {
                if ($(this).attr("src") == "src/assets/images/priest.jpg" || $(this).attr("src") == "src/assets/images/baron.jpg" || $(this).attr("src") == "src/assets/images/prince.jpg" || $(this).attr("src") == "src/assets/images/king.jpg") {
                    $(".doYourActionSelectContainer").fadeOut();
                    $("#doYourActionSelect").removeAttr('required');

                    $(".usersOrders").fadeIn();
                    $("#doYourActionSelectPlayer").attr('required', '');

                    $(".selectUserText").fadeIn();
                } else if ($(this).attr("src") == "src/assets/images/handmaid.jpg" || $(this).attr("src") == "src/assets/images/countess.jpg" || $(this).attr("src") == "src/assets/images/princess.jpg") {
                    $(".doYourActionSelectContainer").fadeOut();
                    $("#doYourActionSelect").removeAttr('required');

                    $(".usersOrders").fadeOut();
                    $("#doYourActionSelectPlayer").removeAttr('required');

                    $(".selectUserText").fadeOut();
                } else {
                    $(".doYourActionSelectContainer").fadeIn();
                    $("#doYourActionSelect").attr('required', '');

                    $(".usersOrders").fadeIn();
                    $("#doYourActionSelectPlayer").attr('required', '');

                    $(".selectUserText").fadeIn();
                }

                if($(this).attr("src") == "src/assets/images/prince.jpg"){
                    $("#doYourActionSelectPlayer option").last().removeAttr('disabled');
                }else{
                    $("#doYourActionSelectPlayer option").last().attr('disabled','disabled')
                }
            });

            let counter=0;
            store.state.Game.players.forEach(player => {
                if(!player){
                    $("#doYourActionSelectPlayer option").eq(counter).attr('disabled','disabled');
                }else{
                    if(player.isOutOfGame){
                        if(player.id == 1) $("#doYourActionSelectPlayer option").eq(1).attr('disabled','disabled');
                        if(player.id == 2) $("#doYourActionSelectPlayer option").eq(2).attr('disabled','disabled');
                        if(player.id == 3) $("#doYourActionSelectPlayer option").eq(3).attr('disabled','disabled');
                    }
                    if(player.isUntouchable){
                        if(player.id == 1) $("#doYourActionSelectPlayer option").eq(1).css('color','red');
                        if(player.id == 2) $("#doYourActionSelectPlayer option").eq(2).css('color','red');
                        if(player.id == 3) $("#doYourActionSelectPlayer option").eq(3).css('color','red');
                    }

                    //MAKE STYLE BACK
                    if(!player.isOutOfGame){
                        if(player.id == 1) $("#doYourActionSelectPlayer option").eq(1).removeAttr('disabled');
                        if(player.id == 2) $("#doYourActionSelectPlayer option").eq(2).removeAttr('disabled');
                        if(player.id == 3) $("#doYourActionSelectPlayer option").eq(3).removeAttr('disabled');
                    }
                    if(!player.isUntouchable){
                        if(player.id == 1) $("#doYourActionSelectPlayer option").eq(1).css('color','darkgoldenrod');
                        if(player.id == 2) $("#doYourActionSelectPlayer option").eq(2).css('color','darkgoldenrod');
                        if(player.id == 3) $("#doYourActionSelectPlayer option").eq(3).css('color','darkgoldenrod');
                    }
                }
                counter++;
            });
        }
    }
}