/*
    DATUM UND UHRZEIT
*/

function formatDate(dateValue) {

    const locale =
        currentLanguage === "de"
            ? "de-DE"
            : "en-GB";


    return new Date(dateValue)
        .toLocaleString(
            locale,
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );

}



/*
    ITEMS
*/

function getItemById(itemId) {

    return (
        items.find(function(item){

            return item.id === itemId;

        })
        ||
        null
    );

}



/*
    ITEM SPRINGEN
*/

function jumpToItem(itemId) {


    const itemRow =
        document.getElementById(
            "item_" + itemId
        );


    closeFeaturePopup();



    if(!itemRow){

        console.error(
            "Item nicht gefunden:",
            itemId
        );

        return;

    }



    itemRow.scrollIntoView({

        behavior:
            "smooth",

        block:
            "center"

    });



    itemRow.classList.add(
        "highlight-item"
    );



    setTimeout(
        function(){

            itemRow.classList.remove(
                "highlight-item"
            );

        },
        2000
    );

}



/*
    POPUP
*/

function getFeaturePopup(){

    return document.getElementById(
        "feature-popup"
    );

}



function openFeaturePopup(){

    const popup =
        getFeaturePopup();


    if(!popup){

        return;

    }


    popup.classList.remove(
        "hidden"
    );

}



function closeFeaturePopup(){

    const popup =
        getFeaturePopup();


    if(!popup){

        return;

    }


    popup.classList.add(
        "hidden"
    );

}



/*
    TEXT SETZEN
*/

function setText(element,text){

    if(!element){

        return;

    }


    element.textContent =
        text;

}