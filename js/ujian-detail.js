// ujian-detail.js (FIXED)
(function(){
    // Data ujian (sinkron dengan ujian.js; silakan sesuaikan tanggal/jam/statusnya)
    const EXAMS = [
      { id:1, mapel:'Matematika',    kelas:'tkj12', tanggal:'2025-09-22', jam:'09:00', durasi:90, soal:40, status:'upcoming', guru:'Bu Nisa',
        petunjuk:['Pastikan koneksi stabil.','Dilarang membuka tab lain.','Setiap soal bernilai sama.'] },
      { id:2, mapel:'Produktif TKJ', kelas:'tkj12', tanggal:'2025-09-18', jam:'13:00', durasi:75, soal:30, status:'ongoing', guru:'Pak Ahmad',
        petunjuk:['Gunakan nama asli.','Waktu berjalan begitu mulai.','Jangan tutup browser saat ujian.'] },
      { id:3, mapel:'B. Inggris',    kelas:'rpl12', tanggal:'2025-09-16', jam:'10:00', durasi:60, soal:25, status:'done',     guru:'Mr. John',
        petunjuk:['Baca instruksi dengan teliti.','Gunakan headset jika perlu audio.'] },
      { id:4, mapel:'Akuntansi',     kelas:'akl12', tanggal:'2025-09-21', jam:'08:00', durasi:80, soal:35, status:'upcoming', guru:'Bu Ayu',
        petunjuk:['Siapkan kalkulator non-programmable.','Periksa jawaban sebelum submit.'] },
      { id:5, mapel:'B. Indonesia',  kelas:'mm12',  tanggal:'2025-09-19', jam:'11:00', durasi:60, soal:30, status:'ongoing',  guru:'Bu Rina',
        petunjuk:['Perhatikan EYD.','Jawab sesuai konteks bacaan.'] },
    ];
  
    const $ = (s, r=document)=>r.querySelector(s);
    const params = new URLSearchParams(location.search);
    const id = Number(params.get('id') || 0);
    const data = EXAMS.find(x=>x.id===id);
  
    const title   = $('#examTitle');
    const meta    = $('#examMeta');
    const schedule= $('#examSchedule');
    const duration= $('#examDuration');
    const qcount  = $('#examQuestions');
    const teacher = $('#examTeacher');
    const klass   = $('#examClass');
    const statusT = $('#examStatusText');
    const rules   = $('#examRules');
    const chip    = $('#statusChip');
  
    const btnStart= $('#btnStart');
    const btnResult=$('#btnResult');
  
    const cw = $('#countWrap'), cl = $('#countLabel');
    const elD = $('#d'), elH = $('#h'), elM = $('#m'), elS = $('#s');
  
    const pad2 = n => String(n).padStart(2,'0');
    const statusLabel = s => s==='upcoming' ? 'Akan Datang' : s==='ongoing' ? 'Berlangsung' : 'Selesai';
    // Jangan pakai .chip (karena @apply tidak diproses di runtime)
    const chipCls = s => (s==='upcoming'
      ? 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800'
      : s==='ongoing'
        ? 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800'
        : 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700');
  
    // Fallback jika id tidak valid
    if (!data){
      title.textContent = 'Ujian tidak ditemukan';
      meta.textContent  = 'Silakan kembali ke daftar ujian.';
      schedule.textContent = '-';
      duration.textContent = '-';
      qcount.textContent   = '-';
      teacher.textContent  = '-';
      klass.textContent    = '-';
      statusT.textContent  = '-';
      chip.textContent     = 'Tidak ditemukan';
      chip.className       = chipCls('done');
      btnStart.classList.add('hidden');
      btnResult.classList.remove('hidden');
      btnResult.textContent = 'Kembali ke Ujian';
      btnResult.onclick = ()=> location.href = 'ujian.html';
      return;
    }
  
    // Render header/meta
    title.textContent = data.mapel;
    meta.textContent  = `Kelas: ${data.kelas.toUpperCase()} • ${data.soal} soal`;
    schedule.textContent = `${data.tanggal} • ${data.jam} WIB`;
    duration.textContent = `${data.durasi} menit`;
    qcount.textContent   = `${data.soal} soal`;
    teacher.textContent  = data.guru || '-';
    klass.textContent    = data.kelas.toUpperCase();
    statusT.textContent  = statusLabel(data.status);
    chip.textContent     = statusLabel(data.status);
    chip.className       = chipCls(data.status);
  
    // Petunjuk
    rules.innerHTML = (data.petunjuk||[]).map(t=>`<li>${t}</li>`).join('');
  
    // Countdown
    const start = new Date(`${data.tanggal}T${data.jam}:00`);
    const end   = new Date(start.getTime() + data.durasi*60*1000);
  
    function tick(){
      const now = new Date();
      let label = '';
      let target = null;
  
      if (now < start) { // belum mulai
        label = 'Ujian akan dimulai dalam';
        target = start;
        btnStart.disabled = true;
        btnStart.textContent = 'Belum dibuka';
        btnStart.classList.add('opacity-60','cursor-not-allowed');
        btnResult.classList.add('hidden');
        cw.classList.remove('hidden');
      } else if (now >= start && now <= end) { // berlangsung
        label = 'Sisa waktu';
        target = end;
        btnStart.disabled = false;
        btnStart.textContent = 'Mulai / Lanjutkan';
        btnStart.classList.remove('opacity-60','cursor-not-allowed');
        btnResult.classList.add('hidden');
        cw.classList.remove('hidden');
      } else { // selesai
        cw.classList.add('hidden');
        btnStart.classList.add('hidden');
        btnResult.classList.remove('hidden');
        btnResult.textContent = 'Lihat Hasil';
        return;
      }
  
      cl.textContent = label;
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff/86400000);
      const h = Math.floor((diff%86400000)/3600000);
      const m = Math.floor((diff%3600000)/60000);
      const s = Math.floor((diff%60000)/1000);
      elD.textContent = pad2(d);
      elH.textContent = pad2(h);
      elM.textContent = pad2(m);
      elS.textContent = pad2(s);
  
      if (diff <= 0 && target === end){
        cw.classList.add('hidden');
        btnStart.classList.add('hidden');
        btnResult.classList.remove('hidden');
        btnResult.textContent = 'Lihat Hasil';
        clearInterval(timer);
      }
    }
  
    const timer = setInterval(tick, 1000);
    tick();
  
    // Aksi tombol
    btnStart.onclick  = () => {
      if (btnStart.disabled) return;
      alert('Mulai / lanjutkan ujian (stub).');
    };
    btnResult.onclick = () => {
      alert('Lihat hasil (stub).');
    };
  
    // AOS
    window.addEventListener('load', ()=> window.AOS?.refresh?.());
  })();
  