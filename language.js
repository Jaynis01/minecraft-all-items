/*
    SPRACHSTATUS
*/

let germanTranslations = {};

let currentLanguage =
    localStorage.getItem("minecraftLanguage") || "de";


/*
    HTML-ELEMENTE
*/

const languageSelect =
    document.getElementById("language");


/*
    ÜBERSETZUNGEN DER OBERFLÄCHE
*/

const interfaceTranslations = {
    de: {
    progress: "Fortschritt",
    collectedBy: "Gesammelt von",
    on: "am",
    latestCollected: "Zuletzt gesammelt",
    noItemsCollected: "Noch kein Item gesammelt.",
    collected: "Gesammelte Items",
    items: "Items",
    item: "Item",
    found: "gefunden"
},

en: {
    progress: "Progress",
    collectedBy: "Collected by",
    on: "on",
    latestCollected: "Latest collected",
    noItemsCollected: "No items collected yet.",
    collected: "Collected items",
    items: "Items",
    item: "Item",
    found: "found"
}
};

function getInterfaceText(key) {
    return interfaceTranslations[currentLanguage][key];
}


/*
    SPRACHAUSWAHL
*/

languageSelect.value = currentLanguage;

languageSelect.addEventListener(
    "change",
    function () {
        currentLanguage =
            languageSelect.value;

        localStorage.setItem(
            "minecraftLanguage",
            currentLanguage
        );

        rebuildItemNames();
    }
);


/*
    ITEMNAMEN NEU AUFBAUEN
*/

function rebuildItemNames() {
    items = items
        .map(function (item) {
            return {
                id: item.id,
                englishName: item.englishName,
                name: getTranslatedItemName(item)
            };
        })
        .sort(function (firstItem, secondItem) {
            return firstItem.name.localeCompare(
                secondItem.name,
                currentLanguage === "de"
                    ? "de"
                    : "en"
            );
        });

    createItemList();
    updateCounter();
    filterItems();
    updateLatestCollected();
    updateStatistics();
}


/*
    DEUTSCHE ÜBERSETZUNGEN LADEN
*/

async function loadGermanTranslations() {
    try {
        const response =
            await fetch(GERMAN_LANGUAGE_URL);

        if (!response.ok) {
            throw new Error(
                "Deutsche Sprachdatei konnte nicht geladen werden. Status: " +
                response.status
            );
        }

        germanTranslations =
            await response.json();

        console.log(
            Object.keys(germanTranslations).length +
            " deutsche Übersetzungen geladen."
        );
    } catch (error) {
        console.error(
            "Fehler beim Laden der deutschen Übersetzungen:",
            error
        );

        germanTranslations = {};
    }
}


/*
    ITEMNAMEN ÜBERSETZEN
*/

function getTranslatedItemName(item) {
    if (currentLanguage === "en") {
        return item.englishName;
    }

    const itemTranslationKey =
        "item.minecraft." + item.id;

    const blockTranslationKey =
        "block.minecraft." + item.id;

    return (
        germanTranslations[itemTranslationKey] ||
        germanTranslations[blockTranslationKey] ||
        item.englishName
    );
}