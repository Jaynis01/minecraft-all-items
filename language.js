/*
    SPRACHE
*/

let germanTranslations = {};

let currentLanguage =
    localStorage.getItem(
        "minecraftLanguage"
    ) || "de";



/*
    HTML ELEMENTE
*/

const languageSelect =
    document.getElementById(
        "language"
    );



/*
    OBERFLÄCHEN ÜBERSETZUNGEN
*/

const interfaceTranslations = {

    de: {

        progress:
            "Fortschritt",

        collectedBy:
            "Gesammelt von",

        on:
            "am",


        latestCollected:
            "Zuletzt gesammelt",

        noItemsCollected:
            "Noch kein Item gesammelt.",


        statistics:
            "Statistiken",

        collected:
            "gesammelt",


        items:
            "Items",

        item:
            "Item",

        found:
            "gefunden",


        randomGoal:
            "🎲 Dein nächstes Ziel",

        randomButton:
            "🎲 Zufall",


        history:
            "📜 Sammelverlauf",

        historyButton:
            "📜 Verlauf",


        clickToJump:
            "Klicken zum Springen",

        allItemsCollected:
            "Alle Items gesammelt!",


        playerLabel:
            "Du bist:",

        usernamePlaceholder:
            "Name eingeben",


        searchPlaceholder:
            "Item suchen …"

    },


    en: {

        progress:
            "Progress",

        collectedBy:
            "Collected by",

        on:
            "on",


        latestCollected:
            "Latest collected",

        noItemsCollected:
            "No items collected yet.",


        statistics:
            "Statistics",

        collected:
            "collected",


        items:
            "items",

        item:
            "item",

        found:
            "found",


        randomGoal:
            "🎲 Your next goal",

        randomButton:
            "🎲 Random",


        history:
            "📜 Collection History",

        historyButton:
            "📜 History",


        clickToJump:
            "Click to jump",

        allItemsCollected:
            "All items collected!",


        playerLabel:
            "You are:",

        usernamePlaceholder:
            "Enter name",


        searchPlaceholder:
            "Search item …"

    }

};



/*
    TEXT AUSGEBEN
*/

function getInterfaceText(key){

    return (
        interfaceTranslations[currentLanguage]?.[key]
        ||
        key
    );

}



/*
    STATISCHE TEXTE AKTUALISIEREN
*/

function updateStaticTexts(){

    const usernameLabel =
        document.querySelector(
            'label[for="username"]'
        );


    const usernameInput =
        document.getElementById(
            "username"
        );


    const searchInput =
        document.getElementById(
            "search"
        );


    if(usernameLabel){

        usernameLabel.textContent =
            getInterfaceText(
                "playerLabel"
            );

    }


    if(usernameInput){

        usernameInput.placeholder =
            getInterfaceText(
                "usernamePlaceholder"
            );

    }


    if(searchInput){

        searchInput.placeholder =
            getInterfaceText(
                "searchPlaceholder"
            );

    }


    if(
        typeof missingItemsButton !== "undefined"
        &&
        missingItemsButton
    ){

        missingItemsButton.textContent =
            getInterfaceText(
                "randomButton"
            );

    }


    if(
        typeof historyButton !== "undefined"
        &&
        historyButton
    ){

        historyButton.textContent =
            getInterfaceText(
                "historyButton"
            );

    }

}



/*
    SPRACHE INITIALISIEREN
*/

if(languageSelect){

    languageSelect.value =
        currentLanguage;


    languageSelect.addEventListener(
        "change",
        function(){

            currentLanguage =
                languageSelect.value;


            localStorage.setItem(
                "minecraftLanguage",
                currentLanguage
            );


            rebuildItemNames();

            updateStaticTexts();

        }
    );

}



/*
    ITEMNAMEN NEU AUFBAUEN
*/

function rebuildItemNames(){

    items =
        items
        .map(function(item){

            return {

                id:
                    item.id,

                englishName:
                    item.englishName,

                name:
                    getTranslatedItemName(item)

            };

        })

        .sort(function(a,b){

            return a.name.localeCompare(
                b.name,
                currentLanguage === "de"
                    ? "de"
                    : "en"
            );

        });



    if(
        typeof createItemList === "function"
    ){

        createItemList();

    }


    if(
        typeof updateCounter === "function"
    ){

        updateCounter();

    }


    if(
        typeof filterItems === "function"
    ){

        filterItems();

    }


    if(
        typeof updateDashboardLanguage === "function"
    ){

        updateDashboardLanguage();

    }

}



/*
    DEUTSCHE SPRACHDATEI LADEN
*/

async function loadGermanTranslations(){

    try{

        const response =
            await fetch(
                GERMAN_LANGUAGE_URL
            );


        if(!response.ok){

            throw new Error(
                "Sprachdatei konnte nicht geladen werden."
            );

        }


        germanTranslations =
            await response.json();


        console.log(
            Object.keys(
                germanTranslations
            ).length +
            " deutsche Übersetzungen geladen."
        );


    }

    catch(error){

        console.error(
            error
        );

        germanTranslations = {};

    }

}



/*
    ITEMNAMEN ÜBERSETZEN
*/

function getTranslatedItemName(item){

    if(
        currentLanguage === "en"
    ){

        return item.englishName;

    }


    const itemKey =
        "item.minecraft." +
        item.id;


    const blockKey =
        "block.minecraft." +
        item.id;



    return (

        germanTranslations[itemKey]

        ||

        germanTranslations[blockKey]

        ||

        item.englishName

    );

}