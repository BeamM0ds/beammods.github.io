let allMods = [];

async function loadMods() {
    const container = document.getElementById('mods');
    try {
        // We use a random number to make sure GitHub doesn't show an old version
        const response = await fetch('mods.json?nocache=' + Math.random());
        
        if (!response.ok) {
            throw new Error("File not found! Make sure mods.json is in the folder.");
        }

        allMods = await response.json();
        
        if (allMods.length > 0) {
            renderMods(allMods);
        } else {
            container.innerHTML = `<div id="status-msg">Your mods.json file is empty!</div>`;
        }

    } catch (e) {
        console.error("Error loading mods:", e);
        container.innerHTML = `<div id="status-msg" style="color:#ff4d4d;">
            ⚠️ MODS FAILED TO LOAD<br>
            <small style="color:gray;">Error: ${e.message}</small>
        </div>`;
    }
}

function renderMods(mods) {
    const container = document.getElementById('mods');
    container.innerHTML = '';
    
    if (mods.length === 0) {
        container.innerHTML = `<div id="status-msg">No mods found in this category.</div>`;
        return;
    }

    mods.forEach((mod, index) => {
        const card = document.createElement('div');
        card.className = 'mod-card';
        card.onclick = () => window.location.href = `details.html?id=${index}`;
        card.innerHTML = `
            <div style="position:relative; aspect-ratio:16/9; overflow:hidden;">
                <img src="${mod.image}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/400x225?text=Image+Missing'">
                <div style="position:absolute; top:12px; left:12px; background:#3498db; color:white; padding:5px 10px; font-size:10px; font-weight:800; border-radius:6px; text-transform:uppercase;">${mod.tag || 'NEW'}</div>
            </div>
            <div style="padding:20px;">
                <h2 style="margin:0; font-size:18px; font-weight:700;">${mod.name}</h2>
                <p style="color:#3498db; font-size:12px; font-weight:600; margin:6px 0;">by ${mod.author || 'Royal Renderings'}</p>
                <p style="color:#8b949e; font-size:13px; margin-bottom:15px; line-height:1.4;">${mod.description ? mod.description.substring(0, 70) + '...' : 'Premium BeamNG mod.'}</p>
                <div style="display:block; text-align:center; background:#3498db; color:white; padding:12px; border-radius:8px; font-weight:700; font-size:14px;">View Mod</div>
            </div>`;
        container.appendChild(card);
    });
}

function toggleSidebar() {
    document.getElementById('sidebar-menu').classList.toggle('hidden');
}

function filterSelection(cat, element) {
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(l => l.classList.remove('active'));
    if (element) element.classList.add('active');
    
    // This looks at your category field in mods.json
    const filtered = (cat === 'all') ? allMods : allMods.filter(m => m.category.toLowerCase().includes(cat.toLowerCase()));
    renderMods(filtered);
}

function searchMods() {
    const term = document.getElementById('search').value.toLowerCase();
    const filtered = allMods.filter(m => m.name.toLowerCase().includes(term));
    renderMods(filtered);
}

window.onload = loadMods;
