const prodiData = {
  tkj: {
    title: "Teknik Komputer & Jaringan (TKJ)",
    content:
      "Jurusan ini mempelajari tentang perakitan, perbaikan, dan pengelolaan komputer serta jaringan komputer. Siswa TKJ akan belajar merakit dan memperbaiki komputer, merancang dan mengelola jaringan LAN dan WAN, serta mempelajari keamanan jaringan. ",
  },
  tkr: {
    title: "Teknik Kendaraan Ringan (TKR)",
    content:
      "Jurusan ini berfokus pada perbaikan dan perawatan kendaraan ringan, seperti mobil. Siswa TKR akan mempelajari sistem kelistrikan, mesin, chasis, dan transmisi kendaraan ringan. ",
  },
  mp: {
    title: "Manajemen Perkantoran (MP)",
    content:
      "MP mempelajari keterampilan administrasi, komunikasi, dan tata kelola perkantoran modern.",
  },
  akl: {
    title: "Akuntansi & Keuangan Lembaga (AKL)",
    content:
      "Jurusan ini mempelajari tentang pencatatan transaksi keuangan, penyusunan laporan keuangan, serta pengelolaan keuangan. Siswa AKL akan belajar tentang akuntansi dasar, perpajakan, dan sistem informasi akuntansi. ",
  },
};

function openModal(prodi) {
  document.getElementById("modalTitle").innerText = prodiData[prodi].title;
  document.getElementById("modalContent").innerText = prodiData[prodi].content;
  document.getElementById("modalProdi").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalProdi").classList.add("hidden");
}
