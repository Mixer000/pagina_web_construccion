import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Header Scroll Effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shadow-md');
      header.classList.replace('py-4', 'py-2');
    } else {
      header.classList.remove('shadow-md');
      header.classList.replace('py-2', 'py-4');
    }
  });

  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => {
        b.classList.remove('bg-primary', 'text-white');
        b.classList.add('bg-gray-100', 'text-text');
      });
      
      // Add active class to clicked button
      btn.classList.remove('bg-gray-100', 'text-text');
      btn.classList.add('bg-primary', 'text-white');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Form Validation
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Select fields to validate
      const fullName = document.getElementById('full_name');
      const email = document.getElementById('email_address');
      const projectType = document.getElementById('project_type');
      const message = document.getElementById('message');

      // Validation function
      const validateField = (field, condition) => {
        const errorMsg = field.nextElementSibling;
        if (!condition) {
          field.classList.add('border-red-500');
          errorMsg.classList.remove('hidden');
          isValid = false;
        } else {
          field.classList.remove('border-red-500');
          errorMsg.classList.add('hidden');
        }
      };

      // Rules
      validateField(fullName, fullName.value.trim() !== '');
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(email, emailRegex.test(email.value.trim()));
      
      validateField(projectType, projectType.value !== '');
      validateField(message, message.value.trim() !== '');

      if (isValid) {
        // Mock successful submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '¡Mensaje Enviado!';
        submitBtn.classList.replace('bg-primary', 'bg-green-600');
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.classList.replace('bg-green-600', 'bg-primary');
        }, 3000);
      }
    });
  }

  // Add simple fade-in keyframes to document
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
});
