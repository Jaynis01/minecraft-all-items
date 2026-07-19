/*
    HTML-ELEMENTE
*/

const latestTitle =
    document.getElementById("latest-title");

const latestCollected =
    document.getElementById("latest-collected");


/*
    ZULETZT GESAMMELT
*/

function updateLatestCollected() {
    if (
        !latestCollected ||
        !latestTitle
    ) {
        return;
    }

    latestTitle.textContent =
        getInterfaceText(
            "latestCollected"
        );

    const collectedEntries =
        Object.entries(collectedItems);

    if (
        collectedEntries.length === 0
    ) {
        latestCollected.textContent =
            getInterfaceText(
                "noItemsCollected"
            );

        return;
    }

    collectedEntries.sort(
        function (entryA, entryB) {
            const dateA =
                new Date(
                    entryA[1].collectedAt
                );

            const dateB =
                new Date(
                    entryB[1].collectedAt
                );

            return dateB - dateA;
        }
    );

    const latestItemId =
        collectedEntries[0][0];

    const latestItemData =
        collectedEntries[0][1];

    const latestItem =
        getItemById(latestItemId);

    if (!latestItem) {
        latestCollected.textContent =
            getInterfaceText(
                "noItemsCollected"
            );

        return;
    }

    const formattedDate =
        formatDate(
            latestItemData.collectedAt
        );

    latestCollected.innerHTML = "";

    const latestItemElement =
        document.createElement("div");

    latestItemElement.classList.add(
        "latest-item"
    );

    const icon =
        document.createElement("img");

    icon.classList.add(
        "latest-item-icon"
    );

    icon.alt = latestItem.name;

    setIconSourceWithFallback(
        icon,
        latestItem.id
    );

    const content =
        document.createElement("div");

    content.classList.add(
        "latest-item-content"
    );

    const itemName =
        document.createElement("strong");

    itemName.textContent =
        latestItem.name;

    const itemDetails =
        document.createElement("div");

    itemDetails.classList.add(
        "latest-item-details"
    );

    itemDetails.textContent =
        getInterfaceText("collectedBy") +
        " " +
        latestItemData.collectedBy +
        " " +
        getInterfaceText("on") +
        " " +
        formattedDate;

    content.appendChild(itemName);
    content.appendChild(itemDetails);

    latestItemElement.appendChild(icon);
    latestItemElement.appendChild(content);

    latestCollected.appendChild(
        latestItemElement
    );
}

const statisticsTitle =
    document.getElementById("statistics-title");

const statisticsContainer =
    document.getElementById("statistics");


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


    


    const collectors = {};


    Object.values(
        collectedItems
    ).forEach(
        function(item) {

            if (
                !collectors[item.collectedBy]
            ) {
                collectors[
                    item.collectedBy
                ] = 0;
            }

            collectors[
                item.collectedBy
            ]++;
        }
    );


    let collectorText =
        "";


    Object.entries(
        collectors
    )
    .sort(
        function(a,b){
            return b[1]-a[1];
        }
    )
    .forEach(
        function(entry){

            collectorText +=
                "<br>" +
                entry[0] +
                ": " +
                entry[1];
        }
    );


    statisticsContainer.innerHTML =
    getInterfaceText("collected") +
    ": " +
    collectedCount +
    " / " +
    items.length +
    "<br><br>" +
    collectorText;
}