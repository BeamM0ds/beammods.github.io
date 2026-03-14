// Variable to store mods globally so search/filter can access them easily
let allMods = [];

async function loadMods() {
    try {
        const response = await fetch('mods.json');
        allMods = await response.json();
        renderMods(allMods);
    } catch (error) {
        console.error("Error loading mods:", error);
        document.getElementById('mods').innerHTML = "<p style='color:red;'>Failed to load mods. Check mods.json for typos!</p>";
    }
}

// Function to actually draw the cards on the screen
function renderMods(modsToDisplay) {
    const modsContainer = document.getElementById('mods');
    modsContainer.innerHTML = ''; 

    modsToDisplay.forEach((mod) => {
        // We find the original index of the mod in the main list for the link
        const originalIndex = allMods.indexOf(mod);
        
        const card = document.createElement('div');
        card.className = 'mod-card';
        card.setAttribute('data-category', mod.category.toLowerCase().trim());

        card.innerHTML = `
            <div class="img-container">
                <img src="${mod.image}" alt="${mod.name}">
                ${mod.tag ? `<div class="tag">${mod.tag}</div>` : ''}
            </div>
            <div class="card-info">
                <h2>${mod.name}</h2>
                <p>${mod.description}</p>
                <a href="details.html?id=${originalIndex}" class="download">View Mod</a>
            </div>
        `;
        modsContainer.appendChild(card);
    });
}

// Fixed Search Function
function searchMods() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    
    // Filter the global allMods list based on the name or description
    const filtered = allMods.filter(mod => 
        mod.name.toLowerCase().includes(searchTerm) || 
        mod.description.toLowerCase().includes(searchTerm)
    );

    renderMods(filtered);
}

// Fixed Category Function
function filterSelection(category) {
    const links = document.getElementsByClassName("sidebar-link");
    const targetCategory = category.toLowerCase().trim();

    // Update sidebar UI
    for (let link of links) {
        link.classList.remove("active");
        if (link.getAttribute('onclick').includes(`'${category}'`)) {
            link.classList.add("active");
        }
    }

    // Filter the list
    if (targetCategory === "all") {
        renderMods(allMods);
    } else {
        const filtered = allMods.filter(mod => mod.category.toLowerCase().trim() === targetCategory);
        renderMods(filtered);
    }
}

window.onload = loadMods;
