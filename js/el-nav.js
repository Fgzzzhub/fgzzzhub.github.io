// el-nav.js — khusus halaman E-Learning
(function () {
    // cari header & tombol
    const header = document.querySelector('header .navbar-glass')?.closest('header');
    const menuBtn = header?.querySelector('#mobile-menu-button');
    if (!header || !menuBtn) return;
  
    // target panel: #mobile-menu > fallback ke nav desktop
    const panel =
      header.querySelector('#mobile-menu') ||
      header.querySelector('.navbar-glass > nav');
  
    if (!panel) return;
  
    // kelas posisi desktop (nav kamu di-center absolut)
    const desktopPos = [
      'absolute', 'left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2', 'space-x-6'
    ];
    // kelas saat panel dibuka di mobile
    const mobileOpen = [
      'absolute','top-11','left-0','w-full','bg-[#f5f7f2]','shadow-lg',
      'rounded-b-2xl','p-4','flex','flex-col','space-y-2','z-50'
    ];
    const mobileClosed = ['hidden','opacity-0','pointer-events-none'];
  
    // jaga transisi halus
    panel.classList.add('transition','duration-200');
  
    let overlay = null;
  
    function makeOverlay(){
      if (overlay) return overlay;
      overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black/40 backdrop-blur-[1px] z-[49] md:hidden hidden';
      overlay.addEventListener('click', close);
      document.body.appendChild(overlay);
      return overlay;
    }
  
    function initClosedState(){
      if (window.innerWidth < 768) {
        // mobile default: panel tertutup & tidak gunakan posisi desktop
        mobileClosed.forEach(c => panel.classList.add(c));
        desktopPos.forEach(c => panel.classList.remove(c));
        mobileOpen.forEach(c => panel.classList.remove(c));
      } else {
        // desktop: kembalikan kelas posisi desktop
        desktopPos.forEach(c => panel.classList.add(c));
        mobileClosed.forEach(c => panel.classList.remove(c));
        mobileOpen.forEach(c => panel.classList.remove(c));
      }
    }
  
    function open(){
      makeOverlay().classList.remove('hidden');
      document.body.style.overflow = 'hidden';
  
      // panel mobile terbuka
      desktopPos.forEach(c => panel.classList.remove(c));
      mobileClosed.forEach(c => panel.classList.remove(c));
      mobileOpen.forEach(c => panel.classList.add(c));
  
      menuBtn.setAttribute('aria-expanded','true');
    }
  
    function close(){
      panel.classList.add('opacity-0','pointer-events-none');
      setTimeout(()=>panel.classList.add('hidden'),150);
      mobileOpen.forEach(c => panel.classList.remove(c));
  
      if (window.innerWidth >= 768) {
        desktopPos.forEach(c => panel.classList.add(c));
      }
      menuBtn.setAttribute('aria-expanded','false');
      overlay?.classList.add('hidden');
      document.body.style.overflow = '';
    }
  
    function toggle(e){
      e?.preventDefault();
      const willOpen = panel.classList.contains('hidden') ||
                       panel.classList.contains('opacity-0') ||
                       panel.classList.contains('pointer-events-none');
      willOpen ? open() : close();
    }
  
    // init
    initClosedState();
    menuBtn.addEventListener('click', toggle, { passive:false });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  
    // tutup saat resize ke desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) close();
      initClosedState();
    });
  
    // tutup setelah pilih link (UX mobile)
    panel.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a && window.innerWidth < 768) close();
    });
  })();
  