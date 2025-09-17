 // sinkron pilihan menu custom ke <select id="kelas"> agar filter bekerja
 (() => {
    const native = document.getElementById('kelas');
    const text   = document.getElementById('kelasText');
    const menu   = document.getElementById('kelasMenu');
    const btn    = document.getElementById('kelasBtn');

    function labelFor(val){
      const opt = Array.from(native.options).find(o=>o.value===val);
      return opt ? opt.text : '';
    }
    // set label awal
    text.textContent = labelFor(native.value);

    // pilih item
    menu.querySelectorAll('button[data-value]').forEach(b=>{
      b.addEventListener('click', ()=>{
        native.value = b.dataset.value;
        text.textContent = labelFor(native.value);
        native.dispatchEvent(new Event('change', {bubbles:true})); // trigger render() di ujian.js
        // tutup menu (kalau kamu pakai fungsi open/close, panggil di sini)
      });
    });
  })();

// AOS
window.addEventListener('load', () => AOS.init({ duration: 700, once: true, offset: 80 }));

// Data dummy ujian
const EXAMS = [
    { id: 1, mapel: 'Matematika', kelas: 'tkj12', tanggal: '2025-09-22', jam: '09:00', durasi: 90, soal: 40, status: 'upcoming' },
    { id: 2, mapel: 'Produktif TKJ', kelas: 'tkj12', tanggal: '2025-09-18', jam: '13:00', durasi: 75, soal: 30, status: 'ongoing' },
    { id: 3, mapel: 'B. Inggris', kelas: 'rpl12', tanggal: '2025-09-16', jam: '10:00', durasi: 60, soal: 25, status: 'done' },
    { id: 4, mapel: 'Akuntansi', kelas: 'akl12', tanggal: '2025-09-21', jam: '08:00', durasi: 80, soal: 35, status: 'upcoming' },
    { id: 5, mapel: 'B. Indonesia', kelas: 'mm12', tanggal: '2025-09-19', jam: '11:00', durasi: 60, soal: 30, status: 'ongoing' },
];

const grid = document.getElementById('examGrid');
const inputQ = document.getElementById('q');
const selectKelas = document.getElementById('kelas');
const tabs = document.querySelectorAll('.exam-tab');
let statusFilter = '';

function chipStatus(s) {
    const base = 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold';
    if (s === 'upcoming') return `${base} bg-amber-100 text-amber-800`;
    if (s === 'ongoing') return `${base} bg-emerald-100 text-emerald-800`;
    return `${base} bg-slate-100 text-slate-700`;
}

function card(e) {
    return `
<article data-aos="fade-up" class="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
<div class="flex items-start justify-between">
  <div>
    <h3 class="text-lg font-bold text-slate-900">${e.mapel}</h3>
    <p class="text-sm text-slate-500 mt-1">Kelas: <span class="font-medium">${e.kelas.toUpperCase()}</span></p>
  </div>
  <span class="${chipStatus(e.status)}">
    ${e.status === 'upcoming' ? 'Akan Datang' : e.status === 'ongoing' ? 'Berlangsung' : 'Selesai'}
  </span>
</div>
<div class="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
  <div class="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
    <p class="text-xs text-slate-500">Tanggal</p>
    <p class="font-semibold">${e.tanggal}</p>
  </div>
  <div class="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
    <p class="text-xs text-slate-500">Waktu</p>
    <p class="font-semibold">${e.jam} • ${e.durasi} menit</p>
  </div>
  <div class="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
    <p class="text-xs text-slate-500">Jumlah Soal</p>
    <p class="font-semibold">${e.soal} soal</p>
  </div>
</div>
<div class="mt-5 flex justify-end">
  ${e.status === 'upcoming'
            ? `<button disabled class="rounded-xl border-2 border-slate-300 px-4 py-2 text-sm text-slate-400 cursor-not-allowed">Belum Dibuka</button>`
            : e.status === 'ongoing'
                ? `<button class="rounded-xl bg-hijautua px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Lanjutkan Ujian</button>`
                : `<button class="rounded-xl px-4 py-2 text-sm ring-2 ring-hijautua text-hijautua hover:bg-slate-50">Lihat Hasil</button>`}
</div>
</article>`;
}

function render() {
    const q = (inputQ.value || '').toLowerCase();
    const k = selectKelas.value;
    const html = EXAMS
        .filter(x => !k || x.kelas === k)
        .filter(x => !statusFilter || x.status === statusFilter)
        .filter(x => x.mapel.toLowerCase().includes(q))
        .map(card).join('');
    grid.innerHTML = html || `<div class="col-span-full rounded-xl bg-white p-8 text-center text-slate-500 ring-1 ring-slate-200">Tidak ada ujian.</div>`;
    AOS.refresh();
}

inputQ.addEventListener('input', render);
selectKelas.addEventListener('change', render);
tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active', 'ring-hijautua', 'text-hijautua'));
    t.classList.add('active', 'ring-hijautua', 'text-hijautua');
    statusFilter = t.dataset.tab || '';
    render();
}));

render();