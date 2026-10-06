/**
 * Student Management App JavaScript
 * Handles Data, Pagination, Real-time Search, Form Validation, Modal Edit, and Delete Actions.
 */

// Major codes mapping for NIM generation & validation
const MAJOR_CODES = {
    'Teknik Informatika': '25',
    'Sistem Informasi': '26',
    'Teknologi Informasi': '27',
    'Teknologi Kedokteran': '28',
    'Teknik Biomedik': '29',
    'Teknik Elektro': '23',
    'Teknik Komputer': '24'
};

const MAJOR_BADGE_CLASSES = {
    'Teknik Informatika': 'jurusan-ti',
    'Sistem Informasi': 'jurusan-si',
    'Teknologi Informasi': 'jurusan-tif',
    'Teknologi Kedokteran': 'jurusan-tked',
    'Teknik Biomedik': 'jurusan-tb',
    'Teknik Elektro': 'jurusan-te',
    'Teknik Komputer': 'jurusan-tk'
};

// INITIAL 30 DUMMY STUDENTS
// Criteria:
// 1. Email ends with @its.ac.id
// 2. NIM format: 50 + [Kode Jurusan: TI=25, SI=26, TIF=27, TKed=28, TB=29, TE=23, TK=24] + [Angkatan: 22, 23, 24, 25, 26] + 1 + [Urutan: 001 - 300]
let studentData = [
    { nim: "5025251003", nama: "Andi Pratama", jurusan: "Teknik Informatika", email: "andi.pratama@its.ac.id" },
    { nim: "5026241012", nama: "Siti Aisyah", jurusan: "Sistem Informasi", email: "siti.aisyah@its.ac.id" },
    { nim: "5024231045", nama: "Budi Santoso", jurusan: "Teknik Komputer", email: "budi.santoso@its.ac.id" },
    { nim: "5027251088", nama: "Nina Marlina", jurusan: "Teknologi Informasi", email: "nina.marlina@its.ac.id" },
    { nim: "5025221005", nama: "Rizky Pratama", jurusan: "Teknik Informatika", email: "rizky.pratama@its.ac.id" },
    { nim: "5028261019", nama: "Dewi Lestari", jurusan: "Teknologi Kedokteran", email: "dewi.lestari@its.ac.id" },
    { nim: "5029241067", nama: "Fajar Nugraha", jurusan: "Teknik Biomedik", email: "fajar.nugraha@its.ac.id" },
    { nim: "5023231102", nama: "Hendra Wijaya", jurusan: "Teknik Elektro", email: "hendra.wijaya@its.ac.id" },
    { nim: "5025251145", nama: "Maya Putri", jurusan: "Teknik Informatika", email: "maya.putri@its.ac.id" },
    { nim: "5026221034", nama: "Rian Hidayat", jurusan: "Sistem Informasi", email: "rian.hidayat@its.ac.id" },
    { nim: "5027261077", nama: "Anisa Rahma", jurusan: "Teknologi Informasi", email: "anisa.rahma@its.ac.id" },
    { nim: "5024251210", nama: "Dimas Anggara", jurusan: "Teknik Komputer", email: "dimas.anggara@its.ac.id" },
    { nim: "5028231056", nama: "Fitri Handayani", jurusan: "Teknologi Kedokteran", email: "fitri.handayani@its.ac.id" },
    { nim: "5029251099", nama: "Gilang Ramadhan", jurusan: "Teknik Biomedik", email: "gilang.ramadhan@its.ac.id" },
    { nim: "5023241150", nama: "Indah Permata", jurusan: "Teknik Elektro", email: "indah.permata@its.ac.id" },
    { nim: "5025231201", nama: "Joko Susilo", jurusan: "Teknik Informatika", email: "joko.susilo@its.ac.id" },
    { nim: "5026251044", nama: "Kartika Sari", jurusan: "Sistem Informasi", email: "kartika.sari@its.ac.id" },
    { nim: "5027221115", nama: "Lukman Hakim", jurusan: "Teknologi Informasi", email: "lukman.hakim@its.ac.id" },
    { nim: "5024261082", nama: "Mega Utami", jurusan: "Teknik Komputer", email: "mega.utami@its.ac.id" },
    { nim: "5028241130", nama: "Naufal Ahmad", jurusan: "Teknologi Kedokteran", email: "naufal.ahmad@its.ac.id" },
    { nim: "5029231175", nama: "Olivia Tan", jurusan: "Teknik Biomedik", email: "olivia.tan@its.ac.id" },
    { nim: "5023261220", nama: "Pradipta Kusuma", jurusan: "Teknik Elektro", email: "pradipta.kusuma@its.ac.id" },
    { nim: "5025241255", nama: "Ratu Bilqis", jurusan: "Teknik Informatika", email: "ratu.bilqis@its.ac.id" },
    { nim: "5026231090", nama: "Satria Utama", jurusan: "Sistem Informasi", email: "satria.utama@its.ac.id" },
    { nim: "5027241168", nama: "Tania Aurelia", jurusan: "Teknologi Informasi", email: "tania.aurelia@its.ac.id" },
    { nim: "5024221051", nama: "Umar Faruq", jurusan: "Teknik Komputer", email: "umar.faruq@its.ac.id" },
    { nim: "5028251204", nama: "Vania Salsabila", jurusan: "Teknologi Kedokteran", email: "vania.salsabila@its.ac.id" },
    { nim: "5029261280", nama: "Wahyu Hidayat", jurusan: "Teknik Biomedik", email: "wahyu.hidayat@its.ac.id" },
    { nim: "5023251295", nama: "Yusuf Mansur", jurusan: "Teknik Elektro", email: "yusuf.mansur@its.ac.id" },
    { nim: "5025261300", nama: "Zahra Annisa", jurusan: "Teknik Informatika", email: "zahra.annisa@its.ac.id" }
];

