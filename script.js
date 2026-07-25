// ---------- Data produk ----------
const products = [
  {
    id: 1,
    title: "Celana Formal - celana Jins - dan Beberapa Model celana lain",
    price: 65000,
    maxPrice: 150000,
    oldPrice: 150300,
    sold: 424,
    disc: "10%",
    badge: "mall",
    colors: [
      { name: "Celana Formal", img: "images/celana1.jpg" },
      { name: "Celana Jins", img: "images/celana2.jpg" },
      { name: "Celana", img: "images/celana3.jpg" }
      
    ]
  },
  {
    id: 2,
    title: "Kemeja Blouse Korean Look",
    price: 110000,
    maxPrice: 165000,
    oldPrice: 308000,
    sold: 580,
    disc: "30%",
    badge: "star",
    colors: [
      { name: "Kemeja Blouse", img: "images/blouse1.jpg" },
      { name: "Kemeja Blouse", img: "images/blouse2.jpg" },
      { name: "Kemeja Blouse", img: "images/blouse3.jpg" }
    ]
  },
  {
    id: 3,
    title: "Batik Dewasa Pria - Wanita",
    price: 55000,
    maxPrice: 135000,
    oldPrice: 322000,
    sold: 545,
    disc: "33%",
    badge: "star",
    colors: [
      { name: "Batik Pria", img: "images/batikd2.jpg" },
      { name: "Batik Wanita", img: "images/batikd1.jpg" }
    ]
  },
  {
    id: 4,
    title: "Batik Anak - Laki-Laki dan Perempuan",
    price: 40000,
    maxPrice: 95000,
    oldPrice: 351000,
    sold: 270,
    disc: "33%",
    badge: "star",
    colors: [
      { name: "Batik Anak", img: "images/batika1.jpg" },
      { name: "Batik Anak Laki-Laki", img: "images/batika2.jpg" },
      { name: "Batik Anak Perempuan", img: "images/batika3.jpg" },
      { name: "Batik Anak", img: "images/batika4.jpg" }
    ]
  },
  {
    id: 5,
    title: "Gamis Dewasa",
    price: 150000,
    maxPrice: 250000,
    oldPrice: 291000,
    sold: 1230,
    disc: "29%",
    badge: "star",
    colors: [
      { name: "Gamais Dewasa", img: "images/gamis1.jpg" },
      { name: "Gamis Hitam", img: "images/gamis2.jpg" },
      { name: "Gamis Putih", img: "images/gamis3.jpg" }
    ]
  },
  {
    id: 6,
    title: "Gamis Anak-Anak",
    price: 100000,
    maxPrice: 150000,
    oldPrice: 245000,
    sold: 212,
    disc: "23%",
    badge: "mall",
    colors: [
      { name: "Gamis Anak-Anak", img: "images/gamisa1.jpg" },
      { name: "Gamis Anak Putih", img: "images/gamis2.jpg" },
      { name: "Gamis Anak Hitam", img: "images/gamis3.jpg" }
    ]
  }
];

