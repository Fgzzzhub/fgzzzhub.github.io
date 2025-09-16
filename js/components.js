/**
 * Creates a reusable image component with proper styling, animations, and error handling
 * @param {string} src - The source URL of the image
 * @param {string} alt - Alternative text for the image
 * @param {Object} options - Additional options for the image
 * @param {string} options.className - Additional CSS classes to apply
 * @param {string} options.width - Width of the image (e.g., 'full', '1/2', '80')
 * @param {string} options.height - Height of the image (e.g., 'auto', '80')
 * @param {string} options.objectFit - Object-fit property (e.g., 'cover', 'contain')
 * @param {string} options.rounded - Border radius (e.g., 'none', 'sm', 'md', 'lg', 'full')
 * @param {Function} options.onClick - Click event handler
 * @param {string} options.animation - Animation effect (e.g., 'fade', 'zoom', 'slide')
 * @param {string} options.transition - Transition effect (e.g., 'smooth', 'bounce', 'elastic')
 * @param {boolean} options.lazyLoad - Whether to lazy load the image
 * @returns {HTMLImageElement} - The created image element
 */
function img(src, alt, options = {}) {
  // Default options
  const defaults = {
    className: '',
    width: 'full',
    height: 'auto',
    objectFit: 'cover',
    rounded: 'none',
    onClick: null,
    animation: '',
    transition: 'smooth',
    lazyLoad: true
  };

  // Merge defaults with provided options
  const settings = { ...defaults, ...options };
  
  // Create image element
  const imgElement = document.createElement('img');
  
  // Set required attributes
  imgElement.alt = alt || '';
  
  // Apply lazy loading if enabled
  if (settings.lazyLoad) {
    imgElement.loading = 'lazy';
    // Add a placeholder while image loads
    imgElement.style.backgroundColor = '#f3f4f6';
    // Add loading animation
    imgElement.classList.add('img-loading');
  }
  
  // Set source after setting up lazy loading
  imgElement.src = src;
  
  // Handle width
  if (settings.width === 'full') {
    imgElement.classList.add('w-full');
  } else if (settings.width.includes('/')) {
    // Handle fractional widths like '1/2', '1/3', etc.
    imgElement.classList.add(`w-${settings.width.replace('/', '\/').replace(' ', '')}`);
  } else {
    // Handle numeric widths
    imgElement.classList.add(`w-${settings.width}`);
  }
  
  // Handle height
  if (settings.height === 'auto') {
    imgElement.classList.add('h-auto');
  } else {
    imgElement.classList.add(`h-${settings.height}`);
  }
  
  // Handle object-fit
  imgElement.classList.add(`object-${settings.objectFit}`);
  
  // Handle border radius
  if (settings.rounded !== 'none') {
    imgElement.classList.add(`rounded-${settings.rounded}`);
  }
  
  // Add transition effects
  imgElement.classList.add('transition-all');
  imgElement.classList.add('duration-300');
  
  // Add specific transition type
  if (settings.transition === 'smooth') {
    imgElement.classList.add('ease-in-out');
  } else if (settings.transition === 'bounce') {
    imgElement.classList.add('ease-bounce');
  } else if (settings.transition === 'elastic') {
    imgElement.classList.add('ease-elastic');
  }
  
  // Add animation if specified
  if (settings.animation) {
    imgElement.classList.add(`animate-${settings.animation}`);
  }
  
  // Add any additional classes
  if (settings.className) {
    settings.className.split(' ').forEach(cls => {
      if (cls) imgElement.classList.add(cls);
    });
  }
  
  // Add click handler if provided
  if (typeof settings.onClick === 'function') {
    imgElement.addEventListener('click', settings.onClick);
    imgElement.style.cursor = 'pointer';
    // Add subtle hover effect for clickable images
    imgElement.classList.add('hover:brightness-105');
  }
  
  // Add load event to remove loading state
  imgElement.addEventListener('load', () => {
    imgElement.classList.remove('img-loading');
    imgElement.classList.add('img-loaded');
  });
  
  // Add error handling
  imgElement.addEventListener('error', () => {
    console.error(`Failed to load image: ${src}`);
    imgElement.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23f0f0f0"%3E%3C/rect%3E%3Ctext x="50%" y="50%" font-size="5" text-anchor="middle" alignment-baseline="middle" font-family="sans-serif" fill="%23999999"%3EImage not found%3C/text%3E%3C/svg%3E';
    imgElement.classList.remove('img-loading');
  });
  
  return imgElement;
}

