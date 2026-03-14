let allMods = [];

async function loadMods() {
    try {
        console.log("Attempting to load mods.json...");
        const response = await fetch('mods.json');
        allMods = await response.json();
        console.log("Mods loaded successfully:", allMods);
        renderMods(allMods);
    } catch (error) {
        console.error("Error loading mods:", error);
    }
}

function renderMods(modsToDisplay) {
    const modsContainer = document.getElementById('mods');
    if (!modsContainer) return;
    
    modsContainer.innerHTML = ''; 

    modsToDisplay.forEach((mod) => {
        const originalIndex = allMods.findIndex(m => m.name === mod.name);
        const card = document.createElement('div');
        card.className = 'mod-card';
        
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

function filterSelection(category) {
    console.log("Filtering for:", category);
    const links = document.querySelectorAll(".sidebar-link");
    
    links.forEach(link => link.classList.remove("active"));
    
    // Match logic
    if (category === "all") {
        renderMods(allMods);
    } else {
        const filtered = allMods.filter(mod => mod.category.toLowerCase() === category.toLowerCase());
        renderMods(filtered);
    }
}

function searchMods() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filtered = allMods.filter(mod => 
        mod.name.toLowerCase().includes(searchTerm) || 
        mod.description.toLowerCase().includes(searchTerm)
    );
    renderMods(filtered);
}

window.onload = loadMods;
