/*
    APP DATEN
*/

let items = [];
let collectedItems = {};


/*
    SPIELERNAME
*/

const usernameInput =
    document.getElementById(
        "username"
    );


const savedUsername =
    localStorage.getItem(
        "minecraftUsername"
    );


if(savedUsername){

    usernameInput.value =
        savedUsername;

}


usernameInput.addEventListener(
    "input",
    function(){

        localStorage.setItem(
            "minecraftUsername",
            usernameInput.value.trim()
        );

    }
);



/*
    APP START
*/

async function startApp(){

    try{

        await loadCollectedItems();

        await loadGermanTranslations();

        await loadItems();
        
        updateStaticTexts();


        updateLatestCollected();

        updateStatistics();

        updateDashboardLanguage();


        subscribeToItemChanges();

    }


    catch(error){

        console.error(
            error
        );


        showLoadingError();


        alert(
            error.message
        );

    }

}


startApp();