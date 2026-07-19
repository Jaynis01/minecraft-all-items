/*
    DASHBOARD ELEMENTE
*/

const latestTitle =
    document.getElementById("latest-title");

const latestCollected =
    document.getElementById("latest-collected");

const statisticsTitle =
    document.getElementById("statistics-title");

const statisticsContainer =
    document.getElementById("statistics");

const missingItemsButton =
    document.getElementById("missing-items-button");

const historyButton =
    document.getElementById("history-button");

const closePopup =
    document.getElementById("close-popup");

const popupTitle =
    document.getElementById("popup-title");

const popupContent =
    document.getElementById("popup-content");


let currentRandomItem = null;



/*
    ZULETZT GESAMMELT
*/

function updateLatestCollected() {

    if (!latestCollected || !latestTitle) {
        return;
    }


    latestTitle.textContent =
        getInterfaceText(
            "latestCollected"
        );


    const entries =
        Object.entries(
            collectedItems
        );


    if (entries.length === 0) {

        latestCollected.textContent =
            getInterfaceText(
                "noItemsCollected"
            );

        return;
    }


    entries.sort(function(a,b){

        return (
            new Date(b[1].collectedAt)
            -
            new Date(a[1].collectedAt)
        );

    });


    const itemId =
        entries[0][0];


    const itemData =
        entries[0][1];


    const item =
        getItemById(
            itemId
        );


    if (!item) {
        return;
    }


    latestCollected.innerHTML =
        "";


    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.classList.add(
        "latest-item"
    );


    const icon =
        document.createElement(
            "img"
        );

    icon.classList.add(
        "latest-item-icon"
    );

    icon.alt =
        item.name;


    setIconSourceWithFallback(
        icon,
        item.id
    );


    const content =
        document.createElement(
            "div"
        );

    content.classList.add(
        "latest-item-content"
    );


    const name =
        document.createElement(
            "strong"
        );

    name.textContent =
        item.name;


    const details =
        document.createElement(
            "div"
        );

    details.classList.add(
        "latest-item-details"
    );


    details.textContent =
        getInterfaceText("collectedBy")
        +
        " "
        +
        itemData.collectedBy
        +
        " "
        +
        getInterfaceText("on")
        +
        " "
        +
        formatDate(
            itemData.collectedAt
        );


    content.appendChild(name);
    content.appendChild(details);

    wrapper.appendChild(icon);
    wrapper.appendChild(content);

    latestCollected.appendChild(
        wrapper
    );

}



/*
    STATISTIKEN
*/

function updateStatistics() {

    if (
        !statisticsTitle ||
        !statisticsContainer
    ) {
        return;
    }


    statisticsTitle.textContent =
        getInterfaceText(
            "statistics"
        );


    const collectedCount =
        Object.keys(
            collectedItems
        ).length;


    const players = {};


    Object.values(
        collectedItems
    )
    .forEach(function(item){

        const name =
            item.collectedBy;


        if (!players[name]) {

            players[name] = 0;

        }


        players[name]++;

    });



    let html = "";


    Object.entries(players)
    .sort(function(a,b){

        return b[1] - a[1];

    })
    .forEach(function(entry,index){


        let medal = "";


        if(index === 0){
            medal = "🥇 ";
        }

        if(index === 1){
            medal = "🥈 ";
        }

        if(index === 2){
            medal = "🥉 ";
        }


        html +=
            "<br>" +
            medal +
            entry[0] +
            ": " +
            entry[1];

    });



    statisticsContainer.innerHTML =
        getInterfaceText("collected")
        +
        ": "
        +
        collectedCount
        +
        " / "
        +
        items.length
        +
        "<br><br>"
        +
        html;

}



/*
    ZUFALLSZIEL
*/

