import './style.css'
import trabajo1 from './assets/trabajo-1.jpg'
import trabajo2 from './assets/trabajo-2.jpg'
import trabajo3 from './assets/trabajo-3.jpg'
import trabajo4 from './assets/trabajo-4.jpg'
import trabajo5 from './assets/trabajo-5.jpg'
import trabajo6 from './assets/trabajo-6.jpg'
import trabajo7 from './assets/trabajo-7.jpg'
import trabajo8 from './assets/trabajo-8.jpg'
import trabajo9 from './assets/trabajo-9.jpg'
import trabajo10 from './assets/trabajo-10.jpg'

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

  // --- CAROUSEL DE PROYECTOS DESTACADOS ---

  // Estructura de Datos (Fácil de extender por el usuario)
  // Reemplaza los archivos importados arriba o añade nuevos objetos aquí
  const PROJECTS_DATA = [
    {
      id: 1,
      title: "Escalera Residencial de Diseño",
      category: "residencial",
      description: "Diseño e instalación de escalera interior de madera noble torneada a mano, optimizando el espacio y aportando calidez.",
      image: trabajo1 // Reemplazar con la ruta de tu imagen local importada arriba
    },
    {
      id: 2,
      title: "Construcción de Vivienda Unifamiliar",
      category: "residencial",
      description: "Montaje exterior de paneles térmicos estructurados con barrera de humedad Tyvek y carpintería de madera a medida.",
      image: trabajo2
    },
    {
      id: 3,
      title: "Pintura y Reparación de Fachada Comercial",
      category: "comercial",
      description: "Remodelación en altura utilizando andamios certificados. Reparación de muros, impermeabilización y acabados corporativos.",
      image: trabajo3
    },
    {
      id: 4,
      title: "Estructura de Techumbre en Obra Gruesa",
      category: "residencial",
      description: "Levantamiento de vigas de madera nativa y pilares estructurales integrados al entorno natural.",
      image: trabajo4
    },
    {
      id: 5,
      title: "Vivienda Unifamiliar en Etapa de Revestimiento",
      category: "residencial",
      description: "Colocación de revestimiento exterior tipo Siding e instalación de ventanas termo-panel en terraza de madera.",
      image: trabajo5
    },
    {
      id: 6,
      title: "Remodelación de Baño con Espejo LED",
      category: "residencial",
      description: "Renovación completa de baño con cerámica clara de gran formato, mampara de ducha de vidrio y espejo con iluminación LED integrada.",
      image: trabajo6
    },
    {
      id: 7,
      title: "Construcción de Galpón Industrial",
      category: "industrial",
      description: "Levantamiento de estructura metálica de gran envergadura y colocación de cubiertas y revestimientos de zinc acanalado.",
      image: trabajo7
    },
    {
      id: 8,
      title: "Vivienda Unifamiliar Terminada",
      category: "residencial",
      description: "Casa residencial entregada con revestimiento exterior pintado en tonos crema, techumbre oscura y terminaciones finas.",
      image: trabajo8
    },
    {
      id: 9,
      title: "Casa de Campo Frente al Bosque",
      category: "residencial",
      description: "Vivienda rústica-moderna en etapa avanzada con techumbre de teja asfáltica y vigas de madera a la vista en pórtico de entrada.",
      image: trabajo9
    },
    {
      id: 10,
      title: "Montaje de Estructura de Techumbre",
      category: "residencial",
      description: "Construcción de cerchas y vigas de madera en segundo nivel sobre base de hormigón armado.",
      image: trabajo10
    }
  ];

  const slidesContainer = document.getElementById('carousel-slides');
  const emptyState = document.getElementById('carousel-empty');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  const filterBtns = document.querySelectorAll('.carousel-filter-btn');

  let filteredProjects = [...PROJECTS_DATA];
  let currentIndex = 0;
  let autoplayInterval = null;

  // Renderizar slides y dots
  const renderCarousel = () => {
    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    if (filteredProjects.length === 0) {
      emptyState.classList.remove('hidden');
      prevBtn.classList.add('hidden');
      nextBtn.classList.add('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    
    // Mostrar/ocultar flechas si solo hay 1 imagen
    if (filteredProjects.length <= 1) {
      prevBtn.classList.add('hidden');
      nextBtn.classList.add('hidden');
    } else {
      prevBtn.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
    }

    // Crear Slides
    filteredProjects.forEach((project, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 z-0';
      slide.setAttribute('data-index', index);
      slide.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover select-none" />
        <div class="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
        <div class="absolute bottom-16 left-0 right-0 p-6 md:p-12 text-white">
          <div class="max-w-3xl transform translate-y-4 transition-all duration-500 carousel-text-container">
            <span class="inline-block px-3 py-1 bg-secondary text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-3 shadow-md">
              ${project.category}
            </span>
            <h3 class="text-xl md:text-3xl font-extrabold font-headings mb-2 leading-tight">
              ${project.title}
            </h3>
            <p class="text-xs md:text-sm text-slate-300 max-w-2xl font-body leading-relaxed">
              ${project.description}
            </p>
          </div>
        </div>
      `;
      slidesContainer.appendChild(slide);

      // Crear Dots
      const dot = document.createElement('button');
      dot.className = 'carousel-dot w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer bg-white/40';
      dot.setAttribute('data-index', index);
      dot.setAttribute('aria-label', `Ir al slide ${index + 1}`);
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });

    currentIndex = 0;
    showSlide(currentIndex);
    startAutoplay();
  };

  // Mostrar slide activo
  const showSlide = (index) => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (slides.length === 0) return;

    // Efecto bucle continuo
    if (index >= filteredProjects.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = filteredProjects.length - 1;
    } else {
      currentIndex = index;
    }

    // Activar/desactivar slides
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active-slide');
      } else {
        slide.classList.remove('active-slide');
      }
    });

    // Activar/desactivar dots
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('bg-secondary', 'scale-125');
        dot.classList.remove('bg-white/40');
      } else {
        dot.classList.remove('bg-secondary', 'scale-125');
        dot.classList.add('bg-white/40');
      }
    });
  };

  // Controles
  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  // Autoplay
  const startAutoplay = () => {
    stopAutoplay();
    if (filteredProjects.length > 1) {
      autoplayInterval = setInterval(nextSlide, 4000);
    }
  };

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  };

  const resetAutoplay = () => {
    startAutoplay();
  };

  // Filtros de Categorías
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover clase activa de botones
      filterBtns.forEach(b => {
        b.classList.remove('bg-primary', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-600');
      });
      // Añadir clase activa a botón clicado
      btn.classList.remove('bg-slate-100', 'text-slate-600');
      btn.classList.add('bg-primary', 'text-white');

      const filterValue = btn.getAttribute('data-filter');

      // Filtrar datos
      if (filterValue === 'all') {
        filteredProjects = [...PROJECTS_DATA];
      } else {
        filteredProjects = PROJECTS_DATA.filter(project => project.category === filterValue);
      }

      // Reiniciar y renderizar
      renderCarousel();
      resetAutoplay();
    });
  });

  // Iniciar carrusel al cargar la página
  renderCarousel();

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
