const navLinks = document.querySelectorAll('nav ul a');
const mainSectionIds = ['home', 'projects', 'experience', 'about-me', 'education', 'award-cert', 'contact-resume'];
const sections = mainSectionIds.map(id => document.getElementById(id)).filter(Boolean)

let anySectionVisible = false;
  

const observer = new IntersectionObserver(
    (entries) => {
        anySectionVisible = false;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anySectionVisible = true;
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') == `#${id}`);
                });
            }
        });
        if (!anySectionVisible && window.scrollY < 50) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') == '#home') {
                    link.classList.add('active');
                }
            });
        }
    },
    {   threshold: 0.5,
        rootMargin: '0px 0px -40% 0px' 
    }
);
sections.forEach(section => {
    if (section) observer.observe(section);
});

window.addEventListener('load', () => {
    if (window.scrollY < 50 || !window.location.hash || window.location.hash === '#home') {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') == '#home') {
                link.classList.add('active');
            }
        });
    }
});


console.log(sections);

window.addEventListener('scroll', function(){
    const nav = document.querySelector('nav');
    const scrollpos = window.scrollY;

    if (scrollpos > 100){
        nav.style.backgroundColor = 'rgba(58, 58, 58, 0.7)';
    } else {
        nav.style.backgroundColor = '#3A3A3A';
    }

});

const identityElement = document.querySelector('p2');
const identityButton = document.getElementById('identityButton');

const identities = [
    'a Developer',
    'a Designer',
    'a Creator',
    'a Problem Solver',
    'a Student',
    'Always Learning',
    'a Coffee Lover',
    'a Communicator',
    'Blu Medina'
];

let currentIndex = -1;


identityButton.addEventListener('click', function() {
    identityElement.classList.add('fade-out');

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % identities.length;
        identityElement.textContent = identities[currentIndex];
        identityElement.classList.remove('fade-out');
        identityElement.classList.add('fade-in');
    }, 300);

    setTimeout(() => identityElement.classList.remove('fade-in'), 600);
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('#project-cards > div[id^="card"]');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    let currentIndex = 0;
    const cardCount = cards.length;
    const cardWidth = 400;
    const spacing = 30;

    function initializeCarousel() {
        const containerWidth = window.innerWidth;
        const centerPositon = (containerWidth - cardWidth) / 2;

        cards.forEach((card,index) => {
            card.style.transition = 'all 0.5s ease-in-out';
            card.style.position = 'absolute';
            card.style.width = cardWidth + 'px';
            card.style.height = '450px';

            const offset = index - Math.floor(cardCount / 2);
            const newPosition = centerPositon + (offset * (cardWidth + spacing));

            card.style.left = newPosition + 'px';

            const distanceFromCenter = Math.abs(offset);
            const opacity = 1 - (distanceFromCenter * 0.2);
    
            card.style.opacity = Math.max(opacity, 0.6);
            card.style.zIndex = cardCount - distanceFromCenter;

            const scale = 1 - (distanceFromCenter * 0.1);
            
            card.style.transform = `scale(${scale})`;

        });
    }

    function updateCarousel() {
        const containerWidth = window.innerWidth;
        const centerPositon = (containerWidth - cardWidth) / 2;

        cards.forEach((card, index) => {
            let offset = index - currentIndex;
            console.log(currentIndex)

            if (offset > Math.floor(cardCount / 2)) {
                offset -= cardCount;
            } else if (offset < -Math.floor(cardCount / 2)) {
                offset += cardCount
            }

            const newPosition = centerPositon + (offset * (cardWidth + spacing));

            const distanceFromCenter = Math.abs(offset);
            const opacity = 1 - (distanceFromCenter * 0.2);
            const scale = 1 - (distanceFromCenter * 0.1);

            card.style.left = newPosition + 'px';
            card.style.transform = `scale(${scale})`
            card.style.zIndex = cardCount - distanceFromCenter;
            card.style.opacity = Math.max(opacity, 0.6);

    
        });
    }

    nextBtn.addEventListener('click', function(){
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel();

    });

    prevBtn.addEventListener('click', function(){
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateCarousel();
    });

    initializeCarousel();
});

