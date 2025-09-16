// Data contoh — ganti sesuai kontenmu
const dataSlides = [
  {
    img: "/assets/berita/anbk.jpeg",
    title: "Kunjungan Industri P5",
    excerpt:
      "SMK NU 1 Slawi dengan bangga mempersembahkan acara “Kunjungan Industri P5 Kebekerjaan – Hyundai Jakarta”.",
    url: "#",
  },
  {
    img: "/assets/berita/pramuka.jpeg",
    title: "Webinar Penguatan KWU Guru",
    excerpt:
      "SMK NU 1 Slawi melaksanakan kegiatan edukasi kewirausahaan dalam Webinar Implementasi Penguatan.",
    url: "#",
  },
  {
    img: "/assets/berita/anbk.jpeg",
    title: "SMK NU 1 Slawi Raih Prestasi …",
    excerpt:
      "Raimuna Cabang 2024 berlangsung penuh semangat dan membuahkan prestasi membanggakan.",
    url: "#",
  },
  // tambah slide lain jika perlu
];

// Build slides
const wrap = document.querySelector(".beritaSwiper .swiper-wrapper");
wrap.innerHTML = dataSlides
  .map(
    (s) => `
    <div class="swiper-slide ">
      <article class="berita-card rounded-2xl shadow-xl ">
        <img class="berita-img rounded-t-2xl" src="${s.img}" alt="${s.title}">
        <div class="px-6 pb-6 pt-3">
          <h3 class="berita-title">${s.title}</h3>
          <p class="berita-excerpt">${s.excerpt}</p>
         <a href="#"
                            class="inline-block mt-6 text-white bg-hijautua px-6 py-2 rounded-lg hover:bg-white hover:text-hijautua border-2 border-hijautua transition text-sm">Selengkapnya</a>
        </div>
      </article>
    </div>
  `
  )
  .join("");

// Init Swiper (anti-stuck: loop hanya jika slide > perView)
const total = dataSlides.length;
const perMd = total >= 2 ? 2 : 1.2;
const perLg = total >= 4 ? 3 : total >= 3 ? 2 : 1.2;
const useLoop = total > perLg;

new Swiper(".beritaSwiper", {
  centeredSlides: false,
  spaceBetween: 24,
  slidesPerView: 1.15, // mobile
  breakpoints: {
    640: { slidesPerView: 1.6 },
    768: { slidesPerView: perMd, spaceBetween: 28 },
    1024: { slidesPerView: perLg, spaceBetween: 32 },
  },
  loop: useLoop,
  rewind: !useLoop,
  navigation: { nextEl: ".btnNext", prevEl: ".btnPrev" },
  keyboard: { enabled: true },
  watchSlidesProgress: true,
});

(function(){
  const total = document.querySelectorAll('.gallerySwiper .swiper-slide').length;
  const perLg = 1.8; // tampilkan kanan–kiri 'mengintip'
  new Swiper('.gallerySwiper', {
    centeredSlides: true,
    spaceBetween: 48,
    slidesPerView: 1.15,                 // mobile
    breakpoints: {
      640:  { slidesPerView: 1.35, spaceBetween: 56 },
      768:  { slidesPerView: 1.6,  spaceBetween: 64 },
      1024: { slidesPerView: perLg, spaceBetween: 72 }
    },
    loop: total > 1,
    navigation: { nextEl: '.galNext', prevEl: '.galPrev' },
    pagination: { el: '.galDots', clickable: true },
    keyboard: { enabled: true },
    watchSlidesProgress: true,
    speed: 600,
  });
})();