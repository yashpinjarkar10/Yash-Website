import { on, select } from '../utils/dom.js';

/** @type {Array<{title:string,image:string,technologies:string,description:string,github:string,live:string}>} */
const projects = [
  {
    title: 'Trading Agent',
    image: 'assets/img/project/Screenshot 2025-09-20 220049.png',
    technologies: 'LangGraph, Yfianance, Google News, Langsmith, FastAPI',
    description: "An intelligent trading agent that analyzes financial markets using real-time data from Yahoo Finance and Google News. Built with LangGraph for complex agent workflows, integrated with Langsmith for monitoring, and deployed via FastAPI for seamless API access.",
    github: 'https://github.com/yashpinjarkar10/Trading-Agent',
    live: 'https://yashpinjarkar10-trading-agent.hf.space/'
  },
  {
    title: 'Cursor 2D Animation',
    image: 'assets/img/project/manim.png',
    technologies: 'LangGraph, Manim, Python, LangSmith, SupaBase',
    description: 'An innovative tool that generates 2D mathematical animations using cursor movements. Leverages Manim for animation rendering, LangGraph for workflow orchestration, and SupaBase for data persistence. Perfect for creating educational mathematical visualizations.',
    github: 'https://github.com/yashpinjarkar10/cursor-2d-animation-frontend',
    live: 'https://cursor-2d-animation-frontend.yashpinjarkar2003.workers.dev/'
  },
  {
    title: 'Financial Market Analysis Tool',
    image: 'assets/img/project/SMAA.png',
    technologies: 'Python, Streamlit, Gemini API',
    description: "A comprehensive stock market analysis platform powered by Google's Gemini AI. Provides real-time market insights, technical analysis, and AI-driven predictions through an intuitive Streamlit interface. Helps investors make informed trading decisions.",
    github: 'https://github.com/chirag-agrawal24/stock_market_analysis',
    live: 'https://finanancial-market-analysis.streamlit.app/'
  },
  {
    title: 'Video AI Summarizer Agent',
    image: 'assets/img/project/sum.png',
    technologies: 'Python, NLP, Streamlit , Phidata, Gemini API',
    description: 'An intelligent video summarization agent that extracts key insights from video content. Uses advanced NLP techniques with Gemini AI and Phidata framework to generate concise summaries, saving time for content consumers and researchers.',
    github: 'https://github.com/yashpinjarkar10/VidAnalyze',
    live: 'https://yashpinjarkar10-vidanalyze.hf.space'
  },
  {
    title: 'PineScript Agentic RAG',
    image: 'assets/img/project/pine.png',
    technologies: 'Python,Pydantic AI, Supabase, Streamlit, Hugging Face Space',
    description: 'A Retrieval-Augmented Generation (RAG) system specialized for PineScript trading strategies. Combines Pydantic AI for structured outputs with Supabase vector database to provide intelligent code suggestions and trading strategy recommendations.',
    github: 'https://github.com/yashpinjarkar10/Pinescript-Agent',
    live: 'https://yashpinjarkar10-pinescript-agent.hf.space'
  },
  {
    title: 'AI Chatbot',
    image: 'assets/img/project/Gemini_Generated_Image_2rv24f2rv24f2rv2.png',
    technologies: 'Python, LangChain, Gemini Model, ChromaDB, Hugging Face, FastAPI',
    description: "A sophisticated conversational AI chatbot built with LangChain and Google's Gemini model. Features long-term memory using ChromaDB vector store, context-aware responses, and a robust FastAPI backend for reliable performance.",
    github: 'https://github.com/yashpinjarkar10/Chat-Web',
    live: 'https://yashpinjarkar10-webchat1.hf.space/'
  },
  {
    title: 'AI Journalist',
    image: 'assets/img/project/Gemini_Generated_Image_5jj88l5jj88l5jj8.png',
    technologies: 'Python, MCP, Langchain, gTTS, NewsAPI, Streamlit, FastAPI',
    description: 'An automated journalism platform that aggregates news from multiple sources using NewsAPI, generates comprehensive articles with LangChain, and converts them to audio using Google Text-to-Speech. Built with MCP architecture for scalability.',
    github: 'https://github.com/yashpinjarkar10/AI-Journalist',
    live: 'https://github.com/yashpinjarkar10/AI-Journalist'
  },
  {
    title: 'Student Performance Predictor',
    image: 'assets/img/project/ml.png',
    technologies: 'Python, Flask, scikit-learn, pandas, numpy, XGBoost, CatBoost, Docker, HTML/CSS, Jinja2',
    description: 'A machine learning application that predicts student academic performance based on various factors. Implements ensemble methods using XGBoost and CatBoost for high accuracy. Deployed in Docker containers with a user-friendly Flask web interface.',
    github: 'https://github.com/yashpinjarkar10/mlproject',
    live: 'https://yashpinjarkar10-ml-project.hf.space'
  }
];

