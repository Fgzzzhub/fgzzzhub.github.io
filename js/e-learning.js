// ===== Modal Tugas (SAFE) =====
const TUGAS = [
    { id: 1, mapel: 'Bahasa Jawa', judul: 'Menerjemahkan Teks Latin ke Dalam Aksara Jawa', deadline: '21 Oktober', done: false },
    { id: 2, mapel: 'Bahasa Indonesia', judul: 'Membuat Teks Exposisi', deadline: '13 Oktober', done: false },
    { id: 3, mapel: 'Kompetensi Keahlian', judul: 'Membuat Contoh Laporan UJI LSP', deadline: '24 Oktober', done: false },
    { id: 4, mapel: 'Al-Qur`an Hadist', judul: 'Mengerjakan Uji Kompetensi Bab 3', deadline: '1 November', done: false },
  ];
  
  const tugasModal = document.getElementById('tugasModal');
  if (tugasModal) {
    const tugasList  = document.getElementById('tugasList');
    const tugasClose = document.getElementById('tugasClose');
    const tugasTutup = document.getElementById('tugasTutup');
    const tugasBackdrop = tugasModal.querySelector('[data-close="backdrop"]');
  
    const tugasNav = Array.from(document.querySelectorAll('header nav a'))
      .find(a => a.textContent.trim().toLowerCase() === 'tugas');
  
    function renderTugas() {
      const pending = TUGAS.filter(t => !t.done);
      tugasList.innerHTML = pending.length ? pending.map(t => `
        <div class="flex items-start gap-3 rounded-xl ring-1 ring-emerald-200 p-3">
          <span class="inline-flex items-center justify-center h-10 px-3 rounded-lg bg-emerald-100 text-emerald-800 text-sm font-semibold">${t.mapel}</span>
          <div class="flex-1">
            <p class="font-semibold text-slate-900">${t.judul}</p>
            <p class="text-xs text-slate-500 mt-1">Deadline: ${t.deadline}</p>
          </div>
          <button data-done="${t.id}" class="text-xs rounded-full px-3 py-1 ring-1 ring-emerald-300 hover:bg-emerald-50">Selesai</button>
        </div>`).join('')
        : `<div class="p-8 text-center text-slate-600">Semua tugas sudah dikerjakan 🎉</div>`;
    }
    function openTugas(){ renderTugas(); tugasModal.classList.remove('hidden'); document.body.style.overflow='hidden'; }
    function closeTugas(){ tugasModal.classList.add('hidden'); document.body.style.overflow=''; }
  
    if (tugasNav) tugasNav.addEventListener('click', e=>{ e.preventDefault(); openTugas(); });
    tugasClose?.addEventListener('click', closeTugas);
    tugasTutup?.addEventListener('click', closeTugas);
    tugasBackdrop?.addEventListener('click', closeTugas);
    tugasList?.addEventListener('click', e=>{
      const btn=e.target.closest('button[data-done]'); if(!btn) return;
      const id=+btn.dataset.done; const i=TUGAS.findIndex(t=>t.id===id);
      if(i>-1){ TUGAS[i].done=true; renderTugas(); }
    });
  }
  // (lanjutan file: dropdown kelas kustom, dsb…)
  

(() => {
    const root = document.getElementById('kelasSelectRoot');
    const native = document.getElementById('kelas');
    const btn = document.getElementById('kelasBtn');
    const text = document.getElementById('kelasText');
    const menu = document.getElementById('kelasMenu');
    const chevron = document.getElementById('kelasChevron');

    let backdrop = null;
    const originalParent = menu.parentElement;

    function labelFor(val) {
        const opt = Array.from(native.options).find(o => o.value === val);
        return opt ? opt.text : '';
    }

    function ensureBackdrop() {
        if (!backdrop) {
            backdrop = document.createElement('div');
            Object.assign(backdrop.style, {
                position: 'fixed', inset: 0, zIndex: 9998, background: 'transparent'
            });
            backdrop.addEventListener('click', () => openMenu(false));
        }
        return backdrop;
    }

    function placeMenu() {
        const r = btn.getBoundingClientRect();
        const desired = Math.min(256, window.innerHeight - 24); // 16rem max, clamp ke viewport
        const spaceBelow = window.innerHeight - r.bottom - 12;

        // Force sebagai overlay teratas
        Object.assign(menu.style, {
            position: 'fixed',
            zIndex: 9999,
            left: `${r.left}px`,
            width: `${r.width}px`,
            maxHeight: `${desired}px`,
            top: `${spaceBelow < desired ? Math.max(12, r.top - desired - 8) : r.bottom + 8}px`,
            background: '#ffffff',                          // opaque, bukan /95
            boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 6px 6px rgba(0,0,0,.08)',
            borderRadius: '0.75rem',
            willChange: 'transform, top, left'
        });
        menu.style.transformOrigin = spaceBelow < desired ? 'bottom' : 'top';
    }

    function openMenu(open) {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
            // Portal ke body agar tidak dikalahkan stacking context lain
            if (menu.parentElement !== document.body) document.body.appendChild(menu);
            document.body.appendChild(ensureBackdrop());
            placeMenu();
            requestAnimationFrame(() => {
                menu.classList.remove('invisible', 'opacity-0', 'scale-95');
                chevron.classList.add('rotate-180');
            });
        } else {
            menu.classList.add('invisible', 'opacity-0', 'scale-95');
            chevron.classList.remove('rotate-180');
            if (backdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
            if (menu.parentElement !== originalParent) originalParent.appendChild(menu); // opsional
        }
    }

    // Init label dari select native
    text.textContent = labelFor(native.value);

    btn.addEventListener('click', () =>
        openMenu(btn.getAttribute('aria-expanded') !== 'true')
    );

    // Pilih item
    menu.querySelectorAll('button[data-value]').forEach(item => {
        item.addEventListener('click', () => {
            const val = item.dataset.value;
            native.value = val;
            text.textContent = labelFor(val);
            native.dispatchEvent(new Event('change', { bubbles: true }));
            openMenu(false);
            btn.focus();
        });
    });

    // Tutup saat Esc / klik luar, reposisi saat scroll/resize
    document.addEventListener('keydown', e => { if (e.key === 'Escape') openMenu(false); });
    window.addEventListener('scroll', () => { if (btn.getAttribute('aria-expanded') === 'true') placeMenu(); }, true);
    window.addEventListener('resize', () => { if (btn.getAttribute('aria-expanded') === 'true') placeMenu(); });

    // Jika #kelas berubah dari script lain, sinkron label
    native.addEventListener('change', () => { text.textContent = labelFor(native.value); });
})();

