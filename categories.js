/*
    MINECRAFT ITEM KATEGORIEN
*/


const categories = {

    buildingBlocks: {
        name: "🧱 Building Blocks",
        items: []
    },

    coloredBlocks: {
        name: "🎨 Colored Blocks",
        items: []
    },

    naturalBlocks: {
        name: "🌱 Natural Blocks",
        items: []
    },

    functionalBlocks: {
        name: "⚙️ Functional Blocks",
        items: []
    },

    redstoneBlocks: {
        name: "🔴 Redstone Blocks",
        items: []
    },

    toolsUtilities: {
        name: "🛠 Tools & Utilities",
        items: []
    },

    combat: {
        name: "⚔️ Combat",
        items: []
    },

    foodDrinks: {
        name: "🍖 Food & Drinks",
        items: []
    },

    ingredients: {
        name: "🧪 Ingredients",
        items: []
    },

    nether: {
        name: "🌋 Nether",
        items: []
    },

    end: {
        name: "🌌 End",
        items: []
    }

};



/*
    ITEMS MANUELL HINZUFÜGEN
*/

function addCategoryItems(
    category,
    items
){

    categories[category]
        .items
        .push(
            ...items
        );

}



/*
    BASIS ITEMS
*/


addCategoryItems(
    "buildingBlocks",
    [

        "stone",
        "cobblestone",
        "stone_bricks",

        "oak_planks",
        "spruce_planks",
        "birch_planks",
        "jungle_planks",
        "acacia_planks",
        "dark_oak_planks",
        "mangrove_planks",
        "cherry_planks",

        "brick",
        "glass",

        "obsidian",

        "deepslate",
        "polished_deepslate"

    ]
);



addCategoryItems(
    "coloredBlocks",
    [

        "white_wool",
        "orange_wool",
        "magenta_wool",
        "light_blue_wool",
        "yellow_wool",
        "lime_wool",
        "pink_wool",
        "gray_wool",
        "light_gray_wool",
        "cyan_wool",
        "purple_wool",
        "blue_wool",
        "brown_wool",
        "green_wool",
        "red_wool",
        "black_wool"

    ]
);



addCategoryItems(
    "naturalBlocks",
    [

        "dirt",
        "grass_block",
        "sand",
        "red_sand",
        "gravel",

        "clay",

        "oak_log",
        "spruce_log",
        "birch_log",
        "jungle_log",
        "acacia_log",
        "dark_oak_log",

        "coal_ore",
        "iron_ore",
        "gold_ore",
        "diamond_ore",
        "emerald_ore",
        "lapis_ore"

    ]
);



addCategoryItems(
    "functionalBlocks",
    [

        "crafting_table",

        "furnace",
        "blast_furnace",
        "smoker",

        "chest",
        "barrel",

        "anvil",

        "enchanting_table",

        "brewing_stand",

        "beacon"

    ]
);



addCategoryItems(
    "redstoneBlocks",
    [

        "redstone",

        "redstone_block",

        "piston",

        "sticky_piston",

        "observer",

        "dispenser",

        "dropper",

        "hopper",

        "repeater",

        "comparator"

    ]
);



addCategoryItems(
    "toolsUtilities",
    [

        "wooden_pickaxe",
        "stone_pickaxe",
        "iron_pickaxe",
        "diamond_pickaxe",
        "netherite_pickaxe",

        "wooden_axe",
        "stone_axe",
        "iron_axe",
        "diamond_axe",
        "netherite_axe",

        "bucket",

        "water_bucket",

        "lava_bucket",

        "shears",

        "fishing_rod",

        "elytra"

    ]
);



addCategoryItems(
    "combat",
    [

        "wooden_sword",
        "stone_sword",
        "iron_sword",
        "diamond_sword",
        "netherite_sword",

        "bow",

        "crossbow",

        "shield",

        "trident"

    ]
);



