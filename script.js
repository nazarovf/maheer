/**
 * ===================================
 * Elemen & Cache
 * ===================================
 * Mengambil semua elemen DOM yang dibutuhkan dan menyimpannya dalam konstanta.
 * Ini mencegah pencarian elemen berulang kali.
 */
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const astroRocket = document.getElementById("astro-rocket");
const rocketWrapper = document.querySelector(".rocket-wrapper");
const grid = document.getElementById("grid");

// Input dan elemen untuk Kelipatan Bilangan
const k1Input = document.getElementById("k1");
const k2Input = document.getElementById("k2");
const k3Input = document.getElementById("k3");
const tandaiBtn = document.getElementById("tandai");
const resetBtn = document.getElementById("reset");
const hasil1 = document.getElementById("hasil1");
const hasil2 = document.getElementById("hasil2");
const hasil3 = document.getElementById("hasil3");
const same12 = document.getElementById("same12");
const same13 = document.getElementById("same13");
const same23 = document.getElementById("same23");
const same123 = document.getElementById("same123");
const lblH1 = document.getElementById("lblH1");
const lblH2 = document.getElementById("lblH2");
const lblH3 = document.getElementById("lblH3");
const lbl12 = document.getElementById("lbl12");
const lbl13 = document.getElementById("lbl13");
const lbl23 = document.getElementById("lbl23");
const lbl123 = document.getElementById("lbl123");

// Input dan elemen untuk Faktor Bilangan
const angkaInput = document.getElementById("angka");
const faktorForm = document.getElementById("faktor-form");
const hasilFaktorSection = document.getElementById("hasil-faktor-section");
const hasilFaktorDiv = document.getElementById("hasil-faktor");
const resetFaktorBtn = document.getElementById("reset-faktor");

// Input dan elemen untuk Pecahan
const formMultiply = document.getElementById('formMultiply');
const fractionMultiplyInput = document.getElementById('fractionMultiply');
const multiplyResult = document.getElementById('multiplyResult');
const multiplyCharts = document.getElementById('multiplyCharts');
const resetMultiplyBtn = document.getElementById('resetMultiply');

const formDivide = document.getElementById('formDivide');
const fractionDivideInput = document.getElementById('fractionDivide');
const divideResult = document.getElementById('divideResult');
const divideChart = document.getElementById('divideChart');
const resetDivideBtn = document.getElementById('resetDivide');


/**
 * ===================================
 * Fungsi-fungsi Helper
 * ===================================
 */

/**
 * Mengisi grid dengan angka 1 sampai 100.
 */
function initGrid() {
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = i;
        grid.appendChild(cell);
    }
}

/**
 * Menggambar diagram lingkaran untuk visualisasi pecahan.
 * @param {HTMLCanvasElement} canvas - Elemen kanvas tempat menggambar.
 * @param {number} numerator - Pembilang.
 * @param {number} denominator - Penyebut.
 */
function drawPizza(canvas, numerator, denominator) {
    const ctx = canvas.getContext('2d');
    const size = Math.min(canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const radius = size / 2 - 10;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    let startAngle = -Math.PI / 2; // Mulai dari atas

    for (let i = 0; i < denominator; i++) {
        const angle = (2 * Math.PI) / denominator;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, startAngle + angle);
        ctx.closePath();
        ctx.fillStyle = i < numerator ? '#FFA500' : '#ddd';
        ctx.fill();
        ctx.stroke();
        startAngle += angle;
    }
}

/**
 * Menghitung Faktor Persekutuan Terbesar (GCD) menggunakan algoritma Euclidean.
 * @param {number} a - Angka pertama.
 * @param {number} b - Angka kedua.
 * @returns {number} - GCD dari a dan b.
 */
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

/**
 * ===================================
 * Logika Kelipatan Bilangan
 * ===================================
 */

/**
 * Menandai sel grid yang merupakan kelipatan dari bilangan yang dimasukkan.
 */
