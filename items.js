/*
    ITEMLISTE LADEN
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
                "Die Itemliste konnte nicht geladen werden. Status: " +
                response.status
            );
        }

        const onlineItems =
            await response.json();

        items = onlineItems
            .filter(
                function (item) {
                    const isSpawnEgg =
                        item.name.endsWith(
                            "_spawn_egg"
                        );

                    const isExcluded =
                        excludedItems.includes(
                            item.name
                        );

                    return (
                        !isSpawnEgg &&
                        !isExcluded
                    );
                }
            )
            .map(
                function (item) {
                    return {
                        id: item.name,
                        englishName:
                            item.displayName
                    };
                }
            )
            .map(
                function (item) {
                    return {
                        id: item.id,

                        englishName:
                            item.englishName,

                        name:
                            getTranslatedItemName(
                                item
                            )
                    };
                }
            )
            .sort(
                function (
                    firstItem,
                    secondItem
                ) {
                    return firstItem.name
                        .localeCompare(
                            secondItem.name,
                            currentLanguage ===
                                "de"
                                ? "de"
                                : "en"
                        );
                }
            );

        createItemList();
        updateCounter();

        searchResult.textContent =
            "";
    } catch (error) {
        console.error(
            "Fehler beim Laden der Itemliste:",
            error
        );

        showLoadingError();
    }
}


/*
    ITEMLISTE ERSTELLEN
*/

function createItemList() {
    itemContainer.innerHTML =
        "";

    items.forEach(
        function (item) {
            const itemRow =
                document.createElement(
                    "div"
                );

            itemRow.classList.add(
                "item-row"
            );

            itemRow.dataset.itemName =
                item.name.toLowerCase() +
                " " +
                item.englishName
                    .toLowerCase() +
                " " +
                item.id.toLowerCase();

            const icon =
                createItemIcon(item);

            const itemContent =
                document.createElement(
                    "div"
                );

            itemContent.classList.add(
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
                "checkbox_" +
                item.id;

            const itemName =
                document.createElement(
                    "span"
                );

            itemName.textContent =
                item.name;

            const details =
                document.createElement(
                    "div"
                );

            details.classList.add(
                "item-details"
            );

            const savedData =
                getSavedItemData(
                    item.id
                );

            if (savedData) {
                checkbox.checked =
                    true;

                itemRow.classList.add(
                    "collected"
                );

                showItemDetails(
                    details,
                    savedData
                );
            }

            checkbox.addEventListener(
                "change",
                function () {
                    handleItemChange(
                        item,
                        checkbox,
                        details,
                        itemRow
                    );
                }
            );

            label.appendChild(
                checkbox
            );

            label.appendChild(
                itemName
            );

            itemContent.appendChild(
                label
            );

            itemContent.appendChild(
                details
            );

            itemRow.appendChild(
                icon
            );

            itemRow.appendChild(
                itemContent
            );

            itemContainer.appendChild(
                itemRow
            );
        }
    );
}


/*
    ITEMBILD ERSTELLEN
*/

function createItemIcon(item) {
    const icon =
        document.createElement(
            "img"
        );

    icon.classList.add(
        "item-icon"
    );

    icon.alt =
        item.name;

    icon.loading =
        "lazy";

    setIconSourceWithFallback(
        icon,
        item.id
    );

    return icon;
}


/*
    ITEMBILD MIT FALLBACK
*/

function setIconSourceWithFallback(
    imageElement,
    itemId
) {
    const itemIconUrl =
        ITEM_IMAGE_BASE_URL +
        "/items/" +
        itemId +
        ".png";

    const blockIconUrl =
        ITEM_IMAGE_BASE_URL +
        "/blocks/" +
        itemId +
        ".png";

    imageElement.src =
        itemIconUrl;

    imageElement.addEventListener(
        "error",
        function handleIconError() {
            if (
                imageElement.dataset
                    .triedBlock !==
                "true"
            ) {
                imageElement.dataset
                    .triedBlock =
                    "true";

                imageElement.src =
                    blockIconUrl;
            } else {
                imageElement.style
                    .display =
                    "none";
            }
        }
    );
}


/*
    GESPEICHERTE ITEMDATEN
*/

function getSavedItemData(
    itemId
) {
    return (
        collectedItems[itemId] ||
        null
    );
}


/*
    SAMMLER UND DATUM ANZEIGEN
*/

function showItemDetails(
    detailsElement,
    itemData
) {
    const formattedDate =
        formatDate(
            itemData.collectedAt
        );

    detailsElement.textContent =
        getInterfaceText(
            "collectedBy"
        ) +
        " " +
        itemData.collectedBy +
        " " +
        getInterfaceText(
            "on"
        ) +
        " " +
        formattedDate;
}


/*
    EIN ITEM IN DER ANZEIGE
    AKTUALISIEREN
*/

function refreshItem(itemId) {
    const checkbox =
        document.getElementById(
            "checkbox_" +
            itemId
        );

    /*
        Falls das Item gerade nicht
        in der Liste vorhanden ist,
        wird zumindest das Dashboard
        aktualisiert.
    */

    if (!checkbox) {
        updateLatestCollected();

        return;
    }

    const itemRow =
        checkbox.closest(
            ".item-row"
        );

    const details =
        itemRow.querySelector(
            ".item-details"
        );

    const itemData =
        collectedItems[itemId];

    if (itemData) {
        checkbox.checked =
            true;

        itemRow.classList.add(
            "collected"
        );

        showItemDetails(
            details,
            itemData
        );
    } else {
        checkbox.checked =
            false;

        itemRow.classList.remove(
            "collected"
        );

        details.textContent =
            "";
    }

    updateCounter();
    updateLatestCollected();
    updateStatistics();
}