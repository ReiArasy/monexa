/* ==========================================
   MONEXA LANDING PAGE - INTEGRATED SCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Global Page Entrance Fade Transition
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s ease-in-out";
    requestAnimationFrame(() => {
        document.body.style.opacity = "1";
    });

    /* --- 1. NAVBAR SCROLL EFFECT --- */
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 60) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    /* --- 2. INTERSECTION OBSERVER (FADE UP ANIMATION) --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll("section, .feature-card, .dashboard-card, .quiz-card, .level-card")
        .forEach(el => {
            el.classList.add("fade-up");
            observer.observe(el);
        });

    /* --- 3. QUIZ OPTION SELECTOR --- */
    const options = document.querySelectorAll(".option");
    options.forEach(button => {
        button.addEventListener("click", () => {
            options.forEach(b => {
                b.style.background = "#071c29";
                b.style.borderColor = "rgba(255,255,255,.05)";
            });
            button.style.background = "#0f394d";
            button.style.borderColor = "#00d9ff";
        });
    });

    /* --- 4. RIPPLE BUTTON EFFECT --- */
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const circle = document.createElement("span");
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
            circle.classList.add("ripple");

            const oldRipple = this.querySelector(".ripple");
            if (oldRipple) oldRipple.remove();

            this.appendChild(circle);
        });
    });

    /* --- 5. PARALLAX HERO BACKGROUND --- */
    const hero = document.getElementById("hero");
    if (hero) {
        document.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
        });
    }

    /* --- 6. HUD DASHBOARD COUNTER ANIMATION --- */
    document.querySelectorAll(".hud h4").forEach(counter => {
        const targetText = counter.innerText;
        let suffix = "";
        let value = parseFloat(targetText);

        if (targetText.includes("%")) suffix = "%";
        if (targetText.includes("K")) suffix = "K";

        animateCounter(counter, 0, value, suffix);
    });

    function animateCounter(element, start, end, suffix) {
        let current = start;
        const step = end / 80;
        const timer = setInterval(() => {
            current += step;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }

            if (suffix === "K") {
                element.innerText = current.toFixed(1) + "K";
            } else if (suffix === "%") {
                element.innerText = Math.floor(current) + "%";
            } else {
                element.innerText = Math.floor(current);
            }
        }, 18);
    }

    /* --- 7. BACKGROUND PARTICLES GENERATOR --- */
    createParticles();

    /* --- 8. SMOOTH SCROLL FOR ANCHORS --- */
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href"))?.scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    /* --- 9. SONAR RADAR BEAT ANIMATION --- */
    const sonar = document.querySelector(".sonar-circle");
    if (sonar) {
        setInterval(() => {
            sonar.animate([
                { transform: "scale(1)", opacity: 1 },
                { transform: "scale(1.06)", opacity: 0.8 },
                { transform: "scale(1)", opacity: 1 }
            ], { duration: 1800 });
        }, 2000);
    }

    /* --- 10. SCREEN INITIAL FADE IN --- */
    const centerContent = document.querySelector('.my-auto');
    if (centerContent) {
        centerContent.style.opacity = '0';
        centerContent.style.transition = 'opacity 1.2s ease-in-out';
        setTimeout(() => { centerContent.style.opacity = '1'; }, 200);
    }

    /* --- 11. LUMO AI SPEECH TYPING EFFECT & MULTI-DIALOGUE --- */
    const cadetName = localStorage.getItem("cadetName") || "Cadet";
    const dialogues = [
        {
            title: `Selamat datang, Cadet ${cadetName}!`,
            desc: "Aku Lumo, AI Mentor pendamping kapal selammu. Kita sedang berada di kedalaman 0-200M, zona The Shallow."
        },
        {
            title: "Mengenal Obligasi (Surat Utang Negara)",
            desc: "Obligasi adalah instrumen keuangan di mana kamu meminjamkan dana kepada negara, dan negara berjanji mengembalikannya dengan kupon bunga tetap secara berkala. Ini sangat aman dan stabil untuk melindungi integritas lambung kapalmu!"
        },
        {
            title: "Bersiap untuk Tactical Deflection Quiz",
            desc: "Gerbang The Shallows sudah dekat. Klik CONTINUE sekali lagi untuk memulai quiz pertamamu dan membuktikan pemahamanmu!"
        }
    ];

    const titleContainer = document.getElementById('typingTitle');
    const descContainer = document.getElementById('typingDesc');
    let dialogueIndex = 0;
    let isTyping = false;
    let titleTimer = null;
    let descTimer = null;

    function typeDialogue(index) {
        if (!titleContainer || !descContainer) return;
        
        isTyping = true;
        titleContainer.innerHTML = "";
        descContainer.innerHTML = "";
        
        const titleText = dialogues[index].title;
        const descText = dialogues[index].desc;
        let titleIdx = 0;
        let descIdx = 0;
        const speed = 25;

        function runTitle() {
            if (titleIdx < titleText.length) {
                titleContainer.classList.add('typing-cursor');
                titleContainer.innerHTML += titleText.charAt(titleIdx);
                titleIdx++;
                titleTimer = setTimeout(runTitle, speed);
            } else {
                titleContainer.classList.remove('typing-cursor');
                runDescription();
            }
        }

        function runDescription() {
            if (descIdx < descText.length) {
                descContainer.classList.add('typing-cursor');
                descContainer.innerHTML += descText.charAt(descIdx);
                descIdx++;
                descTimer = setTimeout(runDescription, speed - 10);
            } else {
                descContainer.classList.remove('typing-cursor');
                isTyping = false;
            }
        }

        runTitle();
    }

    if (titleContainer && descContainer) {
        typeDialogue(0);
    }

    /* --- 12. ACTION CONTINUE BUTTON --- */
    const btnContinue = document.getElementById('btnContinue');
    if (btnContinue) {
        btnContinue.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            if (isTyping) {
                clearTimeout(titleTimer);
                clearTimeout(descTimer);
                titleContainer.innerHTML = dialogues[dialogueIndex].title;
                descContainer.innerHTML = dialogues[dialogueIndex].desc;
                titleContainer.classList.remove('typing-cursor');
                descContainer.classList.remove('typing-cursor');
                isTyping = false;
                return;
            }

            if (dialogueIndex < dialogues.length - 1) {
                dialogueIndex++;
                typeDialogue(dialogueIndex);
            } else {
                window.location.href = "quiz.html";
            }
        });
    }

    /* --- 12-B. LUMO AI SIDEBAR CHATBOT LOGIC --- */
    const chatTrigger = document.getElementById("lumoChatTrigger");
    const chatWidget = document.getElementById("lumoFloatingChat");
    const closeChatBtn = document.getElementById("closeLumoChat");
    const chatBadge = document.getElementById("chatBadge");
    const chatMessages = document.getElementById("chatMessages");

    if (chatTrigger && chatWidget) {
        chatTrigger.addEventListener("click", () => {
            chatWidget.classList.toggle("open");
            if (chatBadge) chatBadge.classList.add("d-none"); // Hide notification badge
        });
    }

    if (closeChatBtn && chatWidget) {
        closeChatBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            chatWidget.classList.remove("open");
        });
    }

    // Question button click handlers
    document.querySelectorAll(".q-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            const questionType = this.getAttribute("data-q");
            const questionText = this.innerText;

            // Render cadet message
            const userMsgDiv = document.createElement("div");
            userMsgDiv.className = "chat-bubble user-bubble mb-3 p-2 rounded text-end";
            userMsgDiv.style.background = "rgba(255, 255, 255, 0.03)";
            userMsgDiv.style.border = "1px solid rgba(255, 255, 255, 0.08)";
            userMsgDiv.innerHTML = `<span class="small text-secondary font-orbitron d-block mb-1">CADET ${cadetName.toUpperCase()}:</span>${questionText}`;
            chatMessages.appendChild(userMsgDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Generate reply after brief timeout
            setTimeout(() => {
                let responseText = "";
                if (questionType === "area1") {
                    responseText = "<strong>IOSCO Content Area 1 (Basic investing principles)</strong> membahas fondasi dasar keuangan pribadi, hubungan timbal balik risiko vs pengembalian (risk-return trade-off), dan nilai waktu dari uang (time value of money).";
                } else if (questionType === "area5") {
                    responseText = "<strong>IOSCO Content Area 5 (Investor rights and responsibilities)</strong> mengajarkan hak perlindungan investor dari manipulasi pasar, hak mendapatkan transparansi biaya/kontrak emiten, serta tata cara aduan resmi.";
                } else if (questionType === "area7") {
                    responseText = "<strong>IOSCO Content Area 7 (Investment scams and frauds)</strong> fokus pada deteksi awal modus skema ponzi, investasi ilegal, dan jaminan untung instan tanpa risiko. Laporkan penipuan ke otoritas resmi (OJK).";
                }

                const lumoMsgDiv = document.createElement("div");
                lumoMsgDiv.className = "chat-bubble mb-3 p-2 rounded";
                lumoMsgDiv.style.background = "rgba(0, 240, 255, 0.05)";
                lumoMsgDiv.style.border = "1px solid rgba(0, 240, 255, 0.15)";
                lumoMsgDiv.innerHTML = `<span class="small text-cyan font-orbitron d-block mb-1">LUMO AI:</span>${responseText}`;
                chatMessages.appendChild(lumoMsgDiv);
                
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
        });
    });

    // Custom Lumo AI text message input
    const lumoInput = document.getElementById("lumoCustomInput");
    const sendLumoBtn = document.getElementById("btnSendLumoMessage");

    function sendLumoMessage() {
        if (!lumoInput || !chatMessages) return;
        const text = lumoInput.value.trim();
        if (!text) return;

        // Render cadet message
        const userMsgDiv = document.createElement("div");
        userMsgDiv.className = "chat-bubble user-bubble mb-3 p-2 rounded text-end";
        userMsgDiv.style.background = "rgba(255, 255, 255, 0.03)";
        userMsgDiv.style.border = "1px solid rgba(255, 255, 255, 0.08)";
        userMsgDiv.innerHTML = `<span class="small text-secondary font-orbitron d-block mb-1">CADET ${cadetName.toUpperCase()}:</span>${text}`;
        chatMessages.appendChild(userMsgDiv);

        lumoInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Generate response
        setTimeout(() => {
            let responseText = "Pertanyaan menarik, Cadet! Sensor saya menganalisis bahwa materi ini membahas pentingnya perlindungan modal dan regulasi OJK.";
            const lowerText = text.toLowerCase();
            if (lowerText.includes("scam") || lowerText.includes("ponzi") || lowerText.includes("tipu")) {
                responseText = "Untuk menghindari scam, selalu verifikasi izin legalitas entitas (legal & logis) ke OJK. Skema ponzi biasanya menjanjikan keuntungan tetap tinggi tanpa risiko.";
            } else if (lowerText.includes("area 1") || lowerText.includes("dasar")) {
                responseText = "Prinsip dasar investasi (IOSCO Area 1) menekankan pemahaman time value of money dan hubungan positif antara risk & return.";
            } else if (lowerText.includes("hak") || lowerText.includes("area 5")) {
                responseText = "Sebagai investor (Area 5), Anda berhak mendapatkan informasi produk investasi yang akurat dan transparan serta perlindungan hukum OJK.";
            }

            const lumoMsgDiv = document.createElement("div");
            lumoMsgDiv.className = "chat-bubble mb-3 p-2 rounded";
            lumoMsgDiv.style.background = "rgba(0, 240, 255, 0.05)";
            lumoMsgDiv.style.border = "1px solid rgba(0, 240, 255, 0.15)";
            lumoMsgDiv.innerHTML = `<span class="small text-cyan font-orbitron d-block mb-1">LUMO AI:</span>${responseText}`;
            chatMessages.appendChild(lumoMsgDiv);

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
    }

    if (sendLumoBtn) {
        sendLumoBtn.addEventListener("click", sendLumoMessage);
    }
    if (lumoInput) {
        lumoInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                sendLumoMessage();
            }
        });
    }

    /* --- 13. ONBOARDING & MAP DESC NAVIGATION FLOW --- */
    const startDiveBtn = document.getElementById("btnStartDive");
    const startDescentBtn = document.getElementById("btnStartDescent");
    const nodeTheShallows = document.getElementById("nodeTheShallows");
    const nodeCoralDepths = document.getElementById("nodeCoralDepths");

    function handleStartNavigation(e) {
        if (e) e.preventDefault();
        const cadetNameVal = localStorage.getItem("cadetName");
        const riskProfileVal = localStorage.getItem("risk_profile");
        if (cadetNameVal) {
            if (riskProfileVal) {
                window.location.href = "map.html";
            } else {
                window.location.href = "initial-assessment.html";
            }
        } else {
            window.location.href = "onboarding.html";
        }
    }

    if (startDiveBtn) startDiveBtn.addEventListener("click", handleStartNavigation);
    if (startDescentBtn) startDescentBtn.addEventListener("click", handleStartNavigation);
    if (nodeTheShallows) nodeTheShallows.addEventListener("click", handleStartNavigation);
    if (nodeCoralDepths) nodeCoralDepths.addEventListener("click", handleStartNavigation);

    /* --- 14. IN-PAGE TEASER QUIZ INTERACTIVITY --- */
    const teaserOptions = document.querySelectorAll(".quiz-card .option");
    const btnTeaserSubmit = document.getElementById("btnTeaserSubmit");
    const teaserFeedback = document.getElementById("teaserFeedback");
    let selectedTeaserOption = null;

    teaserOptions.forEach(opt => {
        opt.addEventListener("click", function() {
            teaserOptions.forEach(b => {
                b.style.background = "#071c29";
                b.style.borderColor = "rgba(255,255,255,.05)";
                b.classList.remove("active-selected");
            });
            this.style.background = "#0f394d";
            this.style.borderColor = "#00d9ff";
            this.classList.add("active-selected");
            selectedTeaserOption = this;

            if (btnTeaserSubmit) {
                btnTeaserSubmit.disabled = false;
                btnTeaserSubmit.innerHTML = "VERIFIKASI JAWABAN";
            }
        });
    });

    if (btnTeaserSubmit) {
        btnTeaserSubmit.addEventListener("click", () => {
            if (!selectedTeaserOption || !teaserFeedback) return;

            const isCorrect = selectedTeaserOption.getAttribute("data-correct") === "true";
            teaserFeedback.classList.remove("d-none");

            if (isCorrect) {
                teaserFeedback.innerHTML = "<i class='bi bi-patch-check-fill me-1'></i> DEKONTAMINASI BERHASIL! +10 XP.<br>Banda Naira memonopoli perdagangan rempah dunia, sumber keuntungan utama VOC.";
                teaserFeedback.className = "mt-3 text-center small font-orbitron fw-bold text-success";
                teaserFeedback.style.color = "#00e676";
                selectedTeaserOption.style.borderColor = "#00e676";
                selectedTeaserOption.style.background = "rgba(0, 230, 118, 0.1)";
            } else {
                teaserFeedback.innerHTML = "<i class='bi bi-shield-slash-fill me-1'></i> COGNITIVE ERROR: PILIHAN TIDAK LOGIS.<br>VOC memprioritaskan monopoli rempah, bukan faktor ini. Analisis kembali!";
                teaserFeedback.className = "mt-3 text-center small font-orbitron fw-bold text-danger";
                teaserFeedback.style.color = "#ff3d71";
                selectedTeaserOption.style.borderColor = "#ff3d71";
                selectedTeaserOption.style.background = "rgba(255, 61, 113, 0.1)";
            }
        });
    }
});