// Init AOS
window.addEventListener('load', () => {
AOS.init({ duration: 700, once: true, offset: 80 });
});


// --- Demo forum data ---
const FORUMS = [
{
    id: 1,
    name: 'Haris Nugraha',
    username: 'haris.ng',
    avatar: 'https://i.pravatar.cc/80?img=12',
    text: 'Bagaimana cara konfigurasi DHCP Server di Ubuntu 22.04? Ada yang punya langkah praktisnya? #TKJ',
    likes: 29,
    replies: 2,
    kelas: 'tkj12'
},
{
    id: 2,
    name: 'Tasripah',
    username: 'tasripah',
    avatar: 'https://i.pravatar.cc/80?img=5',
    text: 'Ada tips cepat memahami tenses buat ujian B. Inggris minggu depan?',
    likes: 22,
    replies: 2,
    kelas: 'tkj12'
},
{
    id: 3,
    name: 'Secret xyz_',
    username: 'secretxyz',
    avatar: 'https://i.pravatar.cc/80?img=23',
    text: 'Minta rekomendasi sumber belajar logaritma yang gampang dimengerti dong 🙏',
    likes: 28,
    replies: 2,
    kelas: 'tkj12'
},
{
    id: 4,
    name: 'Bima Aditya',
    username: 'bimaa',
    avatar: 'https://i.pravatar.cc/80?img=49',
    text: 'Apakah ada yang sudah coba VLAN trunk di Packet Tracer? share config ya!',
    likes: 15,
    replies: 6,
    kelas: 'rpl12'
}
];


const forumGrid = document.getElementById('forumGrid');
if (forumGrid) {


function forumCardHTML(item) {
return `
<article data-kelas="${item.kelas}" data-text="${item.text.toLowerCase()}" class="group rounded-2xl bg-white p-4 shadow ring-1 ring-slate-200 border-l-4 border-emerald-500" data-aos="fade-up">
<header class="flex items-center gap-3">
<img src="${item.avatar}" alt="Avatar ${item.name}" class="h-10 w-10 rounded-full shadow" />
<div>
<h3 class="font-semibold text-slate-900">${item.name}</h3>
<p class="text-xs text-slate-500">@${item.username}</p>
</div>
</header>
<p class="mt-3 text-sm text-slate-700">${item.text}</p>
<footer class="mt-4 flex items-center justify-between text-slate-500">
<div class="flex items-center gap-5">
<span class="inline-flex items-center gap-1">
<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 2-3.93 0-5.5-2.54-2.14-5 1.5-7 3.5-2-2-4.46-5.64-7-3.5-2 1.57-1.49 4.04 0 5.5L12 21l7-7Z"/></svg>
<span class="text-xs">${item.likes}</span>
</span>
<span class="inline-flex items-center gap-1">
<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/></svg>
<span class="text-xs">${item.replies}</span>
</span>
</div>
<button class="rounded-full px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50">Buka</button>
</footer>
</article>
`;
}

function renderForums(filter = { q: '', kelas: '' }) {
const q = (filter.q || '').toLowerCase();
const kelas = filter.kelas || '';
const html = FORUMS
    .filter(f => (!kelas || f.kelas === kelas))
    .filter(f => (!q || f.text.toLowerCase().includes(q) || f.name.toLowerCase().includes(q)))
    .map(forumCardHTML)
    .join('');
forumGrid.innerHTML = html || `<div class='col-span-full rounded-xl bg-white p-6 text-center text-slate-500 ring-1 ring-slate-200'>Tidak ada hasil yang cocok.</div>`;
AOS.refresh();
}


// Initial render
renderForums();


// Search behavior: filters forum cards live
const inputQ = document.getElementById('q');
const selectKelas = document.getElementById('kelas');


function applyFilter() {
renderForums({ q: inputQ.value.trim(), kelas: selectKelas.value });
}


inputQ.addEventListener('input', applyFilter);
selectKelas.addEventListener('change', applyFilter);


// Prevent actual submit reload
document.getElementById('searchForm').addEventListener('submit', (e) => {
e.preventDefault();
applyFilter();
});


// Subject quick filter: clicking a subject will put its name in the search box
document.querySelectorAll('#subjects .subject').forEach((item) => {
item.addEventListener('click', () => {
    const name = item.getAttribute('data-name');
    inputQ.value = name;
    applyFilter();
});
});


// Demo "Buat Topik" button
document.getElementById('btnBuatTopik').addEventListener('click', () => {
alert('Form pembuatan topik bisa diletakkan di halaman/modal terpisah.');
});

}