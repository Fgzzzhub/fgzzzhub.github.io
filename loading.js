/**
 * Loading animations and visual feedback
 * This script adds loading animations and visual feedback to the website
 */

document.addEventListener('DOMContentLoaded', () => {
  // Show page loading animation
  showPageLoadingAnimation();
  
  // Add loading indicators to images
  addImageLoadingIndicators();
  
  // Add button click feedback
  addButtonClickFeedback();
});

/**
 * Shows a page loading animation when the page first loads
 */
function showPageLoadingAnimation() {
  // Create loading overlay
  const overlay = document.createElement('div');
  overlay.classList.add('loading-overlay');
  overlay.innerHTML = `
    <div class="loading-spinner"></div>
    <p>Loading...</p>
  `;
  document.body.appendChild(overlay);
  
  // Remove overlay when page is fully loaded
  window.addEventListener('load', () => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.remove();
    }, 500); // Remove after fade animation completes
  });
}

/**
 * Adds loading indicators to images
 */
function addImageLoadingIndicators() {
  // Add loading indicator to all images that aren't loaded yet
  const images = document.querySelectorAll('img:not(.img-loaded)');
  
  images.forEach(img => {
    // Skip images that are already loaded
    if (img.complete) return;
    
    // Create a loading indicator
    const container = document.createElement('div');
    container.classList.add('img-loading-container');
    container.style.width = img.width + 'px';
    container.style.height = img.height + 'px';
    
    // Add shimmer effect
    const shimmer = document.createElement('div');
    shimmer.classList.add('shimmer-effect');
    container.appendChild(shimmer);
    
    // Replace image with container temporarily
    img.parentNode.insertBefore(container, img);
    img.style.display = 'none';
    
    // Show image when loaded
    img.addEventListener('load', () => {
      img.style.display = '';
      container.remove();
      img.classList.add('img-loaded');
      img.classList.add('fade-in');
    });
    
    // Handle error
    img.addEventListener('error', () => {
      container.innerHTML = '<div class="img-error">Image failed to load</div>';
    });
  });
}

/**
 * Adds visual feedback to buttons when clicked
 */
function addButtonClickFeedback() {
  const buttons = document.querySelectorAll('button, .btn, [role="button"]');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Add a temporary class for click animation
      button.classList.add('btn-clicked');
      
      // Remove the class after animation completes
      setTimeout(() => {
        button.classList.remove('btn-clicked');
      }, 300);
    });
  });
}

/**
 * Shows a loading indicator for form submissions
 * @param {HTMLFormElement} form - The form element
 */
function addFormSubmitLoading(form) {
  form.addEventListener('submit', (e) => {
    // Prevent default if you want to handle submission with AJAX
    // e.preventDefault();
    
    // Disable submit button and show loading state
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-small"></span> Processing...';
      
      // For demo purposes, simulate a form submission
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        // Here you would handle the actual form submission response
      }, 2000);
    }
  });
}

// Export functions for use in other files
window.loadingAnimations = {
  showPageLoadingAnimation,
  addImageLoadingIndicators,
  addButtonClickFeedback,
  addFormSubmitLoading
};