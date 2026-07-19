/*
    MINECRAFT HELFER
*/


function askMinecraftAssistant(question){

    const text =
        question
            .toLowerCase()
            .trim();



    /*
        ALLE FEHLENDEN ITEMS
    */

    if(
        text.includes("was fehlt") &&
        !text.includes("nether")
    ){

        return getRandomMissingItems();

    }



    /*
        NETHER
    */

    if(
        text.includes("nether")
    ){

        return getMissingByCategory(
            "nether"
        );

    }



    /*
        ITEM FUNDORT
    */

    for(
    const itemId in itemLocations
){

    const item =
        getItemById(
            itemId
        );


    if(!item){
        continue;
    }


    const englishName =
        item.englishName
            .toLowerCase();


    const germanName =
        item.name
            .toLowerCase();


    const idName =
        itemId
            .replaceAll("_"," ")
            .toLowerCase();



    const searchWords =
    text.split(" ");


const foundItem =
    searchWords.some(function(word){

        return (

            similarity(
                word,
                englishName
            ) > 0.75

            ||

            similarity(
                word,
                germanName
            ) > 0.75

            ||

            similarity(
                word,
                idName
            ) > 0.75

        );

    });



if(foundItem){


        return createLocationAnswer(
            itemId
        );

    }

}



    return (

        "🤖 Das habe ich noch nicht gelernt.<br><br>" +

        "Versuche zum Beispiel:<br>" +

        "• Was fehlt mir?<br>" +

        "• Was fehlt mir im Nether?<br>" +

        "• Wo finde ich diamond?"

    );

}





/*
    FEHLENDE ITEMS
*/


function getRandomMissingItems(){

    const missing =
        items.filter(function(item){

            return !collectedItems[item.id];

        });


    if(
        missing.length === 0
    ){

        return "🎉 Du hast alle Items gesammelt!";

    }



    const result =
        missing
            .sort(
                () =>
                    0.5 - Math.random()
            )
            .slice(0,5);



    let html =
        "<b>🎲 Deine nächsten Ziele:</b><br><br>";



    result.forEach(function(item){

        html +=
            "• " +
            item.name +
            "<br>";

    });


    return html;

}





/*
    KATEGORIE FILTER
*/


function getMissingByCategory(category){

    const missing =
        items.filter(function(item){

            return (

                getItemCategories(
                    item.id
                )
                .includes(
                    category
                )

                &&

                !collectedItems[item.id]

            );

        });



    if(
        missing.length === 0
    ){

        return (
            "🎉 Alle Items dieser Kategorie gesammelt!"
        );

    }



    let html =
        "<b>🌋 Fehlende Items:</b><br><br>";



    missing
        .slice(0,10)
        .forEach(function(item){

            html +=
                "• " +
                item.name +
                "<br>";

        });



    if(
        missing.length > 10
    ){

        html +=
            "<br>... und " +
            (
                missing.length - 10
            )
            +
            " weitere";

    }


    return html;

}





/*
    FUNDORT
*/


function createLocationAnswer(itemId){


    const data =
        itemLocations[itemId];


    if(!data){

        return (
            "🤔 Dafür kenne ich den Fundort noch nicht."
        );

    }



    return (

        "<b>" +

        getItemById(itemId).name +

        "</b><br><br>" +

        "🌍 Biome:<br>" +

        data.biomes.join(", ") +

        "<br><br>" +

        "📍 Fundort:<br>" +

        data.places.join(", ") +

        "<br><br>" +

        "💡 Tipp:<br>" +

        data.tip

    );

}

const closeAssistant =
    document.getElementById(
        "close-assistant"
    );


if(closeAssistant){

    closeAssistant.onclick =
        function(){

            document
            .getElementById(
                "assistant-popup"
            )
            .classList
            .add(
                "hidden"
            );

        };

}
const assistantPopup =
    document.getElementById(
        "assistant-popup"
    );


if(assistantPopup){

    assistantPopup.addEventListener(
        "click",
        function(event){

            if(
                event.target === assistantPopup
            ){

                assistantPopup.classList.add(
                    "hidden"
                );

            }

        }
    );

}

function normalizeText(text){

    return text
        .toLowerCase()
        .replace(/[ä]/g,"ae")
        .replace(/[ö]/g,"oe")
        .replace(/[ü]/g,"ue")
        .replace(/[^a-z0-9 ]/g,"");

}

function similarity(a,b){

    a = normalizeText(a);
    b = normalizeText(b);


    let longer =
        a.length > b.length
        ? a
        : b;


    let shorter =
        a.length > b.length
        ? b
        : a;


    let distance =
        levenshtein(
            longer,
            shorter
        );


    return (
        longer.length - distance
    )
    /
    longer.length;

}

function levenshtein(a,b){

    const matrix = [];


    for(let i=0;i<=b.length;i++){

        matrix[i]=[i];

    }


    for(let j=0;j<=a.length;j++){

        matrix[0][j]=j;

    }


    for(let i=1;i<=b.length;i++){

        for(let j=1;j<=a.length;j++){


            if(
                b.charAt(i-1)
                ===
                a.charAt(j-1)
            ){

                matrix[i][j] =
                    matrix[i-1][j-1];

            }

            else{

                matrix[i][j] =
                    Math.min(

                        matrix[i-1][j-1]+1,

                        matrix[i][j-1]+1,

                        matrix[i-1][j]+1

                    );

            }

        }

    }


    return matrix[b.length][a.length];

}