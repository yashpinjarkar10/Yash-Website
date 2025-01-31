/**
* Template Name: iPortfolio
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 40,  // Faster typing (default was 100)
      backSpeed: 30,  // Faster deleting (default was 50)
      backDelay: 800  // Less delay before switching text (default was 2000)
    });
  }
  

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

document.addEventListener("DOMContentLoaded", function () {
  async function fetchGitHubRepos() {
      const githubUsername = "yashpinjarkar10";  // Replace with your GitHub username
      try {
          const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
          const repos = await response.json();
          document.getElementById("github-repos").textContent = repos.length;
      } catch (error) {
          document.getElementById("github-repos").textContent = "Error fetching data";
          console.error("GitHub API error:", error);
      }
  }

  fetchGitHubRepos();
});
document.addEventListener("DOMContentLoaded", function () {
  const projects = [
      {
          title: "Financial Market Analysis Tool",
          image: "assets/img/project/SMAA.png",
          technologies: "Python, Streamlit, Gemini API",
          github: "https://github.com/chirag-agrawal24/stock_market_analysis",
          live: "https://finanancial-market-analysis.streamlit.app/"
      },
      {
          title: "AI Chatbot",
          image: "assets/img/portfolio/chatbot.png",
          technologies: "Python, LangChain, OpenAI API",
          github: "https://github.com/yashpinjarkar10/AI-Chatbot",
          live: "#"
      },
      {
          title: "Pneumonia Detection",
          image: "assets/img/portfolio/weather-app.png",
          technologies: "Python , Tensorflow, OpenCV ",
          github: "https://github.com/yashpinjarkar10/MiniProject",
          live: "https://weather-app-demo.com"
      },
      {
          title: "E-commerce Website",
          image: "assets/img/portfolio/ecommerce.png",
          technologies: "React, Node.js, MongoDB",
          github: "https://github.com/yashpinjarkar10/Ecommerce-Site",
          live: "https://myecommerce.com"
      },
      {
        title: "E-commerce Website",
        image: "assets/img/portfolio/ecommerce.png",
        technologies: "React, Node.js, MongoDB",
        github: "https://github.com/yashpinjarkar10/Ecommerce-Site",
        live: "https://myecommerce.com"
      },
      {
      title: "E-commerce Website",
      image: "assets/img/portfolio/ecommerce.png",
      technologies: "React, Node.js, MongoDB",
      github: "https://github.com/yashpinjarkar10/Ecommerce-Site",
      live: "https://myecommerce.com"
      }
  ];

  const portfolioContainer = document.getElementById("portfolio-items");
  
  projects.forEach(project => {
      const projectHTML = `
          <div class="col-lg-4 col-md-6 portfolio-item">
              <div class="portfolio-wrap">
                  <img src="${project.image}" class="img-fluid" alt="">
                  <div class="portfolio-info">
                      <h4>${project.title}</h4>
                      <p>${project.technologies}</p>
                      <div class="portfolio-links">
                          <a href="${project.github}" target="_blank" title="GitHub"><i class="bx bxl-github"></i></a>
                          <a href="${project.live}" target="_blank" title="Live Demo"><i class="bx bx-link"></i></a>
                      </div>
                  </div>
              </div>
          </div>
      `;
      portfolioContainer.innerHTML += projectHTML;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const certificates = [
    {
      title: "Data Structure and Algorithm Certificate",
      image: "assets/img/certificates/dsa.png",
      description: "Certificate for completing the Data Structure and Algorithm course.",
      link: "https://example.com/certificate/ml"
    },
    {
      title: "Generative AI with Diffusion Models Certificate",
      image: "assets/img/certificates/defusion.png",
      description: "Certificate for completing Hands-On Generative AI with Diffusion Models: Building Real-World Applications course.",
      link: "https://example.com/certificate/python"
    },
    {
      title: "Certificate of merit",
      image: "assets/img/certificates/naukri.png",
      description: "Certificate of merit for Naukri Campus Young Turks",
      link: "https://example.com/certificate/datascience"
    },
    {
      title: "Certificate of merit",
      image: "assets/img/certificates/naukri.png",
      description: "Certificate of merit for Naukri Campus Young Turks",
      link: "https://example.com/certificate/datascience"
    },
    {
      title: "Certificate of merit",
      image: "assets/img/certificates/naukri.png",
      description: "Certificate of merit for Naukri Campus Young Turks",
      link: "https://example.com/certificate/datascience"
    },
    // Add more certificates as needed
  ];

  const certificatesContainer = document.querySelector(".certificates-container");

  certificates.forEach(certificate => {
    const certificateHTML = `
      <div class="col-lg-4 col-md-6 certificate-item">
        <div class="certificate-wrap">
          <img src="${certificate.image}" class="img-fluid" alt="${certificate.title}">
          <div class="certificate-info">
            <h4>${certificate.title}</h4>
            <p>${certificate.description}</p>
          </div>
          <a href="${certificate.link}" target="_blank" class="certificate-button">View Certificate</a>
        </div>
      </div>
    `;
    certificatesContainer.innerHTML += certificateHTML;
  });
});


// Initialize GLightbox
const lightbox = GLightbox({
  selector: '.glightbox', // Use the class for GLightbox
  touchNavigation: true, // Enable touch navigation
  loop: true, // Enable looping
  autoplayVideos: true, // Autoplay videos (if any)
});