// EMPÊCHER TOUT SCROLL AUTOMATIQUE AU CHARGEMENT
window.addEventListener('load', function() {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Données des projets par catégorie
const projectsData = {
    design: [
        { title: "Identité Visuelle", image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Création d'identité visuelle complète pour une marque de luxe avec système graphique cohérent" },
        { title: "Édition", image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Design d'ouvrage littéraire avec typographie custom et mise en page innovante" },
        { title: "Packaging", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Design de packaging écologique pour produits cosmétiques avec approche durable" },
        { title: "Signalétique", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Système de signalétique pour espace culturel avec orientation intuitive" }
    ],
    typography: [
        { title: "Création de Caractères", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Développement d'une famille typographique originale avec multiples graisses" },
        { title: "Poster Typographique", image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Composition typographique expérimentale pour exposition contemporaine" },
        { title: "Animation Typo", image: "https://images.unsplash.com/photo-1579275542618-2c5f7b7172c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Animation de caractères pour projet digital interactif" }
    ],
    photo: [
        { title: "Série Urbaine", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Exploration photographique de l'architecture contemporaine et ses contrastes" },
        { title: "Portraits", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Série de portraits en noir et blanc capturant l'essence des sujets" },
        { title: "Nature Morte", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Compositions d'objets et textures explorant la lumière naturelle" },
        { title: "Paysages", image: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Série de paysages urbains et naturels en différentes saisons" }
    ],
    drawing: [
        { title: "Carnet de Croquis", image: "https://images.unsplash.com/photo-1578911372313-3c0e715ca1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Collection de dessins d'observation et études de mouvement" },
        { title: "Illustrations", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Série d'illustrations narratives pour publication jeunesse" },
        { title: "Dessin Technique", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Plans et schémas architecturaux avec précision technique" }
    ],
    volume: [
        { title: "Installation", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Installation in situ dans espace public avec matériaux recyclés" },
        { title: "Sculpture", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Sculpture en matériaux composites explorant les formes organiques" },
        { title: "Maquette", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Maquette architecturale détaillée à échelle réduite" }
    ]
};

// TOUT LE RESTE EST DANS DOMContentLoaded → plus d’erreur "null"
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const targetMenu = document.querySelector('.target-menu');
    const targetCircles = document.querySelectorAll('.target-circle');
    const sections = document.querySelectorAll('.section');
    const categoryOverlay = document.getElementById('category-overlay');
    const closeOverlay = document.querySelector('.close-overlay');        // ← maintenant il existe
    const viewCategoryButtons = document.querySelectorAll('.view-category');

    // Ouvrir le menu cible
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        targetMenu.classList.add('active');
    });

    // Navigation via les cercles
    targetCircles.forEach(circle => {
        circle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const targetHref = this.getAttribute('href');
            closeTargetMenu();
            if (targetHref.includes('.html')) {
                window.location.href = targetHref;
            } else {
                const targetSection = document.querySelector(targetHref);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    function closeTargetMenu() {
        targetMenu.classList.remove('active');
    }

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (targetMenu.classList.contains('active') && !targetMenu.contains(e.target)) {
            closeTargetMenu();
        }
    });

    targetCircles.forEach(circle => {
        circle.addEventListener('click', function(e) { e.stopPropagation(); });
    });

    // Ouvrir l'overlay des catégories
    viewCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            openCategoryOverlay(category);
        });
    });

    // ← LA LIGNE QUI POSAIT PROBLÈME EST MAINTENANT À L'INTÉRIEUR
    closeOverlay.addEventListener('click', closeCategoryOverlay);

    // Fermer l'overlay en cliquant à l'extérieur
    categoryOverlay.addEventListener('click', function(e) {
        if (e.target === categoryOverlay) {
            closeCategoryOverlay();
        }
    });

    // Navigation par clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeTargetMenu();
            closeCategoryOverlay();
        }
    });

    // Initialiser les animations des projets
    initProjectAnimations();
});

// Fonctions (inchangées)
function openCategoryOverlay(category) {
    const overlay = document.getElementById('category-overlay');
    const categoryDetails = document.querySelector('.category-details');
    const projects = projectsData[category];
    if (projects) {
        let projectsHTML = `<h2>${getCategoryName(category)}</h2><div class="category-projects-grid">`;
        projects.forEach(project => {
            projectsHTML += `
                <div class="category-project-card">
                    <img src="${project.image}" alt="${project.title}">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                </div>`;
        });
        projectsHTML += '</div>';
        categoryDetails.innerHTML = projectsHTML;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCategoryOverlay() {
    const overlay = document.getElementById('category-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function getCategoryName(category) {
    const names = { design: 'Design Graphique', typography: 'Typographie', photo: 'Photographie', drawing: 'Dessin', volume: 'Volume' };
    return names[category] || category;
}

function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Animation au scroll + parallax (inchangé)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-image');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight * 0.8) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});