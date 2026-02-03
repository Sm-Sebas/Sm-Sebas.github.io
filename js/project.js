document.querySelectorAll(".project-item").forEach(item => {
    item.addEventListener('click', () => {
        const pId = item.dataset.project; // "p1", "p2", etc.
        const currentLang = document.querySelector('.lang-btn.active').dataset.lang;
        
        // Elementos del DOM
        const title = document.getElementById("project-title");
        const desc = document.getElementById("project-desc");
        const tech = document.getElementById("project-tech");
        const link = document.getElementById("project-link");

        // Rellenar textos desde el objeto 'translations' que está en el HTML
        if (translations[currentLang][`${pId}_title`]) {
            title.textContent = translations[currentLang][`${pId}_title`];
            desc.innerHTML = translations[currentLang][`${pId}_desc`];
            tech.textContent = translations[currentLang][`${pId}_tech`];
            
            // Lógica del Link
            const url = translations[currentLang][`${pId}_link`];
            if (url && url !== "#") {
                link.href = url;
                link.style.display = "inline-block"; // Forzamos visibilidad
                link.style.visibility = "visible";   // Por si acaso
                link.textContent = currentLang === 'es' ? "Visitar Tienda" : "Visit Shop";
            } else {
                link.style.display = "none";
            }
        }
        
        // Animación de entrada
        gsap.fromTo(".project-info-text", {opacity: 0, y: 10}, {opacity: 1, y: 0, duration: 0.4});
    });
});