document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        easing: "ease-in-out",
    });

    // 🔹 Observer untuk animasi elemen muncul (kelas .academy-card)
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    document
        .querySelectorAll(".academy-card")
        .forEach((card) => observer.observe(card));

    // 🔹 Data skill berdasarkan kategori
    const skillsData = {
        programming: [
            {
                name: "Python",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                desc: "Bahasa pemrograman utama untuk automasi, data, dan backend.",
            },
            {
                name: "HTML & CSS",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                desc: "Dasar pembuatan struktur dan tampilan web yang modern.",
            },
            {
                name: "JavaScript",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                desc: "Digunakan untuk membuat interaktivitas dan logika pada halaman web.",
            },
        ],
        networking: [
            {
                name: "MikroTik",
                img: "img/winbox.png",
                desc: "Konfigurasi jaringan LAN/WAN, firewall, dan bandwidth management.",
            },
        ],
        linux: [
            {
                name: "Debian",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg",
                desc: "Sistem operasi utama untuk server dan implementasi jaringan.",
            },
            {
                name: "Shell Scripting",
                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
                desc: "Otomatisasi tugas sistem dan server menggunakan script bash.",
            },
        ],
    };

    // 🔹 Elemen utama
    const content = document.getElementById("skill-content");
    const buttons = document.querySelectorAll(".category-btn");

    // 🔹 Fungsi untuk merender skill sesuai kategori
    function renderSkills(category) {
        content.innerHTML = skillsData[category]
            .map(
                (skill) => `
            <div class="bg-[#0e1628]/70 border border-cyan-500/30 rounded-2xl p-6 
                        hover:border-cyan-400/70 hover:scale-105 transition-all 
                        backdrop-blur-md shadow-lg shadow-cyan-500/10">
                <img src="${skill.img}" alt="${skill.name}" 
                    class="w-20 h-20 mx-auto mb-4 animate-float">
                <h3 class="text-cyan-300 text-xl font-semibold mb-2">
                    ${skill.name}
                </h3>
                <p class="text-gray-400 text-sm">${skill.desc}</p>
            </div>
        `
            )
            .join("");
    }

    // 🔹 Event listener untuk tombol kategori
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            buttons.forEach((b) =>
                b.classList.remove("active", "bg-cyan-500/60")
            );
            btn.classList.add("active", "bg-cyan-500/60");
            renderSkills(btn.dataset.category);
        });
    });

    // 🔹 Animasi melayang untuk ikon
    const style = document.createElement("style");
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
        }
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);

    // 🔹 Default tampil kategori "programming"
    renderSkills("programming");

    // 🔹 Fungsi scroll ke section tertentu
    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Expose fungsi jika mau dipanggil dari tombol di HTML
    window.scrollToSection = scrollToSection;
});