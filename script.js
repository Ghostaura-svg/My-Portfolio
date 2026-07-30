// ===== MOBILE MENU =====
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('hamburger').classList.remove('active');
    });
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const bar = entry.target.querySelector('.bar');
            if (bar) {
                setTimeout(() => {
                    bar.style.width = bar.getAttribute('data-width') + '%';
                }, 300);
            }
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));



// ===== ANIMATED BACKGROUND PARTICLES =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height, particles = [];

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 108, 247, ${this.opacity})`;
        ctx.fill();
    }
}

const particleCount = Math.min(120, Math.floor((width * height) / 12000));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(74, 108, 247, ${(1 - distance / 150) * 0.12})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update();
        p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
/* ==========================
      PROJECT CAROUSEL
========================== */

const track = document.querySelector(".projects-track");

const pages = document.querySelectorAll(".project-page");

const dots = document.querySelectorAll(".dot");

const next = document.getElementById("nextProject");

const prev = document.getElementById("prevProject");

let current = 0;

function updateCarousel(){

    track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;

    dots.forEach(dot=>dot.classList.remove("active"));

    dots[current].classList.add("active");

}

next.addEventListener("click",()=>{

    current++;

    if(current>=pages.length){

        current=0;

    }

    updateCarousel();

});

prev.addEventListener("click",()=>{

    current--;

    if(current<0){

        current=pages.length-1;

    }

    updateCarousel();

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        next.click();

    }

    if(e.key==="ArrowLeft"){

        prev.click();

    }

});

let touchStart=0;

track.addEventListener("touchstart",(e)=>{

    touchStart=e.touches[0].clientX;

});

track.addEventListener("touchend",(e)=>{

    let touchEnd=e.changedTouches[0].clientX;

    if(touchStart-touchEnd>70){

        next.click();

    }

    if(touchEnd-touchStart>70){

        prev.click();

    }

});


updateCarousel();
/*==================================================
            CERTIFICATE POPUP
==================================================*/

const certificateCards = document.querySelectorAll(".certificate-card");

const certificateModal = document.getElementById("certificateModal");

const popupImage = document.getElementById("certificatePopupImage");

const closeModal = document.querySelector(".close-modal");

/* Open Modal */

certificateCards.forEach(card=>{

    card.addEventListener("click",()=>{

        const image = card.getAttribute("data-image");

        popupImage.src = image;

        certificateModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

/* Close Button */

closeModal.addEventListener("click",closeCertificate);

/* Click Outside */

certificateModal.addEventListener("click",(e)=>{

    if(e.target===certificateModal){

        closeCertificate();

    }

});

/* ESC Key */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeCertificate();

    }

});

/* Close Function */

function closeCertificate(){

    certificateModal.classList.remove("active");

    document.body.style.overflow="";

}

/*=====================================================
                MACOS DOCK EFFECT
=====================================================*/

const dock = document.querySelector(".mac-dock");

if (dock) {

    const items = dock.querySelectorAll(".dock-item");

    dock.addEventListener("mousemove", (e) => {

        const dockRect = dock.getBoundingClientRect();
        const mouseX = e.clientX - dockRect.left;

        items.forEach(item => {

            const rect = item.getBoundingClientRect();

            const itemCenter =
                (rect.left - dockRect.left) + rect.width / 2;

            const distance = Math.abs(mouseX - itemCenter);

            let scale = 1;

            if (distance < 70) {

                scale = 1.20;

            } else if (distance < 130) {

                scale = 1.10;

            } else if (distance < 190) {

                scale = 1.05;

            }

            item.style.transform = `scale(${scale})`;

        });

    });

    dock.addEventListener("mouseleave", () => {

        items.forEach(item => {

            item.style.transform = "scale(1)";

        });

    });

}
// ===== TYPING EFFECT FOR HERO (Optional Enhancement) =====
// You can add a typing effect if you want
console.log('🚀 Portfolio loaded successfully!');
console.log('📸 Click the camera icon to upload your photo.');
console.log('📄 Add your CV PDF to enable download.');

