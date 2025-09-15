/**
 * Glass Navbar Effect
 * This script adds scroll-based effects to the navbar
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('header');
  
  // Add the glass effect class to the navbar
  navbar.classList.add('navbar-glass');
  
  // Function to handle scroll events
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Call once on page load to set initial state
  handleScroll();
  
    
  // Add decorative elements to the page
  addDecorativeElements();
});

// Function to add decorative elements to the page
function addDecorativeElements() {
  // Add decorative circles to the hero section
  const heroSection = document.querySelector('section');
  if (heroSection) {
    const circle1 = document.createElement('div');
    circle1.className = 'decorative-circle';
    circle1.style.width = '300px';
    circle1.style.height = '300px';
    circle1.style.top = '20%';
    circle1.style.left = '10%';
    
    const circle2 = document.createElement('div');
    circle2.className = 'decorative-circle';
    circle2.style.width = '200px';
    circle2.style.height = '200px';
    circle2.style.bottom = '30%';
    circle2.style.right = '15%';
    
    heroSection.style.position = 'relative';
    heroSection.style.overflow = 'hidden';
    heroSection.appendChild(circle1);
    heroSection.appendChild(circle2);
  }
  
  // Add gradient text effect to headings
  const headings = document.querySelectorAll('h1, h2');
  headings.forEach(heading => {
    if (!heading.closest('footer')) {
      heading.classList.add('gradient-text');
    }
  });
  
  // Add glass effect to CTA box
  const ctaBox = document.querySelector('.bg-\[\#4EFFB2\]');
  if (ctaBox) {
    ctaBox.classList.remove('bg-[#4EFFB2]');
    ctaBox.classList.add('card-glass', 'gradient-border');
  }
  
  // Add floating effect to hero image
  const heroImage = document.querySelector('.hero-animation');
  if (heroImage) {
    heroImage.classList.add('floating');
  }
}