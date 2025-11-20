// ========================================
// Navigation & Scroll Effects
// ========================================

const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger menu
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ========================================
// Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Observe skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(category);
});

// Observe contact cards
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ========================================
// Smooth Scroll for Internal Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Dynamic Stat Counter Animation
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            if (typeof target === 'number' && target > 10) {
                element.textContent = Math.floor(current);
            } else {
                element.textContent = current.toFixed(1);
            }
        }
    }, 16);
}

// Observer for stat numbers
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const text = statNumber.textContent;

            // Parse the target value
            let targetValue;
            if (text.includes('B+')) {
                targetValue = parseFloat(text.replace('B+', ''));
                animateCounter(statNumber, targetValue, 2000);
                setTimeout(() => {
                    statNumber.textContent = targetValue + 'B+';
                }, 2000);
            } else if (text.includes('M+')) {
                targetValue = parseFloat(text.replace('M+', ''));
                animateCounter(statNumber, targetValue, 2000);
                setTimeout(() => {
                    statNumber.textContent = targetValue + 'M+';
                }, 2000);
            } else if (text.includes('+')) {
                targetValue = parseInt(text.replace('+', ''));
                animateCounter(statNumber, targetValue, 2000);
                setTimeout(() => {
                    statNumber.textContent = targetValue + '+';
                }, 2000);
            } else if (text.includes('%')) {
                targetValue = parseFloat(text.replace('%', ''));
                animateCounter(statNumber, targetValue, 2000);
                setTimeout(() => {
                    statNumber.textContent = targetValue + '%';
                }, 2000);
            }

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// Particle Background Effect (Optional)
// ========================================

function createParticles() {
    const heroBg = document.querySelector('.hero-bg');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        heroBg.appendChild(particle);
    }
}

// Add float animation via style tag
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// ========================================
// Mouse Follow Effect for Hero
// ========================================

const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight } = hero;

    const xPos = (clientX / offsetWidth - 0.5) * 20;
    const yPos = (clientY / offsetHeight - 0.5) * 20;

    heroBg.style.transform = `translate(${xPos}px, ${yPos}px)`;
});

// ========================================
// Typing Effect for Hero Title (Optional Enhancement)
// ========================================

function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalHTML = heroTitle.innerHTML;
    const text = heroTitle.textContent;

    // Comment this out if you don't want the typing effect
    // heroTitle.textContent = '';
    // let index = 0;

    // function type() {
    //     if (index < text.length) {
    //         heroTitle.textContent += text.charAt(index);
    //         index++;
    //         setTimeout(type, 100);
    //     } else {
    //         heroTitle.innerHTML = originalHTML;
    //     }
    // }

    // setTimeout(type, 1000);
}

// Uncomment to enable typing effect
// initTypingEffect();

// ========================================
// Console Easter Egg
// ========================================

console.log('%c👨‍💻 Hello, Developer!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in working together? Let\'s connect!', 'color: #8b5cf6; font-size: 14px;');
console.log('%c📧 hemanth.gurappagaru@gmail.com', 'color: #ec4899; font-size: 12px;');
