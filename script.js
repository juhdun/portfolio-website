document.addEventListener("DOMContentLoaded", () => {
  const toTopBtn = document.getElementById("toTopBtn");

  if (!toTopBtn) return;

  // Show/hide on scroll
  window.addEventListener("scroll", () => {
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
});
