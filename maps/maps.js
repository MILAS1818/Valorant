const mapContainer = document.getElementById("map-container");
const loadingText = document.getElementById("loading-text");
const mainTitle = document.getElementById("main-title");
const detailSection = document.getElementById("map-detail");
const galleryContainer = document.getElementById("detail-gallery");

fetch("maps.json")
  .then((response) => response.json())
  .then((data) => {
    const maps = data.data;
    loadingText.style.display = "none";

    maps.forEach((map) => {
      if (map.splash) {
        const mapCard = document.createElement("div");
        mapCard.classList.add("map-card");

        mapCard.innerHTML = `
          <img src="${map.splash}" alt="${map.displayName}">
          <div class="map-name">${map.displayName}</div>
        `;

        // Kirim KESELURUHAN data map ke fungsi openDetail saat diklik
        mapCard.addEventListener("click", () => {
          openDetail(map);
        });

        mapContainer.appendChild(mapCard);
      }
    });
  })
  .catch((error) => {
    loadingText.innerText =
      "Gagal memuat maps.json. Pastikan jalan di Live Server.";
    console.error("Error:", error);
  });

// Fungsi membuka halaman detail dengan data dinamis
function openDetail(map) {
  mapContainer.style.display = "none";
  mainTitle.style.display = "none";

  // Teks & Gambar Utama
  document.getElementById("detail-name").innerText = map.displayName;
  document.getElementById("detail-img").src = map.splash;
  document.getElementById("detail-tactical").innerText = map.tacticalDescription
    ? map.tacticalDescription
    : "Tidak ada data taktis.";
  document.getElementById("detail-coords").innerText = map.coordinates
    ? map.coordinates
    : "Tidak diketahui.";

  // Bersihkan galeri sebelumnya
  galleryContainer.innerHTML = "";

  // Siapkan array aset gambar yang mau ditampilkan di penjelasan
  const assets = [
    { name: "Display Icon", url: map.displayIcon },
    { name: "List View Icon", url: map.listViewIcon },
    { name: "List View Icon (Tall)", url: map.listViewIconTall },
    { name: "Stylized Background", url: map.stylizedBackgroundImage },
    { name: "Premier Background", url: map.premierBackgroundImage },
  ];

  // Looping aset: Jika link URL-nya ada (tidak null), buatkan elemen HTML-nya
  assets.forEach((asset) => {
    if (asset.url) {
      const assetDiv = document.createElement("div");
      assetDiv.classList.add("asset-item");
      assetDiv.innerHTML = `
        <img src="${asset.url}" alt="${asset.name}">
        <div class="asset-name">${asset.name}</div>
      `;
      galleryContainer.appendChild(assetDiv);
    }
  });

  detailSection.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Fungsi Tombol Kembali
function closeDetail() {
  detailSection.style.display = "none";
  mapContainer.style.display = "grid";
  mainTitle.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