/**
 * Helper function to replace all img tags in a container with the img component
 * @param {string} containerSelector - CSS selector for the container
 * @param {Object} defaultOptions - Default options to apply to all images
 * @param {boolean} staggered - Whether to apply staggered animations
 */
function replaceImagesWithComponent(containerSelector, defaultOptions = {}, staggered = false) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const imgTags = container.querySelectorAll('img');
  imgTags.forEach((imgTag, index) => {
    // Get attributes from the original img tag
    const src = imgTag.getAttribute('src');
    const alt = imgTag.getAttribute('alt') || '';
    
    // Extract classes that might represent styling
    const classes = imgTag.className.split(' ');
    const options = { ...defaultOptions };
    
    // Parse width and height from classes or style
    classes.forEach(cls => {
      if (cls.startsWith('w-')) options.width = cls.replace('w-', '');
      if (cls.startsWith('h-')) options.height = cls.replace('h-', '');
      if (cls.startsWith('rounded-')) options.rounded = cls.replace('rounded-', '');
      if (cls.startsWith('object-')) options.objectFit = cls.replace('object-', '');
      if (cls.startsWith('animate-')) options.animation = cls.replace('animate-', '');
    });
    
    // Apply staggered animations if enabled
    if (staggered && options.animation) {
      // Add a delay based on the index
      const delay = index * 0.15; // 150ms between each image
      const wrapper = document.createElement('div');
      wrapper.style.animationDelay = `${delay}s`;
      wrapper.style.opacity = '0';
      wrapper.classList.add('animate-fade-in');
      
      // Create new image component
      const newImg = img(src, alt, options);
      
      // Add the image to the wrapper
      wrapper.appendChild(newImg);
      
      // Replace the original img tag with the wrapper
      imgTag.parentNode.replaceChild(wrapper, imgTag);
    } else {
      // Create new image component
      const newImg = img(src, alt, options);
      
      // Replace the original img tag
      imgTag.parentNode.replaceChild(newImg, imgTag);
    }
  });
}

/**
 * Apply hover effects to images in a container
 * @param {string} containerSelector - CSS selector for the container
 * @param {string} effect - The hover effect to apply ('zoom', 'brighten', 'lift', etc.)
 */
function applyImageHoverEffects(containerSelector, effect = 'zoom') {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    // Add transition for smooth effects
    img.classList.add('transition-all', 'duration-300');
    
    // Apply the requested effect
    switch(effect) {
      case 'zoom':
        img.classList.add('hover:scale-105');
        break;
      case 'brighten':
        img.classList.add('hover:brightness-110');
        break;
      case 'lift':
        img.classList.add('hover-lift');
        break;
      case 'rotate':
        img.classList.add('hover:rotate-2');
        break;
      case 'shadow':
        img.classList.add('hover:shadow-lg');
        break;
      default:
        img.classList.add('hover:scale-105');
    }
  });
}

/**
 * Example usage:
 * 
 * // Basic usage
 * const myImage = img('/path/to/image.jpg', 'Description');
 * document.querySelector('.container').appendChild(myImage);
 * 
 * // Advanced usage
 * const profilePic = img('assets/profile.jpg', 'Profile Picture', {
 *   width: '32',
 *   height: '32',
 *   rounded: 'full',
 *   className: 'border-2 border-gray-200',
 *   onClick: () => alert('Profile clicked!')
 * });
 * document.querySelector('.profile').appendChild(profilePic);
 * 
 * // Replace all images in a container
 * replaceImagesWithComponent('.news-section', { 
 *   rounded: 'lg',
 *   className: 'shadow-md'
 * });
 */