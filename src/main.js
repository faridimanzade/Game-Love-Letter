import store from './store/index.js';
import {entities} from './helpers/index.js'

// Load up components
import Player_1 from './components/Player_1.js';
import Player_2 from './components/Player_2.js';
import Player_3 from './components/Player_3.js';
import Player from './components/Player.js';
import TableSet from './components/Table_Set.js';
import ReservedCards from './components/Reserved_Cards.js';
import Comments from './components/Comments.js';
import Actions from './components/Actions.js';

// Load up some DOM elements
const startGame = document.querySelector('.LaunchTheGameBTN');
const startTurn = document.querySelector('.startYourTurn');
const playForm = document.querySelector('.doYourActionSelectAI');
const modal = document.querySelector('.doYourActionModal');

const playerSelect = document.querySelector('#doYourActionSelectPlayer');
const cardPredict = document.querySelector('#doYourActionSelect');

const firstChoice = document.querySelector('#firstChoice');
const secondChoice = document.querySelector('#secondChoice');
const thirdChoice = document.querySelector('#thirdChoice');

//////////////////////////////////////////////
// Add a submit event listener to the form and prevent it from posting back
startGame.addEventListener('click', evt => {
    evt.preventDefault();
    var game;
    let first = firstChoice.value.trim();
    let second = secondChoice.value.trim();
    let third = thirdChoice.value.trim();

    if(second !=3 && third!=3)
        game = new entities.Game(4);
    else if(second==3 ^ third==3)
        game = new entities.Game(3);
    else if(second==3 && third==3)
        game = new entities.Game(2);

    store.dispatch('initializeGame', game);
});


//////////////////////////////////////////////
startTurn.addEventListener('click', evt => {
    evt.preventDefault();

    store.dispatch('startTurn', null);
});



//////////////////////////////////////////////
playForm.addEventListener('submit', evt => {
    evt.preventDefault();
    let selectedPlayer = playerSelect.value.trim();
    let predictedCard = cardPredict.value.trim();

    if(selectedPlayer && predictedCard) store.dispatch("playTurn", {playedTo: selectedPlayer, predictedCard: predictedCard})
    else if(selectedPlayer) store.dispatch("playTurn", {playedTo: selectedPlayer})
    else store.dispatch("playTurn", {})
    
    // If there's some content, trigger the action and clear the field, ready for the next item
    if(selectedPlayer.length || predictedCard.length) {
        playerSelect.value = '';
        cardPredict.value = '';
    }


    //PROBLEM 2
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

    $(".reservedCardsIMGContainer img").css({
        "animation-name": "fromCenterToTopLeft",
        "animation-fill-mode": "forwards"
    });
    document.querySelectorAll('.user > img').forEach((image, index) => {
        $(image).css("top", "0")
        $(image).css("opacity", "1")
    });
    $(modal).fadeOut(200);
});

// Instantiate components
const playerInstance = new Player();
const player1Instance = new Player_1();
const player2Instance = new Player_2();
const player3Instance = new Player_3();
const tableSetInstance = new TableSet();
const reservedCardsInstance = new ReservedCards();
const commentsInstance = new Comments();
const actionsInstance = new Actions();

// Initial renders
playerInstance.render();
player1Instance.render();
player2Instance.render();
player3Instance.render();
tableSetInstance.render();
reservedCardsInstance.render();
commentsInstance.render();
actionsInstance.render();