function fmtRp(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

// Nomor WhatsApp toko (sama dengan yang dipakai di tab Kontak)
const STORE_WA = "6285545211731";
let currentProduct = null;
let lastTab = "produk";

function renderGrid(targetId, list) {
  const grid = document.getElementById(targetId);
  grid.innerHTML = list.map(p => `
    <div class="card" data-id="${p.id}">
      <div class="thumb">
        
        <span class="disc-tag">-${p.disc}</span>
        <img src="${p.colors[0].img}" alt="${p.title}">
      </div>
      <div class="info">
        <p class="title">${p.title}</p>
        <p class="price">
          ${fmtRp(p.price)} - ${fmtRp(p.maxPrice)}
          <span class="old-price">${fmtRp(p.oldPrice)}</span>
        </p>
        <div class="meta-line"><span class="rate">★ 5.0</span><span>${p.sold} terjual</span></div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".card").forEach(c => {
    c.addEventListener("click", () => openDetail(parseInt(c.dataset.id)));
  });
}

// Inisialisasi Grid
renderGrid("product-grid", products);
renderGrid("about-grid", products.slice(0, 4));

// ---------- Tabs ----------
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById("view-" + btn.dataset.tab).classList.add("active");
    document.getElementById("detail-view").classList.remove("active");
    lastTab = btn.dataset.tab;
  });
});

// ---------- Chip filter (visual only) ----------
document.querySelectorAll(".chip-row .chip").forEach(chip => {
  chip.addEventListener("click", () => {
    if (chip.classList.contains("instant")) return;
    document.querySelectorAll(".chip-row .chip").forEach(c => {
      if (!c.classList.contains("instant")) c.classList.remove("active");
    });
    chip.classList.add("active");
  });
});

// ---------- Detail page ----------
let currentColorIndex = 0;
let currentSize = "S";

function showDetailPage() {
  document.querySelector(".store-head").style.display = "none";
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("detail-view").classList.add("active");
  window.scrollTo(0, 0);
}

function hideDetailPage() {
  document.getElementById("detail-view").classList.remove("active");
  document.querySelector(".store-head").style.display = "";
  document.getElementById("view-" + lastTab).classList.add("active");
  window.scrollTo(0, 0);
}

function openDetail(id) {
  const p = products.find(x => x.id === id);
  currentProduct = p;
  currentColorIndex = 0;
  currentSize = "S";

  const activeTabBtn = document.querySelector(".tab-btn.active");
  if (activeTabBtn) lastTab = activeTabBtn.dataset.tab;

  document.getElementById("d-title").textContent = p.title;
  document.getElementById("d-price").textContent =
    fmtRp(p.price) + " - " + fmtRp(p.maxPrice);
  document.getElementById("d-sold").innerHTML = p.sold + " Terjual ♡";
  

  setHero(p, 0);

  // top swatch strip
  document.getElementById("d-swatch-strip").innerHTML = p.colors.map((c, i) => `
    <div class="d-swatch ${i === 0 ? 'active' : ''}" data-i="${i}"><img src="${c.img}"></div>
  `).join("");

  // color section swatches
  document.getElementById("d-color-strip").innerHTML = p.colors.map((c, i) => `
    <div class="d-swatch ${i === 0 ? 'active' : ''}" data-i="${i}"><img src="${c.img}"></div>
  `).join("");

  [...document.querySelectorAll("#d-swatch-strip .d-swatch, #d-color-strip .d-swatch")].forEach(el => {
    el.addEventListener("click", () => {
      const i = parseInt(el.dataset.i);
      setHero(p, i);
    });
  });

  document.getElementById("d-counter").textContent = `1/${p.colors.length}`;

  document.querySelectorAll(".size-chip").forEach((chip, idx) => {
    chip.classList.toggle("active", idx === 0);
    chip.onclick = () => {
      document.querySelectorAll(".size-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentSize = chip.textContent;
      document.getElementById("d-size-name").textContent = currentSize;
    };
  });
  document.getElementById("d-size-name").textContent = "S";

  updateBuyLink();
  showDetailPage();

  // Tambahkan entry history supaya tombol back di HP menutup halaman detail
  history.pushState({ modal: "detail" }, "");
}

function setHero(p, i) {
  currentColorIndex = i;
  document.getElementById("d-hero-img").src = p.colors[i].img;
  document.getElementById("d-color-name").textContent = p.colors[i].name;
  document.querySelectorAll("#d-swatch-strip .d-swatch, #d-color-strip .d-swatch").forEach(el => {
    el.classList.toggle("active", parseInt(el.dataset.i) === i);
  });
  updateBuyLink();

  // kalau lightbox sedang terbuka, ikut update gambarnya
  const lb = document.getElementById("lightbox");
  if (lb.classList.contains("active")) {
    document.getElementById("lightbox-img").src = p.colors[i].img;
    document.getElementById("lightbox-counter").textContent = `${i + 1}/${p.colors.length}`;
  }
}

function changeColor(delta) {
  if (!currentProduct) return;
  const len = currentProduct.colors.length;
  const next = (currentColorIndex + delta + len) % len;
  setHero(currentProduct, next);
}

// Tombol back di dalam app -> pakai history.back() supaya konsisten dengan tombol back HP
document.getElementById("btn-back").addEventListener("click", () => {
  history.back();
});

// ---------- Tombol beli & chat langsung ke WhatsApp ----------
function buildWaLink(p) {
  const color = p.colors[currentColorIndex].name;
  const text =
    `Halo, saya ingin memesan produk *${p.title}*\n` +
    `Warna: ${color}\n` +
    `Ukuran: ${currentSize}\n` +
    `Harga: ${fmtRp(p.price)}\n\n` +
    `Apakah masih tersedia?`;
  return `https://wa.me/${STORE_WA}?text=${encodeURIComponent(text)}`;
}

function updateBuyLink() {
  if (!currentProduct) return;
  const link = buildWaLink(currentProduct);
  document.getElementById("buy-btn").href = link;
  document.getElementById("buy-btn").innerHTML = "BELI VIA WHATSAPP<br>";
  document.getElementById("chat-btn").href = link;
}

// ---------- Lightbox foto (perbesar & geser) ----------
function openLightbox() {
  if (!currentProduct) return;
  const p = currentProduct;
  document.getElementById("lightbox-img").src = p.colors[currentColorIndex].img;
  document.getElementById("lightbox-counter").textContent = `${currentColorIndex + 1}/${p.colors.length}`;
  document.getElementById("lightbox").classList.add("active");
  history.pushState({ modal: "lightbox" }, "");
}

document.getElementById("d-hero-img").addEventListener("click", openLightbox);
document.getElementById("lightbox-close").addEventListener("click", () => history.back());
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") history.back(); // klik area gelap = tutup
});

// Geser (swipe) untuk ganti foto/varian — dipakai di foto utama & lightbox
function attachSwipe(el, onSwipeLeft, onSwipeRight) {
  let startX = 0, startY = 0, tracking = false;
  el.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });
  el.addEventListener("touchend", (e) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onSwipeLeft(); else onSwipeRight();
    }
  }, { passive: true });
}

attachSwipe(document.getElementById("d-hero-img"), () => changeColor(1), () => changeColor(-1));
attachSwipe(document.getElementById("lightbox-img"), () => changeColor(1), () => changeColor(-1));

// ---------- Riwayat browser (tombol back HP menutup lightbox lalu halaman detail) ----------
window.addEventListener("popstate", () => {
  const lightbox = document.getElementById("lightbox");
  if (lightbox.classList.contains("active")) {
    lightbox.classList.remove("active");
    return;
  }
  if (document.getElementById("detail-view").classList.contains("active")) {
    hideDetailPage();
  }
});

// ---------- Countdown timer (kosmetik) ----------
let totalSeconds = 49 * 3600 + 51 * 60;
setInterval(() => {
  totalSeconds = Math.max(0, totalSeconds - 1);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  document.getElementById("t-h").textContent = String(h).padStart(2, "0");
  document.getElementById("t-m").textContent = String(m).padStart(2, "0");
  document.getElementById("t-s").textContent = String(s).padStart(2, "0");
}, 1000);
