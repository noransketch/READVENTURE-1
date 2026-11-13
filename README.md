# READVENTURE · Read. Learn. Level Up.

Petualangan membaca bahasa Inggris untuk siswa SD kelas 6. Siswa mulai dari sekolah, lalu berjalan melewati enam dunia. Teks bacaannya bertambah sedikit demi sedikit, dari satu kata bergambar sampai cerita pendek tentang masa lalu. Kosakata didapat dari teks yang dibaca dan dikumpulkan di **My Word Bag**, sedangkan grammar ditemukan di dalam teks.

- Tanpa akun, tanpa nama. Progres hanya tersimpan di browser perangkat (localStorage).
- Tanpa build step: HTML, CSS, dan JavaScript murni. Bisa di-hosting gratis.
- Bisa dipakai offline setelah dibuka sekali (service worker), dan bisa di-install di HP (PWA).
- Tombol "Listen" memakai text-to-speech bawaan browser (gratis).

## Isi versi ini

| Bagian | Status |
| --- | --- |
| Layar judul, Adventure Map layar penuh (27 batu pijakan, 6 dunia), My Word Bag, pengaturan | Selesai |
| **Dunia 3 · My Day** (7 pelajaran, sesuai desain Meeting 12; has/have, do/does, -s/-es) | Bisa dimainkan penuh |
| **Dunia 1 · Hello, This Is Me** (7 pelajaran yang sama; am/is/are) | Bisa dimainkan penuh |
| **Dunia 2 · My School World** (7 pelajaran yang sama; There is / There are) | Bisa dimainkan penuh |
| Dunia 4, 5, 6 | Terkunci ("Coming soon"), dibuka bertahap |

Pelajaran di Dunia 3: Words → Read → Find the pairs → Practice → Game rounds (3 ronde) → My check (10 soal, target 8/10) → My results.

Menu pengaturan berisi baris bahasa Indonesia, suara, **Open all lessons (teacher demo)**, dan reset progres.

## Upload ke GitHub (lewat web)

1. github.com → **New repository** → nama, misalnya `readventure` → **Public** → Create.
2. Klik **uploading an existing file**.
3. Ekstrak ZIP, lalu seret **isi** folder (index.html, css, js, assets, sw.js, manifest.webmanifest, vercel.json, README.md) ke halaman upload. index.html harus berada di paling atas repo.
4. **Commit changes**.

## Deploy ke Vercel (gratis)

1. vercel.com → login dengan GitHub.
2. **Add New → Project** → pilih repo `readventure` → **Import**.
3. Framework Preset: **Other**. Build Command dan Output Directory: kosongkan.
4. **Deploy**. Link-nya berbentuk `https://readventure-xxx.vercel.app`. Setiap upload baru ke GitHub otomatis ikut diperbarui.

## Mengubah isi

Isi Dunia 3 dan aturan bersama ada di **`js/content.js`**; isi Dunia 1 dan 2 ada di **`js/worlds/w1.js`** dan **`js/worlds/w2.js`**. Progres disimpan per dunia.

- `WORDS`: kartu kosakata (gambar di `assets/vocab/`).
- `STORY`: cerita tahap Read. Tulis `[kata|arti]` untuk kata yang bisa diketuk (masuk ke Word Bag).
- `PAIRS`, `PRACTICE`, `ROUNDS`, `CHECK`: soal. `a` = jawaban benar, `r` = jenis aturan (s3, plural, has, have, does, do, base). Untuk soal "fix", `w` = posisi kata yang salah (mulai dari 0).
- `WORLDS`: enam dunia dan `open: true/false`.
- `MAP_STONES`: 27 batu pijakan di peta, urut dari sekolah ke reruntuhan. `w` = nomor dunia. Dunia 3 memakai 6 batunya untuk pelajaran 1–6; batu dunia lain menjadi level berikutnya.

Setelah mengubah isi atau gambar, buka `sw.js` dan naikkan `VERSION` (misalnya `readventure-v1` → `readventure-v2`) supaya HP siswa mengambil versi baru.

## Menjalankan di komputer

File harus dibuka lewat server, bukan klik dua kali. Contoh: `python -m http.server 8000`, lalu buka `http://localhost:8000`.

## Catatan

- Logo, karakter (Rudi, Aisyah, Dimas, Sari), latar, dan ilustrasi dibuat dengan bantuan AI (ChatGPT) untuk proyek ini.
- Font Baloo 2 dan Nunito dimuat dari Google Fonts saat online.
- Teks cerita dan soal perlu dicek ulang oleh guru atau dosen sebelum dipakai di kelas.
