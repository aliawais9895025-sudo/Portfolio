/* =====================================================
   ALI AWAIS PORTFOLIO - main.js
   ===================================================== */

/* ----- Navbar scroll effect ----- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
  toggleBackTop();
});

/* ----- Active Nav link on scroll ----- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === '#' + current) item.classList.add('active');
  });
}

/* ----- Hamburger / Mobile Menu ----- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const overlay    = document.getElementById('mobile-overlay');
const closeBtn   = document.getElementById('close-menu');
const mobLinks   = document.querySelectorAll('.mob-link');

function openMenu()  { mobileMenu.classList.add('active'); overlay.classList.add('active'); hamburger.classList.add('active'); document.body.style.overflow='hidden'; }
function closeMenu() { mobileMenu.classList.remove('active'); overlay.classList.remove('active'); hamburger.classList.remove('active'); document.body.style.overflow=''; }

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
mobLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ----- Typewriter Effect ----- */
const words  = ['Web Developer', 'UI/UX Designer', 'Creative Thinker', 'Problem Solver', 'Front-End Expert'];
let wordIdx  = 0, charIdx = 0, deleting = false;
const twEl   = document.getElementById('typewriter');

function typeWrite() {
  const current = words[wordIdx];
  if (!deleting) {
    twEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; return setTimeout(typeWrite, 1800); }
  } else {
    twEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; return setTimeout(typeWrite, 400); }
  }
  setTimeout(typeWrite, deleting ? 60 : 90);
}
typeWrite();

/* ----- Particle Canvas ----- */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['rgba(124,58,237,', 'rgba(6,182,212,', 'rgba(236,72,153,', 'rgba(245,158,11,'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  const COUNT = Math.min(80, Math.floor(W * H / 15000));
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(124,58,237,' + (0.15 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ----- Intersection Observer (AOS-like) ----- */
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('aos-animate'), delay);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}
initAOS();

/* ----- Skill Bar Animate ----- */
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
}
animateSkillBars();

/* ----- Counter Animation ----- */
function animateCounters() {
  const nums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.textContent);
        let count = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          e.target.textContent = count + '+';
          if (count >= target) clearInterval(timer);
        }, 40);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(n => observer.observe(n));
}
animateCounters();

/* ----- Project Filter ----- */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ----- Back to Top ----- */
const backTop = document.getElementById('back-top');
function toggleBackTop() {
  if (window.scrollY > 400) backTop.classList.add('visible');
  else backTop.classList.remove('visible');
}
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ----- Contact Form ----- */
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.submit-btn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    form.reset();
    showToast('Message sent successfully! I will get back to you soon.');
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1800);
});

/* ----- Toast Notification ----- */
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ----- 3D Tilt on Profile Image (desktop only) ----- */
const wrapper = document.querySelector('.profile-3d-wrapper');
if (wrapper && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / 20;
    const dy   = (e.clientY - cy) / 20;
    wrapper.style.transform = `perspective(800px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    wrapper.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
  });
}

/* ----- Smooth scroll for all anchor links ----- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ----- Navbar link highlight on click ----- */
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

/* ----- fadeInUp keyframe via JS (for filter anim) ----- */
const style = document.createElement('style');
style.textContent = '@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }';
document.head.appendChild(style);
