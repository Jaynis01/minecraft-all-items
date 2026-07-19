/*
    ITEMS LADEN
*/

async function loadCollectedItems(){

    const {data,error} =
        await supabaseClient
            .from("collected_items")
            .select("*");


    if(error){

        throw new Error(
            "Spielstand konnte nicht geladen werden: "
            +
            error.message
        );

    }


    collectedItems = {};


    data.forEach(function(item){

        collectedItems[item.item_id] = {

            collectedBy:
                item.collected_by,

            collectedAt:
                item.collected_at

        };

    });


    console.log(
        data.length +
        " Items geladen."
    );

}



/*
    ITEM SPEICHERN
*/

async function collectItem(
    item,
    username
){

    const collectedAt =
        new Date().toISOString();


    const {error} =
        await supabaseClient
            .from("collected_items")
            .insert({

                item_id:
                    item.id,

                collected_by:
                    username,

                collected_at:
                    collectedAt

            });



    if(error){

        throw error;

    }


    collectedItems[item.id] = {

        collectedBy:
            username,

        collectedAt:
            collectedAt

    };

}



/*
    ITEM ENTFERNEN
*/

async function removeCollectedItem(item){

    const {error} =
        await supabaseClient
            .from("collected_items")
            .delete()
            .eq(
                "item_id",
                item.id
            );


    if(error){

        throw error;

    }


    delete collectedItems[item.id];

}



/*
    REALTIME
*/

function subscribeToItemChanges(){

    supabaseClient
        .channel(
            "collected-items-changes"
        )

        .on(
            "postgres_changes",
            {
                event:"INSERT",
                schema:"public",
                table:"collected_items"
            },
            handleRealtimeChange
        )

        .on(
            "postgres_changes",
            {
                event:"UPDATE",
                schema:"public",
                table:"collected_items"
            },
            handleRealtimeChange
        )

        .on(
            "postgres_changes",
            {
                event:"DELETE",
                schema:"public",
                table:"collected_items"
            },
            handleRealtimeDelete
        )

        .subscribe();

}



/*
    REALTIME ÄNDERUNG
*/

function handleRealtimeChange(payload){

    const item =
        payload.new;


    collectedItems[item.item_id] = {

        collectedBy:
            item.collected_by,

        collectedAt:
            item.collected_at

    };


    refreshItem(
        item.item_id
    );


    updateLatestCollected();

    updateStatistics();

}



/*
    REALTIME LÖSCHEN
*/

function handleRealtimeDelete(payload){

    const item =
        payload.old;


    delete collectedItems[item.item_id];


    refreshItem(
        item.item_id
    );


    updateLatestCollected();

    updateStatistics();

}