function showRandomMissingItems() {

    if (
        !popupTitle ||
        !popupContent
    ) {
        return;
    }


    popupTitle.textContent =
        getInterfaceText(
            "randomGoal"
        );


    popupContent.innerHTML =
        "";



    const missingItems =
        items.filter(function(item){

            return !collectedItems[item.id];

        });



    if(
        missingItems.length === 0
    ){

        popupContent.textContent =
            getInterfaceText(
                "allItemsCollected"
            );


        openFeaturePopup();

        return;

    }



    currentRandomItem =
        missingItems[
            Math.floor(
                Math.random()
                *
                missingItems.length
            )
        ];



    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.classList.add(
        "missing-item"
    );


    wrapper.addEventListener(
        "click",
        function(){

            jumpToItem(
                currentRandomItem.id
            );

        }
    );



    const icon =
        document.createElement(
            "img"
        );


    icon.alt =
        currentRandomItem.name;


    setIconSourceWithFallback(
        icon,
        currentRandomItem.id
    );



    const text =
        document.createElement(
            "div"
        );


    text.classList.add(
        "missing-item-text"
    );



    const name =
        document.createElement(
            "strong"
        );


    name.id =
        "random-item-name";


    name.textContent =
        currentRandomItem.name;



    const hint =
        document.createElement(
            "div"
        );


    hint.id =
        "random-item-hint";


    hint.classList.add(
        "missing-item-hint"
    );


    hint.textContent =
        getInterfaceText(
            "clickToJump"
        );



    text.appendChild(name);
    text.appendChild(hint);


    wrapper.appendChild(icon);
    wrapper.appendChild(text);


    popupContent.appendChild(
        wrapper
    );


    openFeaturePopup();

}

/*
    SAMMELVERLAUF
*/

function showCollectionHistory() {

    if (
        !popupTitle ||
        !popupContent
    ) {
        return;
    }


    popupTitle.textContent =
    getInterfaceText(
        "history"
    );


    popupContent.innerHTML =
        "";


    const entries =
        Object.entries(
            collectedItems
        );


    if (
        entries.length === 0
    ) {

        popupContent.textContent =
            getInterfaceText(
                "noItemsCollected"
            );

        openFeaturePopup();

        return;
    }



    entries.sort(function(a,b){

        return (
            new Date(
                b[1].collectedAt
            )
            -
            new Date(
                a[1].collectedAt
            )
        );

    });



    let lastDate = "";



    entries.forEach(function(entry){


        const itemId =
            entry[0];


        const itemData =
            entry[1];


        const item =
            getItemById(
                itemId
            );


        if(!item){
            return;
        }



        const date =
            new Date(
                itemData.collectedAt
            )
            .toLocaleDateString(
                currentLanguage === "de"
                    ? "de-DE"
                    : "en-GB"
            );



        if(
            date !== lastDate
        ){

            const heading =
                document.createElement(
                    "h3"
                );


            heading.textContent =
                date;


            popupContent.appendChild(
                heading
            );


            lastDate =
                date;

        }



        const row =
            document.createElement(
                "div"
            );


        row.classList.add(
            "missing-item"
        );



        const icon =
            document.createElement(
                "img"
            );


        icon.alt =
            item.name;


        setIconSourceWithFallback(
            icon,
            item.id
        );



        const text =
            document.createElement(
                "div"
            );


        const name =
            document.createElement(
                "strong"
            );


        name.textContent =
            item.name;



        const details =
            document.createElement(
                "div"
            );


        details.classList.add(
            "missing-item-hint"
        );


        details.textContent =
            getInterfaceText(
                "collectedBy"
            )
            +
            " "
            +
            itemData.collectedBy
            +
            " • "
            +
            formatDate(
                itemData.collectedAt
            );



        text.appendChild(
            name
        );


        text.appendChild(
            details
        );


        row.appendChild(
            icon
        );


        row.appendChild(
            text
        );


        popupContent.appendChild(
            row
        );

    });



    openFeaturePopup();

}

/*
    SPRACHE AKTUALISIEREN
*/

function updateDashboardLanguage(){

    updateLatestCollected();

    updateStatistics();



    if(popupTitle){

        popupTitle.textContent =
            getInterfaceText(
                "randomGoal"
            );

    }



    const hint =
        document.getElementById(
            "random-item-hint"
        );


    if(hint){

        hint.textContent =
            getInterfaceText(
                "clickToJump"
            );

    }



    const name =
        document.getElementById(
            "random-item-name"
        );


    if(
        name &&
        currentRandomItem
    ){

        name.textContent =
            getTranslatedItemName(
                currentRandomItem
            );

    }
    if(missingItemsButton){

    missingItemsButton.textContent =
        getInterfaceText(
            "randomButton"
        );

}


if(historyButton){

    historyButton.textContent =
        getInterfaceText(
            "historyButton"
        );

}

}



/*
    BUTTONS
*/

if(missingItemsButton){

    missingItemsButton.addEventListener(
        "click",
        showRandomMissingItems
    );

}

if(historyButton){

    historyButton.addEventListener(
        "click",
        showCollectionHistory
    );

}



if(closePopup){

    closePopup.addEventListener(
        "click",
        closeFeaturePopup
    );

}