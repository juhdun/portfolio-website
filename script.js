document.addEventListener("DOMContentLoaded", () => {
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

  // Add animation to portfolio cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  });
