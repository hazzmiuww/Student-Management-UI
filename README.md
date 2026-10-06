# 🎓 Student Management UI - Institut Teknologi Sepuluh Nopember (ITS)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive Design](https://img.shields.io/badge/Responsive-Design-4A90E2?style=for-the-badge)

Aplikasi web **Student Management UI** berbasis *Single Page Application (SPA)* sederhana yang dibangun sebagai bagian dari praktikum Pemrograman Web (Pertemuan 5). Aplikasi ini mendemonstrasikan penerapan **HTML5**, **CSS3 Modern** (CSS Grid, Flexbox, CSS Variables), serta **JavaScript Vanilla** untuk manajemen data mahasiswa secara interaktif.

---

### Nama: M. Haziq Ridwan Parsa
### NRP: 5025251053

--- 

#### Link Website: 

---
## ✨ Fitur Utama

- **📝 Form Input Data Student**: Input NIM, Nama Lengkap, Jurusan, dan Email terintegrasi dengan validasi otomatis.
- **📊 Dashboard Summary Cards**: Menampilkan statistik total mahasiswa terdaftar, jumlah program studi aktif, dan status sistem.
- **👥 30 Data Dummy Mahasiswa ITS**: Data awal 30 mahasiswa dengan format NIM resmi dan email berakhiran `@its.ac.id`.
- **🔎 Real-time Live Search**: Pencarian cepat mahasiswa secara instan berdasarkan NIM, Nama, Jurusan, atau Email.
- **📄 Pagination Interaktif (5 Data/Halaman)**: Navigasi geser halaman (kiri/kanan) dengan indikator counter halaman otomatis (`Menampilkan 1 - 5 dari 30 data`).
- **✏️ Modal Popup Edit Data**: Fitur ubah data mahasiswa menggunakan dialog popup bergaya *Glassmorphism*.
- **🗑️ Hapus Data (Shift Up)**: Hapus data mahasiswa dengan konfirmasi modal, di mana posisi data di bawahnya akan otomatis naik ke atas.
- **🔔 Toast Notifications**: Umpan balik visual berupa floating toast alert saat berhasil menambah, mengedit, atau menghapus data.
- **📱 Fully Responsive Design**: Tampilan menyesuaikan secara dinamis dari layar desktop (2 kolom) hingga smartphone (1 kolom).

---

## 📁 Struktur File

```
student_management/
├── index.html          # Struktur konten semantic HTML5
├── css/
│   └── style.css       # CSS Reset, Variables, Layout Grid/Flexbox, & Components
├── js/
│   └── app.js          # Logika JavaScript, 30 Dummy Data, DOM Manipulation, CRUD & Pagination
└── README.md           # Dokumentasi proyek
```

---

## 🎨 Arsitektur & Struktur CSS

File `css/style.css` dirancang modular dengan pemisahan komponen untuk memudahkan pemeliharaan:

| Bagian CSS | Konsep / Teknologi | Fungsi Utama |
| :--- | :--- | :--- |
| **Reset & Global** | Universal Selector (`*`), Box Model | Menghilangkan margin/padding bawaan & menetapkan font dasar (`Plus Jakarta Sans`) |
| **CSS Variables (`:root`)** | CSS Custom Properties | Mengelola sistem warna (`--primary`, `--danger`), radius border, & box-shadow |
| **Navbar** | Flexbox (`space-between`) | Navigasi atas dengan logo brand, menu navigasi, dan indikator profil pengguna |
| **Dashboard Stats** | CSS Grid / Flexbox | Menampilkan kartu statistik ringkasan total data mahasiswa |
| **Main Layout** | CSS Grid (`380px 1fr`) | Membagi tata letak 2 kolom (Form di kiri, Tabel di kanan) |
| **Card & Form** | Box Model, Pseudoclass (`:focus`) | Pengelompokan `.form-group`, efek glow input saat aktif, & penataan form |
| **Button Component** | Reusable Classes (`.btn`, `.btn-primary`) | Variasi warna tombol simpan, batal, reset, edit, & hapus |
| **Search Box** | Flexbox | Penataan input pencarian dan tombol cari secara berdampingan |
| **Table & Badges** | Table CSS, Hover Effects | Menampilkan daftar data mahasiswa lengkap dengan *badge color-coded* per jurusan |
| **Modal Popup** | Fixed Overlay, `backdrop-filter` | Modal dialog transparan dengan efek blur glassmorphism |
| **Toast Notifications** | Keyframe Animations (`@keyframes`) | Animasi slide-in dan fade-out notifikasi di pojok kanan bawah |
| **Responsive Design** | Media Queries (`@media`) | Penyesuaian tata letak otomatis pada layar desktop, tablet, dan mobile |

---

## 🎓 Aturan NIM & Email Mahasiswa ITS

Data mahasiswa mengikuti standar penamaan dan pengkodean sebagai berikut:

### 1. Format Email
Selalu berakhiran `@its.ac.id` (Contoh: `andi.pratama@its.ac.id`).

### 2. Format NIM (10 Digit)
Format: **`50`** + **`[Kode Jurusan]`** + **`[Angkatan]`** + **`1`** + **`[Urutan Mahasiswa (001-300)]`**

| Program Studi (Jurusan) | Kode Jurusan | Contoh NIM |
| :--- | :---: | :--- |
| **Teknik Informatika** | `25` | `5025251003` |
| **Sistem Informasi** | `26` | `5026241012` |
| **Teknologi Informasi** | `27` | `5027251088` |
| **Teknologi Kedokteran** | `28` | `5028261019` |
| **Teknik Biomedik** | `29` | `5029241067` |
| **Teknik Elektro** | `23` | `5023231102` |
| **Teknik Komputer** | `24` | `5024231045` |

---

## 🚀 Cara Menjalankan Proyek

1. **Clone repositori GitHub ini:**
   ```bash
   git clone https://github.com/hazzmiuww/Student-Management-UI.git
   ```

2. **Masuk ke direktori proyek:**
   ```bash
   cd Student-Management-UI
   ```

3. **Buka file `index.html`:**
   Buka file `index.html` langsung menggunakan web browser pilihan Anda (Google Chrome, Mozilla Firefox, Microsoft Edge, dll).

---

## 📄 Lisensi & Kredit

Dipersembahkan untuk **Praktikum Pemrograman Web - Institut Teknologi Sepuluh Nopember (ITS)**.
Semua aset ikon menggunakan SVG murni tanpa dependensi eksternal berat.
