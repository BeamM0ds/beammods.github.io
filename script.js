async function loadMods() {
    try {
        const response = await fetch('mods.json');
        const modsData = await response.json();
        const modsContainer = document.getElementById('mods');
        
        modsContainer.innerHTML = ''; 

        modsData.forEach((mod, index) => {
            const card = document.createElement('div');
            card.className = 'mod-card';
            card.setAttribute('data-category', mod.category);

            card.innerHTML = `
                <div class="img-container">
                    <img src="${mod.image}" alt="${mod.name}">
                    ${mod.tag ? `<div class="tag">${mod.tag}</div>` : ''}
                </div>
                <div class="card-info">
                    <h2>${mod.name}</h2>
                    <p>${mod.description}</p>
                    <a href="details.html?id=${index}" class="download">View Mod</a>
                </div>
            `;
            modsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading mods:", error);
    }
}
window.onload = loadMods;
