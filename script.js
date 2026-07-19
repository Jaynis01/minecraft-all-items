/*
    APP-DATEN
*/

let items = [];
let collectedItems = {};


/*
    HTML-ELEMENTE
*/

const itemContainer =
    document.getElementById(
        "items"
    );

const counter =
    document.getElementById(
        "counter"
    );

const percentage =
    document.getElementById(
        "percentage"
    );

const progressBar =
    document.getElementById(
        "progress-bar"
    );

const usernameInput =
    document.getElementById(
        "username"
    );

const searchInput =
    document.getElementById(
        "search"
    );

const searchResult =
    document.getElementById(
        "search-result"
    );


/*
    SPIELERNAME
*/

const savedUsername =
    localStorage.getItem(
        "minecraftUsername"
    );

if (savedUsername) {
    usernameInput.value =
        savedUsername;
}

usernameInput.addEventListener(
    "input",
    function () {
        localStorage.setItem(
            "minecraftUsername",
            usernameInput.value.trim()
        );
    }
);


/*
    SUCHE-EVENT
*/

searchInput.addEventListener(
    "input",
    filterItems
);


/*
    LADEANZEIGE
*/

function showLoadingMessage() {
    itemContainer.innerHTML =
        '<p class="no-items">' +
        "Itemliste wird geladen …" +
        "</p>";

    counter.textContent =
        getInterfaceText(
            "progress"
        ) +
        ": 0 / 0";

    percentage.textContent =
        "0 %";

    progressBar.style.width =
        "0%";
}


/*
    FEHLERANZEIGE
*/

function showLoadingError() {
    itemContainer.innerHTML =
        '<p class="no-items">' +
        "Die Itemliste konnte nicht geladen werden. " +
        "Prüfe deine Internetverbindung und lade die Seite erneut." +
        "</p>";

    searchResult.textContent =
        "Fehler beim Laden der Itemliste";
}


/*
    ITEM ABHAKEN
*/

async function handleItemChange(
    item,
    checkbox,
    details,
    itemRow
) {
    const username =
        usernameInput.value.trim();

    if (
        checkbox.checked &&
        username === ""
    ) {
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

    try {
        if (checkbox.checked) {
            await collectItem(
                item,
                username,
                details,
                itemRow
            );
        } else {
            await removeCollectedItem(
                item,
                checkbox,
                details,
                itemRow
            );
        }
    } finally {
        checkbox.disabled =
            false;

        updateCounter();
        updateLatestCollected();
        updateStatistics();
    }
}


/*
    FORTSCHRITT AKTUALISIEREN
*/

function updateCounter() {
    const checkboxes =
        document.querySelectorAll(
            '#items input[type="checkbox"]'
        );

    let collectedCount =
        0;

    checkboxes.forEach(
        function (checkbox) {
            if (
                checkbox.checked
            ) {
                collectedCount++;
            }
        }
    );

    let progressPercentage =
        0;

    if (items.length > 0) {
        progressPercentage =
            Math.round(
                collectedCount /
                items.length *
                100
            );
    }

    counter.textContent =
        getInterfaceText(
            "progress"
        ) +
        ": " +
        collectedCount +
        " / " +
        items.length;

    percentage.textContent =
        progressPercentage +
        " %";

    progressBar.style.width =
        progressPercentage +
        "%";
}


/*
    ITEMLISTE FILTERN
*/

function filterItems() {
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
        function (itemRow) {
            const searchableName =
                itemRow.dataset
                    .itemName;

            const matchesSearch =
                searchableName.includes(
                    searchText
                );

            if (matchesSearch) {
                itemRow.classList.remove(
                    "hidden"
                );

                visibleItems++;
            } else {
                itemRow.classList.add(
                    "hidden"
                );
            }
        }
    );

    if (searchText === "") {
        searchResult.textContent =
            "";
    } else if (
        visibleItems === 1
    ) {
        searchResult.textContent =
            "1 " +
            getInterfaceText(
                "item"
            ) +
            " " +
            getInterfaceText(
                "found"
            );
    } else {
        searchResult.textContent =
            visibleItems +
            " " +
            getInterfaceText(
                "items"
            ) +
            " " +
            getInterfaceText(
                "found"
            );
    }
}


/*
    APP STARTEN
*/

async function startApp() {
    try {
        await loadCollectedItems();

        await loadGermanTranslations();

        await loadItems();

        updateLatestCollected();
        updateStatistics();

        subscribeToItemChanges();
    } catch (error) {
        console.error(
            "Die App konnte nicht gestartet werden:",
            error
        );

        showLoadingError();

        alert(
            error.message
        );
    }
}

startApp();