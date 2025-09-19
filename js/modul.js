// AOS
window.addEventListener('load', ()=>AOS.init({duration:700,once:true,offset:80}));

// Data dummy modul (dengan slug untuk routing ke modul-detail)
const MODULES = [
  {id:1, slug:'produktif-tkj',    kat:'produktif',  judul:'Dasar Konfigurasi DHCP Server',      guru:'Pak Ahmad', kelas:'TKJ12', progres:35, bab:6},
  {id:2, slug:'matematika-kuadrat', kat:'matematika', judul:'Persamaan Kuadrat & Aplikasinya',   guru:'Bu Nisa',   kelas:'TKJ12', progres:80, bab:8},
  {id:3, slug:'bing-tenses',      kat:'bing',        judul:'Tenses for Everyday Conversation',  guru:'Mr. John',  kelas:'TKJ12', progres:20, bab:5},
  {id:4, slug:'bindo-eksplanasi', kat:'bindo',       judul:'Teks Eksplanasi & EYD',             guru:'Bu Sari',   kelas:'MP12',  progres:55, bab:7},
  {id:5, slug:'produktif-vlan',   kat:'produktif',   judul:'VLAN & Trunking (Cisco/PT)',        guru:'Pak Dwi',   kelas:'TKJ12', progres:10, bab:9},
  {id:6, slug:'matematika-trigonometri', kat:'matematika', judul:'Trigonometri Lanjut',        guru:'Pak Seto',  kelas:'AKL12', progres:0,  bab:10},
];


const grid = document.getElementById('moduleGrid');
const inputQ = document.getElementById('q');
const selectKelas = document.getElementById('kelas');
const chips = document.querySelectorAll('.kat-chip');
let kat = '';

function progressBar(p){
  return `
    <div class="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
      <div class="h-full bg-hijautua" style="width:${p}%;"></div>
    </div>`;
}

function card(m){
  return `
  <article data-aos="fade-up" class="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
    <div class="flex items-start gap-3">
      <span class="grid place-items-center h-12 w-12 rounded-xl bg-emerald-100 text-hijautua">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 19h16M7 19V6h10v13M9 10h6M9 14h6"/>
        </svg>
      </span>
      <div class="flex-1">
        <h3 class="font-bold text-slate-900">${m.judul}</h3>
        <p class="text-sm text-slate-500">Guru: ${m.guru} • Kelas: <span class="font-medium">${m.kelas.toUpperCase()}</span></p>
      </div>
    </div>
    <div class="mt-4 space-y-2">
      ${progressBar(m.progres)}
      <div class="flex items-center justify-between text-sm text-slate-600">
        <span>Progres: <span class="font-semibold">${m.progres}%</span></span>
        <span>${m.bab} bab</span>
      </div>
    </div>
    <div class="mt-4 flex justify-end gap-2">
      <a class="rounded-xl ring-2 ring-hijautua text-hijautua px-4 py-2 text-sm hover:bg-slate-50"
         href="modul-detail.html?m=${m.slug}">Detail</a>
      <a class="rounded-xl bg-hijautua text-white px-4 py-2 text-sm font-semibold hover:opacity-90"
         href="modul-detail.html?m=${m.slug}">${m.progres>0?'Lanjutkan':'Mulai'}</a>
    </div>
  </article>`;
}


function render(){
  const q = (inputQ.value||'').toLowerCase();
  const k = selectKelas.value;
  const html = MODULES
    .filter(x => !k || x.kelas===k)
    .filter(x => !kat || x.kat===kat)
    .filter(x => x.judul.toLowerCase().includes(q) || x.guru.toLowerCase().includes(q))
    .map(card).join('');
  grid.innerHTML = html || `<div class="col-span-full rounded-xl bg-white p-8 text-center text-slate-500 ring-1 ring-slate-200">Modul tidak ditemukan.</div>`;
  AOS.refresh();
}

inputQ.addEventListener('input', render);
selectKelas.addEventListener('change', render);
chips.forEach(c => c.addEventListener('click', ()=>{
  chips.forEach(x => x.classList.remove('ring-hijautua','text-hijautua','font-semibold'));
  c.classList.add('ring-hijautua','text-hijautua','font-semibold');
  kat = c.dataset.kat || '';
  render();
}));

render();