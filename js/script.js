(function(){
  /* ==== DATA SLIDE (ganti sesuai asetmu) ==== */
  const data = [
    { img: 'assets/berita/anbk.jpeg',
      title: 'Pengimbasan Pembelajaran Mendalam Bagi Pendidik dan Tenaga Kependidikan di SMK NU 1 Slawi',
      url: '#' },
    { img: 'assets/berita/pramuka.jpeg', title: 'Workshop Kurikulum Merdeka Belajar', url: '#' },
    { img: 'assets/berita/Rectangle 42.png', title: 'Lomba Inovasi Teknologi Siswa', url: '#' },
    { img: 'assets/berita/anbk.jpeg', title: 'Kunjungan Industri ke Perusahaan Teknologi', url: '#' },
    { img: 'assets/berita/pramuka.jpeg', title: 'Sosialisasi PKL Kelas XII', url: '#' },
  ];

  const root = document.getElementById('newsCarousel');
  const dotsWrap = document.getElementById('newsDots');
  const prevBtn = document.getElementById('newsPrev');
  const nextBtn = document.getElementById('newsNext');


  // Build slides
  const slides = data.map((s) => {
    const el = document.createElement('article');
    el.className = 'slide';
    el.innerHTML = `
      <img src="${s.img}" alt="">
      <div class="overlay"></div>
      <div class="meta">
        <h3 class="title">${s.title}</h3>
        <a class="btn-outline float-right mt-4" href="${s.url}">Baca Selengkapnya</a>
      </div>`;
    root.appendChild(el);
    return el;
  });

  // Build dots
  const dots = data.map((_,i)=>{
    const d = document.createElement('button');
    d.className = 'dot'; d.setAttribute('aria-label','Slide '+(i+1));
    d.addEventListener('click', ()=>{ index=i; render(); });
    dotsWrap.appendChild(d);
    return d;
  });

  let index = 0;

  // Positioning logic (tiru layout screenshot: tengah besar, kiri/kanan intip 2 lapis)
  function place(){
    const w = root.clientWidth;
    const off1 = Math.round(w * 0.44); // tetangga dekat
    const off2 = Math.round(w * 0.78); // tetangga jauh

    slides.forEach((el,i)=>{
      let d = i - index;
      // wrap distance biar circular
      if (d > data.length/2) d -= data.length;
      if (d < -data.length/2) d += data.length;

      let x='-50%'; let s=1; let z=30; let o=1;
      if (d===0){ x='-50%'; s=1; z=30; o=1; }
      else if (d===-1){ x=`calc(-50% - ${off1}px)`; s=.92; z=20; o=.7; }
      else if (d===1){  x=`calc(-50% + ${off1}px)`; s=.92; z=20; o=.7; }
      else if (d===-2){ x=`calc(-50% - ${off2}px)`; s=.85; z=10; o=.35; }
      else if (d===2){  x=`calc(-50% + ${off2}px)`; s=.85; z=10; o=.35; }
      else { o=0; z=0; } // sembunyikan sisanya

      el.style.setProperty('--x', x);
      el.style.setProperty('--s', s);
      el.style.setProperty('--o', o);
      el.style.setProperty('--z', z);
      el.style.zIndex = z;
      el.style.opacity = o;
    });

    dots.forEach((d,i)=> d.classList.toggle('active', i===index));
  }

  function render(){ place(); }
  prevBtn.addEventListener('click', ()=>{ index=(index-1+data.length)%data.length; render(); });
  nextBtn.addEventListener('click', ()=>{ index=(index+1)%data.length; render(); });
  window.addEventListener('resize', place, {passive:true});

  // drag/swipe
  let startX=0, dragging=false;
  root.addEventListener('pointerdown', (e)=>{ dragging=true; startX=e.clientX; root.setPointerCapture(e.pointerId); });
  root.addEventListener('pointerup', (e)=>{
    if(!dragging) return; dragging=false;
    const dx=e.clientX-startX;
    if (Math.abs(dx)>40){ dx<0 ? nextBtn.click() : prevBtn.click(); }
  });

  render();
})();

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Swiper only if a swiper container exists on the page
  if (typeof Swiper !== "undefined" && document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
});

