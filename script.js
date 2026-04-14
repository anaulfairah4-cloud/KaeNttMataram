// ===== MOBILE MENU =====
document.getElementById('hamburger').onclick = () => document.getElementById('mobileMenu').classList.add('open');
document.getElementById('closeMenu').onclick = () => document.getElementById('mobileMenu').classList.remove('open');
document.querySelectorAll('.mobile-link').forEach((l) => (l.onclick = () => document.getElementById('mobileMenu').classList.remove('open')));

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
revealEls.forEach((el) => obs.observe(el));

// ===== SLIDER =====
const slider = document.getElementById('ketuaSlider');
document.getElementById('prevBtn').onclick = () => slider.scrollBy({ left: -220, behavior: 'smooth' });
document.getElementById('nextBtn').onclick = () => slider.scrollBy({ left: 220, behavior: 'smooth' });

// ===== COUNTDOWN =====
let countdownTarget = null,
  countdownTimer = null;

function setCountdown() {
  const dt = document.getElementById('inputEventDate').value;
  const name = document.getElementById('inputEventName').value || 'Acara';
  const desc = document.getElementById('inputEventDesc').value;
  if (!dt) return;
  countdownTarget = new Date(dt);
  document.getElementById('eventName').textContent = name;
  document.getElementById('eventDesc').textContent = desc;
  document.getElementById('eventDateDisplay').textContent =
    'Tanggal: ' +
    countdownTarget.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  if (countdownTimer) clearInterval(countdownTimer);
  tickCountdown();
  countdownTimer = setInterval(tickCountdown, 1000);
}

function tickCountdown() {
  if (!countdownTarget) return;
  const diff = countdownTarget - new Date();
  if (diff <= 0) {
    ['cdDays', 'cdHours', 'cdMinutes', 'cdSeconds'].forEach((id) => (document.getElementById(id).textContent = '00'));
    clearInterval(countdownTimer);
    return;
  }
  document.getElementById('cdDays').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
  document.getElementById('cdHours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
  document.getElementById('cdMinutes').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  document.getElementById('cdSeconds').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}

// ===== ALBUM DATA =====
const albums = {
  ospor: {
    title: 'OSPOR & Pengkaderan',
    desc: 'Dokumentasi kegiatan orientasi pengenalan organisasi anggota baru KAE — 2024',
    photos: [
      { src: 'img/bg.jpeg', caption: 'Pembukaan OSPOR' },
      { src: 'img/11.jpeg', caption: 'Sesi Materi' },
      { src: 'img/12.jpeg', caption: 'Kegiatan Lapangan' },
      { src: 'img/13.jpeg', caption: 'Foto Bersama' },
    ],
  },
  milad: {
    title: 'Milad KAE ke-22',
    desc: 'Perayaan ulang tahun organisasi Kerukunan Anak Ende — 2025',
    photos: [
      { src: 'img/1.jpeg', caption: 'Tumpeng Milad' },
      { src: 'img/2.jpeg', caption: 'Sambutan Ketua' },
      { src: 'img/3.jpeg', caption: 'Penampilan Seni' },
      { src: 'img/4.jpeg', caption: 'Sesi Foto Bersama' },
    ],
  },
  olahraga: {
    title: 'Turnamen & Olahraga',
    desc: 'Kegiatan olahraga dan turnamen antar anggota KAE Mataram — 2024',
    photos: [
      { src: 'img/12.jpeg', caption: 'Pertandingan Futsal' },
      { src: 'img/11.jpeg', caption: 'Tim Olahraga KAE' },
      { src: 'img/bg.jpeg', caption: 'Piala Juara' },
      { src: 'img/13.jpeg', caption: 'Sesi Penutupan' },
    ],
  },
  budaya: {
    title: 'Seni & Budaya Ende',
    desc: 'Pelestarian dan pertunjukan seni budaya khas Ende di perantauan — 2025',
    photos: [
      { src: 'img/13.jpeg', caption: 'Tarian Adat Ende' },
      { src: 'img/bg.jpeg', caption: 'Kostum Budaya' },
      { src: 'img/11.jpeg', caption: 'Pertunjukan Musik' },
      { src: 'img/12.jpeg', caption: 'Pameran Kerajinan' },
    ],
  },
};

// ===== OPEN ALBUM =====
function openAlbum(key) {
  const album = albums[key];
  if (!album) return;

  document.getElementById('modalAlbumTitle').textContent = album.title;
  document.getElementById('modalAlbumDesc').textContent = album.desc;
  document.getElementById('modalPhotoCounter').textContent = album.photos.length + ' Foto';

  const grid = document.getElementById('modalGalleryGrid');
  grid.innerHTML = '';

  album.photos.forEach((photo) => {
    const item = document.createElement('div');
    item.className = 'modal-photo-item';
    item.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        style="display:block" />
      <div class="modal-photo-placeholder" style="display:none">
        <span>📷</span><small>${photo.caption}</small>
      </div>
      <div class="photo-hover-overlay"><span>🔍 Perbesar</span></div>
    `;
    item.onclick = () => openLightbox(photo.src, photo.caption);
    grid.appendChild(item);
  });

  document.getElementById('albumModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAlbum() {
  document.getElementById('albumModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== LIGHTBOX =====
function openLightbox(src, alt) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxImg').alt = alt || '';
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this) closeLightbox();
});

// ESC key to close modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeAlbum();
  }
});

// ===== KONTAK FORM =====
document.getElementById('kontakForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  document.getElementById('namaError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('pesanError').textContent = '';

  if (!nama) {
    document.getElementById('namaError').textContent = 'Nama wajib diisi';
    valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('emailError').textContent = 'Email tidak valid';
    valid = false;
  }
  if (!pesan) {
    document.getElementById('pesanError').textContent = 'Pesan wajib diisi';
    valid = false;
  }
  if (!valid) return;

  const btn = document.getElementById('submitBtn');
  document.getElementById('btnText').style.display = 'none';
  document.getElementById('btnLoading').style.display = 'inline';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    document.getElementById('btnText').style.display = 'inline';
    document.getElementById('btnLoading').style.display = 'none';
    btn.disabled = false;
    this.reset();
    setTimeout(() => (document.getElementById('formSuccess').style.display = 'none'), 5000);
  }, 1500);
});
