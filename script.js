async function loadMods() {
    try {
        const response = await fetch('mods.json');
        const modsData = await response.json();
        const modsContainer = document.getElementById('mods');
        
        modsContainer.innerHTML = ''; 

        modsData.forEach((mod, index) => {
            const card = document.createElement('div');
            card.className = 'mod-card';
            card.setAttribute('data-category', mod.category.toLowerCase());

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

function filterSelection(category) {
    const mods = document.getElementsByClassName("mod-card");
    const links = document.getElementsByClassName("sidebar-link");

    // Update active link style
    for (let link of links) {
        link.classList.remove("active");
        if(link.innerText.toLowerCase().includes(category)) {
            link.classList.add("active");
        }
    }

    // Show/Hide cards
    for (let mod of mods) {
        const itemCategory = mod.getAttribute("data-category");
        if (category === "all" || itemCategory === category) {
            mod.style.display = "block";
        } else {
            mod.style.display = "none";
        }
    }
}

function searchMods() {
    const input = document.getElementById("search").value.toLowerCase();
    const mods = document.getElementsByClassName("mod-card");

    for (let mod of mods) {
        const title = mod.querySelector("h2").innerText.toLowerCase();
        mod.style.display = title.includes(input) ? "block" : "none";
    }
}

window.onload = loadMods;
