// Main app script
document.addEventListener('DOMContentLoaded', function() {
  console.log('Main.js loaded');
  
  // Navigation Handler
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const siteHeader = document.getElementById('site-header');
  
  if (!mobileMenuBtn || !navMenu) return;

  // Toggle mobile menu hamburger
  mobileMenuBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Menu button clicked');
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.site-header') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      
      // Close all dropdowns
      document.querySelectorAll('.dropdown.active').forEach(d => {
        d.classList.remove('active');
      });
    }
  });

  // Track if we need to allow navigation on next click
  let allowNavigationNext = {};

  // Handle dropdown toggle buttons (mobile)
  const dropdownToggleButtons = document.querySelectorAll('.dropdown-toggle');
  dropdownToggleButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      if (window.innerWidth > 768) return; // Only on mobile

      const dropdownContainer = this.closest('.dropdown');
      if (!dropdownContainer) return;
      
      // Close other dropdowns
      document.querySelectorAll('.dropdown.active').forEach(d => {
        if (d !== dropdownContainer) {
          d.classList.remove('active');
        }
      });

      // Toggle this dropdown
      dropdownContainer.classList.toggle('active');
    });
  });

  // Handle dropdown triggers on mobile - now just navigates
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener('click', function(e) {
      // Only handle on mobile
      if (window.innerWidth > 768) {
        return; // Let desktop handle with hover
      }

      const dropdownContainer = this.closest('.dropdown');
      const isActive = dropdownContainer.classList.contains('active');
      
      // If dropdown is already open, navigate to the href
      if (isActive) {
        // Allow navigation by setting window location
        const href = this.getAttribute('href');
        window.location.href = href;
        e.preventDefault();
        return;
      }

      // If not open, expand first (don't navigate yet)
      e.preventDefault();
      e.stopPropagation();
      
      // Close other dropdowns
      document.querySelectorAll('.dropdown.active').forEach(d => {
        if (d !== dropdownContainer) {
          d.classList.remove('active');
        }
      });
      
      // Open this dropdown
      dropdownContainer.classList.add('active');
    });
  });

  // Close menu when clicking a link (except dropdown triggers)
  navMenu.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        // Close the main menu
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        
        // Close all dropdowns
        document.querySelectorAll('.dropdown.active').forEach(d => {
          d.classList.remove('active');
        });
      }
    });
  });
  
  // Scroll behavior - hide header on scroll down, show on scroll up
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      // Scrolling DOWN
      siteHeader.classList.add('header-hidden');
    } else {
      // Scrolling UP
      siteHeader.classList.remove('header-hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }, { passive: true });
  
  // Reset menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      // Close all dropdowns
      document.querySelectorAll('.dropdown.active').forEach(d => {
        d.classList.remove('active');
      });
    }
  });

  // Serve Grid Horizontal Scrolling for Mobile
  const serveGrid = document.querySelector('.serve-grid');
  if (serveGrid && window.innerWidth <= 640) {
    let isDown = false;
    let startX;
    let scrollLeft;

    serveGrid.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - serveGrid.offsetLeft;
      scrollLeft = serveGrid.scrollLeft;
      serveGrid.style.cursor = 'grabbing';
    });

    serveGrid.addEventListener('mouseleave', () => {
      isDown = false;
      serveGrid.style.cursor = 'grab';
    });

    serveGrid.addEventListener('mouseup', () => {
      isDown = false;
      serveGrid.style.cursor = 'grab';
    });

    serveGrid.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - serveGrid.offsetLeft;
      const walk = (x - startX) * 1;
      serveGrid.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    serveGrid.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchScrollLeft = serveGrid.scrollLeft;
    });

    serveGrid.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const touchX = e.touches[0].clientX;
        const walk = (touchStartX - touchX) * 1.5;
        serveGrid.scrollLeft = touchScrollLeft + walk;
      }
    });
  }
  
  // Add any global event listeners or utilities here
  
  // Example: Handle form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Optional: Add form submission handling
    });
  });
});

// Utility functions
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  document.body.prepend(alertDiv);
  
  setTimeout(() => alertDiv.remove(), 5000);
}

// Handle flash messages if present
window.addEventListener('load', function() {
  const successMessages = document.querySelectorAll('.alert-success');
  const errorMessages = document.querySelectorAll('.alert-danger');
  
  if (successMessages.length > 0 || errorMessages.length > 0) {
    // Flash messages auto-dismiss after 5 seconds
    setTimeout(() => {
      [successMessages, errorMessages].forEach(messages => {
        messages.forEach(msg => {
          msg.style.opacity = '0';
          setTimeout(() => msg.remove(), 300);
        });
      });
    }, 5000);
  }
});

// Topbar scroll par show/hide
window.addEventListener('scroll', function() {
  const topbar = document.querySelector('.topbar');
  if (window.scrollY > 100) {
    topbar.classList.add('topbar-visible');
  } else {
    topbar.classList.remove('topbar-visible');
  }
});