/* ==========================================
   GLOBAL MOUSE & PARTICLE GENERATORS
========================================== */

// Generator Partikel Laut
function createParticles() {
    for (let i = 0; i < 25; i++) {
        const dot = document.createElement("div");
        dot.className = "particle";
        dot.style.left = Math.random() * 100 + "vw";
        dot.style.top = Math.random() * 100 + "vh";
        dot.style.animationDuration = (5 + Math.random() * 8) + "s";
        dot.style.animationDelay = (Math.random() * 5) + "s";
        document.body.appendChild(dot);
    }
}

// Mouse Glowing Aura
const glow = document.createElement("div");
glow.id = "mouseGlow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

document.addEventListener("DOMContentLoaded", () => {
    // Sync HUD Hull Integrity
    const hullValEl = document.getElementById("hull-value");
    if (hullValEl) {
        const currentHull = localStorage.getItem("hull_integrity") || "96";
        hullValEl.innerText = currentHull + "%";
        const customProgress = document.querySelector(".progress-bar");
        if (customProgress) {
            customProgress.style.width = currentHull + "%";
        }
    }

    /* --- 1. HANDLING LOGIKA KLIK JAWABAN QUIZ --- */
    const optionButtons = document.querySelectorAll(".option-btn");
    const btnSubmitQuiz = document.getElementById("btnSubmitQuiz");

    optionButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Bersihkan status seleksi dari semua opsi
            optionButtons.forEach(btn => btn.classList.remove("selected"));
            
            // Aktifkan opsi yang dipilih oleh user
            this.classList.add("selected");
            
            // Aktifkan tombol submit karena jawaban telah dimasukkan
            if(btnSubmitQuiz) {
                btnSubmitQuiz.disabled = false;
                // Beri efek transisi pulsa kilat saat pertama kali aktif
                btnSubmitQuiz.style.animation = "none";
                setTimeout(() => {
                    btnSubmitQuiz.style.animation = "pulse-glow 2s infinite";
                }, 10);
            }
        });
    });

    /* --- 2. COUNTDOWN TIMER SIMULASI OKSIGEN TERSISA --- */
    const timerElement = document.getElementById("countdown");
    if(timerElement) {
        let timeParts = timerElement.innerText.split(":");
        let totalSeconds = (parseInt(timeParts[0]) * 60) + parseInt(timeParts[1]);

        const interval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(interval);
                timerElement.innerText = "00:00";
                alert("Peringatan: Oksigen habis!");
                return;
            }
            totalSeconds--;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            
            // Format waktu menjadi MM:SS
            timerElement.innerText = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    /* --- 3. SUBMIT ACTION BUTTON --- */
    if (btnSubmitQuiz) {
        btnSubmitQuiz.addEventListener("click", function() {
            const selectedAnswer = document.querySelector(".option-btn.selected");
            const answerLetter = selectedAnswer ? selectedAnswer.getAttribute("data-option") : "";
            
            const isCorrect = (answerLetter === "A");
            localStorage.setItem("quiz_correct", isCorrect ? "true" : "false");
            
            window.location.href = "quiz-result.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. TERMINAL MOUSE MESH GLOW --- */
    const glow = document.getElementById("mouseGlow");
    if(glow) {
        document.addEventListener("mousemove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        });
    }

    /* --- 2. CLOCK SUBTERRANEAN OVERLAY --- */
    const clockElement = document.getElementById("liveClock");
    setInterval(() => {
        const now = new Date();
        if(clockElement) {
            clockElement.innerText = now.toTimeString().split(' ')[0];
        }
    }, 1000);

    /* --- 3. DYNAMIC CANDLESTICK CHART GRAPHICS --- */
    const chartEl = document.getElementById('tradingChart');
    if (chartEl) {
        const ctx = chartEl.getContext('2d');
        
        // Data tiruan awal (mirip pergerakan candlestick hijau & merah di gambar asli)
        const initialLabels = Array.from({length: 30}, (_, i) => `T-${30 - i}`);
        const initialData = [18, 22, 19, 25, 28, 24, 22, 29, 34, 31, 35, 42, 38, 45, 49, 42, 46, 52, 58, 52, 64, 61, 72, 68, 65, 74, 78, 70, 75, 71];

        // Konfigurasi Gradasi Warna Chart Line Area
        const cyanGradient = ctx.createLinearGradient(0, 0, 0, 320);
        cyanGradient.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
        cyanGradient.addColorStop(1, 'rgba(0, 240, 255, 0.00)');

        const tradingChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: initialLabels,
                datasets: [{
                    label: 'Market Valuation',
                    data: initialData,
                    borderColor: '#00f0ff',
                    borderWidth: 2,
                    pointRadius: 0, // Sembunyikan titik node data agar terlihat mulus
                    lineTension: 0.2, // Sudut pergerakan grafik dinamis
                    fill: true,
                    backgroundColor: cyanGradient
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false } // Sembunyikan legend default bawaan chart
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.02)' },
                        ticks: { color: '#475569', font: { size: 9, family: 'Orbitron' } }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.03)' },
                        ticks: { color: '#475569', font: { size: 9, family: 'Orbitron' } }
                    }
                },
                animations: {
                    y: {
                        duration: 1000,
                        easing: 'easeInOutCubic'
                    }
                }
            }
        });

        /* --- 4. REAL-TIME DATA TICK TICKER SIMULATION --- */
        // Membuat grafik terkesan aktif bergerak naik-turun secara periodik
        setInterval(() => {
            let lastValue = tradingChart.data.datasets[0].data[tradingChart.data.datasets[0].data.length - 1];
            // Variasi pergeseran harga acak -3 sampai +4
            let change = Math.floor(Math.random() * 8) - 3; 
            let newValue = Math.max(10, lastValue + change);

            // Tambah data baru, buang data paling lawas
            tradingChart.data.datasets[0].data.push(newValue);
            tradingChart.data.datasets[0].data.shift();
            tradingChart.update('none'); // Update instan tanpa merusak transisi scroll awal
        }, 3000);
    }

    /* --- 5. EXECUTION CONFIRMATIONS ACTION --- */
    const actionTradeBtns = document.querySelectorAll(".btn-trade-action");
    if (actionTradeBtns.length > 0) {
        actionTradeBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const isBuy = this.classList.contains("buy-btn");
                const side = isBuy ? "LONG" : "SHORT";
                
                localStorage.setItem("trade_action", side);

                const execModalElement = document.getElementById("executionModal");
                if (execModalElement) {
                    const execModal = new bootstrap.Modal(execModalElement);
                    execModal.show();

                    const statusDesc = document.getElementById("executionStatusDesc");

                    setTimeout(() => {
                        if (statusDesc) statusDesc.innerText = "Sinkronisasi buku order dengan Bursa Pusat...";
                    }, 600);

                    setTimeout(() => {
                        if (statusDesc) statusDesc.innerText = "Mengamankan margin dan memproses transaksi...";
                    }, 1200);

                    setTimeout(() => {
                        execModal.hide();
                        window.location.href = "trading-result.html";
                    }, 1800);
                } else {
                    window.location.href = "trading-result.html";
                }
            });
        });
    }

    /* --- 6. LUMO GUIDED TOUR SYSTEM --- */
    const tourSteps = [
        {
            id: "tour-welcome",
            title: "Practice Arena Welcome",
            desc: "Selamat datang di arena latihan trading! Sesi di palung ini sepenuhnya bersifat simulasi bebas risiko (*risk-free*) dengan saldo virtual."
        },
        {
            id: "tour-chart",
            title: "Real-Time Price Chart",
            desc: "Sonar chart melacak pergerakan harga aset ABYS secara live. Membantu Cadet menganalisis momentum pasar sebelum eksekusi."
        },
        {
            id: "tour-balance",
            title: "Account Balance & Vault",
            desc: "Memantau saldo kas yang tersedia untuk transaksi, lengkap dengan alokasi Vault tersimpan."
        },
        {
            id: "tour-portfolio",
            title: "Stock Portfolio Holding",
            desc: "Mengecek jumlah muatan komoditas saham ABYS yang saat ini Anda miliki di kapal selam."
        },
        {
            id: "tour-cost-basis",
            title: "Average Cost Basis",
            desc: "Rata-rata harga beli modal saham Anda. Berguna untuk menghitung margin keuntungan secara akurat."
        },
        {
            id: "tour-xp",
            title: "Active Trading XP",
            desc: "Setiap tindakan beli/jual taktis akan meningkatkan XP dan level lisensi Cadet Anda di Monexa OS."
        }
    ];

    let currentTourStep = 0;
    const tourCard = document.getElementById("lumoTourCard");
    const btnNextTour = document.getElementById("btnNextTour");
    const btnSkipTour = document.getElementById("btnSkipTour");
    const tourTitle = document.getElementById("tourTitle");
    const tourDesc = document.getElementById("tourDesc");
    const tourProgress = document.getElementById("tourProgress");

    function startTour() {
        if (!tourCard) return;
        currentTourStep = 0;
        tourCard.classList.remove("d-none");
        const backdrop = document.getElementById("tourBackdrop");
        if (backdrop) backdrop.classList.remove("d-none");
        showTourStep(0);
    }

    function showTourStep(idx) {
        // Clear highlights
        document.querySelectorAll(".tour-highlight").forEach(el => {
            el.classList.remove("tour-highlight");
        });

        const step = tourSteps[idx];
        const targetEl = document.getElementById(step.id);
        if (targetEl) {
            targetEl.classList.add("tour-highlight");
            targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        if (tourTitle) tourTitle.innerText = step.title;
        if (tourDesc) tourDesc.innerText = step.desc;
        if (tourProgress) tourProgress.innerText = `${idx + 1}/6`;

        if (btnNextTour) {
            if (idx === 5) {
                btnNextTour.innerText = "SELESAI";
            } else {
                btnNextTour.innerText = "LANJUT";
            }
        }
    }

    if (btnNextTour) {
        btnNextTour.addEventListener("click", () => {
            if (currentTourStep < 5) {
                currentTourStep++;
                showTourStep(currentTourStep);
            } else {
                finishTour();
            }
        });
    }

    if (btnSkipTour) {
        btnSkipTour.addEventListener("click", () => {
            finishTour();
        });
    }

    function finishTour() {
        if (tourCard) tourCard.classList.add("d-none");
        const backdrop = document.getElementById("tourBackdrop");
        if (backdrop) backdrop.classList.add("d-none");
        document.querySelectorAll(".tour-highlight").forEach(el => {
            el.classList.remove("tour-highlight");
        });
        localStorage.setItem("paper_trading_tour_completed", "true");
    }

    // Auto-trigger tour on page load if not completed yet
    if (tourCard) {
        setTimeout(() => {
            const completed = localStorage.getItem("paper_trading_tour_completed");
            if (!completed) {
                startTour();
            }
        }, 1000);
    }

    // Bind header info button to restart tour
    const infoBtn = document.querySelector(".navbar-trading button.btn-icon-nav");
    if (infoBtn) {
        infoBtn.addEventListener("click", (e) => {
            e.preventDefault();
            startTour();
        });
    }
});