// Mascot Animation and Interaction
const mascot = document.getElementById('mascot');
const eyes = document.querySelectorAll('.eye');

// Eye tracking effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        const distance = Math.min(5, Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 20);
        
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

// Mascot click interaction
mascot.addEventListener('click', () => {
    mascot.style.animation = 'none';
    mascot.offsetHeight; // Trigger reflow
    mascot.style.animation = 'bounce 0.5s ease';
    
    setTimeout(() => {
        mascot.style.animation = 'float 3s ease-in-out infinite';
    }, 500);
});

// Add bounce animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-30px) scale(1.1); }
    }
`;
document.head.appendChild(style);

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('กรุณากรอกอีเมลที่ถูกต้อง', 'error');
        return;
    }
    
    // Show loading message
    showFormMessage('กำลังส่งข้อความ...', 'success');
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showFormMessage('ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อ', 'success');
            contactForm.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            const data = await response.json();
            showFormMessage('เกิดข้อผิดพลาด: ' + (data.error || 'กรุณาลองใหม่อีกครั้ง'), 'error');
        }
    } catch (error) {
        showFormMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง', 'error');
        console.error('Form submission error:', error);
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// Add sparkle effect on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        createSparkle();
    }
    
    lastScrollTop = scrollTop;
});

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle styles
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    .sparkle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--glow-color);
        border-radius: 50%;
        pointer-events: none;
        animation: sparkle 1s ease-out forwards;
        box-shadow: 0 0 10px var(--glow-color);
    }
    
    @keyframes sparkle {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(sparkleStyle);

// Add hover sound effect simulation (visual feedback)
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.2s ease';
    });
});

// Typing effect for subtitle
const subtitle = document.querySelector('.subtitle');
const originalText = subtitle.textContent;
let charIndex = 0;

function typeWriter() {
    if (charIndex < originalText.length) {
        subtitle.textContent = originalText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    subtitle.textContent = '';
    setTimeout(typeWriter, 500);
});

// Add glitch effect on hover for name title
const nameTitle = document.querySelector('.name-title');
nameTitle.addEventListener('mouseenter', () => {
    nameTitle.style.animation = 'glitch 0.3s ease';
});

nameTitle.addEventListener('mouseleave', () => {
    nameTitle.style.animation = 'none';
});

const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

// Console easter egg
console.log('%c🤖 Welcome to Nitikorn Unan\'s website!', 'color: #c084fc; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ and pixel art style', 'color: #00ffff; font-size: 14px;');
