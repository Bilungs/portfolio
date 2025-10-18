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

const projects = [
        {
            id: 1,
            title: "Bandwidth Calculator",
            img: "img/apk.jpg",
            desc: "Aplikasi berbasis web yang membantu Network Engineer menghitung dan membagi bandwidth dengan cepat dan efisien. Dibangun menggunakan Django, RouterOS API, dan Bootstrap CSS.",
            stakeholders: [
                { name: "Juliandi Pratama", role: "Project Manager" },
                { name: "Muhammad Farhan Dzulfikar", role: "Developer Frontend & Network Engineer" },
                { name: "Muhammad Rasyid Ruhiyat", role: "Developer Backend & Network Engineer" },
                { name: "Tim Network Engineer", role: "Tester dan Validator Bandwidth" }
            ],
            links: [
                { text: "🔗 GitHub", url: "https://github.com/Bilungs/Kalkulator_Bandwidth" },
                { text: "🌐 Live Demo", url: "#" }
            ]
        },
    ];

    // Elemen modal
    const modal = document.getElementById("project-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalStakeholders = document.querySelector("#modal-stakeholders ul");
    const modalLinks = document.getElementById("modal-links");
    const closeBtn = document.getElementById("close-modal");

    // Tombol detail
    document.querySelectorAll(".project-detail-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const project = projects[index];
            modalImg.src = project.img;
            modalTitle.textContent = project.title;
            modalDesc.textContent = project.desc;

            // Stakeholders list
            modalStakeholders.innerHTML = project.stakeholders.map(
                person => `
                <li class="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg hover:bg-slate-600/50 transition">
                    <span class="text-cyan-400">👤</span>
                    <span class="font-medium">${person.name}</span>
                    <span class="text-gray-400 text-xs">(${person.role})</span>
                </li>`
            ).join("");

            // Links
            modalLinks.innerHTML = project.links.map(
                link => `<a href="${link.url}" target="_blank" class="text-cyan-400 hover:underline">${link.text}</a>`
            ).join(" ");

            modal.classList.remove("hidden");
            modal.classList.add("flex");
        });
    });

    // Tutup modal
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
    });