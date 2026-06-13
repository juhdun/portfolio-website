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

  // Mobile Portfolio Slider
  function initMobileSlider() {
    const slider = document.querySelector('.portfolio-slider');
    if (!slider) return;
    
    const slidesContainer = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const indicatorsContainer = document.querySelector('.slide-indicators');
    
    if (!slidesContainer || slides.length === 0) return;
    
    let currentSlide = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    
    // Clear existing indicators and create new ones
    indicatorsContainer.innerHTML = '';
    
    // Create indicators for each portfolio card
    const portfolioCards = document.querySelectorAll('.portfolio-slider .card');
    portfolioCards.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('slide-indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.slide-indicator');
    
    function updateSlider() {
      // Update slide position
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update active states
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
      });
      
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
      });
    }
    
    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      updateSlider();
    }
    
    function nextSlide() {
      const portfolioCards = document.querySelectorAll('.portfolio-slider .card');
      currentSlide = (currentSlide + 1) % portfolioCards.length;
      updateSlider();
    }
    
    function prevSlide() {
      const portfolioCards = document.querySelectorAll('.portfolio-slider .card');
      currentSlide = (currentSlide - 1 + portfolioCards.length) % portfolioCards.length;
      updateSlider();
    }
    
    // Button navigation
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    slidesContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide(); // Swipe left, go next
        } else {
          prevSlide(); // Swipe right, go prev
        }
      }
    }
    
    // Mouse drag support
    slidesContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      slidesContainer.style.cursor = 'grabbing';
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentX = e.pageX;
      const diff = currentX - startX;
      slidesContainer.style.transform = `translateX(calc(-${currentSlide * 100}% + ${diff}px))`;
    });
    
    document.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      slidesContainer.style.cursor = 'grab';
      
      const diff = currentX - startX;
      const threshold = slidesContainer.offsetWidth / 4;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        updateSlider(); // Snap back to current slide
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }
    
    // Start auto-play on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    
    // Initialize
    updateSlider();
    startAutoPlay();
  }
  
  // Only initialize slider on mobile
  if (window.innerWidth <= 768) {
    initMobileSlider();
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      initMobileSlider();
    }
  });

  });
