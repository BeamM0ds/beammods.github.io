let allMods = [];

async function loadMods() {
    try {
        const response = await fetch('mods.json?t=' + Date.now());
        if (!response.ok) throw new Error("File not found");
        allMods = await response.json();
        renderMods(allMods);
    } catch (e) {
        document.getElementById('mods').innerHTML = `<p style="color:red">JSON Error: Make sure mods.json has [ ] brackets!</p>`;
    }
}

function renderMods(mods) {
    const container = document.getElementById('mods');
    container.innerHTML = '';
    mods.forEach((mod) => {
        const idx = allMods.findIndex(m => m.name === mod.name);
        const card = document.createElement('div');
        card.className = 'mod-card';
        card.innerHTML = `
            <div class="img-container">
                <img src="${mod.image}">
                <div class="tag">${mod.tag || ''}</div>
            </div>
            <div class="card-info">
                <h2>${mod.name}</h2>
                <p style="color:#3498db; font-size:12px; font-weight:600;">by ${mod.author || 'Royal Renderings'}</p>
                <p style="font-size:13px; color:#888;">${mod.description.substring(0, 60)}...</p>
                <a href="details.html?id=${idx}" class="download">View Mod</a>
            </div>`;
        container.appendChild(card);
    });
}

function filterSelection(cat) {
    renderMods(cat === 'all' ? allMods : allMods.filter(m => m.category === cat));
}

function searchMods() {
    const term = document.getElementById('search').value.toLowerCase();
    renderMods(allMods.filter(m => m.name.toLowerCase().includes(term)));
}

window.onload = loadMods;
