import './style.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

// Contact Form Handler (Formspree AJAX)
const contactForm = document.getElementById('contact-form') as HTMLFormElement;
const formStatus = document.getElementById('form-status') as HTMLElement;

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        if (!btn) return;

        const originalText = btn.innerText;
        btn.innerText = "SENDING...";
        // btn.disabled = true; // Optional: disable to prevent double send

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.style.display = 'block';
                formStatus.innerText = "MESSAGE RECEIVED! I'LL BE IN TOUCH.";
                formStatus.style.color = "var(--accent)";
                contactForm.reset();
                btn.innerText = "SENT!";
                setTimeout(() => {
                    btn.innerText = originalText;
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                const data = await response.json();
                if (data && data.errors) {
                    formStatus.innerText = data["errors"].map((error: any) => error["message"]).join(", ");
                } else {
                    formStatus.innerText = "OOPS! THERE WAS A PROBLEM.";
                }
                formStatus.style.display = 'block';
                formStatus.style.color = "red";
                btn.innerText = originalText;
            }
        } catch (error) {
            formStatus.innerText = "ERROR SENDING MESSAGE.";
            formStatus.style.display = 'block';
            formStatus.style.color = "red";
            btn.innerText = originalText;
        }
    });
}
// 1. Smooth Scroll (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
})

function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


// 2. Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });

    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Hover Effects
const links = document.querySelectorAll('a, button, .project-card, .btn-submit');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('active');
    });
    link.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('active');
    });
});

// 3. Hero Animations
const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

tl.from('.logo', { y: -20, opacity: 0, delay: 0.2 })
    .from('.tag', { y: 20, opacity: 0 }, "-=0.5")
    .from('.hero h1', { y: 50, opacity: 0, duration: 1.2 }, "-=0.8")
    .from('.hero p', { y: 30, opacity: 0 }, "-=0.8")
    .from('.hero-stats div', { y: 20, opacity: 0, stagger: 0.1 }, "-=0.6");


// 3. Scroll Reveals
// Project Cards Reveal (Staggered)
const projects = document.querySelectorAll('.project-card');
if (projects.length > 0) {
    ScrollTrigger.batch(".project-card", {
        onEnter: batch => gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }),
        once: true
    });
}

const revealElements = document.querySelectorAll('.exp-item, .section-header');

revealElements.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// 4. Clock Logic
// 4. Clock Logic
function updateTime() {
    const el = document.getElementById('time-display');
    if (el) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        el.textContent = time;
    }
}
setInterval(updateTime, 1000);
updateTime();

// 5. Mobile Menu Logic
const hamburger = document.querySelector('.hamburger-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Optional: lock body scroll
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close Button logic
    const closeBtn = document.querySelector('.menu-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

console.log('Portfolio initialized.');
