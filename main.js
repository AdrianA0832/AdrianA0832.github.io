/* ==========================================================================
   ADRIAN A — PORTFOLIO ENGINE
   ========================================================================== */

// ---------------------------------------------------------------------------
// 1. GLOBAL STATE
// ---------------------------------------------------------------------------
const state = { theme: 'light' };

// ---------------------------------------------------------------------------
// 2. DOM ELEMENT CACHE
// ---------------------------------------------------------------------------
const elements = {
  customCursor: document.getElementById('customCursor'),
  customCursorDot: document.getElementById('customCursorDot'),
  themeToggle: document.getElementById('themeToggle'),
  contactTrigger: document.getElementById('contactTrigger'),
  contactForm: document.getElementById('contactForm'),
  formSuccess: document.getElementById('formSuccess'),
  successClose: document.getElementById('successClose'),
  arrowDownTrigger: document.getElementById('arrowDownTrigger'),
  mainHeader: document.getElementById('mainHeader'),
  heroPortraitWrap: document.getElementById('heroPortraitWrap'),
  lightbox: document.getElementById('lightbox'),
  lightboxImg: document.getElementById('lightboxImg'),
  lightboxCaption: document.getElementById('lightboxCaption'),
  lightboxClose: document.getElementById('lightboxClose'),
  workTriggerBtn: document.getElementById('workTriggerBtn'),
  workPopupBox: document.getElementById('workPopupBox'),
  hamburgerBtn: document.getElementById('hamburgerBtn'),
  mobileNavOverlay: document.getElementById('mobileNavOverlay')
};

// ---------------------------------------------------------------------------
// 3. INTERACTIVE CUSTOM CURSOR
// ---------------------------------------------------------------------------
let cursorTargetX = 0, cursorTargetY = 0;
let cursorX = 0, cursorY = 0;

function updateCursor() {
  cursorX += (cursorTargetX - cursorX) * 0.16;
  cursorY += (cursorTargetY - cursorY) * 0.16;

  if (elements.customCursor) {
    elements.customCursor.style.left = cursorX + 'px';
    elements.customCursor.style.top = cursorY + 'px';
  }
  requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', (e) => {
  cursorTargetX = e.clientX;
  cursorTargetY = e.clientY;

  if (elements.customCursorDot) {
    elements.customCursorDot.style.left = e.clientX + 'px';
    elements.customCursorDot.style.top = e.clientY + 'px';
  }
});

requestAnimationFrame(updateCursor);

function setupCursorHovers() {
  const interactives = document.querySelectorAll('a, button, input, textarea, select, .tilt-card, .magnetic');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (elements.customCursor) elements.customCursor.classList.add('hovered');
      if (elements.customCursorDot) elements.customCursorDot.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      if (elements.customCursor) elements.customCursor.classList.remove('hovered');
      if (elements.customCursorDot) elements.customCursorDot.classList.remove('hovered');
    });
  });
}

// ---------------------------------------------------------------------------
// 4. LIGHTBOX
// ---------------------------------------------------------------------------
function openLightbox(src, caption) {
  if (!elements.lightbox) return;
  elements.lightboxImg.src = src;
  elements.lightboxCaption.textContent = caption || '';
  elements.lightbox.classList.add('active');
  elements.lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!elements.lightbox) return;
  elements.lightbox.classList.remove('active');
  elements.lightbox.setAttribute('aria-hidden', 'true');
}

