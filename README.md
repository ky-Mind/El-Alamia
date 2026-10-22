# Website Pondok Pesantren El-Alamia

Buka `index.html`. Navbar mengikuti index.html buatan Anda (sticky putih); burger tampil di bawah 1024px, menu desktop tampil mulai 1024px.

## Halaman (15)
index, mengenal-El-Alamia, pendiri, pimpinan-pengasuh, fasilitas, kontak, kurikulum-pesantren, pendidikan-formal, ekstrakurikuler, rutinitas-santri, program-bahasa, informasi-syarat, artikel-publikasi, kegiatan, galeri.

## Gambar (folder `images/`, ganti dengan nama file yang sama, .jpg)
hero-1/2/3, mengenal, pendiri, pengasuh, mts, ma, fasilitas-masjid/asrama/kelas/perpus/lapangan/dapur, kurikulum, tahfizh, bahasa, rutinitas, PSB, ekskul-1..4, berita-1..3, kegiatan, galeri-1..6, kontak.

## Teks yang perlu dilengkapi
Riwayat pendiri, nama pimpinan, jadwal harian, syarat pendaftaran, isi berita/kegiatan, jam kunjungan, alamat lengkap.


## Karya Santri (buku, review, komentar, login)
- Halaman: `karya-santri.html` (daftar), `review-buku.html?b=ID-BUKU` (review + komentar). Promo juga tampil di beranda dan menu Media > Karya Santri.
- Edit/tambah buku di **`js/buku-data.js`** (judul, harga, penulis, isi review, `unggulan`). Cover: ganti file di `images/buku/` (sekarang hasil crop dari screenshot, sebaiknya ganti dengan cover asli).
- Tombol **Beli** -> wajib login -> membuka WhatsApp (nomor di `js/firebase-config.js`, `WA_NUMBER`) dengan pesan otomatis.
- **Aktifkan login & komentar:**
  1. Isi `apiKey` di `js/firebase-config.js` (Firebase Console > Project settings > Your apps > Web). Itu kunci web publik, bukan rahasia.
  2. Authentication > Settings > **Authorized domains**: tambahkan domain situs (mis. alamia.sch.id).
  3. Firestore > Rules: tempel isi `firestore.rules`, lalu Publish.
  4. Facebook: pastikan Redirect URI `https://ponpes-el-alamia.firebaseapp.com/__/auth/handler` sudah di-set dan app Facebook mode Live.
  5. Buka lewat http(s)/hosting (login popup tidak jalan dari file://).
- Sebelum `apiKey` diisi, tombol Beli tetap langsung ke WhatsApp dan kolom komentar menampilkan "belum aktif".
- **Jangan pernah** menaruh file service account (.json), App Secret Facebook, atau Web client secret di folder website.
