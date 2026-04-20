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
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        percentPosition: true
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
      title: "Trading Agent",
      image: "assets/img/project/Screenshot 2025-09-20 220049.png",
      technologies: "LangGraph, Yfianance, Google News, Langsmith, FastAPI",
      description: "An intelligent trading agent that analyzes financial markets using real-time data from Yahoo Finance and Google News. Built with LangGraph for complex agent workflows, integrated with Langsmith for monitoring, and deployed via FastAPI for seamless API access.",
      github: "https://github.com/yashpinjarkar10/Trading-Agent",
      live: "https://yashpinjarkar10-trading-agent.hf.space/"
      },
      {
      title: "Cursor 2D Animation",
      image: "assets/img/project/manim.png",
      technologies: "LangGraph, Manim, Python, LangSmith, SupaBase",
      description: "An innovative tool that generates 2D mathematical animations using cursor movements. Leverages Manim for animation rendering, LangGraph for workflow orchestration, and SupaBase for data persistence. Perfect for creating educational mathematical visualizations.",
      github: "https://github.com/yashpinjarkar10/cursor-2d-animation-frontend",
      live: "https://cursor-2d-animation-frontend.yashpinjarkar2003.workers.dev/"
      },
      {
          title: "Financial Market Analysis Tool",
          image: "assets/img/project/SMAA.png",
          technologies: "Python, Streamlit, Gemini API",
          description: "A comprehensive stock market analysis platform powered by Google's Gemini AI. Provides real-time market insights, technical analysis, and AI-driven predictions through an intuitive Streamlit interface. Helps investors make informed trading decisions.",
          github: "https://github.com/chirag-agrawal24/stock_market_analysis",
          live: "https://finanancial-market-analysis.streamlit.app/"
      },
      {
        title: "Video AI Summarizer Agent",
        image: "assets/img/project/sum.png",
        technologies: "Python, NLP, Streamlit , Phidata, Gemini API",
        description: "An intelligent video summarization agent that extracts key insights from video content. Uses advanced NLP techniques with Gemini AI and Phidata framework to generate concise summaries, saving time for content consumers and researchers.",
        github: "https://github.com/yashpinjarkar10/VidAnalyze",
        live: "https://yashpinjarkar10-vidanalyze.hf.space"
      },
      {
          title: "PineScript Agentic RAG",
          image: "assets/img/project/pine.png",
          technologies: "Python,Pydantic AI, Supabase, Streamlit, Hugging Face Space",
          description: "A Retrieval-Augmented Generation (RAG) system specialized for PineScript trading strategies. Combines Pydantic AI for structured outputs with Supabase vector database to provide intelligent code suggestions and trading strategy recommendations.",
          github: "https://github.com/yashpinjarkar10/Pinescript-Agent",
          live: "https://yashpinjarkar10-pinescript-agent.hf.space"
      },
      {
          title: "AI Chatbot",
          image: "assets/img/project/Gemini_Generated_Image_2rv24f2rv24f2rv2.png",
          technologies: "Python, LangChain, Gemini Model, ChromaDB, Hugging Face, FastAPI",
          description: "A sophisticated conversational AI chatbot built with LangChain and Google's Gemini model. Features long-term memory using ChromaDB vector store, context-aware responses, and a robust FastAPI backend for reliable performance.",
          github: "https://github.com/yashpinjarkar10/Chat-Web",
          live: "https://yashpinjarkar10-webchat1.hf.space/"
      },
      {
        title: "AI Journalist",
        image: "assets/img/project/Gemini_Generated_Image_5jj88l5jj88l5jj8.png",
        technologies: "Python, MCP, Langchain, gTTS, NewsAPI, Streamlit, FastAPI",
        description: "An automated journalism platform that aggregates news from multiple sources using NewsAPI, generates comprehensive articles with LangChain, and converts them to audio using Google Text-to-Speech. Built with MCP architecture for scalability.",
        github: "https://github.com/yashpinjarkar10/AI-Journalist",
        live: "https://github.com/yashpinjarkar10/AI-Journalist"
      },
      {
        title: "Student Performance Predictor",
        image: "assets/img/project/ml.png",
        technologies: "Python, Flask, scikit-learn, pandas, numpy, XGBoost, CatBoost, Docker, HTML/CSS, Jinja2",
        description: "A machine learning application that predicts student academic performance based on various factors. Implements ensemble methods using XGBoost and CatBoost for high accuracy. Deployed in Docker containers with a user-friendly Flask web interface.",
        github: "https://github.com/yashpinjarkar10/mlproject",
        live: "https://yashpinjarkar10-ml-project.hf.space"
      }

  ];

  const portfolioContainer = document.getElementById("portfolio-items");
  
  projects.forEach((project, index) => {
      const projectHTML = `
          <div class="col-lg-4 col-md-4 portfolio-item">
              <div class="portfolio-wrap" onclick="openProjectModal(${index})" style="cursor: pointer;">
                  <img src="${project.image}" class="img-fluid" alt="">
                  <div class="portfolio-info">
                      <h4>${project.title}</h4>
                      <p>${project.technologies}</p>
                      <div class="portfolio-links">
                          <a href="${project.github}" target="_blank" title="GitHub" onclick="event.stopPropagation();"><i class="bx bxl-github"></i></a>
                          <a href="${project.live}" target="_blank" title="Live Demo" onclick="event.stopPropagation();"><i class="bx bx-link"></i></a>
                      </div>
                  </div>
              </div>
          </div>
      `;
      portfolioContainer.innerHTML += projectHTML;
  });
  
  // Store projects globally for modal access
  window.projectsData = projects;
});