if (elements.lightboxClose) {
  elements.lightboxClose.addEventListener('click', closeLightbox);
}
if (elements.lightbox) {
  elements.lightbox.addEventListener('click', (e) => {
    if (e.target === elements.lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ---------------------------------------------------------------------------
// 5. CONTACT TRIGGER — SMOOTH SCROLL TO #contact
// ---------------------------------------------------------------------------
if (elements.contactTrigger) {
  elements.contactTrigger.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ---------------------------------------------------------------------------
// 6. ARROW DOWN TRIGGER — SCROLL TO #operations
// ---------------------------------------------------------------------------
if (elements.arrowDownTrigger) {
  elements.arrowDownTrigger.addEventListener('click', () => {
    const opsSection = document.getElementById('operations');
    if (opsSection) {
      opsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ---------------------------------------------------------------------------
// 7. SCROLL LINK ANCHORS
// ---------------------------------------------------------------------------
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---------------------------------------------------------------------------
// 8. SCROLL REVEAL OBSERVER
// ---------------------------------------------------------------------------
function initScrollReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal-el, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
}

// ---------------------------------------------------------------------------
// 9. HEADER HIDE / SHOW ON SCROLL
// ---------------------------------------------------------------------------
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY <= 120) {
    elements.mainHeader?.classList.remove('hidden');
  } else if (currentScrollY > lastScrollY) {
    elements.mainHeader?.classList.add('hidden');
  } else {
    elements.mainHeader?.classList.remove('hidden');
  }

  lastScrollY = currentScrollY;
}, { passive: true });

// ---------------------------------------------------------------------------
// 10. THEME SWITCHER
// ---------------------------------------------------------------------------
function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch (e) { /* noop */ }
}

// Load saved theme
(function () {
  let saved = null;
  try { saved = localStorage.getItem('portfolio-theme'); } catch (e) { /* noop */ }
  setTheme(saved || 'light');
})();

if (elements.themeToggle) {
  elements.themeToggle.addEventListener('click', () => {
    setTheme(state.theme === 'light' ? 'dark' : 'light');
  });
}

// ---------------------------------------------------------------------------
// 11. HOW I WORK TOGGLE
// ---------------------------------------------------------------------------
function initHowIWorkToggle() {
  if (!elements.workTriggerBtn || !elements.workPopupBox) return;

  elements.workTriggerBtn.addEventListener('click', () => {
    const isActive = elements.workPopupBox.classList.toggle('active');
    elements.workTriggerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });
}

// ---------------------------------------------------------------------------
// 12. FORM SUBMISSION HANDLER
// ---------------------------------------------------------------------------
if (elements.contactForm) {
  elements.contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = elements.contactForm.querySelector('.term-submit-btn');
    const originalHTML = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.innerHTML = '<span>LOGGING TRANSMISSION...</span>';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (elements.formSuccess) {
        elements.formSuccess.classList.add('active');
      }
      if (submitBtn) {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
      }
      
      // Submit the form natively to FormSubmit (bypassing event listeners)
      elements.contactForm.submit();
      elements.contactForm.reset();
    }, 1200);
  });
}

if (elements.successClose) {
  elements.successClose.addEventListener('click', () => {
    if (elements.formSuccess) {
      elements.formSuccess.classList.remove('active');
    }
  });
}

// ---------------------------------------------------------------------------
// 13. 3D MOUSE TILT ENGINE
// ---------------------------------------------------------------------------
function init3DTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update glow layer position
      const glow = card.querySelector('.card-glow-layer');
      if (glow) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', percentX + '%');
        card.style.setProperty('--mouse-y', percentY + '%');
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// ---------------------------------------------------------------------------
// 14. VELOCITY 3D SCROLL & PARALLAX ENGINE
// ---------------------------------------------------------------------------
function initScrollParallax() {
  const portrait = elements.heroPortraitWrap;
  const containers = document.querySelectorAll('.ops-container, .about-container, .thinking-container, .contact-container');

  containers.forEach(c => {
    c.style.transformStyle = 'preserve-3d';
    c.style.willChange = 'transform';
  });

  let lastScrollY = window.scrollY;
  let velocity = 0;
  let targetVelocity = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Calculate velocity for 3D effect
    targetVelocity = (currentScrollY - lastScrollY) * 0.18;
    lastScrollY = currentScrollY;

    // Hero portrait parallax
    if (portrait) {
      const offset = currentScrollY * 0.3;
      portrait.style.transform = `translate(-50%, calc(-50% + ${offset}px)) scale(${1 + currentScrollY * 0.0002})`;
    }
  }, { passive: true });

  function render3D() {
    // Apply friction and lerp for a smooth spring effect
    targetVelocity *= 0.88; 
    velocity += (targetVelocity - velocity) * 0.12;
    
    // Clamp to prevent extreme distortions
    const clampedVelocity = Math.max(-15, Math.min(15, velocity));
    
    // Only update DOM if velocity is noticeable to save CPU
    if (Math.abs(clampedVelocity) > 0.01) {
      containers.forEach(container => {
        container.style.transform = `perspective(1200px) rotateX(${clampedVelocity}deg) translateY(${clampedVelocity * 1.5}px)`;
      });
    } else {
      containers.forEach(container => {
        container.style.transform = `perspective(1200px) rotateX(0deg) translateY(0px)`;
      });
    }
    
    requestAnimationFrame(render3D);
  }
  
  render3D();
}

