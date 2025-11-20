// ========================================
// CUSTOM MAGNETIC CURSOR
// ========================================

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const magneticElements = document.querySelectorAll('.magnetic-element');

let mouseX = 0, mouseY = 0;
let cursorDotX = 0, cursorDotY = 0;
let cursorOutlineX = 0, cursorOutlineY = 0;

// Smooth cursor follow
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth follow with different speeds
    cursorDotX += (mouseX - cursorDotX) * 0.8;
    cursorDotY += (mouseY - cursorDotY) * 0.8;
    cursorOutlineX += (mouseX - cursorOutlineX) * 0.15;
    cursorOutlineY += (mouseY - cursorOutlineY) * 0.15;

    cursorDot.style.left = cursorDotX + 'px';
    cursorDot.style.top = cursorDotY + 'px';
    cursorOutline.style.left = cursorOutlineX + 'px';
    cursorOutline.style.top = cursorOutlineY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Magnetic effect on interactive elements
magneticElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursorDot.classList.add('active');
        cursorOutline.classList.add('active');
    });

    elem.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('active');
        cursorOutline.classList.remove('active');
    });

    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        elem.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    elem.addEventListener('mouseleave', () => {
        elem.style.transform = 'translate(0, 0)';
    });
});

// ========================================
// MATRIX CODE RAIN EFFECT
// ========================================

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#667eea';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
// TYPING ANIMATION
// ========================================

const typingText = document.getElementById('typingText');
const textToType = 'Hemanth Reddy Gurappagaru';
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// ========================================
// 3D CARD TILT EFFECT
// ========================================

const cards3D = document.querySelectorAll('.card-3d');

cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Move glow with mouse
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(102, 126, 234, 0.3) 0%, transparent 50%)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ========================================
// NAVIGATION
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.bento-card, .exp-card, .skill-card, .contact-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation via style
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// PARALLAX EFFECT ON SCROLL
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const meshGradient = document.querySelector('.mesh-gradient');

    if (meshGradient) {
        meshGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Create celebratory effect
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: fall ${3 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }

    // Add fall animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'color: #667eea; font-size: 24px; font-weight: bold;');
    console.log('%cYou found the easter egg! Contact me if you did this on purpose 😄', 'color: #f093fb; font-size: 16px;');
}

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c👨‍💻 Hello, Developer!', 'color: #667eea; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(102, 126, 234, 0.3)');
console.log('%c✨ Welcome to my portfolio!', 'color: #764ba2; font-size: 18px;');
console.log('%c💡 Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #f093fb; font-size: 14px;');
console.log('%c📧 hemanth.gurappagaru@gmail.com', 'color: #4facfe; font-size: 14px;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
