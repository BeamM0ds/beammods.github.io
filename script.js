function searchMods() {
    // 1. Get what the user typed
    let input = document.getElementById("search").value.toLowerCase();
    
    // 2. Get all the mod cards
    let mods = document.getElementsByClassName("mod-card");

    for (let i = 0; i < mods.length; i++) {
        // 3. Specifically target the <h2> tag inside the card for the name
        // This is more reliable than checking the whole card's text
        let title = mods[i].querySelector("h2").innerText.toLowerCase();

        // 4. Check if the title contains the search input
        if (title.includes(input)) {
            mods[i].style.display = "block"; // Force it to show
        } else {
            mods[i].style.display = "none";  // Hide it
        }
    }
}