function markMultiples() {
    const k1 = parseInt(k1Input.value);
    const k2 = parseInt(k2Input.value);
    const k3 = parseInt(k3Input.value);

    resetGridStyles();

    const sets = [new Set(), new Set(), new Set()];

    // Memproses kelipatan untuk k1
    if (k1 && k1 > 0) {
        for (let i = k1; i <= 100; i += k1) sets[0].add(i);
        updateResult(k1, sets[0], hasil1, lblH1);
    } else {
        updateResult(null, new Set(), hasil1, lblH1);
    }

    // Memproses kelipatan untuk k2
    if (k2 && k2 > 0) {
        for (let i = k2; i <= 100; i += k2) sets[1].add(i);
        updateResult(k2, sets[1], hasil2, lblH2);
    } else {
        updateResult(null, new Set(), hasil2, lblH2);
    }

    // Memproses kelipatan untuk k3
    if (k3 && k3 > 0) {
        for (let i = k3; i <= 100; i += k3) sets[2].add(i);
        updateResult(k3, sets[2], hasil3, lblH3);
    } else {
        updateResult(null, new Set(), hasil3, lblH3);
    }

    // Memberi warna pada sel-sel di grid
    document.querySelectorAll(".cell").forEach((c) => {
        const val = parseInt(c.textContent);
        const matches = [sets[0].has(val), sets[1].has(val), sets[2].has(val)];
        const count = matches.filter(Boolean).length;

        if (count === 1) {
            if (matches[0]) c.style.background = "rgba(255, 99, 132, 0.7)";
            else if (matches[1]) c.style.background = "rgba(54, 162, 235, 0.7)";
            else if (matches[2]) c.style.background = "rgba(75, 192, 192, 0.7)";
        } else if (count > 1) {
            c.style.background = "gold";
        }
    });

    // Menghitung dan menampilkan kelipatan persekutuan
    const inter12 = [...sets[0]].filter((x) => sets[1].has(x));
    const inter13 = [...sets[0]].filter((x) => sets[2].has(x));
    const inter23 = [...sets[1]].filter((x) => sets[2].has(x));
    const inter123 = inter12.filter((x) => sets[2].has(x));

    updateCommonMultiples([k1, k2], inter12, same12, lbl12);
    updateCommonMultiples([k1, k3], inter13, same13, lbl13);
    updateCommonMultiples([k2, k3], inter23, same23, lbl23);
    updateCommonMultiples([k1, k2, k3], inter123, same123, lbl123);
}

/**
 * Mereset semua input dan tampilan kelipatan.
 */
function reset() {
    // Mengosongkan input
    k1Input.value = "";
    k2Input.value = "";
    k3Input.value = "";

    // Mereset tampilan
    resetGridStyles();
    hasil1.textContent = hasil2.textContent = hasil3.textContent = "-";
    same12.textContent = "-";
    same13.textContent = "-";
    same23.textContent = "-";
    same123.textContent = "-";
    lblH1.textContent = "Hasil Kelipatan - :";
    lblH2.textContent = "Hasil Kelipatan - :";
    lblH3.textContent = "Hasil Kelipatan - :";
    lbl12.textContent = "Kelipatan - & - :";
    lbl13.textContent = "Kelipatan - & - :";
    lbl23.textContent = "Kelipatan - & - :";
    lbl123.textContent = "Kelipatan - , - & - :";
}

/**
 * Memperbarui teks hasil kelipatan.
 * @param {number} k - Bilangan kelipatan.
 * @param {Set<number>} set - Set kelipatan.
 * @param {HTMLElement} spanEl - Elemen span hasil.
 * @param {HTMLElement} labelEl - Elemen label.
 */
function updateResult(k, set, spanEl, labelEl) {
    spanEl.textContent = [...set].join(", ") || "-";
    labelEl.textContent = `Hasil Kelipatan ${k || "-"} :`;
}

/**
 * Memperbarui teks kelipatan persekutuan.
 * @param {Array<number>} k_values - Array bilangan kelipatan.
 * @param {Array<number>} inter - Array kelipatan persekutuan.
 * @param {HTMLElement} spanEl - Elemen span hasil.
 * @param {HTMLElement} labelEl - Elemen label.
 */
function updateCommonMultiples(k_values, inter, spanEl, labelEl) {
    spanEl.textContent = inter.length ? inter.join(", ") : "-";
    if (k_values.length === 3) {
        labelEl.textContent = `Kelipatan ${k_values[0] || "-"}, ${k_values[1] || "-"} & ${k_values[2] || "-"} :`;
    } else {
        labelEl.textContent = `Kelipatan ${k_values[0] || "-"} & ${k_values[1] || "-"} :`;
    }
}

/**
 * Mereset gaya warna pada semua sel grid.
 */
function resetGridStyles() {
    document.querySelectorAll(".cell").forEach((c) => (c.style.background = "#fff"));
}


/**
 * ===================================
 * Logika Faktor Bilangan
 * ===================================
 */

/**
 * Mencari dan menampilkan faktor-faktor dari sebuah angka.
 * @param {Event} e - Event dari form submit.
 */