document.addEventListener("DOMContentLoaded", function () {
  const certificates = [
    {
      title: "OCI Generative AI Professional Certificate",
      image: "assets/img/certificates/OCI_GEN.png",
      description: "Certificate for Oracle Cloud Infrastructure 2025 Generative AI Professional ",
      link: "https://github.com/yashpinjarkar10/Certificates/blob/main/eCertificate.pdf"
    },
    {
      title: "Data Structure and Algorithm Certificate",
      image: "assets/img/certificates/DSA.png",
      description: "Certificate for completing the Data Structure and Algorithm course.",
      link: "https://github.com/yashpinjarkar10/Certificates/blob/main/1736956677804-certificate.png"
    },
    {
      title: "Generative AI with Diffusion Models Certificate",
      image: "assets/img/certificates/defusion.png",
      description: "Certificate for completing Hands-On Generative AI with Diffusion Models: Building Real-World Applications course.",
      link: "https://github.com/yashpinjarkar10/Certificates/blob/main/CertificateOfCompletion_HandsOn%20Generative%20AI%20with%20Diffusion%20Models%20Building%20RealWorld%20Applications.pdf"
    },
    {
      title: "Applied AI: Hugging Face Transformers Certificate",
      image: "assets/img/certificates/defusion.png",
      description: "Certificate for completing Applied AI: Hugging Face Transformers Building Real-World Applications course.",
      link: "https://github.com/yashpinjarkar10/Certificates/blob/main/CertificateOfCompletion_Applied%20AI%20Getting%20Started%20with%20Hugging%20Face%20Transformers.pdf"
    },
    {
      title: "AI Workshop: Advanced Chatbot Development Certificate",
      image: "assets/img/certificates/defusion.png",
      description: "Certificate for completing AI Workshop: Advanced Chatbot Development Building Real-World Applications course.",
      link: "https://github.com/yashpinjarkar10/Certificates/blob/main/CertificateOfCompletion_AI%20Workshop%20Advanced%20Chatbot%20Development.pdf"
    },
    {
      title: "Certificate of merit",
      image: "assets/img/certificates/naukri.png",
      description: "Certificate of merit for Naukri Campus Young Turks",
      link: "https://github.com/yashpinjarkar10/Certificates/blob/main/young_turks_round_1_achievement.pdf"
    },
    {
      title: "Certificate of Participation",
      image: "assets/img/certificates/AIIIP.png",
      description: "Certificate for participating in the AIIP Aptitude Test",
      link: "https://github.com/yashpinjarkar10/Certificates/blob/main/AIIIP.png"
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





async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const message = inputField.value.trim();
  if (message === "") return;

  appendMessage("You", message);
  inputField.value = "";

  try {
      const response = await fetch("https://yashpinjarkar10-webchat1.hf.space/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: message })
      });

      const data = await response.json();
      appendMessage("Yash", data.answer);
  } catch (error) {
      appendMessage("Yash", "Error connecting to server.");
  }
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender === "You" ? "user" : "bot");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}




document.addEventListener("DOMContentLoaded", function () {
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotPopup = document.getElementById("chatbot-popup");
  const closeChatbot = document.getElementById("close-chatbot");
  const chatbotOverlay = document.getElementById("chatbot-overlay");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  if (chatbotBtn && chatbotPopup && closeChatbot && chatbotOverlay && userInput) {
    const openChatbot = () => {
      chatbotPopup.style.display = "flex";
      chatbotOverlay.style.display = "block";
      document.body.classList.add("chatbot-open");
      userInput.focus();
      ensureChatbotInViewport();
    };

    const closeChatbotPopup = () => {
      chatbotPopup.style.display = "none";
      chatbotOverlay.style.display = "none";
      document.body.classList.remove("chatbot-open");
    };

    const ensureChatbotInViewport = () => {
      if (chatbotPopup.style.display === "none") return;

      const margin = 8;
      const rect = chatbotPopup.getBoundingClientRect();
      let left = rect.left;
      let top = rect.top;

      if (rect.right > window.innerWidth - margin) left -= rect.right - (window.innerWidth - margin);
      if (rect.bottom > window.innerHeight - margin) top -= rect.bottom - (window.innerHeight - margin);
      if (rect.left < margin) left = margin;
      if (rect.top < margin) top = margin;

      // Only set explicit coordinates if we need to move it
      if (left !== rect.left || top !== rect.top) {
        chatbotPopup.style.transform = "none";
        chatbotPopup.style.right = "auto";
        chatbotPopup.style.bottom = "auto";
        chatbotPopup.style.left = `${left}px`;
        chatbotPopup.style.top = `${top}px`;
      }
    };

    // Open chatbot
    chatbotBtn.addEventListener("click", openChatbot);

    // Close chatbot
    closeChatbot.addEventListener("click", closeChatbotPopup);

    // Close chatbot when clicking outside
    chatbotOverlay.addEventListener("click", closeChatbotPopup);

    // Prevent scroll events from affecting the page behind the overlay
    chatbotOverlay.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
    chatbotOverlay.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );

    // Send message when Enter is pressed
    userInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });

    // Clickable suggested questions
    if (chatBox) {
      chatBox.addEventListener("click", function (event) {
        const button = event.target && event.target.closest
          ? event.target.closest(".chat-suggestion")
          : null;
        if (!button) return;

        const suggestion = button.getAttribute("data-suggestion") || "";
        const text = suggestion.trim();
        if (!text) return;

        userInput.value = text;
        sendMessage();
      });
    }

    // Draggable chatbot (drag handle: header)
    const dragHandle = chatbotPopup.querySelector(".chatbot-header");
    if (dragHandle) {
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      const onPointerMove = (e) => {
        if (!isDragging) return;
        const rect = chatbotPopup.getBoundingClientRect();
        const margin = 8;

        let nextLeft = e.clientX - offsetX;
        let nextTop = e.clientY - offsetY;

        const maxLeft = window.innerWidth - rect.width - margin;
        const maxTop = window.innerHeight - rect.height - margin;

        nextLeft = Math.min(Math.max(margin, nextLeft), Math.max(margin, maxLeft));
        nextTop = Math.min(Math.max(margin, nextTop), Math.max(margin, maxTop));

        chatbotPopup.style.left = `${nextLeft}px`;
        chatbotPopup.style.top = `${nextTop}px`;
      };

      const stopDragging = () => {
        if (!isDragging) return;
        isDragging = false;
        chatbotPopup.classList.remove("dragging");
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", stopDragging);
      };

      dragHandle.addEventListener("pointerdown", (e) => {
        // Ignore clicks on the close button
        if (e.target && e.target.closest("#close-chatbot")) return;

        const rect = chatbotPopup.getBoundingClientRect();
        chatbotPopup.style.transform = "none";
        chatbotPopup.style.right = "auto";
        chatbotPopup.style.bottom = "auto";
        chatbotPopup.style.left = `${rect.left}px`;
        chatbotPopup.style.top = `${rect.top}px`;

        isDragging = true;
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        chatbotPopup.classList.add("dragging");

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", stopDragging);
        e.preventDefault();
      });
    }

    window.addEventListener("resize", ensureChatbotInViewport);
  }

  // Update copyright year dynamically
  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.textContent = `YashPinjarkar ${currentYear}`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("resume-preview-canvas");
  const fallback = document.getElementById("resume-preview-fallback");
  const pdfUrl = "Resume-Y1.pdf";

  if (!canvas || !fallback) return;
  if (typeof window.pdfjsLib === "undefined") return;

  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  async function renderFirstPage() {
    try {
      const loadingTask = window.pdfjsLib.getDocument({ url: pdfUrl });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const container = canvas.parentElement;
      const containerWidth = (container && container.clientWidth) ? container.clientWidth : 500;

      const unscaledViewport = page.getViewport({ scale: 1 });
      const scale = containerWidth / unscaledViewport.width;
      const viewport = page.getViewport({ scale });

      const outputScale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";

      const ctx = canvas.getContext("2d", { alpha: false });
      ctx.setTransform(outputScale, 0, 0, outputScale, 0, 0);

      await page.render({ canvasContext: ctx, viewport }).promise;
      fallback.style.display = "none";
    } catch (err) {
      console.warn("Resume preview render failed:", err);
      fallback.style.display = "flex";
    }
  }

  // Render after layout so container width is accurate.
  requestAnimationFrame(() => {
    renderFirstPage();
  });
});

// Project Modal Functions
function openProjectModal(projectIndex) {
  const project = window.projectsData[projectIndex];
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-project-content');
  
  modalContent.innerHTML = `
    <div class="modal-project-header">
      <img src="${project.image}" alt="${project.title}" class="modal-project-image">
    </div>
    <div class="modal-project-body">
      <h3>${project.title}</h3>
      <p class="modal-project-tech"><strong>Technologies:</strong> ${project.technologies}</p>
      <p class="modal-project-description">${project.description}</p>
      <div class="modal-project-links">
        <a href="${project.github}" target="_blank" class="modal-btn modal-btn-github">
          <i class="bx bxl-github"></i> View on GitHub
        </a>
        <a href="${project.live}" target="_blank" class="modal-btn modal-btn-live">
          <i class="bx bx-link"></i> Live Demo
        </a>
      </div>
    </div>
  `;
  
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('project-modal');
  if (event.target === modal) {
    closeProjectModal();
  }
}