// APP STATE
let currentPage = 1;
const itemsPerPage = 5;
let searchQuery = "";
let pendingDeleteNim = null;

// DOM ELEMENTS
const tableBody = document.getElementById('tableBody');
const paginationInfo = document.getElementById('paginationInfo');
const paginationContainer = document.getElementById('pagination');
const inputSearch = document.getElementById('inputSearch');
const btnSearch = document.getElementById('btnSearch');
const badgeTotalCount = document.getElementById('badgeTotalCount');
const statTotalStudents = document.getElementById('statTotalStudents');

// Form Input Elements
const inputNim = document.getElementById('inputNim');
const inputNama = document.getElementById('inputNama');
const inputJurusan = document.getElementById('inputJurusan');
const inputEmail = document.getElementById('inputEmail');
const nimHint = document.getElementById('nimHint');
const btnSimpan = document.getElementById('btnSimpan');
const btnBatal = document.getElementById('btnBatal');
const btnReset = document.getElementById('btnReset');

// Edit Modal Elements
const editModal = document.getElementById('editModal');
const btnCloseEditModal = document.getElementById('btnCloseEditModal');
const btnCancelEdit = document.getElementById('btnCancelEdit');
const btnSaveEdit = document.getElementById('btnSaveEdit');
const editNim = document.getElementById('editNim');
const editNama = document.getElementById('editNama');
const editJurusan = document.getElementById('editJurusan');
const editEmail = document.getElementById('editEmail');

// Delete Modal Elements
const deleteModal = document.getElementById('deleteModal');
const btnCancelDelete = document.getElementById('btnCancelDelete');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');
const deleteStudentDetails = document.getElementById('deleteStudentDetails');

// Toast Container
const toastContainer = document.getElementById('toastContainer');

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    setupEventListeners();
});

// MAIN RENDER FUNCTION
function renderApp() {
    // 1. Filter data based on search query
    const filteredData = getFilteredStudents();

    // 2. Calculate pagination
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    // Ensure current page is valid
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // 3. Render Table Rows
    renderTableRows(paginatedData, startIndex);

    // 4. Render Pagination Controls
    renderPagination(totalPages);

    // 5. Update Information & Counters
    updateCounters(startIndex, endIndex, totalItems);
}

