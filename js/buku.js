(function () {
  var B = window.BUKU || [], WA = window.WA_NUMBER || '6281511654849';
  var $ = function (s) { return document.querySelector(s); };
  var rp = function (n) { return 'Rp ' + Number(n).toLocaleString('id-ID'); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var find = function (id) { return B.filter(function (b) { return b.id === id; })[0]; };

  /* ---------- tampilan buku ---------- */
  function card(b) {
    return '<article class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">' +
      '<a href="review-buku.html?b=' + b.id + '" class="relative block aspect-[3/4] overflow-hidden group"><img src="' + b.cover + '" alt="' + esc(b.nama) + '" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">' +
      '<span class="absolute top-2 right-2 bg-white/90 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">' + esc(b.genre) + '</span></a>' +
      '<div class="p-3 sm:p-4 flex flex-col flex-1"><h3 class="text-sm font-black text-teks leading-snug mb-1"><a href="review-buku.html?b=' + b.id + '" class="hover:text-primary transition-colors">' + esc(b.judul) + '</a></h3>' +
      '<p class="text-xs font-bold text-teks-soft mb-3">' + rp(b.harga) + '</p>' +
      '<button type="button" data-beli="' + b.id + '" class="mt-auto w-full bg-primary text-white text-xs font-bold py-2.5 rounded-lg hover:bg-secondary transition-colors"><i class="fab fa-whatsapp mr-1"></i> Beli</button></div></article>';
  }
  function featured(b) {
    return '<div class="bg-primary rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6 shadow-xl" data-aos="fade-up">' +
      '<a href="review-buku.html?b=' + b.id + '" class="shrink-0"><img src="' + b.cover + '" alt="' + esc(b.nama) + '" class="w-20 sm:w-28 aspect-[3/4] object-cover rounded-lg shadow-lg"></a>' +
      '<div class="min-w-0"><span class="inline-block bg-accent/20 text-accent border border-accent/50 text-[10px] font-bold px-2 py-0.5 rounded mb-2"><i class="fas fa-star"></i> UNGGULAN</span>' +
      '<h3 class="text-white font-display font-black text-base sm:text-xl leading-snug mb-3">' + esc(b.judul) + '</h3>' +
      '<div class="flex flex-wrap gap-2"><a href="review-buku.html?b=' + b.id + '" class="bg-accent text-primary text-xs sm:text-sm font-bold px-4 py-2 rounded-md hover:bg-accent-light transition-colors"><i class="fas fa-book-open mr-1"></i> Baca Selengkapnya</a>' +
      '<button type="button" data-beli="' + b.id + '" class="border border-white/40 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-md hover:bg-white hover:text-primary transition-colors"><i class="fab fa-whatsapp mr-1"></i> Beli ' + rp(b.harga) + '</button></div></div></div>';
  }
  function renderList(q) {
    var g = $('#bukuGrid'); if (!g) return;
    var list = B.filter(function (b) { return !q || (b.judul + ' ' + b.nama + ' ' + b.penulis).toLowerCase().indexOf(q) > -1; });
    var lim = parseInt(g.getAttribute('data-limit') || '0', 10); if (lim) list = list.slice(0, lim);
    g.innerHTML = list.length ? list.map(card).join('') : '<p class="col-span-full text-center text-teks-soft py-10">Buku tidak ditemukan.</p>';
  }
  var f = $('#bukuFeatured'); if (f) { var u = B.filter(function (b) { return b.unggulan; })[0]; if (u) f.innerHTML = featured(u); }
  renderList('');
  var sr = $('#bukuCari'); if (sr) sr.addEventListener('input', function () { renderList(sr.value.trim().toLowerCase()); });

  /* ---------- halaman review ---------- */
  var det = $('#bukuDetail'), cur;
  if (det) {
    cur = find(new URLSearchParams(location.search).get('b'));
    if (!cur) { det.innerHTML = '<div class="p-8 text-center"><p class="text-teks-soft mb-4">Buku tidak ditemukan.</p><a href="karya-santri.html" class="text-primary font-bold">&larr; Kembali ke Karya Santri</a></div>'; }
    else {
      document.title = cur.nama + ' | Karya Santri El-Alamia';
      var crumb = $('#bukuCrumb'); if (crumb) crumb.textContent = cur.nama;
      det.innerHTML = '<div class="p-5 sm:p-8 border-b border-slate-100"><h1 class="text-2xl sm:text-3xl font-black text-teks font-display leading-snug mb-4">' + esc(cur.judul) + '</h1>' +
        '<div class="flex flex-wrap items-center gap-2 text-xs text-teks-soft">' + (cur.tgl ? '<span><i class="far fa-calendar mr-1"></i>' + esc(cur.tgl) + '</span>' : '') + '<span><i class="far fa-user mr-1"></i>' + esc(cur.penulis) + '</span>' +
        '<span class="bg-secondary-soft text-secondary font-bold px-2 py-0.5 rounded">BUKU</span><span class="bg-secondary-soft text-secondary font-bold px-2 py-0.5 rounded uppercase">Genre: ' + esc(cur.genre) + '</span><span class="bg-secondary-soft text-secondary font-bold px-2 py-0.5 rounded">' + rp(cur.harga) + '</span></div></div>' +
        '<div class="p-5 sm:p-8"><img src="' + cur.cover + '" alt="' + esc(cur.nama) + '" class="mx-auto w-40 sm:w-52 rounded-lg shadow-xl mb-6">' +
        '<div class="text-teks-soft leading-relaxed space-y-4 [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-teks [&_h3]:font-display [&_h3]:pt-2">' + cur.isi.map(function (p) { return /^<h3/.test(p) ? p : '<p>' + p + '</p>'; }).join('') + '</div>' +
        '<button type="button" data-beli="' + cur.id + '" class="mt-8 inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-md hover:bg-secondary transition-all transform hover:-translate-y-1 shadow-lg"><i class="fab fa-whatsapp"></i> Beli via WhatsApp \u2013 ' + rp(cur.harga) + '</button></div>';
      var more = $('#bukuLain'); if (more) more.innerHTML = B.filter(function (b) { return b.id !== cur.id; }).slice(0, 4).map(card).join('');
    }
  }

  /* ---------- login (Firebase) ---------- */
  var FB, user = null, readyP, modal, mode = 'masuk';
  var cfgOK = function () { var c = window.FIREBASE_CONFIG; return c && c.apiKey && c.apiKey.indexOf('ISI_') !== 0; };
  var ERR = { 'auth/invalid-credential': 'Email atau kata sandi salah.', 'auth/wrong-password': 'Email atau kata sandi salah.', 'auth/user-not-found': 'Akun tidak ditemukan. Silakan Daftar.', 'auth/email-already-in-use': 'Email sudah terdaftar, silakan Masuk.', 'auth/weak-password': 'Kata sandi minimal 6 karakter.', 'auth/invalid-email': 'Format email tidak valid.', 'auth/popup-closed-by-user': 'Jendela login ditutup.', 'auth/cancelled-popup-request': 'Jendela login ditutup.', 'auth/account-exists-with-different-credential': 'Email ini sudah terdaftar dengan metode login lain (mis. Google). Gunakan metode tersebut.', 'auth/unauthorized-domain': 'Domain situs ini belum ditambahkan di Firebase Authentication > Authorized domains.', 'auth/operation-not-supported-in-this-environment': 'Login harus dibuka lewat http(s), bukan file://.', 'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.' };
  function fb() {
    if (FB) return FB;
    var base = 'https://www.gstatic.com/firebasejs/10.14.1/';
    FB = Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-auth.js'), import(base + 'firebase-firestore.js')]).then(function (m) {
      var app = m[0].initializeApp(window.FIREBASE_CONFIG);
      return { Au: m[1], Fs: m[2], auth: m[1].getAuth(app), db: m[2].getFirestore(app) };
    });
    return FB;
  }
  function init() {
    if (readyP) return readyP;
    readyP = fb().then(function (x) { return new Promise(function (res) { var first = true; x.Au.onAuthStateChanged(x.auth, function (u) { user = u; if (first) { first = false; res(u); } uiUpdate(); }); }); });
    return readyP;
  }
  function msg(t, ok) { var m = $('#elaMsg'); if (m) { m.textContent = t || ''; m.className = 'text-sm mb-3 ' + (ok ? 'text-secondary' : 'text-red-600'); } }
  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[100000] hidden items-center justify-center p-4 bg-black/60';
    modal.innerHTML = '<div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[92vh] overflow-y-auto p-6 relative">' +
      '<button type="button" id="elaX" class="absolute top-3 right-4 text-2xl text-teks-soft hover:text-teks" aria-label="Tutup">&times;</button>' +
      '<h3 class="text-xl font-black text-teks font-display mb-1" id="elaT">Masuk ke El-Alamia</h3><p class="text-sm text-teks-soft mb-4">Masuk untuk membeli buku atau berkomentar.</p><div id="elaMsg" class="text-sm mb-3"></div>' +
      '<button type="button" data-p="google" class="w-full flex items-center justify-center gap-2 border border-slate-300 rounded-lg py-2.5 font-semibold text-sm hover:bg-slate-50 mb-2"><i class="fab fa-google text-red-500"></i> Lanjut dengan Google</button>' +
      '<button type="button" data-p="facebook" class="w-full flex items-center justify-center gap-2 bg-[#1877f2] text-white rounded-lg py-2.5 font-semibold text-sm hover:opacity-90 mb-4"><i class="fab fa-facebook-f"></i> Lanjut dengan Facebook</button>' +
      '<div class="flex items-center gap-3 text-xs text-teks-soft mb-3"><span class="flex-1 h-px bg-slate-200"></span>atau email<span class="flex-1 h-px bg-slate-200"></span></div>' +
      '<form id="elaF" class="grid gap-3"><input id="elaN" placeholder="Nama lengkap" class="hidden w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"><input id="elaE" type="email" required placeholder="Email" class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"><input id="elaP" type="password" required minlength="6" placeholder="Kata sandi" class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light">' +
      '<button class="bg-primary text-white font-bold rounded-lg py-2.5 text-sm hover:bg-secondary" id="elaS">Masuk</button></form>' +
      '<p class="text-xs text-center text-teks-soft mt-4"><span id="elaQ">Belum punya akun?</span> <button type="button" id="elaSw" class="text-primary font-bold">Daftar</button></p></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.id === 'elaX') closeModal(); });
    modal.querySelectorAll('[data-p]').forEach(function (b) { b.onclick = function () { social(b.getAttribute('data-p')); }; });
    $('#elaSw').onclick = function () { mode = mode === 'masuk' ? 'daftar' : 'masuk'; var d = mode === 'daftar'; $('#elaN').classList.toggle('hidden', !d); $('#elaN').required = d; $('#elaS').textContent = d ? 'Daftar' : 'Masuk'; $('#elaT').textContent = d ? 'Daftar Akun' : 'Masuk ke El-Alamia'; $('#elaQ').textContent = d ? 'Sudah punya akun?' : 'Belum punya akun?'; $('#elaSw').textContent = d ? 'Masuk' : 'Daftar'; msg(''); };
    $('#elaF').onsubmit = function (e) { e.preventDefault(); emailAuth(); };
  }
  function openModal() { if (!modal) buildModal(); msg(''); modal.classList.remove('hidden'); modal.classList.add('flex'); }
  function closeModal() { if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); } }
  function fail(e) { msg(ERR[e && e.code] || ('Gagal: ' + ((e && e.message) || e))); }
  function social(p) {
    fb().then(function (x) { var pr = p === 'google' ? new x.Au.GoogleAuthProvider() : new x.Au.FacebookAuthProvider(); return x.Au.signInWithPopup(x.auth, pr); }).catch(fail);
  }
  function emailAuth() {
    var em = $('#elaE').value.trim(), pw = $('#elaP').value, nm = $('#elaN').value.trim();
    fb().then(function (x) {
      if (mode === 'daftar') return x.Au.createUserWithEmailAndPassword(x.auth, em, pw).then(function (c) { return x.Au.updateProfile(c.user, { displayName: nm || em.split('@')[0] }).then(function () { user = x.auth.currentUser; uiUpdate(); }); });
      return x.Au.signInWithEmailAndPassword(x.auth, em, pw);
    }).catch(fail);
  }
  var waiters = [];
  function requireLogin() {
    return init().then(function (u) {
      if (u) return u;
      openModal();
      return new Promise(function (res) { waiters.push(res); });
    });
  }
  function uiUpdate() {
    if (user) { closeModal(); waiters.splice(0).forEach(function (r) { r(user); }); }
    renderCommentForm();
  }

  function beli(id) {
    var b = find(id); if (!b) return;
    var go = function (u) {
      var t = "Assalamu'alaikum, saya " + (u ? (u.displayName || u.email) + ' ' : '') + 'ingin membeli buku "' + b.nama + '" (' + rp(b.harga) + ') dari Karya Santri El-Alamia.';
      var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t);
      if (!window.open(url, '_blank')) location.href = url;
    };
    if (!cfgOK()) { console.warn('Firebase belum dikonfigurasi (js/firebase-config.js) - login dilewati.'); return go(null); }
    requireLogin().then(go).catch(function (e) { console.error(e); go(null); });
  }
  document.addEventListener('click', function (e) { var t = e.target.closest('[data-beli]'); if (t) { e.preventDefault(); beli(t.getAttribute('data-beli')); } });

  /* ---------- komentar ---------- */
  function when(c) { var d = c.createdAt && c.createdAt.toDate && c.createdAt.toDate(); return d ? d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'baru saja'; }
  function renderCommentForm() {
    var box = $('#komentarForm'); if (!box || !cur) return;
    if (!cfgOK()) { box.innerHTML = '<p class="text-sm text-teks-soft bg-slate-50 rounded-lg p-4">Komentar belum aktif (konfigurasi Firebase belum diisi).</p>'; return; }
    if (!user) { box.innerHTML = '<button type="button" id="komLogin" class="bg-primary text-white font-bold px-5 py-2.5 rounded-md hover:bg-secondary text-sm"><i class="fas fa-sign-in-alt mr-1"></i> Masuk untuk berkomentar</button>'; $('#komLogin').onclick = openModal; return; }
    box.innerHTML = '<div class="flex items-center justify-between mb-2 text-sm"><span class="text-teks-soft">Masuk sebagai <b class="text-teks">' + esc(user.displayName || user.email) + '</b></span><button type="button" id="komOut" class="text-primary font-bold">Keluar</button></div>' +
      '<textarea id="komText" rows="3" maxlength="1000" placeholder="Tulis komentar Anda..." class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"></textarea><button type="button" id="komKirim" class="mt-2 bg-accent text-primary font-bold px-5 py-2 rounded-md hover:bg-accent-light text-sm">Kirim Komentar</button>';
    $('#komOut').onclick = function () { fb().then(function (x) { return x.Au.signOut(x.auth); }); };
    $('#komKirim').onclick = function () {
      var t = $('#komText').value.trim(); if (!t) return;
      var btn = $('#komKirim'); btn.disabled = true;
      fb().then(function (x) { return x.Fs.addDoc(x.Fs.collection(x.db, 'comments'), { bookId: cur.id, uid: user.uid, name: (user.displayName || user.email.split('@')[0]).slice(0, 80), photo: user.photoURL || '', text: t, createdAt: x.Fs.serverTimestamp() }); })
        .then(function () { $('#komText').value = ''; }).catch(function (e) { alert('Gagal mengirim komentar: ' + (e.code || e.message)); }).then(function () { btn.disabled = false; });
    };
  }
  function renderComments(list) {
    var el = $('#komentarList'); if (!el) return;
    list.sort(function (a, b) { var x = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : Date.now(), y = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : Date.now(); return y - x; });
    $('#komentarJml') && ($('#komentarJml').textContent = list.length);
    el.innerHTML = list.length ? list.map(function (c) {
      var av = c.photo ? '<img src="' + esc(c.photo) + '" alt="" referrerpolicy="no-referrer" class="w-9 h-9 rounded-full object-cover">' : '<span class="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">' + esc((c.name || '?').charAt(0).toUpperCase()) + '</span>';
      var del = user && user.uid === c.uid ? '<button type="button" data-hapus="' + c.id + '" class="text-xs text-red-500 hover:underline ml-auto">Hapus</button>' : '';
      return '<div class="flex gap-3 py-4 border-b border-slate-100">' + av + '<div class="flex-1 min-w-0"><div class="flex items-center gap-2 text-sm"><b class="text-teks">' + esc(c.name || 'Pengguna') + '</b><span class="text-xs text-teks-soft">' + when(c) + '</span>' + del + '</div><p class="text-sm text-teks-soft mt-1 whitespace-pre-line break-words">' + esc(c.text) + '</p></div></div>';
    }).join('') : '<p class="text-sm text-teks-soft py-4">Belum ada komentar. Jadilah yang pertama!</p>';
  }
  if ($('#komentar') && cur) {
    renderCommentForm();
    if (cfgOK()) {
      init().then(function () { renderCommentForm(); return fb(); }).then(function (x) {
        x.Fs.onSnapshot(x.Fs.query(x.Fs.collection(x.db, 'comments'), x.Fs.where('bookId', '==', cur.id)), function (s) { renderComments(s.docs.map(function (d) { var o = d.data(); o.id = d.id; return o; })); }, function (e) { var el = $('#komentarList'); if (el) el.innerHTML = '<p class="text-sm text-red-600 py-4">Komentar tidak dapat dimuat (' + esc(e.code || e.message) + '). Periksa Firestore Rules.</p>'; });
      }).catch(function (e) { console.error(e); });
      document.addEventListener('click', function (e) { var t = e.target.closest('[data-hapus]'); if (t && confirm('Hapus komentar ini?')) fb().then(function (x) { return x.Fs.deleteDoc(x.Fs.doc(x.db, 'comments', t.getAttribute('data-hapus'))); }); });
    }
  }
})();
