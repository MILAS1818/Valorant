// 1. Fungsi untuk Buka/Tutup Dropdown
function toggleMenu(event) {
  event.stopPropagation(); // Mencegah klik bocor ke window
  const dropdown = document.querySelector(".dropdown");
  dropdown.classList.toggle("active");
}

// 2. Fungsi untuk Menutup dropdown jika user klik di sembarang tempat (luar menu)
window.onclick = function (event) {
  if (!event.target.closest(".dropdown")) {
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) dropdown.classList.remove("active");
  }
};

// 3. Fungsi untuk mengganti konten halaman saat menu diklik
function showSection(sectionName, event) {
  event.stopPropagation(); // Mencegah dropdown error

  // Tutup menu dropdown
  document.querySelector(".dropdown").classList.remove("active");

  // Sembunyikan semua section konten
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Tampilkan section yang dipilih
  const selectedSection = document.getElementById("section-" + sectionName);
  if (selectedSection) {
    selectedSection.classList.add("active");
  }

  // Ubah Judul Utama
  const titleElement = document.getElementById("main-title");
  if (sectionName === "agents") titleElement.innerText = "AGEN VALORANT";
  if (sectionName === "maps") titleElement.innerText = "MAPS VALORANT";
  if (sectionName === "skins") titleElement.innerText = "SKIN SENJATA";
}
