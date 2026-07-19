/*
    GESAMMELTE ITEMS LADEN
*/

async function loadCollectedItems() {
    const { data, error } =
        await supabaseClient
            .from("collected_items")
            .select("*");

    if (error) {
        console.error(
            "Gesammelte Items konnten nicht geladen werden:",
            error
        );

        throw new Error(
            "Der gemeinsame Spielstand konnte nicht geladen werden: " +
            error.message
        );
    }

    collectedItems = {};

    data.forEach(
        function (databaseItem) {
            collectedItems[
                databaseItem.item_id
            ] = {
                collectedBy:
                    databaseItem.collected_by,

                collectedAt:
                    databaseItem.collected_at
            };
        }
    );

    console.log(
        data.length +
        " gesammelte Items aus Supabase geladen."
    );
}


/*
    ITEM SPEICHERN
*/

async function collectItem(
    item,
    username,
    details,
    itemRow
) {
    const collectedAt =
        new Date().toISOString();

    const { error } =
        await supabaseClient
            .from("collected_items")
            .insert({
                item_id: item.id,
                collected_by: username,
                collected_at: collectedAt
            });

    if (error) {
        console.error(
            "Item konnte nicht gespeichert werden:",
            error
        );

        const checkbox =
            document.getElementById(
                "checkbox_" + item.id
            );

        if (checkbox) {
            checkbox.checked = false;
        }

        alert(
            "Das Item konnte nicht gespeichert werden:\n" +
            error.message
        );

        return;
    }

    const itemData = {
        collectedBy: username,
        collectedAt: collectedAt
    };

    collectedItems[item.id] =
        itemData;

    itemRow.classList.add(
        "collected"
    );

    showItemDetails(
        details,
        itemData
    );

    updateLatestCollected();
}


/*
    ITEM ENTFERNEN
*/

async function removeCollectedItem(
    item,
    checkbox,
    details,
    itemRow
) {
    const { error } =
        await supabaseClient
            .from("collected_items")
            .delete()
            .eq("item_id", item.id);

    if (error) {
        console.error(
            "Item konnte nicht entfernt werden:",
            error
        );

        checkbox.checked = true;

        alert(
            "Das Item konnte nicht entfernt werden:\n" +
            error.message
        );

        return;
    }

    delete collectedItems[item.id];

    itemRow.classList.remove(
        "collected"
    );

    details.textContent = "";

    updateLatestCollected();
}


/*
    REALTIME-SYNCHRONISATION
*/

function subscribeToItemChanges() {
    supabaseClient
        .channel(
            "collected-items-changes"
        )
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "collected_items"
            },
            handleRealtimeInsert
        )
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "collected_items"
            },
            handleRealtimeInsert
        )
        .on(
            "postgres_changes",
            {
                event: "DELETE",
                schema: "public",
                table: "collected_items"
            },
            handleRealtimeDelete
        )
        .subscribe(
            function (status, error) {
                console.log(
                    "Realtime-Status:",
                    status
                );

                if (error) {
                    console.error(
                        "Realtime-Verbindungsfehler:",
                        error
                    );
                }

                if (
                    status === "SUBSCRIBED"
                ) {
                    console.log(
                        "Realtime-Synchronisation ist aktiv."
                    );
                }

                if (
                    status ===
                        "CHANNEL_ERROR" ||
                    status ===
                        "TIMED_OUT"
                ) {
                    alert(
                        "Die Realtime-Verbindung konnte nicht aufgebaut werden. " +
                        "Sieh bitte in die Browser-Konsole."
                    );
                }
            }
        );
}


/*
    REALTIME: ITEM HINZUGEFÜGT
*/

function handleRealtimeInsert(payload) {
    const databaseItem =
        payload.new;

    collectedItems[
        databaseItem.item_id
    ] = {
        collectedBy:
            databaseItem.collected_by,

        collectedAt:
            databaseItem.collected_at
    };

    refreshItem(
        databaseItem.item_id
    );
    updateStatistics();
}


/*
    REALTIME: ITEM ENTFERNT
*/

function handleRealtimeDelete(payload) {
    const databaseItem =
        payload.old;

    delete collectedItems[
        databaseItem.item_id
    ];

    refreshItem(
        databaseItem.item_id
    );
    updateStatistics();
}