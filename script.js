/**
 * Akuri Odontologia - JavaScript
 * Ultra-Minimalist Black & White Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  initMobileMenu();

  // Header Scroll Effect
  initHeaderScroll();

  // Scroll Animations (Intersection Observer)
  initScrollAnimations();

  // Depoimentos Slider
  initDepoimentosSlider();

  // Smooth Scroll for Anchor Links
  initSmoothScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMobile = document.getElementById('navMobile');

  if (!menuToggle || !navMobile) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
  });

  // Close menu when clicking a link
  const mobileLinks = navMobile.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMobile.classList.remove('active');
    });
  });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Depoimentos Slider
 */
function initDepoimentosSlider() {
  const depoimentos = document.querySelectorAll('.depoimento');
  const dots = document.querySelectorAll('.depoimentos-dots .dot');

  if (!depoimentos.length || !dots.length) return;

  let currentIndex = 0;
  let autoPlayInterval;

  function showDepoimento(index) {
    // Hide all
    depoimentos.forEach(dep => {
      dep.classList.remove('active');
    });
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Show selected
    depoimentos[index].classList.add('active');
    dots[index].classList.add('active');

    currentIndex = index;
  }

  function nextDepoimento() {
    const nextIndex = (currentIndex + 1) % depoimentos.length;
    showDepoimento(nextIndex);
  }

  // Auto-play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextDepoimento, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Click on dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      showDepoimento(index);
      startAutoPlay();
    });
  });

  // Start auto-play
  startAutoPlay();

  // Pause on hover
  const slider = document.querySelector('.depoimentos-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
  }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
