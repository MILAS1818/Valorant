const agentContainer = document.getElementById("agent-container");
const loadingText = document.getElementById("loading-text");
const mainTitle = document.getElementById("main-title");
const detailSection = document.getElementById("agent-detail");

// --- FUNGSI NAVBAR DROPDOWN BARU ---
function toggleMenu() {
  document.querySelector(".dropdown").classList.toggle("active");
}

// Menutup dropdown jika user klik di luar area menu
window.onclick = function (event) {
  if (!event.target.closest(".dropdown")) {
    document.querySelector(".dropdown").classList.remove("active");
  }
};

function showSection(sectionName, event) {
  event.stopPropagation(); // Mencegah dropdown tertutup otomatis sebelum fungsi jalan
  document.querySelector(".dropdown").classList.remove("active"); // Tutup menu setelah diklik

  if (sectionName === "agents") {
    closeDetail(); // Tampilkan halaman agen
  } else {
    alert("Fitur " + sectionName.toUpperCase() + " sedang dalam pengembangan!");
  }
}
// -----------------------------------

// Mengambil data dari API
fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
  .then((response) => response.json())
  .then((data) => {
    const agents = data.data;
    loadingText.style.display = "none";

    agents.forEach((agent) => {
      const agenNama = agent.displayName;
      const agenGambar = agent.fullPortraitV2;
      const agenDeskripsi = agent.description;
      const agenRole = agent.role;
      const agenAbilities = agent.abilities;

      if (agenGambar) {
        const agentCard = document.createElement("div");
        agentCard.classList.add("agent-card");

        agentCard.innerHTML = `
          <div class="img-container">
              <img src="${agenGambar}" alt="${agenNama}">
          </div>
          <div class="agent-name">${agenNama.toUpperCase()}</div>
        `;

        agentCard.addEventListener("click", () => {
          openDetail(
            agenNama,
            agenDeskripsi,
            agenGambar,
            agenRole,
            agenAbilities,
          );
        });

        agentContainer.appendChild(agentCard);
      }
    });
  })
  .catch((error) => {
    loadingText.innerText = "Gagal memuat API.";
    console.error("Gagal memuat API:", error);
  });

// FUNGSI MEMBUKA HALAMAN DETAIL
function openDetail(nama, deskripsi, gambar, role, abilities) {
  agentContainer.style.display = "none";
  mainTitle.style.display = "none";

  document.getElementById("detail-name").innerText = nama;
  document.getElementById("detail-desc").innerText = deskripsi;
  document.getElementById("detail-img").src = gambar;

  if (role) {
    document.getElementById("detail-role-name").innerText = role.displayName;
    document.getElementById("detail-role-icon").src = role.displayIcon;
    document.getElementById("detail-role-icon").style.display = "block";
  } else {
    document.getElementById("detail-role-name").innerText = "Tidak Diketahui";
    document.getElementById("detail-role-icon").style.display = "none";
  }

  const abilitiesContainer = document.getElementById("detail-abilities");
  abilitiesContainer.innerHTML = "";

  if (abilities && abilities.length > 0) {
    abilities.forEach((ability) => {
      if (ability.displayIcon) {
        const abilityCard = document.createElement("div");
        abilityCard.classList.add("ability-card");

        abilityCard.innerHTML = `
          <img class="ability-icon" src="${ability.displayIcon}" alt="${ability.displayName}">
          <h4 class="ability-name">${ability.displayName}</h4>
          <p class="ability-desc">${ability.description}</p>
        `;

        abilitiesContainer.appendChild(abilityCard);
      }
    });
  }

  detailSection.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// FUNGSI TOMBOL KEMBALI
function closeDetail() {
  detailSection.style.display = "none";
  agentContainer.style.display = "grid";
  mainTitle.innerText = "AGEN";
  mainTitle.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