addCategoryItems(
    "foodDrinks",
    [

        "bread",

        "apple",

        "golden_apple",

        "carrot",

        "potato",

        "beef",

        "cooked_beef",

        "chicken",

        "cooked_chicken"

    ]
);



addCategoryItems(
    "ingredients",
    [

        "iron_ingot",

        "gold_ingot",

        "diamond",

        "emerald",

        "redstone",

        "lapis_lazuli",

        "coal",

        "paper",

        "leather",

        "ender_pearl"

    ]
);



addCategoryItems(
    "nether",
    [

        "netherrack",

        "soul_sand",

        "soul_soil",

        "nether_bricks",

        "quartz",

        "blaze_rod",

        "ghast_tear",

        "netherite_ingot"

    ]
);



addCategoryItems(
    "end",
    [

        "end_stone",

        "purpur_block",

        "chorus_fruit",

        "ender_pearl",

        "shulker_shell",

        "elytra"

    ]
);




/*
    AUTOMATISCHE KATEGORIEN
*/


function getAutomaticCategories(itemId){

    const result = [];


    /*
        🌱 NATURAL BLOCKS
    */

    if (

        itemId.includes("leaves") ||
        itemId.includes("sapling") ||
        itemId.includes("log") ||
        itemId.includes("wood") ||

        itemId.includes("coral") ||

        itemId.includes("flower") ||
        itemId.includes("tulip") ||
        itemId.includes("orchid") ||

        itemId.includes("grass") ||
        itemId.includes("fern") ||

        itemId.includes("moss") ||

        itemId.includes("azalea") ||

        itemId.includes("bamboo") ||

        itemId === "dirt" ||
        itemId === "farmland" ||
        itemId === "sand" ||
        itemId === "red_sand" ||
        itemId === "gravel" ||
        itemId === "clay" ||
        itemId.includes("amethyst") ||

    itemId.includes("bush") ||

    itemId.includes("bee_nest") ||
    itemId.includes("beehive") ||

    itemId.includes("egg") ||
    itemId.includes("flower") ||
    itemId.includes("blossom") ||
    itemId.includes("dripleaf") ||
    itemId.includes("root") ||
    itemId.includes("vine") ||
    itemId.includes("lichen") ||
    itemId.includes("mushroom") ||

    itemId.includes("kelp") ||
    itemId.includes("cactus") ||
    itemId.includes("sugar_cane") ||

    itemId.includes("mycelium") ||
    itemId.includes("podzol") ||

    itemId.includes("mangrove") ||

    itemId === "beetroot" ||
    itemId === "wheat" ||
    itemId === "melon" ||
    itemId === "pumpkin" ||
    itemId === "bamboo" ||
     itemId === "allium" ||
    itemId === "azure_bluet" ||
    itemId === "dandelion" ||
    itemId === "lilac" ||
    itemId === "lily_of_the_valley" ||
    itemId === "lily_pad" ||
    itemId === "peony" ||
    itemId === "poppy" ||

    itemId === "coarse_dirt" ||
    itemId === "mud" ||
    itemId === "packed_mud" ||
    itemId === "dirt_path" ||

    itemId === "frogspawn" ||
    itemId === "leaf_litter" ||

    itemId === "pitcher_plant" ||
    itemId === "pitcher_pod" ||

    itemId === "sea_pickle" ||

    itemId === "snow" ||
    itemId === "snowball"

    ){

        result.push(
            "naturalBlocks"
        );

    }



    /*
        🧱 BUILDING BLOCKS
    */

    if (

        itemId.includes("planks") ||

        itemId.includes("stairs") ||

        itemId.includes("slab") ||

        itemId.includes("wall") ||

        itemId.includes("fence") ||

        itemId.includes("brick") ||

        itemId.includes("glass") ||

        itemId.includes("pane") ||

        itemId.includes("pillar") ||

        itemId === "cobweb" ||

        itemId.includes("tiles") ||

        itemId.includes("polished") ||

        itemId.includes("cut_") ||

        itemId.includes("chiseled") ||

        itemId.includes("mosaic") ||
        itemId.includes("trapdoor") ||
    itemId.includes("door") ||
    itemId.includes("sign") ||
    itemId.includes("hanging_sign") ||
    itemId.includes("shelf") ||

    itemId.includes("stone") ||
    itemId.includes("andesite") ||
    itemId.includes("diorite") ||
    itemId.includes("granite") ||
    itemId.includes("prismarine") ||

    itemId.includes("copper") ||

    itemId.includes("deepslate") ||

    itemId.includes("infested") ||
    itemId.includes("acacia") ||
    itemId.includes("birch") ||
    itemId.includes("dark_oak") ||

itemId.endsWith("_block") ||

    itemId.includes("calcite") ||
    itemId.includes("tuff") ||
    itemId.includes("andesite") ||
    itemId.includes("diorite") ||

    itemId.includes("terracotta") ||

    itemId.includes("ice") ||

    itemId.includes("sponge") ||

    itemId.includes("smooth_") ||

    itemId.includes("sculk") ||

    itemId.includes("froglight") ||
    itemId === "candle" ||
    itemId === "carved_pumpkin" ||

    itemId === "crying_obsidian" ||

    itemId === "iron_bars" ||

    itemId === "shroomlight" ||

    itemId === "suspicious_gravel" ||
    itemId === "suspicious_sand"


    ){

        result.push(
            "buildingBlocks"
        );

    }



    /*
        🎨 COLORED BLOCKS
    */

    const colors = [

        "white",
        "orange",
        "magenta",
        "light_blue",
        "yellow",
        "lime",
        "pink",
        "gray",
        "light_gray",
        "cyan",
        "purple",
        "blue",
        "brown",
        "green",
        "red",
        "black"

    ];


    if (

        colors.some(function(color){

            return itemId.startsWith(
                color + "_"
            );

        })

    ){

        result.push(
            "coloredBlocks"
        );

    }



    /*
        ⚙️ FUNCTIONAL BLOCKS
    */

    if (

        itemId.includes("crafting") ||

        itemId.includes("furnace") ||

        itemId.includes("smoker") ||

        itemId.includes("blast") ||

        itemId.includes("chest") ||

        itemId.includes("barrel") ||

        itemId.includes("anvil") ||

        itemId.includes("table") ||

        itemId.includes("loom") ||

        itemId.includes("lectern") ||

        itemId.includes("stonecutter") ||

        itemId.includes("cartography") ||

        itemId.includes("lantern") ||

        itemId.includes("bell") ||

        itemId.includes("chain") ||

        itemId.includes("conduit") ||

    itemId.includes("bookshelf") ||

    itemId.includes("shelf") ||

    itemId.includes("golem_statue") ||
    itemId.includes("campfire") ||
    itemId.includes("cauldron") ||
    itemId.includes("composter") ||
    itemId.includes("decorated_pot") ||
    itemId.includes("note_block") ||
    itemId.includes("jukebox") ||
    itemId.includes("item_frame") ||
    itemId.includes("painting") ||
    itemId.includes("lantern") ||

    itemId.includes("sculk_sensor") ||
    itemId.includes("sculk_catalyst") ||
    itemId.includes("sculk_shrieker") ||
    itemId === "ladder" ||
    itemId === "torch" ||

    itemId === "respawn_anchor" ||

    itemId === "creaking_heart" ||

    itemId === "heavy_core"

    ){

        result.push(
            "functionalBlocks"
        );

    }



    /*
        🔴 REDSTONE
    */

    if (

        itemId.includes("redstone") ||

        itemId.includes("piston") ||

        itemId.includes("observer") ||

        itemId.includes("hopper") ||

        itemId.includes("dropper") ||

        itemId.includes("dispenser") ||

        itemId.includes("rail") ||

        itemId.includes("comparator") ||

        itemId.includes("repeater") ||

        itemId.includes("lever") ||

        itemId.includes("button") ||

        itemId.includes("pressure_plate") ||

        itemId.includes("lightning_rod") ||

        itemId.includes("bulb") ||

         itemId.includes("target") ||
    itemId.includes("daylight_detector") ||
    itemId.includes("tripwire") ||
    itemId.includes("tnt") ||
    itemId.includes("note_block") ||

    itemId.includes("sculk_sensor")

    ){

        result.push(
            "redstoneBlocks"
        );

    }



    /*
        🛠 TOOLS & UTILITIES
    */

    if (

        itemId.includes("pickaxe") ||

        itemId.includes("axe") ||

        itemId.includes("shovel") ||

        itemId.includes("hoe") ||

        itemId.includes("bucket") ||

        itemId.includes("boat") ||

        itemId.includes("raft") ||

        itemId.includes("minecart") ||

        itemId === "shears" ||

        itemId === "brush" ||

        itemId === "spyglass" ||

        itemId === "compass" ||

        itemId === "clock" ||

        itemId.includes("bundle") ||

        itemId.includes("horn") ||

        itemId.includes("compass") ||
    itemId.includes("map") ||
    itemId.includes("saddle") ||
    itemId.includes("lead") ||
    itemId.includes("name_tag") ||
    itemId.includes("scaffolding") ||
    itemId.includes("bucket") ||

    itemId.includes("firework") ||
    itemId.includes("music_disc")

    ){

        result.push(
            "toolsUtilities"
        );

    }



    /*
        ⚔️ COMBAT
    */

    if (

        itemId.includes("sword") ||

        itemId.includes("helmet") ||

        itemId.includes("chestplate") ||

        itemId.includes("leggings") ||

        itemId.includes("boots") ||

        itemId.includes("bow") ||

        itemId.includes("arrow") ||

        itemId.includes("crossbow") ||

        itemId.includes("shield") ||

        itemId.includes("trident") ||

        itemId.includes("armor") ||

        itemId.includes("spear") ||

        itemId.includes("head") ||

        itemId.includes("mace") ||
    itemId.includes("totem") ||
    itemId.includes("skull") ||
    itemId.includes("skeleton") ||
    itemId.includes("phantom")

    ){

        result.push(
            "combat"
        );

    }



    /*
        🍖 FOOD
    */

    if (

        itemId.includes("apple") ||

        itemId.includes("bread") ||

        itemId.includes("beef") ||

        itemId.includes("chicken") ||

        itemId.includes("pork") ||

        itemId.includes("mutton") ||

        itemId.includes("rabbit") ||

        itemId.includes("fish") ||

        itemId.includes("carrot") ||

        itemId.includes("potato") ||

        itemId.includes("stew") ||

        itemId.includes("cake") ||

        itemId.includes("cookie") ||

        itemId.includes("beetroot") ||
    itemId.includes("soup") ||
    itemId.includes("cod") ||
    itemId.includes("salmon") ||
    itemId.includes("melon") ||
    itemId.includes("pumpkin_pie") ||
    itemId.includes("berries") ||
    itemId.includes("honey_bottle") ||

    itemId === "dried_kelp" ||
    itemId === "rotten_flesh"

    ){

        result.push(
            "foodDrinks"
        );

    }



    /*
        🧪 INGREDIENTS
    */

    if (

        itemId.includes("ingot") ||

        itemId.includes("nugget") ||

        itemId.includes("dust") ||

        itemId.includes("powder") ||

        itemId.includes("shard") ||

        itemId.includes("sherd") ||

        itemId.includes("crystal") ||

        itemId.includes("pearl") ||

        itemId.includes("gem") ||

        itemId.includes("pattern") ||

        itemId.includes("debris") ||

        itemId.includes("book") ||

    itemId.includes("breath") ||

    itemId.includes("rod") ||

    itemId.includes("scute") ||
    itemId.includes("clump") ||
    itemId.includes("bone") ||
    itemId.includes("feather") ||
    itemId.includes("string") ||
    itemId.includes("stick") ||
    itemId.includes("flint") ||
    itemId.includes("ink_sac") ||

    itemId.includes("potion") ||
    itemId.includes("eye") ||
    itemId.includes("charge") ||

    itemId.includes("disc_fragment") ||
    itemId.includes("key") ||

    itemId.includes("bottle") ||
    itemId === "charcoal" ||

    itemId === "clay_ball" ||

    itemId === "cocoa_beans" ||

    itemId === "honeycomb" ||

    itemId === "nautilus_shell" ||

    itemId === "raw_gold" ||

    itemId === "raw_iron" ||

    itemId === "slime_ball" ||

    itemId === "sugar" ||

    itemId === "wheat_seeds" ||

    itemId === "pumpkin_seeds" ||
    itemId === "heart_of_the_sea"

    ){

        result.push(
            "ingredients"
        );

    }



    /*
        🌋 NETHER
    */

    if (

        itemId.includes("nether") ||

        itemId.includes("crimson") ||

        itemId.includes("warped") ||

        itemId.includes("soul") ||

        itemId.includes("basalt") ||

        itemId.includes("blackstone") ||

        itemId === "netherrack" ||

        itemId.includes("magma") ||
    itemId.includes("ghast") ||
    itemId.includes("wither") ||
    itemId.includes("fire_charge") ||

    itemId.includes("resin") ||
    itemId.includes("dragon")

    ){

        result.push(
            "nether"
        );

    }



    /*
        🌌 END
    */

    if (

        itemId.includes("end") ||

        itemId.includes("chorus") ||

        itemId.includes("purpur") ||

        itemId.includes("shulker") ||

        itemId === "elytra" ||
        itemId.includes("dragon") ||
        itemId.includes("end")

    ){

        result.push(
            "end"
        );

    }


    return result;

}





