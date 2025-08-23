// ===================================
// Element Selectors and Caching
// ===================================
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const astroRocket = document.getElementById("astro-rocket");
const rocketWrapper = document.querySelector(".rocket-wrapper");
const grid = document.getElementById("grid");

// Kelipatan Bilangan
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

// Faktor Bilangan
const angkaInput = document.getElementById("angka");
const faktorForm = document.getElementById("faktor-form");
const hasilFaktorSection = document.getElementById("hasil-faktor-section");
const hasilFaktorDiv = document.getElementById("hasil-faktor");
const resetFaktorBtn = document.getElementById("reset-faktor");


// ===================================
// Helper Functions
// ===================================

/**
 * Generates the number grid from 1 to 100.
 */
function initGrid() {
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = i;
        grid.appendChild(cell);
    }
}

// ===================================
// Logika Kelipatan Bilangan
// ===================================
function markMultiples() {
    const k1 = parseInt(k1Input.value);
    const k2 = parseInt(k2Input.value);
    const k3 = parseInt(k3Input.value);

    resetGridStyles();

    const sets = [new Set(), new Set(), new Set()];

    if (k1 && k1 > 0) {
        for (let i = k1; i <= 100; i += k1) sets[0].add(i);
        updateResult(k1, sets[0], hasil1, lblH1);
    } else {
        updateResult(null, new Set(), hasil1, lblH1);
    }

    if (k2 && k2 > 0) {
        for (let i = k2; i <= 100; i += k2) sets[1].add(i);
        updateResult(k2, sets[1], hasil2, lblH2);
    } else {
        updateResult(null, new Set(), hasil2, lblH2);
    }

    if (k3 && k3 > 0) {
        for (let i = k3; i <= 100; i += k3) sets[2].add(i);
        updateResult(k3, sets[2], hasil3, lblH3);
    } else {
        updateResult(null, new Set(), hasil3, lblH3);
    }

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

    const inter12 = [...sets[0]].filter((x) => sets[1].has(x));
    const inter13 = [...sets[0]].filter((x) => sets[2].has(x));
    const inter23 = [...sets[1]].filter((x) => sets[2].has(x));
    const inter123 = inter12.filter((x) => sets[2].has(x));

    updateCommonMultiples([k1, k2], inter12, same12, lbl12);
    updateCommonMultiples([k1, k3], inter13, same13, lbl13);
    updateCommonMultiples([k2, k3], inter23, same23, lbl23);
    updateCommonMultiples([k1, k2, k3], inter123, same123, lbl123);
}

function reset() {
    document
        .querySelectorAll(".cell")
        .forEach((c) => (c.style.background = "#fff"));
    hasil1.textContent = hasil2.textContent = hasil3.textContent = "-";
    same12.textContent =
        same13.textContent =
        same23.textContent =
        same123.textContent =
        "-";
    lblH1.textContent = "Hasil Kelipatan - :";
    lblH2.textContent = "Hasil Kelipatan - :";
    lblH3.textContent = "Hasil Kelipatan - :";
    lbl12.textContent = "Kelipatan - & - :";
    lbl13.textContent = "Kelipatan - & - :";
    lbl23.textContent = "Kelipatan - & - :";
    lbl123.textContent = "Kelipatan - , - & - :";
}

function updateResult(k, set, spanEl, labelEl) {
    spanEl.textContent = [...set].join(", ") || "-";
    labelEl.textContent = `Hasil Kelipatan ${k || "-"} :`;
}

function updateCommonMultiples(k_values, inter, spanEl, labelEl) {
    spanEl.textContent = inter.length ? inter.join(", ") : "-";

    if (k_values.length === 3) {
        labelEl.textContent = `Kelipatan ${k_values[0] || "-"}, ${k_values[1] || "-"} & ${k_values[2] || "-"} :`;
    } else {
        labelEl.textContent = `Kelipatan ${k_values[0] || "-"} & ${k_values[1] || "-"} :`;
    }
}

function resetGridStyles() {
    document
        .querySelectorAll(".cell")
        .forEach((c) => (c.style.background = "#fff"));
}


// ===================================
// Logika Faktor Bilangan
// ===================================
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
        <h3>Langkah Mencari Faktor ${angka}</h3>
        ${htmlLangkah}
        <h3>Faktor Lengkap ${angka}</h3>
        <p>${faktor.join(", ")}</p>
        <h3>Pasangan Faktor ${angka}</h3>
        <p>${htmlPasangan}</p>
    `;

    hasilFaktorSection.style.display = "block";
}

function resetFaktor() {
    hasilFaktorSection.style.display = "none";
    hasilFaktorDiv.innerHTML = "";
    angkaInput.value = "";
}


// ===================================
// Event Listeners
// ===================================

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

// Logic untuk menyembunyikan/menampilkan navbar
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

// Initialize the grid on page load
document.addEventListener("DOMContentLoaded", initGrid);