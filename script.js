let allMods = [];

/**
 * 1. INITIAL LOAD
 * Fetches data from mods.json and forces a refresh with Date.now()
 */
async function loadMods() {
    try {
        const response = await fetch('mods.json?t=' + Date.now());
        if (!response.ok) throw new Error('Network response was not ok');
        allMods = await response.json();
        renderMods(allMods);
    } catch (e) {
        console.error("Critical Error: Could not load mods.json", e);
        const container = document.getElementById('mods');
        if (container) {
            container.innerHTML = `<p style="color: #ff4d4d; padding: 20px;">Error: Unable to load mod data. Please check mods.json.</p>`;
        }
    }
}

/**
 * 2. RENDER ENGINE
 * Builds the mod cards and injects them into the grid
 */
function renderMods(mods) {
    const container = document.getElementById('mods');
    if (!container) return;
    container.innerHTML = '';

    if (mods.length === 0) {
        container.innerHTML = `<p style="color: #484f58; padding: 20px;">No mods found matching your criteria.</p>`;
        return;
    }

    mods.forEach((mod) => {
        // Find original index for the details page link
        const idx = allMods.findIndex(m => m.name === mod.name);
        const card = document.createElement('div');
        card.className = 'mod-card';
        
        // Makes the entire card clickable
        card.onclick = () => window.location.href = `details.html?id=${idx}`;
        
        card.innerHTML = `
            <div style="position:relative; aspect-ratio:16/9; overflow:hidden;">
                <img src="${mod.image}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/400x225?text=Preview+Unavailable'">
                <div style="position:absolute; top:12px; left:12px; background:#3498db; color:white; padding:5px 10px; font-size:10px; font-weight:800; border-radius:6px; text-transform:uppercase;">${mod.tag || 'NEW'}</div>
            </div>
            <div style="padding:20px;">
                <h2 style="margin:0; font-size:18px; font-weight:700; color:white;">${mod.name}</h2>
                <p style="color:#3498db; font-size:12px; font-weight:600; margin:6px 0;">by ${mod.author || 'Royal Renderings'}</p>
                <p style="color:#888; font-size:13px; margin-bottom:15px; line-height:1.4;">${mod.description ? mod.description.substring(0, 65) + '...' : 'No description provided.'}</p>
                
                <div style="display:block; text-align:center; background:#3498db; color:white; padding:12px; border-radius:10px; font-weight:700; font-size:14px; transition: 0.2s;">
                    View Mod
                </div>
            </div>`;
        container.appendChild(card);
    });
}

/**
 * 3. SIDEBAR TOGGLE
 * Controls the visibility of the category menu
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar-menu');
    if (sidebar) {
        sidebar.classList.toggle('hidden');
    }
}

/**
 * 4. CATEGORY FILTERING
 * Highlights active link and filters the grid
 */
function filterSelection(cat, element) {
    // UI Update: Highlight active button
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(l => l.classList.remove('active'));
    if (element) element.classList.add('active');

    // Data Update: Filter mods
    const filtered = cat === 'all' ? allMods : allMods.filter(m => m.category.toLowerCase() === cat.toLowerCase());
    renderMods(filtered);

    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 768) {
        toggleSidebar();
    }
}

/**
 * 5. SEARCH FUNCTIONALITY
 */
function searchMods() {
    const term = document.getElementById('search').value.toLowerCase();
    const filtered = allMods.filter(m => m.name.toLowerCase().includes(term));
    renderMods(filtered);
}

// Kickstart the app
window.onload = loadMods;
