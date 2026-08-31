document.addEventListener("DOMContentLoaded", () => {

  // Initialize SoftAurora background
  // Wrapped in try/catch: if the OGL CDN script is slow/blocked/fails for a
  // visitor, this would otherwise throw and silently break every other
  // script on the page (nav toggle, typing effect, slider, to-top button).
  try {
    if (window.SoftAurora) {
      const auroraContainer = document.getElementById('soft-aurora');
      if (auroraContainer) {
        new SoftAurora(auroraContainer, {
          speed: 0.6,
          scale: 1.5,
          brightness: 1.0,
          color1: '#ffffff',
          color2: '#a26ba6',
          noiseFrequency: 2.5,
          noiseAmplitude: 1.0,
          bandHeight: 0.5,
          bandSpread: 1.0,
          octaveDecay: 0.1,
          layerOffset: 0,
          colorSpeed: 1.0,
          enableMouseInteraction: true,
          mouseInfluence: 0.25
        });
      }
    }
  } catch (err) {
    console.warn('SoftAurora background failed to initialize:', err);
  }

  // Mobile hamburger nav toggle
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('nav-open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the menu whenever a nav link is tapped
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('nav-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const toTopBtn = document.getElementById("toTopBtn");
  const siteHeader = document.querySelector('.site-header');

  if (!toTopBtn) return;

  // Smart navigation bar hide/show on scroll
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavVisibility() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down - hide nav
      siteHeader.classList.add('nav-hidden');
    } else {
      // Scrolling up - show nav
      siteHeader.classList.remove('nav-hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavVisibility);
      ticking = true;
    }
  }

  window.addEventListener("scroll", () => {
    requestTick();

    // Show/hide to-top button
    if (window.scrollY > 300) {
      toTopBtn.classList.add("show");
      toTopBtn.classList.remove("hide");
    } else {
      toTopBtn.classList.add("hide");
      setTimeout(() => {
        toTopBtn.classList.remove("show");
      }, 300);
    }
  });

  // Scroll to top on click
  toTopBtn.addEventListener("click", (event) => {
    event.preventDefault(); // just in case
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for animations
  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });

  // Typing animation
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;

    function typeText() {
      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
      }
    }

    setTimeout(typeText, 500);
  }

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add animation classes to sections
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    section.classList.add(index % 2 === 0 ? 'fade-in' : 'slide-in-left');
  });

  });
