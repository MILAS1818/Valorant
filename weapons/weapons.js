let weaponsData = [];
let currentWeapon = null;

// Jalankan saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  fetch("weapons.json")
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Gagal mengambil weapons.json. Pastikan buka pakai Live Server.",
        );
      return response.json();
    })
    .then((data) => {
      weaponsData = data.data ? data.data : data;
      if (!Array.isArray(weaponsData)) weaponsData = [weaponsData];

      document.getElementById("loading-text").classList.add("hidden");
      document.getElementById("main-view").classList.remove("hidden");
      renderWeapons();
    })
    .catch((error) => {
      document.getElementById("loading-text").classList.add("hidden");
      document.getElementById("error-box").classList.remove("hidden");
      document.getElementById("error-msg").innerText = error.message;
    });
});

// TAMPILAN 1: Menampilkan Daftar Senjata
function renderWeapons() {
  const list = document.getElementById("weapons-list");
  list.innerHTML = "";

  weaponsData.forEach((weapon) => {
    const card = document.createElement("div");
    card.className = "card";
    const icon =
      weapon.displayIcon || "https://via.placeholder.com/250x100?text=No+Image";

    card.innerHTML = `
            <img src="${icon}" alt="${weapon.displayName}">
            <h3>${weapon.displayName}</h3>
        `;
    card.onclick = () => showSkins(weapon);
    list.appendChild(card);
  });
}

// TAMPILAN 2: Menampilkan Daftar Skin
function showSkins(weapon) {
  currentWeapon = weapon;
  document.getElementById("main-view").classList.add("hidden");
  document.getElementById("skin-detail-view").classList.add("hidden");
  document.getElementById("skins-view").classList.remove("hidden");

  document.getElementById("weapon-title").innerText =
    `Skin: ${weapon.displayName}`;

  const skinsList = document.getElementById("skins-list");
  skinsList.innerHTML = "";

  if (weapon.skins && weapon.skins.length > 0) {
    weapon.skins.forEach((skin) => {
      const card = document.createElement("div");
      card.className = "card";
      const iconSkin =
        skin.displayIcon ||
        "https://via.placeholder.com/250x100?text=No+Skin+Icon";

      card.innerHTML = `
                <img src="${iconSkin}" alt="${skin.displayName}">
                <h3>${skin.displayName}</h3>
            `;
      card.onclick = () => showSkinDetail(skin);
      skinsList.appendChild(card);
    });
  } else {
    skinsList.innerHTML =
      '<p style="grid-column: 1 / -1;">Tidak ada skin untuk senjata ini.</p>';
  }
}

// TAMPILAN 3: Detail Skin (Level, Warna, Video)
function showSkinDetail(skin) {
  document.getElementById("skins-view").classList.add("hidden");
  document.getElementById("skin-detail-view").classList.remove("hidden");

  document.getElementById("detail-title").innerText = skin.displayName;

  // Setup Video
  const videoContainer = document.getElementById("detail-video");
  videoContainer.innerHTML = "";
  let videoFound = false;

  // Setup Levels
  const levelsContainer = document.getElementById("detail-levels");
  levelsContainer.innerHTML = "<h3>Daftar Upgrade (Level)</h3><ul>";

  if (skin.levels && skin.levels.length > 0) {
    skin.levels.forEach((level) => {
      levelsContainer.innerHTML += `<li>${level.displayName}</li>`;

      if (level.streamedVideo && !videoFound) {
        videoContainer.innerHTML = `
                    <video controls autoplay loop muted>
                        <source src="${level.streamedVideo}" type="video/mp4">
                        Browser kamu tidak mendukung video ini.
                    </video>
                `;
        videoFound = true;
      }
    });
    levelsContainer.innerHTML += "</ul>";
  } else {
    levelsContainer.innerHTML =
      "<h3>Daftar Upgrade (Level)</h3><p>Tidak ada data level.</p>";
  }

  // Setup Chromas (Warna)
  const chromasContainer = document.getElementById("detail-chromas");
  chromasContainer.innerHTML =
    '<h3>Varian Warna</h3><div class="chroma-flex" id="chroma-list-box"></div>';
  const chromaListBox = document.getElementById("chroma-list-box");

  if (skin.chromas && skin.chromas.length > 0) {
    skin.chromas.forEach((chroma) => {
      const imgUrl =
        chroma.swatch ||
        chroma.displayIcon ||
        chroma.fullRender ||
        "https://via.placeholder.com/120x50?text=No+Color+Icon";
      chromaListBox.innerHTML += `
                <div class="chroma-item">
                    <img src="${imgUrl}" alt="${chroma.displayName}">
                    <p>${chroma.displayName}</p>
                </div>
            `;
    });
  } else {
    chromasContainer.innerHTML =
      "<h3>Varian Warna</h3><p>Tidak ada varian warna tambahan.</p>";
  }
}

// Navigasi Kembali
function showMainView() {
  document.getElementById("skins-view").classList.add("hidden");
  document.getElementById("main-view").classList.remove("hidden");
  
}

function showSkinsView() {
  document.getElementById("skin-detail-view").classList.add("hidden");
  document.getElementById("skins-view").classList.remove("hidden");
  if (currentWeapon) showSkins(currentWeapon);
}
