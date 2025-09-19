// el-nav.js — khusus E-Learning (versi ringan, tidak mengubah kelas center desktop)
(function () {
  const header  = document.querySelector('header[data-el-nav]');
  const btn     = header?.querySelector('#mobile-menu-button');
  const panel   = header?.querySelector('#mobile-menu') || header?.querySelector('.navbar-glass > nav');
  if (!header || !btn || !panel) return;

  const mobileOpen   = ['absolute','top-11','left-0','w-full','bg-white','shadow-lg',
                        'rounded-b-2xl','p-4','flex','flex-col','space-y-2','z-50'];
  const mobileClosed = ['hidden','opacity-0','pointer-events-none'];

  panel.classList.add('transition','duration-200');

  function open(){
    mobileClosed.forEach(c => panel.classList.remove(c));
    mobileOpen.forEach(c => panel.classList.add(c));
    btn.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    panel.classList.add('opacity-0','pointer-events-none');
    setTimeout(()=>panel.classList.add('hidden'),150);
    mobileOpen.forEach(c => panel.classList.remove(c));
    btn.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  function toggle(e){
    e?.preventDefault();
    const willOpen = panel.classList.contains('hidden') ||
                     panel.classList.contains('opacity-0') ||
                     panel.classList.contains('pointer-events-none');
    willOpen ? open() : close();
  }

  // init (mobile tertutup)
  if (window.innerWidth < 768) {
    mobileClosed.forEach(c => panel.classList.add(c));
    mobileOpen.forEach(c => panel.classList.remove(c));
  }

  btn.addEventListener('click', toggle, {passive:false});
  panel.addEventListener('click', e => {
    const a = e.target.closest('a'); if (a && window.innerWidth < 768) close();
  });
  window.addEventListener('resize', () => { if (window.innerWidth >= 768) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