function cariFaktor(e) {
    e.preventDefault();

    const angka = parseInt(angkaInput.value);

    if (isNaN(angka) || angka <= 0) {
        hasilFaktorDiv.innerHTML = `<p style="color: red;">⚠️ Masukkan angka positif!</p>`;
        hasilFaktorSection.style.display = "block";
        return;
    }

    const faktor = [];
    const langkah = [];
    const pasangan = [];

    for (let i = 1; i <= Math.sqrt(angka); i++) {
        if (angka % i === 0) {
            const pasanganFaktor = angka / i;
            faktor.push(i);
            langkah.push(`<b>${angka} ÷ ${i} = ${pasanganFaktor}</b>`);
            pasangan.push(`<b>${i} × ${pasanganFaktor}</b> = ${angka}`);

            if (i !== pasanganFaktor) {
                faktor.push(pasanganFaktor);
            }
        }
    }

    faktor.sort((a, b) => a - b);

    const htmlLangkah = langkah.map(l => `<p>${l}</p>`).join("");
    const htmlPasangan = pasangan.join("<br>");

    hasilFaktorDiv.innerHTML = `
        <h3>Langkah Mencari Faktor ${angka} :</h3>
        ${htmlLangkah}
        <h3>Faktor Lengkap ${angka} :</h3>
        <p>${faktor.join(", ")}</p>
        <h3>Pasangan Faktor ${angka} :</h3>
        <p>${htmlPasangan}</p>
    `;

    hasilFaktorSection.style.display = "block";
}

/**
 * Mereset input dan tampilan faktor bilangan.
 */
function resetFaktor() {
    hasilFaktorSection.style.display = "none";
    hasilFaktorDiv.innerHTML = "";
    angkaInput.value = "";
}


/**
 * ===================================
 * Logika Pecahan
 * ===================================
 */

// Pecahan Senilai
formMultiply.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = fractionMultiplyInput.value.trim();
    const parts = input.split('/');
    if (parts.length !== 2) {
        alert('Format pecahan salah! Gunakan a/b');
        return;
    }
    const a = parseInt(parts[0]);
    const b = parseInt(parts[1]);
    if (isNaN(a) || isNaN(b) || b === 0) {
        alert('Masukkan angka valid, penyebut tidak boleh 0');
        return;
    }

    multiplyCharts.innerHTML = '';
    let results = [];
    for (let i = 1; i <= 4; i++) {
        const num = a * i;
        const den = b * i;
        results.push(`${num}/${den}`);

        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        multiplyCharts.appendChild(canvas);
        drawPizza(canvas, num, den);
    }

    multiplyResult.innerHTML = results.join(', &nbsp; ');
});

resetMultiplyBtn.addEventListener('click', function() {
    fractionMultiplyInput.value = '';
    multiplyResult.innerHTML = '';
    multiplyCharts.innerHTML = '';
});

// Pecahan Disederhanakan
formDivide.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = fractionDivideInput.value.trim();
    const parts = input.split('/');
    if (parts.length !== 2) {
        alert('Format pecahan salah! Gunakan a/b');
        return;
    }
    const a = parseInt(parts[0]);
    const b = parseInt(parts[1]);
    if (isNaN(a) || isNaN(b) || b === 0) {
        alert('Masukkan angka valid, penyebut tidak boleh 0');
        return;
    }

    const g = gcd(a, b);
    const simpleNum = a / g;
    const simpleDen = b / g;
    const explanation = `${a} ÷ ${g} / ${b} ÷ ${g} = ${simpleNum}/${simpleDen}`;
    divideResult.innerHTML = `Hasil: ${simpleNum}/${simpleDen} <br>Penjelasan: ${explanation}`;

    const canvas = divideChart;
    drawPizza(canvas, simpleNum, simpleDen);
});

resetDivideBtn.addEventListener('click', function() {
    fractionDivideInput.value = '';
    divideResult.innerHTML = '';
    const ctx = divideChart.getContext('2d');
    ctx.clearRect(0, 0, divideChart.width, divideChart.height);
});


/**
 * ===================================
 * Event Listeners
 * ===================================
 */

// Navbar
hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
});

document.querySelectorAll("#menu a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});

// Rocket Animation
let isFlying = false;
astroRocket.addEventListener("click", () => {
    if (isFlying) return;
    isFlying = true;

    astroRocket.src = "rocket.png";
    astroRocket.classList.add("blast");

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const smoke = document.createElement("div");
            smoke.className = "smoke";
            rocketWrapper.appendChild(smoke);
            setTimeout(() => smoke.remove(), 1500);
        }, i * 150);
    }

    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 800);

    setTimeout(() => {
        astroRocket.classList.remove("blast");
        astroRocket.style.transform = "translateY(0)";
        astroRocket.style.opacity = "1";
        astroRocket.src = "astronot.png";
        isFlying = false;
    }, 2500);
});

// Logika untuk menyembunyikan/menampilkan navbar saat scroll
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.classList.add('hidden');
        menu.classList.remove('active');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

// Kelipatan functionality
tandaiBtn.addEventListener("click", markMultiples);
resetBtn.addEventListener("click", reset);

// Faktor functionality
faktorForm.addEventListener("submit", cariFaktor);
resetFaktorBtn.addEventListener("click", resetFaktor);

// Inisialisasi grid saat halaman dimuat
document.addEventListener("DOMContentLoaded", initGrid);
