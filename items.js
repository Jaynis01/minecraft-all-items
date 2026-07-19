/*
    HTML ELEMENTE
*/

const itemContainer =
    document.getElementById("items");

const counter =
    document.getElementById("counter");

const percentage =
    document.getElementById("percentage");

const progressBar =
    document.getElementById("progress-bar");

const searchInput =
    document.getElementById("search");

const searchResult =
    document.getElementById("search-result");



/*
    ITEMS LADEN
*/

async function loadItems() {

    showLoadingMessage();

    try {

        const response =
            await fetch(
                ITEM_LIST_URL
            );


        if (!response.ok) {

            throw new Error(
                "Itemliste konnte nicht geladen werden."
            );

        }


        const onlineItems =
            await response.json();


        items =
            onlineItems

            .filter(function(item){

                return (
                    !item.name.endsWith("_spawn_egg") &&
                    !excludedItems.includes(item.name)
                );

            })


            .map(function(item){

                return {
                    id: item.name,
                    englishName: item.displayName
                };

            })


            .map(function(item){

                return {
                    id: item.id,
                    englishName: item.englishName,
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


        createItemList();

        updateCounter();


    }

    catch(error){

        console.error(
            error
        );

        showLoadingError();

    }

}



/*
    ITEMLISTE ERSTELLEN
*/

function createItemList(){

    itemContainer.innerHTML = "";


    items.forEach(function(item){


        const row =
            document.createElement(
                "div"
            );


        row.classList.add(
            "item-row"
        );


        row.dataset.itemId =
            item.id;


        row.dataset.itemName =
            (
                item.name +
                " " +
                item.englishName +
                " " +
                item.id
            )
            .toLowerCase();



        const icon =
            createItemIcon(item);



        const content =
            document.createElement(
                "div"
            );


        content.classList.add(
            "item-content"
        );



        const label =
            document.createElement(
                "label"
            );



        const checkbox =
            document.createElement(
                "input"
            );


        checkbox.type =
            "checkbox";


        checkbox.id =
            "checkbox_" + item.id;



        const name =
            document.createElement(
                "span"
            );


        name.textContent =
            item.name;



        const details =
            document.createElement(
                "div"
            );


        details.classList.add(
            "item-details"
        );



        const saved =
            getSavedItemData(
                item.id
            );



        if(saved){

            checkbox.checked =
                true;

            row.classList.add(
                "collected"
            );

            showItemDetails(
                details,
                saved
            );

        }



        checkbox.addEventListener(
            "change",
            function(){

                handleItemChange(
                    item,
                    checkbox,
                    details,
                    row
                );

            }
        );



        label.appendChild(
            checkbox
        );

        label.appendChild(
            name
        );

        content.appendChild(
            label
        );

        content.appendChild(
            details
        );

        row.appendChild(
            icon
        );

        row.appendChild(
            content
        );


        itemContainer.appendChild(
            row
        );

    });

}



/*
    ICONS
*/

function createItemIcon(item){

    const img =
        document.createElement(
            "img"
        );


    img.classList.add(
        "item-icon"
    );


    img.alt =
        item.name;


    img.loading =
        "lazy";


    setIconSourceWithFallback(
        img,
        item.id
    );


    return img;

}



function setIconSourceWithFallback(
    img,
    id
){

    img.src =
        ITEM_IMAGE_BASE_URL +
        "/items/" +
        id +
        ".png";


    img.onerror =
        function(){

            if(
                img.dataset.triedBlock
                !==
                "true"
            ){

                img.dataset.triedBlock =
                    "true";


                img.src =
                    ITEM_IMAGE_BASE_URL +
                    "/blocks/" +
                    id +
                    ".png";

            }

            else {

                img.style.display =
                    "none";

            }

        };

}



/*
    ITEM ÄNDERN
*/

async function handleItemChange(
    item,
    checkbox,
    details,
    row
){

    const username =
        usernameInput.value.trim();



    if(
        checkbox.checked &&
        username === ""
    ){

        alert(
            "Bitte gib zuerst deinen Namen ein."
        );

        checkbox.checked =
            false;

        usernameInput.focus();

        return;

    }



    checkbox.disabled =
        true;



    try{


        if(
            checkbox.checked
        ){

            await collectItem(
                item,
                username
            );


            row.classList.add(
                "collected"
            );


            showItemDetails(
                details,
                collectedItems[item.id]
            );


        }

        else {


            await removeCollectedItem(
                item
            );


            row.classList.remove(
                "collected"
            );


            details.textContent =
                "";

        }


    }

    catch(error){

        console.error(
            error
        );

        checkbox.checked =
            !checkbox.checked;

    }


    finally{


        checkbox.disabled =
            false;


        updateCounter();

        updateLatestCollected();

        updateStatistics();

    }

}



/*
    DATEN
*/

function getSavedItemData(id){

    return (
        collectedItems[id]
        ||
        null
    );

}



function showItemDetails(
    element,
    data
){

    element.textContent =
        getInterfaceText(
            "collectedBy"
        )
        +
        " "
        +
        data.collectedBy
        +
        " "
        +
        getInterfaceText(
            "on"
        )
        +
        " "
        +
        formatDate(
            data.collectedAt
        );

}



/*
    REALTIME UPDATE
*/

function refreshItem(id){

    const checkbox =
        document.getElementById(
            "checkbox_" + id
        );


    if(!checkbox){

        return;

    }


    const row =
        checkbox.closest(
            ".item-row"
        );


    const details =
        row.querySelector(
            ".item-details"
        );


    const data =
        collectedItems[id];



    if(data){

        checkbox.checked =
            true;

        row.classList.add(
            "collected"
        );

        showItemDetails(
            details,
            data
        );

    }

    else{

        checkbox.checked =
            false;

        row.classList.remove(
            "collected"
        );

        details.textContent =
            "";

    }


    updateCounter();

}



/*
    FORTSCHRITT
*/

function updateCounter(){

    const checked =
        document.querySelectorAll(
            "#items input:checked"
        ).length;


    const percent =
        items.length
            ? Math.round(
                checked /
                items.length *
                100
            )
            : 0;



    counter.textContent =
        getInterfaceText(
            "progress"
        )
        +
        ": "
        +
        checked
        +
        " / "
        +
        items.length;


    percentage.textContent =
        percent +
        "%";


    progressBar.style.width =
        percent +
        "%";

}



/*
    SUCHE
*/

searchInput.addEventListener(
    "input",
    filterItems
);



function filterItems(){

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const itemRows =
        document.querySelectorAll(
            ".item-row"
        );


    let visibleItems =
        0;


    itemRows.forEach(
        function(itemRow){


            const searchableName =
                itemRow.dataset.itemName;


            const matches =
                searchableName.includes(
                    searchText
                );


            if(matches){

                itemRow.classList.remove(
                    "hidden"
                );

                visibleItems++;

            }

            else{

                itemRow.classList.add(
                    "hidden"
                );

            }

        }
    );



    if(searchText === ""){

        searchResult.textContent =
            "";

    }


    else if(visibleItems === 1){

        searchResult.textContent =
            "1 " +
            getInterfaceText("item") +
            " " +
            getInterfaceText("found");

    }


    else{

        searchResult.textContent =
            visibleItems +
            " " +
            getInterfaceText("items") +
            " " +
            getInterfaceText("found");

    }

}



/*
    LADESTATUS
*/

function showLoadingMessage(){

    itemContainer.innerHTML =
        "<p>Itemliste wird geladen ...</p>";

}



function showLoadingError(){

    itemContainer.innerHTML =
        "<p>Fehler beim Laden der Itemliste.</p>";

}