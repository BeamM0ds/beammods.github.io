// Filter mods by clicking sidebar links
function filterSelection(category) {
    const mods = document.getElementsByClassName("mod-card");
    const links = document.getElementsByClassName("sidebar-link");

    // Change active button styling
    for (let link of links) {
        link.classList.remove("active");
    }
    event.currentTarget.classList.add("active");

    // Filter logic
    for (let mod of mods) {
        const itemCategory = mod.getAttribute("data-category");
        if (category === "all" || itemCategory === category) {
            mod.style.display = "block";
        } else {
            mod.style.display = "none";
        }
    }
}

// Search mods by typing
function searchMods() {
    const input = document.getElementById("search").value.toLowerCase();
    const mods = document.getElementsByClassName("mod-card");

    for (let mod of mods) {
        const title = mod.querySelector("h2").innerText.toLowerCase();
        if (title.includes(input)) {
            mod.style.display = "block";
        } else {
            mod.style.display = "none";
        }
    }
}
