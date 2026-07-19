/*
    DATUM UND UHRZEIT
*/

function formatDate(dateValue) {
    const locale =
        currentLanguage === "de"
            ? "de-DE"
            : "en-GB";

    return new Date(dateValue)
        .toLocaleString(locale, {
            dateStyle: "medium",
            timeStyle: "short"
        });
}


/*
    ITEMS SUCHEN
*/

function getItemById(itemId) {
    return (
        items.find(function (item) {
            return item.id === itemId;
        }) || null
    );
}