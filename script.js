let allMods = [];

async function loadMods() {
    try {
        const response = await fetch('mods.json?t=' + Date.now());
        allMods = await response.json();
        renderMods(allMods);
    } catch (e) {
        document.getElementById('mods').innerHTML = "<p style='color:red;'>Error: Check mods.json formatting!</p>";
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
            <div style="position:relative; aspect-ratio:16/9; overflow:hidden;">
                <img src="${mod.image}" style="width:100%; height:100%; object-fit:cover;">
                <div style="position:absolute; top:10px; left:10px; background:#3498db; color:white; padding:4px 8px; font-size:10px; font-weight:800; border-radius:4px;">${mod.tag || 'NEW'}</div>
            </div>
            <div class="card-info">
                <h2 style="margin:0; font-size:18px;">${mod.name}</h2>
                <p style="color:#3498db; font-size:12px; font-weight:600; margin:5px 0;">by ${mod.author || 'Royal Renderings'}</p>
                <p style="color:#888; font-size:13px; margin-bottom:15px;">${mod.description.substring(0, 60)}...</p>
                <a href="details.html?id=${idx}" class="view-btn">View Mod</a>
            </div>`;
        container.appendChild(card);
    });
}

function filterSelection(cat) {
    renderMods(cat === 'all' ? allMods : allMods.filter(m => m.category.toLowerCase() === cat.toLowerCase()));
}

function searchMods() {
    const term = document.getElementById('search').value.toLowerCase();
    renderMods(allMods.filter(m => m.name.toLowerCase().includes(term) || m.author.toLowerCase().includes(term)));
}

window.onload = loadMods;