/** @type {Array<{title:string,image:string,description:string,link:string}>} */
const certificates = [
  {
    title: 'OCI Generative AI Professional Certificate',
    image: 'assets/img/certificates/OCI_GEN.png',
    description: 'Certificate for Oracle Cloud Infrastructure 2025 Generative AI Professional ',
    link: 'https://github.com/yashpinjarkar10/Certificates/blob/main/eCertificate.pdf'
  },
  {
    title: 'Data Structure and Algorithm Certificate',
    image: 'assets/img/certificates/DSA.png',
    description: 'Certificate for completing the Data Structure and Algorithm course.',
    link: 'https://github.com/yashpinjarkar10/Certificates/blob/main/1736956677804-certificate.png'
  },
  {
    title: 'Generative AI with Diffusion Models Certificate',
    image: 'assets/img/certificates/defusion.png',
    description: 'Certificate for completing Hands-On Generative AI with Diffusion Models: Building Real-World Applications course.',
    link: 'https://github.com/yashpinjarkar10/Certificates/blob/main/CertificateOfCompletion_HandsOn%20Generative%20AI%20with%20Diffusion%20Models%20Building%20RealWorld%20Applications.pdf'
  },
  {
    title: 'Applied AI: Hugging Face Transformers Certificate',
    image: 'assets/img/certificates/defusion.png',
    description: 'Certificate for completing Applied AI: Hugging Face Transformers Building Real-World Applications course.',
    link: 'https://github.com/yashpinjarkar10/Certificates/blob/main/CertificateOfCompletion_Applied%20AI%20Getting%20Started%20with%20Hugging%20Face%20Transformers.pdf'
  },
  {
    title: 'AI Workshop: Advanced Chatbot Development Certificate',
    image: 'assets/img/certificates/defusion.png',
    description: 'Certificate for completing AI Workshop: Advanced Chatbot Development Building Real-World Applications course.',
    link: 'https://github.com/yashpinjarkar10/Certificates/blob/main/CertificateOfCompletion_AI%20Workshop%20Advanced%20Chatbot%20Development.pdf'
  },
  {
    title: 'Certificate of merit',
    image: 'assets/img/certificates/naukri.png',
    description: 'Certificate of merit for Naukri Campus Young Turks',
    link: 'https://github.com/yashpinjarkar10/Certificates/blob/main/young_turks_round_1_achievement.pdf'
  },
  {
    title: 'Certificate of Participation',
    image: 'assets/img/certificates/AIIIP.png',
    description: 'Certificate for participating in the AIIP Aptitude Test',
    link: 'https://github.com/yashpinjarkar10/Certificates/blob/main/AIIIP.png'
  }
];

/**
 * Render project cards into portfolio container.
 */
export const initPortfolio = () => {
  const portfolioContainer = document.getElementById('portfolio-items');
  if (!portfolioContainer) return;

  projects.forEach((project, index) => {
    const projectHTML = `
      <div class="col-lg-4 col-md-4 portfolio-item">
        <div class="portfolio-wrap" onclick="openProjectModal(${index})" style="cursor: pointer;">
          <img src="${project.image}" class="img-fluid" alt="${project.title}" loading="lazy" decoding="async">
          <div class="portfolio-info">
            <h4>${project.title}</h4>
            <p>${project.technologies}</p>
            <div class="portfolio-links">
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.title} on GitHub" title="GitHub" onclick="event.stopPropagation();"><i class="bx bxl-github"></i></a>
              <a href="${project.live}" target="_blank" rel="noopener noreferrer" aria-label="Open live demo for ${project.title}" title="Live Demo" onclick="event.stopPropagation();"><i class="bx bx-link"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
    portfolioContainer.innerHTML += projectHTML;
  });

  window.projectsData = projects;
};

/**
 * Render certificate cards into certificates container.
 */
export const initCertificates = () => {
  const certificatesContainer = document.querySelector('.certificates-container');
  if (!certificatesContainer) return;

  certificates.forEach((certificate) => {
    const certificateHTML = `
      <div class="col-lg-4 col-md-4 portfolio-item">
        <div class="portfolio-wrap" onclick="window.open('${certificate.link}', '_blank')" style="cursor: pointer;">
          <img src="${certificate.image}" class="img-fluid" alt="${certificate.title}" loading="lazy" decoding="async">
          <div class="portfolio-info">
            <h4>${certificate.title}</h4>
            <p>${certificate.description}</p>
            <div class="portfolio-links">
              <a href="${certificate.link}" target="_blank" rel="noopener noreferrer" aria-label="Open certificate: ${certificate.title}" title="View Certificate" onclick="event.stopPropagation();"><i class="bx bx-link"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
    certificatesContainer.innerHTML += certificateHTML;
  });
};

/**
 * Initialize isotope filtering for portfolio/certificate items.
 */
export const initPortfolioFilter = () => {
  const setupFilter = () => {
    const portfolioContainer = select('.portfolio-container');
    if (!portfolioContainer || typeof window.Isotope === 'undefined') return;

    // eslint-disable-next-line no-undef
    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
      percentPosition: true
    });

    const portfolioFilters = select('#portfolio-flters li', true);

    on('click', '#portfolio-flters li', function portfolioFilterHandler(e) {
      e.preventDefault();

      portfolioFilters.forEach((el) => {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      portfolioIsotope.on('arrangeComplete', () => {
        if (typeof window.AOS !== 'undefined') {
          AOS.refresh();
        }
      });
    }, true);
  };

  if (document.readyState === 'complete') {
    setupFilter();
  } else {
    window.addEventListener('load', setupFilter);
  }
};

/**
 * Open project modal by index.
 * @param {number} projectIndex
 */
export const openProjectModal = (projectIndex) => {
  const project = projects[projectIndex] || (window.projectsData && window.projectsData[projectIndex]);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-project-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-project-header">
      <img src="${project.image}" alt="${project.title}" class="modal-project-image" loading="lazy" decoding="async">
    </div>
    <div class="modal-project-body">
      <h3>${project.title}</h3>
      <p class="modal-project-tech"><strong>Technologies:</strong> ${project.technologies}</p>
      <p class="modal-project-description">${project.description}</p>
      <div class="modal-project-links">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-github">
          <i class="bx bxl-github"></i> View on GitHub
        </a>
        <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-live">
          <i class="bx bx-link"></i> Live Demo
        </a>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
};

/**
 * Close currently open project modal.
 */
export const closeProjectModal = () => {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
};

/**
 * Register modal outside-click behavior.
 */
export const initProjectModal = () => {
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
      closeProjectModal();
    }
  });
};