// ---------------------------------------------------------------------------
// 15. CYBERSECURITY CHATBOT ENGINE
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// 15. TEXT SCRAMBLE ENGINE (HACKER AESTHETIC)
// ---------------------------------------------------------------------------
class TextScrambler {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________01';
    this.update = this.update.bind(this);
  }
  scramble(targetText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, targetText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = targetText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 30);
      this.queue.push({ from, to, start, end, char: '' });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span style="color: var(--accent-pink); font-family: monospace;">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function runScramble() {
  document.querySelectorAll('.scramble-text').forEach(el => {
    const target = el.getAttribute('data-value') || el.innerText;
    const scrambler = new TextScrambler(el);
    scrambler.scramble(target);
  });
}

// ---------------------------------------------------------------------------
// 16. DYNAMIC HERO ROLE SWITCHING LOOP
// ---------------------------------------------------------------------------
let currentHeroMode = 'red';
const heroSolidText = document.getElementById('heroSolidText');
const heroOutlineText = document.getElementById('heroOutlineText');

function switchHeroRole() {
  if (!heroSolidText || !heroOutlineText) return;
  
  currentHeroMode = currentHeroMode === 'red' ? 'blue' : 'red';
  
  const solidTarget = currentHeroMode === 'red' ? 'Red Teamer' : 'Blue Teamer';
  const outlineTarget = currentHeroMode === 'red' ? 'Penetration Tester' : 'Defender';
  
  heroSolidText.setAttribute('data-value', solidTarget);
  heroOutlineText.setAttribute('data-value', outlineTarget);
  
  const solidScrambler = new TextScrambler(heroSolidText);
  const outlineScrambler = new TextScrambler(heroOutlineText);
  
  solidScrambler.scramble(solidTarget);
  outlineScrambler.scramble(outlineTarget);
}

// ---------------------------------------------------------------------------
// 17. PARTICLE NETWORK ENGINE (CYBER MESH)
// ---------------------------------------------------------------------------
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);
  
  const particles = [];
  const maxParticles = 45;
  const connectionDist = 120;
  let mouse = { x: null, y: null, active: false };
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  // Set initial size
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  
  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    mouse.active = false;
  });
  
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
      
      // Attract towards cursor for an innovative feel
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          this.x += (dx / dist) * force * 2.5;
          this.y += (dy / dist) * force * 2.5;
        }
      }
    }
    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      // High contrast dots: white in dark theme, black in light theme
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const lineColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update();
      p.draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < connectionDist) {
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = (1 - dist / connectionDist) * 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
      
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          ctx.strokeStyle = isDark ? `rgba(255, 0, 85, ${(1 - dist / 200) * 0.4})` : `rgba(255, 0, 85, ${(1 - dist / 200) * 0.4})`;
          ctx.lineWidth = (1 - dist / 200) * 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ---------------------------------------------------------------------------
// 18. MAGNETIC CURSOR & ACTION ELEMENTS
// ---------------------------------------------------------------------------
function initMagneticElements() {
  if (window.innerWidth <= 1024) return;
  
  const magneticEls = document.querySelectorAll('.magnetic');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
      
      if (elements.customCursor) {
        elements.customCursor.style.width = '55px';
        elements.customCursor.style.height = '55px';
        elements.customCursor.style.borderColor = 'var(--accent-pink)';
        elements.customCursor.style.backgroundColor = 'rgba(255, 0, 85, 0.06)';
      }
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      if (elements.customCursor) {
        elements.customCursor.style.width = '';
        elements.customCursor.style.height = '';
        elements.customCursor.style.borderColor = '';
        elements.customCursor.style.backgroundColor = '';
      }
    });
  });
}

// ---------------------------------------------------------------------------
// 19. MOBILE NAVIGATION ENGINE
// ---------------------------------------------------------------------------
function initMobileNav() {
  const btn = elements.hamburgerBtn;
  const overlay = elements.mobileNavOverlay;
  if (!btn || !overlay) return;

  function toggleMenu() {
    const isOpen = btn.classList.toggle('open');
    overlay.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    overlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    btn.classList.remove('open');
    overlay.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close on overlay background click (outside drawer)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMenu();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Close when any mobile nav link is clicked
  const mobileLinks = overlay.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

// ---------------------------------------------------------------------------
// 20. INITIALIZATION
// ---------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  setupCursorHovers();
  initHowIWorkToggle();
  init3DTilt();
  initScrollParallax();
  initParticles();
  runScramble();
  initMagneticElements();
  initMobileNav();
  
  // Scramble switch hero roles periodically every 5.5s
  setInterval(switchHeroRole, 5500);
});
