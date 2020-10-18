import store from '../../store/index.js';

$(document).ready(function () {


    // ================================================================= PRELOADER
   
    // ================================================================= PRELOADER


    //===================================================================== INTRO MODAL AND LEARN HOW TO PLAY AND START THE GAME
    $(".learnToPlay").click(function () {
        $(".howPlayVideo").fadeIn(500);
        $(this).fadeOut(500);
        $(".startTheGame").fadeOut(500);
        $(".afterVideoStart").fadeIn(500);
    });

    $(".afterVideoStart, .startTheGame").click(function () {
        $(".welcomeModalContainer").fadeOut(500);
        $(".howPlayVideo").delay(500).remove();
        $(".launchNewGameContainer").fadeIn(500);
        $(".launchNewGameContainer").css("display","flex");
        $(".languageSelection").fadeOut(500);
    });
    //===================================================================== INTRO MODAL AND LEARN HOW TO PLAY AND START THE GAME




    let secondSelect = 1;
    let thirdSelect = 1;
    let functionID = 4;

    cardsRelativeToPlayerCount();

    $(".launchNewGameForm select").change(function () {
        secondSelect = $(".launchNewGameForm select").eq(1).val();
        thirdSelect = $(".launchNewGameForm select").eq(2).val();

        cardsRelativeToPlayerCount();
    });


    function cardsRelativeToPlayerCount() {
        if (secondSelect != "3" && thirdSelect != "3") {
            functionID = 4;
        } else if ((secondSelect != "3" && thirdSelect == "3") || (secondSelect == "3" && thirdSelect != "3")) {
            functionID = 3;
        } else {
            functionID = 2;
        }

        $(".LaunchTheGameBTN").click(function () {
            if (functionID == 2) {
                startAnimeGiveTwo();
                $("#doYourActionSelectPlayer option").eq(1).attr('disabled', 'disabled');
                $("#doYourActionSelectPlayer option").eq(3).attr('disabled', 'disabled');

                $(".aiLeft-container h1").remove();
                $(".aiRight-container h1").remove();
            } else if (functionID == 3) {
                startAnimeGiveThree();
                removeReservedCardsForTwo();

                $(".aiTop-container h1").remove();
            } else if (functionID == 4) {
                startAnimeGiveFour();
                removeReservedCardsForTwo();
            }
            $(".launchNewGameContainer").fadeOut(500);
            $(".ShowCardsText").fadeIn(500);
        });
    }




    function startAnimeGiveFour() {
        $(".aiLeft-container > img").eq(-1).css({
            "animation-name": "fromCenterToLeft",
            "animation-delay": "0.5s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });

        $(".aiTop-container > img").eq(-1).css({
            "animation-name": "fromCenterToTop",
            "animation-delay": "0.6s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });

        $(".aiRight-container > img").eq(-1).css({
            "animation-name": "fromCenterToRight",
            "animation-delay": "0.7s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });

        $(".user-container > img").eq(-1).css({
            "animation-name": "fromCenterToBottom",
            "animation-delay": "0.8s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });

        reservedCardTopLeft();
        removeReservedCardsForTwo();

        $(".startYourTurn").delay(900).fadeIn(1000);
    }

    function startAnimeGiveThree() {
        $(".aiLeft-container > img").eq(-1).css({
            "animation-name": "fromCenterToLeft",
            "animation-delay": "0.6s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });

        $(".aiRight-container > img").eq(-1).css({
            "animation-name": "fromCenterToRight",
            "animation-delay": "0.8s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });

        $(".user-container > img").eq(-1).css({
            "animation-name": "fromCenterToBottom",
            "animation-delay": "1s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });

        reservedCardTopLeft();
        removeReservedCardsForTwo();

        $(".startYourTurn").delay(1200).fadeIn(1000);
    }

    function startAnimeGiveTwo() {
        $(".aiTop-container > img").eq(-1).css({
            "animation-name": "fromCenterToTop",
            "animation-delay": "0.5s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });

        $(".user-container > img").eq(-1).css({
            "animation-name": "fromCenterToBottom",
            "animation-delay": "0.8s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });

        reservedCardTopLeft();
        reservedCardForTwoPlayers();

        $(".startYourTurn").delay(1000).fadeIn(1000);
    }


    $(".startYourTurn").click(function () {

        //PROBLEM 1
        if(store.state.Game.players){
            let activePlayers = store.state.Game.players.filter(x => x)
            if(activePlayers.length == 4){
                $(".aiLeft-container > img").eq(-1).css({
                    "animation-name": "fromCenterToLeft",
                    "animation-fill-mode": "forwards"
                });
        
                $(".aiTop-container > img").eq(-1).css({
                    "animation-name": "fromCenterToTop",
                    "animation-fill-mode": "forwards"
                });
        
                $(".aiRight-container > img").eq(-1).css({
                    "animation-name": "fromCenterToRight",
                    "animation-fill-mode": "forwards"
                });
            }else if(activePlayers.length == 3) {
                $(".aiLeft-container > img").eq(-1).css({
                    "animation-name": "fromCenterToLeft",
                    "animation-fill-mode": "forwards"
                });
        
                $(".aiRight-container > img").eq(-1).css({
                    "animation-name": "fromCenterToRight",
                    "animation-fill-mode": "forwards"
                });
            }else if(activePlayers.length == 2) {
                $(".aiTop-container > img").eq(-1).css({
                    "animation-name": "fromCenterToTop",
                    "animation-fill-mode": "forwards"
                });
            }
        }

        $(".reservedCardsIMGContainer img").css({
            "animation-name": "fromCenterToTopLeft",
            "animation-fill-mode": "forwards"
        });
        $(".user-container > img").eq(-2).css({
            "animation-name": "fromCenterToBottom",
            "animation-fill-mode": "forwards"
        });
        $(".user-container > img").eq(-1).css({
            "animation-name": "fromCenterToBottom",
            "animation-delay": "0.5s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });
        $(".user-container").css("margin-left", "-210px");
        $(this).fadeOut(500);
        $(".doYourAction").fadeIn(500);
    });


    // ========================================== ANIMATION FOR RESERVED CARD
    function reservedCardTopLeft() {
        $(".reservedCardsIMGContainer img").eq(0).css({
            "animation-name": "fromCenterToTopLeft",
            "animation-delay": "0.9s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });
    }
    // ========================================== RESERVED CARD ANIMATION

    // ========================================= RESERVED CARD FOR 2 PLAYERS
    function reservedCardForTwoPlayers() {
        $(".reservedCardsIMGContainer img").eq(1).css({
            "animation-name": "fromCenterToTopLeft",
            "animation-delay": "1s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });
        $(".reservedCardsIMGContainer img").eq(2).css({
            "animation-name": "fromCenterToTopLeft",
            "animation-delay": "1.1s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });
        $(".reservedCardsIMGContainer img").eq(3).css({
            "animation-name": "fromCenterToTopLeft",
            "animation-delay": "1.2s",
            "animation-iteration-count": "1",
            "animation-duration": "2s",
            "animation-timing-function": "ease-in-out",
            "animation-fill-mode": "forwards"
        });
    }
    // ========================================= RESERVED CARD FOR 2 PLAYERS


    // ========================================= REMOVE RESERVED CARD FOR 2 PLAYERS
    function removeReservedCardsForTwo() {
        $(".reservedCardsIMGContainer img").eq(1).remove();
        $(".reservedCardsIMGContainer img").eq(2).remove();
        $(".reservedCardsIMGContainer img").eq(3).remove();
    }
    // ========================================= REMOVE RESERVED CARD FOR 2 PLAYERS



    // ============================================================ Cards Map (To Look at all cards)
    $(".ShowCardsText").click(function () {
        $(".cardsIntroImage").slideDown(500);
        $(this).fadeOut(500);
    });

    $(".closeIntroCards").click(function () {
        $(".cardsIntroImage").slideUp(500);
        $(".ShowCardsText").fadeIn(500);
    });

    let modal = document.getElementsByClassName("cardsIntroImage")[0];

    window.addEventListener("click", function () {
        if (event.target == modal) {
            $(".cardsIntroImage").slideUp(500);
            $(".ShowCardsText").fadeIn(500)
        }
    })
    // ============================================================ Cards Map (To Look at all cards)


    $(".doYourAction").click(function () {
        $(".doYourActionModal").fadeIn(500);
        $(".doYourActionModal").css("display","flex");
        $(this).fadeOut(500);
        $(".startYourTurn").fadeIn(500);
        $(".doYourActionContainerImages").fadeIn(500);
        $(".doYourActionContainerText").fadeIn(500);
        $(".doYourActionSelectAI").fadeOut(500);
    });




    $(".languageSelection img").click(function(){
        $(".languageSelection img").removeClass("activeLanguage");
        $(this).addClass("activeLanguage");
    });


});