/*!
 * Stati18n v0.2
 * stati18n.js
 * Created by Florian Rotagnon
 * Licensed under MIT
 */

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(name + "=");
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return undefined;
}

// find on http://stackoverflow.com/questions/19999388/jquery-check-if-user-is-using-ie
function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
        return true;
    else                 // If another browser, return 0
        return false;
}

$( document ).ready(function() {
    var languageList = new Array();
    var defaultUserLanguage = 'en';
    $('link[rel="stylesheet"]').each(function(){
        var fileName = $(this).attr('href');
        if( fileName != "stati18n.css" && fileName.indexOf("stati18n") > -1 )
            defaultUserLanguage = fileName.slice(9, -4);
    });

    var userLanguage = defaultUserLanguage;

    $('.stati18n-language-selector').each(function() {
        languageList.push(this.getAttribute('value'));
    });
    //get info about css files
    $('body').append('<div id="stati18n-infos" style="display:none;"></div>');

    var infos;
    if(isIE()){
        var cssElem = window.getComputedStyle(document.getElementById("stati18n-infos"));
        infos = cssElem['customContent'];
    }
    else{
        infos = $("#stati18n-infos").css("content");
    }

    infos = infos.slice(1, infos.length-1);
    var infosTab = infos.split(" ");	
    var host = infosTab[0];
    var languages = infosTab.slice(1, infosTab.length);

    $('#stati18n-infos').remove();

    //get static content
    $('body').append('<div id="stati18n-fixed-values" style="display:none;"></div>');

    if(isIE()){
        var cssElem = window.getComputedStyle(document.getElementById("stati18n-fixed-values"));
        infos = cssElem['customContent'];
    }
    else {
        infos = $("#stati18n-fixed-values").css("content");
    }
    infos = infos.slice(1, infos.length-1);
    var fixedTab = infos.split(";;");

    $('#stati18n-fixed-values').remove();

    var i = languageList.indexOf(userLanguage);
    if( i > -1 )
    {
        userLanguage = languageList[i]
    }
    else
    {
        userLanguage = languageList[0];
    }

    var newUserLanguage = getCookie("lang");
    if(newUserLanguage == undefined)
        newUserLanguage = navigator.language || navigator.userLanguage; 
    if(newUserLanguage != "en" || newUserLanguage != "ru" || newUserLanguage != "az" || newUserLanguage != "fr")
        newUserLanguage = "en";

    changeLanguage(newUserLanguage)
    updateOptions(newUserLanguage)
    updateStatic();

    /****** FUNCTION ******/ 

    //Add static content
    function updateStatic()
    {
        for(var ind in fixedTab)
        {
            var line = fixedTab[ind];
            var lineSplit = line.split("§§");
            var currentLanguage = lineSplit[0];

            if(currentLanguage == userLanguage)
            {
                var id = lineSplit[1];
                var content = lineSplit[2];

                if(typeof($(".s18n-"+id).attr("value")) != 'undefined')
                    $(".s18n-"+id).attr("value", content);
                else
                    $(".s18n-"+id).html(content);
            }
        }
    }

    //Modify language
    function changeLanguage(newLanguage)
    {   
        // If the language is one that is already displayed
        if(userLanguage == newLanguage)
            return;
        var precUserLanguage = userLanguage
        userLanguage = newLanguage;

        var precFile = host+'src/localize/stati18n-'+precUserLanguage+'.css';
        var file = host+'src/localize/stati18n-'+userLanguage+'.css';

        if (!$("link[href='"+file+"']").length && $.inArray(userLanguage, languages)>=0)
        {
            $("link[href='"+precFile+"']").remove();
            $('head').append('<link rel="stylesheet" href="'+file+'" type="text/css" />');
        }
        updateStatic();
        updateOptions(userLanguage)
        createCookie("lang", userLanguage, 7);
    }

    function updateOptions(lang){
        if(lang == "en"){
            $(".s18n-select-level-computer-easy").html("Easy")
            $(".s18n-select-level-computer-medium").html("Medium-coming soon...")
            $(".s18n-select-level-computer-none").html("None")

            $(".s18n-option-0").html("Please select")
            $(".s18n-option-1").html("&#8592; Player One")
            $(".s18n-option-2").html("&#8593; Player Two")
            $(".s18n-option-3").html("&#8594; Player Three")
            $(".s18n-option-4").html("&#8595; You")
            
            $(".s18n-priest").html("Priest")
            $(".s18n-baron").html("Baron")
            $(".s18n-handmaid").html("Handmaid")
            $(".s18n-prince").html("Prince")
            $(".s18n-king").html("King")
            $(".s18n-countess").html("Countess")
            $(".s18n-princess").html("Princess")
        }else if(lang == "ru"){
            $(".s18n-select-level-computer-easy").html("Лёгкий")
            $(".s18n-select-level-computer-medium").html("Средний-скоро...")
            $(".s18n-select-level-computer-none").html("Никакой")

            $(".s18n-option-0").html("Пожалуйста выберите")
            $(".s18n-option-1").html("&#8592; Игрок Один")
            $(".s18n-option-2").html("&#8593; Игрок Два")
            $(".s18n-option-3").html("&#8594; Игрок Три")
            $(".s18n-option-4").html("&#8595; Вы")
            
            $(".s18n-priest").html("Священник")
            $(".s18n-baron").html("Барон")
            $(".s18n-handmaid").html("Служанка")
            $(".s18n-prince").html("Принц")
            $(".s18n-king").html("Король")
            $(".s18n-countess").html("Графиня")
            $(".s18n-princess").html("Принцесса")
        }else if(lang == "az"){
            $(".s18n-select-level-computer-easy").html("Asand")
            $(".s18n-select-level-computer-medium").html("Orta-tezliklə...")
            $(".s18n-select-level-computer-none").html("Heç biri")

            $(".s18n-option-0").html("Zəhmət olmasa seçin")
            $(".s18n-option-1").html("&#8592; Oyunçu Bir")
            $(".s18n-option-2").html("&#8593; Oyunçu Iki")
            $(".s18n-option-3").html("&#8594; Oyunçu Üç")
            $(".s18n-option-4").html("&#8595; Siz")
            
            $(".s18n-priest").html("Kahin")
            $(".s18n-baron").html("Baron")
            $(".s18n-handmaid").html("Xanım")
            $(".s18n-prince").html("Şahzadə")
            $(".s18n-king").html("Kral")
            $(".s18n-countess").html("Qrafinya")
            $(".s18n-princess").html("Şahzadə")
        }else if(lang == "fr"){
            $(".s18n-select-level-computer-easy").html("Facile")
            $(".s18n-select-level-computer-medium").html("Moyen-à venir bientôt")
            $(".s18n-select-level-computer-none").html("Nul")

            $(".s18n-option-0").html("Veuillez sélectionner")
            $(".s18n-option-1").html("&#8592; Joueur Un")
            $(".s18n-option-2").html("&#8593; Joueur Deux")
            $(".s18n-option-3").html("&#8594; Joueur Trois")
            $(".s18n-option-4").html("&#8595; Vous")
            
            $(".s18n-priest").html("Prêtre")
            $(".s18n-baron").html("Baron")
            $(".s18n-handmaid").html("Servante")
            $(".s18n-prince").html("Prince")
            $(".s18n-king").html("Roi")
            $(".s18n-countess").html("Comtesse")
            $(".s18n-princess").html("Princesse")
        }
    }
    /****** EVENTS ******/ 

    $('.stati18n-language-selector').click(function (e) {
        changeLanguage(this.getAttribute('value'));
    });

});
