const SUPABASE_URL =
    "https://bttghqamkgsrmatqknuj.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_YoxEiF7Pd9BIO2rxdhstlw_5vffULzD";

const ITEM_LIST_URL =
    "https://cdn.jsdelivr.net/gh/PrismarineJS/" +
    "minecraft-data@master/data/pc/1.21.11/items.json";

const GERMAN_LANGUAGE_URL =
    "https://raw.githubusercontent.com/" +
    "InventivetalentDev/minecraft-assets/1.21.11/" +
    "assets/minecraft/lang/de_de.json";

const ITEM_IMAGE_BASE_URL =
    "https://raw.githubusercontent.com/" +
    "PrismarineJS/minecraft-assets/master/data/1.21.8";

const excludedItems = [
    "air",
    "barrier",
    "bedrock",
    "command_block",
    "chain_command_block",
    "repeating_command_block",
    "command_block_minecart",
    "structure_block",
    "structure_void",
    "jigsaw",
    "light",
    "debug_stick",
    "knowledge_book",
    "player_head",
    "petrified_oak_slab",
    "end_portal_frame",
    "reinforced_deepslate",
    "spawner",
    "trial_spawner",
    "vault"
];

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );