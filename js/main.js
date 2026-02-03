const state = {
    theme: localStorage.getItem('pref-theme') || 'dark'
};

const body = document.body;
const menuButtons = document.querySelectorAll(".menu-btn");
const projectItems = document.querySelectorAll(".project-item");
const projectTitle = document.getElementById("project-title");
const projectDesc = document.getElementById("project-desc");
const projectTech = document.getElementById("project-tech");
const projectImg = document.getElementById("project-img");
const projectGithub = document.getElementById("project-github");
const imgContainer = document.querySelector(".project-image-container");

// MAPA DE IMÁGENES
const projectImages = {
    p1: "./assets/p1.png",
    p2: "./assets/p2.png",
    p3: "./assets/p3.png"
};

function init() {
    body.dataset.theme = state.theme;
    const themeInput = document.querySelector(`input[value="${state.theme}"]`);
    if (themeInput) themeInput.checked = true;
    updateClock();
    setInterval(updateClock, 1000);
    initParticles();
    animateParticles();
    animateCursor();
    
    if(projectItems.length > 0) {
        setTimeout(() => {
             projectItems[0].click(); 
        }, 100);
    }
}

// NAVEGACIÓN ENTRE PANELES
menuButtons.forEach(btn => {
    btn.onclick = () => {
        const section = btn.dataset.section;
        menuButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll('.panel-lateral, .project-view').forEach(p => {
            p.style.display = "none";
            p.style.opacity = "0";
            p.classList.remove("active");
        });

        const targetId = (section === "projects") ? "project-view" : `${section}-panel`;
        const target = document.getElementById(targetId);

        if (target) {
            target.style.display = (window.innerWidth < 1025) ? "block" : "flex";
            
            setTimeout(() => {
                target.classList.add("active");
                gsap.to(target, { opacity: 1, duration: 0.5 });
            }, 10);
        }
    };
});

// SELECCIÓN DE PROYECTO (CON LÓGICA DE TIENDA TERMINADA)
projectItems.forEach(item => {
    item.onclick = () => {
        projectItems.forEach(i => i.classList.remove("active-item"));
        item.classList.add("active-item");

        const id = item.dataset.project;
        const currentLang = document.querySelector('.lang-btn.active').dataset.lang;
        
        gsap.to([projectTitle, projectDesc, projectTech, projectGithub, imgContainer], { 
            opacity: 0, y: 10, duration: 0.3, 
            onComplete: () => {
                // Actualizar imagen
                if (projectImg) projectImg.src = projectImages[id];
                
                // Actualizar textos básicos
                projectTitle.textContent = translations[currentLang][id + '_title'];
                projectDesc.innerHTML = translations[currentLang][id + '_desc']; // Usamos innerHTML por si tienes <br>
                projectTech.textContent = translations[currentLang][id + '_tech'];
                
                // Lógica del Botón / Link
                if (projectGithub) {
                    if (id === "p2") {
                        // CASO PROYECTO 2 (TIENDA TERMINADA)
                        projectGithub.textContent = currentLang === 'es' ? "Visitar Tienda →" : "Visit Shop →";
                        projectGithub.href = translations[currentLang][id + '_link'];
                        projectGithub.classList.remove("disabled");
                        projectGithub.style.opacity = "1";
                        projectGithub.style.pointerEvents = "auto";
                    } else {
                        // CASO OTROS PROYECTOS (EN PROGRESO)
                        projectGithub.textContent = currentLang === 'es' ? "[ En proceso ]" : "[ In progress ]";
                        projectGithub.href = "#";
                        projectGithub.classList.add("disabled");
                        projectGithub.style.opacity = "0.5";
                        projectGithub.style.pointerEvents = "none";
                    }
                    projectGithub.style.display = "inline-block";
                }

                imgContainer.style.opacity = "1";
                gsap.to([projectTitle, projectDesc, projectTech, projectGithub, imgContainer], { 
                    opacity: 1, y: 0, duration: 0.4 
                });
            }
        });
    };
});

// --- FUNCIONES DE UTILIDAD (Reloj, Partículas, Cursor) ---

function updateClock() {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Madrid' };
    const timeString = new Intl.DateTimeFormat('es-ES', options).format(new Date());
    const timeEl = document.getElementById("time");
    if(timeEl) timeEl.textContent = timeString;
}

document.querySelectorAll(".theme-selector input").forEach(input => {
    input.onchange = () => {
        state.theme = input.value;
        body.dataset.theme = state.theme;
        localStorage.setItem('pref-theme', state.theme);
    };
});

const bgCanvas = document.getElementById("bg-particles");
const bgCtx = bgCanvas.getContext("2d");
const cursorCanvas = document.getElementById("cursor-canvas");
const cCtx = cursorCanvas.getContext("2d");
let particles = [], points = [], mouse = { x: 0, y: 0 }, current = { x: 0, y: 0 };

function initParticles() {
    if(!bgCanvas || !cursorCanvas) return;
    bgCanvas.width = window.innerWidth; bgCanvas.height = window.innerHeight;
    cursorCanvas.width = window.innerWidth; cursorCanvas.height = window.innerHeight;
    particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * bgCanvas.width, y: Math.random() * bgCanvas.height,
        r: Math.random() * 1.5 + 0.5, dx: (Math.random() - 0.5) * 0.4, dy: (Math.random() - 0.5) * 0.4
    }));
}

function animateParticles() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.fillStyle = body.dataset.theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
    particles.forEach(p => {
        bgCtx.beginPath(); bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2); bgCtx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > bgCanvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > bgCanvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
}

window.onmousemove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };

function animateCursor() {
    cCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    current.x += (mouse.x - current.x) * 0.15;
    current.y += (mouse.y - current.y) * 0.15;
    points.push({ ...current });
    if (points.length > 40) points.shift();
    for (let i = 0; i < points.length - 1; i++) {
        const ratio = i / points.length;
        cCtx.beginPath();
        cCtx.strokeStyle = body.dataset.theme === "dark" ? `rgba(255, 50, 50, ${ratio})` : `rgba(50, 50, 255, ${ratio})`;
        cCtx.lineWidth = 1 * ratio + 0.2;
        cCtx.moveTo(points[i].x, points[i].y);
        cCtx.lineTo(points[i+1].x, points[i+1].y);
        cCtx.stroke();
    }
    requestAnimationFrame(animateCursor);
}

window.onresize = initParticles;
init();