/*
    ALLE KATEGORIEN EINES ITEMS
*/


function getItemCategories(itemId){

    const result = [];



    Object.entries(categories)
        .forEach(function(entry){

            if(
                entry[1].items.includes(
                    itemId
                )
            ){

                result.push(
                    entry[0]
                );

            }

        });



    getAutomaticCategories(itemId)
        .forEach(function(category){

            if(
                !result.includes(category)
            ){

                result.push(category);

            }

        });



    return result;

}



/*
    KATEGORIENAME
*/


function getCategoryName(categoryId){

    const translationKey = {

        buildingBlocks:
            "categoryBuildingBlocks",

        coloredBlocks:
            "categoryColoredBlocks",

        naturalBlocks:
            "categoryNaturalBlocks",

        functionalBlocks:
            "categoryFunctionalBlocks",

        redstoneBlocks:
            "categoryRedstoneBlocks",

        toolsUtilities:
            "categoryToolsUtilities",

        combat:
            "categoryCombat",

        foodDrinks:
            "categoryFoodDrinks",

        ingredients:
            "categoryIngredients",

        nether:
            "categoryNether",

        end:
            "categoryEnd",

        music:
            "categoryMusic"

    };


    const key =
        translationKey[categoryId];


    if(key){

        return getInterfaceText(
            key
        );

    }


    return categoryId;

}



/*
    TEST
*/


function checkUncategorizedItems(){

    const missing =
        items.filter(function(item){

            return (
                getItemCategories(
                    item.id
                ).length === 0
            );

        });



    console.log(
        "Gesamt:",
        items.length
    );


    console.log(
        "Ohne Kategorie:",
        missing.length
    );


    console.table(
        missing.map(function(item){

            return {
                id:item.id,
                name:item.name
            };

        })
    );


    return missing;

}