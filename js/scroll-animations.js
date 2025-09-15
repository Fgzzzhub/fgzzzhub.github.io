/**
 * Scroll Animations
 * This script adds scroll-based animations to elements with specific classes
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get all elements that should animate on scroll
  const animatedElements = document.querySelectorAll('.scroll-reveal');
  
  // Set up the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is in the viewport
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('revealed');
        // Stop observing the element after it's been revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when at least 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust the trigger point (negative values trigger later)
  });
  
  // Start observing each element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Helper function to add scroll-reveal class to elements
  function setupScrollAnimations() {
    // Add scroll-reveal class to sections that should animate
    const sections = document.querySelectorAll('section:not(.hero-section)');
    sections.forEach((section, index) => {
      section.classList.add('scroll-reveal');
      
      // Add different animation directions based on index
      if (index % 2 === 0) {
        section.classList.add('from-left');
      } else {
        section.classList.add('from-right');
      }
    });
    
    // Add scroll-reveal to news cards
    const newsCards = document.querySelectorAll('.swiper-slide');
    newsCards.forEach((card, index) => {
      card.classList.add('scroll-reveal');
      card.classList.add('fade-in');
      card.style.transitionDelay = `${index * 0.1}s`; // Staggered animation
    });
  }
  
  // Run setup
  setupScrollAnimations();
});