// RENDER TABLE ROWS
function renderTableRows(data, startIndex) {
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <p style="font-weight: 600; font-size: 1rem;">Tidak ada data mahasiswa ditemukan</p>
                    <small>Coba gunakan kata kunci pencarian yang lain.</small>
                </td>
            </tr>
        `;
        return;
    }

    let rowsHTML = "";
    data.forEach((student, index) => {
        const rowNumber = startIndex + index + 1;
        const badgeClass = MAJOR_BADGE_CLASSES[student.jurusan] || 'jurusan-ti';

        rowsHTML += `
            <tr>
                <td class="cell-no">${rowNumber}</td>
                <td class="cell-nim">${escapeHTML(student.nim)}</td>
                <td class="cell-nama">${escapeHTML(student.nama)}</td>
                <td><span class="badge-jurusan ${badgeClass}">${escapeHTML(student.jurusan)}</span></td>
                <td class="cell-email">${escapeHTML(student.email)}</td>
                <td>
                    <div class="actions">
                        <button type="button" class="action edit" onclick="openEditModal('${student.nim}')" title="Edit Mahasiswa">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button type="button" class="action delete" onclick="openDeleteModal('${student.nim}')" title="Hapus Mahasiswa">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = rowsHTML;
}

// RENDER PAGINATION CONTROLS
function renderPagination(totalPages) {
    let paginationHTML = "";

    // Prev Button
    paginationHTML += `
        <button type="button" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})" title="Halaman Sebelumnya">
            &laquo;
        </button>
    `;

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button type="button" class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }

    // Next Button
    paginationHTML += `
        <button type="button" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})" title="Halaman Selanjutnya">
            &raquo;
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// UPDATE COUNTERS & TEXT
function updateCounters(startIndex, endIndex, totalItems) {
    const fromText = totalItems === 0 ? 0 : startIndex + 1;
    paginationInfo.textContent = `Menampilkan ${fromText} - ${endIndex} dari ${totalItems} data`;
    badgeTotalCount.textContent = `${studentData.length} Data`;
    statTotalStudents.textContent = studentData.length;
}

// FILTERING LOGIC
function getFilteredStudents() {
    if (!searchQuery.trim()) {
        return studentData;
    }

    const query = searchQuery.toLowerCase().trim();
    return studentData.filter(student => 
        student.nim.toLowerCase().includes(query) ||
        student.nama.toLowerCase().includes(query) ||
        student.jurusan.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
}

// NAVIGATION & PAGINATION ACTION
function goToPage(page) {
    currentPage = page;
    renderApp();
}

// EVENT LISTENERS SETUP
function setupEventListeners() {
    // Live Search
    inputSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1;
        renderApp();
    });

    btnSearch.addEventListener('click', () => {
        searchQuery = inputSearch.value;
        currentPage = 1;
        renderApp();
    });

    // Auto update NIM hint when Jurusan changes
    inputJurusan.addEventListener('change', (e) => {
        const major = e.target.value;
        const code = MAJOR_CODES[major];
        if (code) {
            nimHint.textContent = `Kode Jurusan ${major}: ${code}. Format NIM: 50${code}251003`;
            nimHint.style.color = 'var(--primary-dark)';
            nimHint.style.fontWeight = '600';
        }
    });

    // Form Action Buttons
    btnSimpan.addEventListener('click', handleAddStudent);
    btnBatal.addEventListener('click', resetForm);
    btnReset.addEventListener('click', resetForm);

    // Edit Modal Buttons
    btnCloseEditModal.addEventListener('click', closeEditModal);
    btnCancelEdit.addEventListener('click', closeEditModal);
    btnSaveEdit.addEventListener('click', handleSaveEdit);

    // Delete Modal Buttons
    btnCancelDelete.addEventListener('click', closeDeleteModal);
    btnConfirmDelete.addEventListener('click', handleExecuteDelete);

    // Keyboard Shortcuts (Esc to close modals)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeEditModal();
            closeDeleteModal();
        }
    });
}

// ADD STUDENT HANDLER
function handleAddStudent() {
    const nim = inputNim.value.trim();
    const nama = inputNama.value.trim();
    const jurusan = inputJurusan.value;
    let email = inputEmail.value.trim();

    // Validations
    if (!nim || !nama || !jurusan || !email) {
        showToast("Mohon lengkapi semua bidang yang wajib diisi!", "danger");
        return;
    }

    // NIM duplicate check
    if (studentData.some(s => s.nim === nim)) {
        showToast(`NIM ${nim} sudah terdaftar dalam sistem!`, "danger");
        inputNim.focus();
        return;
    }

    // Auto-fix email suffix if user entered just username
    if (!email.toLowerCase().endsWith('@its.ac.id')) {
        if (email.includes('@')) {
            showToast("Email mahasiswa harus berakhiran @its.ac.id", "warning");
            return;
        } else {
            email = email + '@its.ac.id';
        }
    }

    // Create new student object
    const newStudent = { nim, nama, jurusan, email };
    studentData.unshift(newStudent); // Add to the top of array

    resetForm();
    showToast(`Mahasiswa ${nama} berhasil ditambahkan!`, "success");

    currentPage = 1; // Go to first page to see newly added student
    renderApp();
}

// EDIT MODAL HANDLERS
function openEditModal(nim) {
    const student = studentData.find(s => s.nim === nim);
    if (!student) return;

    editNim.value = student.nim;
    editNama.value = student.nama;
    editJurusan.value = student.jurusan;
    editEmail.value = student.email;

    editModal.classList.add('active');
}

function closeEditModal() {
    editModal.classList.remove('active');
}

function handleSaveEdit() {
    const nim = editNim.value;
    const nama = editNama.value.trim();
    const jurusan = editJurusan.value;
    let email = editEmail.value.trim();

    if (!nama || !jurusan || !email) {
        showToast("Mohon isi semua bidang yang tersedia!", "danger");
        return;
    }

    if (!email.toLowerCase().endsWith('@its.ac.id')) {
        if (email.includes('@')) {
            showToast("Email mahasiswa harus berakhiran @its.ac.id", "warning");
            return;
        } else {
            email = email + '@its.ac.id';
        }
    }

    // Update in array
    const index = studentData.findIndex(s => s.nim === nim);
    if (index !== -1) {
        studentData[index] = { nim, nama, jurusan, email };
        showToast(`Data mahasiswa ${nama} berhasil diperbarui!`, "success");
        closeEditModal();
        renderApp();
    }
}

// DELETE MODAL HANDLERS
function openDeleteModal(nim) {
    const student = studentData.find(s => s.nim === nim);
    if (!student) return;

    pendingDeleteNim = nim;
    deleteStudentDetails.innerHTML = `${escapeHTML(student.nama)} (${student.nim})<br><small style="color: var(--text-muted); font-weight: normal;">${escapeHTML(student.jurusan)}</small>`;
    deleteModal.classList.add('active');
}

function closeDeleteModal() {
    deleteModal.classList.remove('active');
    pendingDeleteNim = null;
}

function handleExecuteDelete() {
    if (!pendingDeleteNim) return;

    const studentIndex = studentData.findIndex(s => s.nim === pendingDeleteNim);
    if (studentIndex !== -1) {
        const deletedStudent = studentData[studentIndex];
        studentData.splice(studentIndex, 1); // Delete and shift remaining items up

        showToast(`Data mahasiswa ${deletedStudent.nama} telah dihapus.`, "success");
        closeDeleteModal();
        renderApp();
    }
}

// RESET FORM
function resetForm() {
    inputNim.value = "";
    inputNama.value = "";
    inputJurusan.selectedIndex = 0;
    inputEmail.value = "";
    nimHint.textContent = "Format: 50 + Kode Jurusan (25) + Angkatan (25) + 1 + Urutan (003)";
    nimHint.style.color = "var(--text-muted)";
    nimHint.style.fontWeight = "normal";
}

// TOAST NOTIFICATION UTILITY
function showToast(message, type = "success") {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSVG = '';
    if (type === 'success') {
        iconSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'danger') {
        iconSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else {
        iconSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    }

    toast.innerHTML = `
        <div class="toast-icon">${iconSVG}</div>
        <span>${escapeHTML(message)}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s forwards';
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 3500);
}

// UTILITY TO ESCAPE HTML (PREVENT XSS)
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
