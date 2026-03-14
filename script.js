let allMods = [];

async function loadMods() {
    const modsContainer = document.getElementById('mods');
    try {
        // Adding a timestamp (?t=) forces the browser to download the NEWEST version of the JSON
        const response = await fetch('mods.json?t=' + Date.now());
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        allMods = await response.json();
        console.log("Successfully loaded mods:", allMods);
        renderMods(allMods);

    } catch (error) {
        console.error("JSON Error:", error);
        if (modsContainer) {
            modsContainer.innerHTML = `
                <div style="color: #ff4444; padding: 20px; border: 1px dashed #ff4444; border-radius: 8px;">
                    <h3>⚠️ JSON Data Error</h3>
                    <p>The website found <b>mods.json</b>, but it can't read it. This usually means a missing comma or bracket.</p>
                    <p><small>Technical Error: ${error.message}</small></p>
                </div>
            `;
        }
    }
}

function renderMods(modsToDisplay) {
    const modsContainer = document.getElementById('mods');
    if (!modsContainer) return;
    modsContainer.innerHTML = ''; 

    modsToDisplay.forEach((mod, index) => {
        // We use the index from the main allMods array for the link
        const originalIndex = allMods.findIndex(m => m.name === mod.name);
        
        const card = document.createElement('div');
        card.className = 'mod-card';
        card.innerHTML = `
            <div class="img-container">
                <img src="${mod.image}" alt="${mod.name}" onerror="this.src='https://via.placeholder.com/300x180?text=Image+Missing'">
                ${mod.tag ? `<div class="tag">${mod.tag}</div>` : ''}
            </div>
            <div class="card-info">
                <h2>${mod.name}</h2>
                <p style="color: #3498db; font-size: 13px; margin-bottom: 5px; font-weight: 600;">by ${mod.author || 'Royal Renderings'}</p>
                <p>${mod.description}</p>
                <a href="details.html?id=${originalIndex}" class="download">View Mod</a>
            </div>
        `;
        modsContainer.appendChild(card);
    });
}

// Category logic
function filterSelection(category) {
    const target = category.toLowerCase().trim();
    if (target === "all") {
        renderMods(allMods);
    } else {
        const filtered = allMods.filter(mod => mod.category.toLowerCase().trim() === target);
        renderMods(filtered);
    }
}

// Search logic
function searchMods() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filtered = allMods.filter(mod => 
        mod.name.toLowerCase().includes(searchTerm) || 
        mod.description.toLowerCase().includes(searchTerm)
    );
    renderMods(filtered);
}

window.onload = loadMods;
