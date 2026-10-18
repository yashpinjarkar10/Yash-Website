/**
 * Centralized Projects Dataset
 * Adding any new project here automatically creates its card on projects.html
 * and generates its dedicated deep-dive subpage on project.html?id=[slug].
 */
export const projectsData = [
  {
    id: 'trading-agent',
    title: 'Trading Agent',
    tagline: 'Autonomous 13-agent financial analysis & market debate system built with LangGraph',
    category: 'agentic-ai',
    categoryLabel: 'Agentic AI & GenAI',
    featured: true,
    date: '2025 – 2026',
    role: 'AI & Systems Architect',
    image: 'assets/img/projects/trading-agent.png',
    technologies: ['LangGraph', 'FastAPI', 'Python', 'TradingView', 'SSE', 'LangSmith', 'Yahoo Finance'],
    metrics: [
      { label: 'Agent Topology', value: '13 Agents' },
      { label: 'Data Streaming', value: 'Real-time SSE' },
      { label: 'API Framework', value: 'Async FastAPI' }
    ],
    github: 'https://github.com/yashpinjarkar10/Trading-Agent',
    live: 'https://yashpinjarkar10-trading-agent.hf.space/',
    overview: 'An intelligent multi-agent financial platform that analyzes real-time market sentiment and fundamentals. It orchestrates a debate between Bull and Bear researchers, synthesized by a portfolio manager to produce actionable trade decisions.',
    architecture: 'Architected as a directed acyclic graph (DAG) in LangGraph with 13 specialized agents. The FastAPI backend employs async event-loop-safe execution and Server-Sent Events (SSE) to stream agent thoughts and token-by-token reasoning to a responsive dashboard with TradingView charts.',
    keyFeatures: [
      'Multi-agent consensus mechanism: Bull and Bear researchers debate thesis points before portfolio synthesis.',
      'Intent-aware tool routing to dispatch narrow vs. comprehensive financial analyses dynamically.',
      'Real-time token-by-token streaming over SSE with LangGraph tool-calling hooks.',
      'Production observability integrated with LangSmith for agent latency and cost tracking.'
    ],
    challengesSolved: [
      'Prevented event-loop blocking during concurrent agent invocations by implementing an asynchronous execution wrapper.',
      'Handled rapid rate-limits from external financial APIs through deterministic retry-backoff algorithms and local caching.'
    ]
  },
  {
    id: 'cursor-2d-animation',
    title: 'Cursor 2D Animation',
    tagline: 'Domain-specific GraphRAG pipeline & self-healing Manim code generation engine',
    category: 'agentic-ai',
    categoryLabel: 'Agentic AI & GenAI',
    featured: true,
    date: '2025 – 2026',
    role: 'Lead AI Engineer',
    image: 'assets/img/projects/cursor-2d-animation.png',
    technologies: ['LangGraph', 'FastAPI', 'Manim', 'Python', 'Next.js', 'Supabase', 'SSE'],
    metrics: [
      { label: 'API Grounding', value: '100+ Verified APIs' },
      { label: 'Debug Loop', value: 'AST Self-Healing' },
      { label: 'Persistence', value: 'Supabase & Cloud' }
    ],
    github: 'https://github.com/yashpinjarkar10/cursor-2d-animation-frontend',
    live: 'https://cursor-2d-animation-frontend.yashpinjarkar2003.workers.dev/',
    overview: 'An autonomous generative engine that converts natural language and cursor trajectories into mathematical 2D animations using 3Blue1Brown’s Manim library with automatic syntax debugging.',
    architecture: 'Engineered an autonomous multi-agent LangGraph pipeline in FastAPI, utilizing a Domain-Specific GraphRAG System to ground LLM code generation against 100+ verified Manim APIs. Implements a self-healing repair loop with Python AST static verification and sandboxed execution.',
    keyFeatures: [
      'Domain-Specific GraphRAG system grounding LLM code generation to verified Manim methods.',
      'Self-healing repair loop utilizing Python AST static analysis to automatically catch and correct syntax or render errors.',
      'Studio web editor with real-time video preview and frame-by-frame progress streaming via SSE.',
      'Cloud asset persistence with Supabase for user scene configurations and rendered video storage.'
    ],
    challengesSolved: [
      'Eliminated frequent hallucinated Manim method names by enforcing strict schema grounding through vector and graph retrieval.',
      'Sandbox execution timeout management for complex mathematical calculations via worker pools.'
    ]
  },
  {
    id: 'ai-persona-chatbot',
    title: 'AI Persona Chatbot',
    tagline: 'Enterprise RAG assistant with pgvector retrieval and multi-tier security guardrails',
    category: 'agentic-ai',
    categoryLabel: 'Agentic AI & GenAI',
    featured: true,
    date: '2025 – 2026',
    role: 'Full-Stack AI Developer',
    image: 'assets/img/projects/ai-persona-chatbot.png',
    technologies: ['FastAPI', 'Llama-3.3-70B', 'Mistral Embeddings', 'Supabase pgvector', 'Docker', 'ChromaDB'],
    metrics: [
      { label: 'Model', value: 'Llama-3.3-70B' },
      { label: 'Vector Store', value: 'Supabase pgvector' },
      { label: 'Safety', value: 'LLM-as-Judge' }
    ],
    github: 'https://github.com/yashpinjarkar10/Chat-Web',
    live: 'https://yashpinjarkar10-webchat1.hf.space/',
    overview: 'An enterprise-grade conversational AI assistant featuring long-term memory, semantic vector search, dynamic persona switching, and automated hallucination verification.',
    architecture: 'Built on FastAPI with Llama-3.3-70B and Mistral embeddings. Stores context and historical chat interactions in Supabase (PostgreSQL with pgvector) for semantic retrieval. Includes an automated LLM-as-a-Judge validation layer.',
    keyFeatures: [
      'Semantic search and multi-turn context retention using pgvector embeddings.',
      'Multi-tier security guardrails including regex sanitization for SQLi/XSS and prompt injection filters.',
      'Automated LLM-as-a-Judge evaluator to score retrieval grounding and minimize hallucinations.',
      'Modular session architecture allowing persistent conversation across user visits.'
    ],
    challengesSolved: [
      'Mitigated retrieval drift in long conversations through chunk compression and reciprocal rank fusion (RRF).',
      'Engineered sub-second response latency with streaming chunk transport.'
    ]
  },
  {
    id: 'pinescript-agent',
    title: 'PineScript Agentic RAG',
    tagline: 'Intelligent PineScript code generation & algorithmic trading strategy assistant',
    category: 'agentic-ai',
    categoryLabel: 'Agentic AI & GenAI',
    featured: false,
    date: '2025',
    role: 'AI Engineer',
    image: 'assets/img/projects/pinescript-agent.png',
    technologies: ['Pydantic AI', 'Supabase Vector', 'Python', 'Streamlit', 'Hugging Face'],
    metrics: [
      { label: 'Framework', value: 'Pydantic AI' },
      { label: 'Vector DB', value: 'Supabase Vector' },
      { label: 'Deployment', value: 'Hugging Face' }
    ],
    github: 'https://github.com/yashpinjarkar10/Pinescript-Agent',
    live: 'https://yashpinjarkar10-pinescript-agent.hf.space',
    overview: 'A specialized Retrieval-Augmented Generation (RAG) assistant designed for algorithmic traders and TradingView developers to write, debug, and backtest PineScript v5 strategies.',
    architecture: 'Uses Pydantic AI to enforce strongly typed structured code outputs coupled with a Supabase vector database containing TradingView documentation and indicator scripts.',
    keyFeatures: [
      'Strict Pydantic AI schema enforcement for valid PineScript v5 syntax generation.',
      'Vector semantic search for PineScript indicator reference and error diagnosis.',
      'Clean interactive Streamlit interface for quick prompt testing and code copy.',
      'Direct indicator parameter tuning and code explanation walkthrough.'
    ],
    challengesSolved: [
      'Addressed PineScript version confusion (v4 vs v5) by isolating v5 documentation in embedding indexing.'
    ]
  },
  {
    id: 'ai-journalist',
    title: 'AI Journalist',
    tagline: 'Multi-source news aggregator, article synthesis, and audio narration system',
    category: 'backend-systems',
    categoryLabel: 'Backend & Systems',
    featured: false,
    date: '2025',
    role: 'Backend & AI Engineer',
    image: 'assets/img/projects/ai-journalist.png',
    technologies: ['Python', 'MCP Architecture', 'LangChain', 'FastAPI', 'NewsAPI', 'gTTS', 'Streamlit'],
    metrics: [
      { label: 'Architecture', value: 'MCP Framework' },
      { label: 'Voice Narration', value: 'gTTS Audio' },
      { label: 'Data Sources', value: 'Multi-Feed API' }
    ],
    github: 'https://github.com/yashpinjarkar10/AI-Journalist',
    live: 'https://github.com/yashpinjarkar10/AI-Journalist',
    overview: 'An automated journalism pipeline that collects breaking stories from multiple international news feeds, deduplicates reporting, generates balanced editorial write-ups, and produces spoken audio broadcasts.',
    architecture: 'Designed around Model Context Protocol (MCP) tool integration. NewsAPI fetches headlines which are passed to LangChain for multi-perspective synthesis and gTTS for audio streaming.',
    keyFeatures: [
      'Automated multi-source news gathering and bias-neutralized article generation.',
      'Text-to-speech audio conversion for hands-free news listening.',
      'Modular MCP design allowing pluggable feeds and TTS engines.',
      'FastAPI endpoints for programmatic article access.'
    ],
    challengesSolved: [
      'Handled diverse RSS/API feed formats into a unified article entity representation.'
    ]
  },
  {
    id: 'vidanalyze',
    title: 'Video AI Summarizer Agent',
    tagline: 'Multimodal video comprehension agent extracting key takeaways and action points',
    category: 'machine-learning',
    categoryLabel: 'Machine Learning & NLP',
    featured: false,
    date: '2025',
    role: 'AI Developer',
    image: 'assets/img/projects/vidanalyze.png',
    technologies: ['Gemini 1.5 Pro', 'Phidata', 'Streamlit', 'Python', 'NLP'],
    metrics: [
      { label: 'Model', value: 'Gemini 1.5 Pro' },
      { label: 'Agent Toolkit', value: 'Phidata' },
      { label: 'Interface', value: 'Streamlit' }
    ],
    github: 'https://github.com/yashpinjarkar10/VidAnalyze',
    live: 'https://yashpinjarkar10-vidanalyze.hf.space',
    overview: 'An AI-powered video summarization assistant that ingests video content, timestamps key transitions, and produces bulleted executive summaries.',
    architecture: 'Leverages Google Gemini 1.5 Pro multimodal capabilities via Phidata agent framework for long-context video comprehension and question answering.',
    keyFeatures: [
      'Direct video upload or URL analysis for rapid content indexing.',
      'Timestamp-aligned breakdown of core discussions and concepts.',
      'Contextual Q&A allowing users to query specific parts of lengthy video lectures.',
      'One-click export of key takeaways and transcript highlights.'
    ],
    challengesSolved: [
      'Optimized token budgeting for long 60+ minute videos using chunked scene sampling.'
    ]
  },
  {
    id: 'market-analyzer',
    title: 'Financial Market Analysis Tool',
    tagline: 'Technical indicator evaluation & AI-driven stock sentiment dashboard',
    category: 'machine-learning',
    categoryLabel: 'Machine Learning & Analytics',
    featured: false,
    date: '2024 – 2025',
    role: 'Full-Stack Developer',
    image: 'assets/img/projects/market-analyzer.png',
    technologies: ['Python', 'Streamlit', 'Gemini API', 'Pandas', 'Matplotlib'],
    metrics: [
      { label: 'Analytics', value: 'Technical Indicators' },
      { label: 'AI Insights', value: 'Gemini API' },
      { label: 'Visualization', value: 'Matplotlib / Streamlit' }
    ],
    github: 'https://github.com/chirag-agrawal24/stock_market_analysis',
    live: 'https://finanancial-market-analysis.streamlit.app/',
    overview: 'A stock market analytics web application delivering real-time metrics, moving averages, RSI analysis, and Gemini AI narrative breakdowns to support investor decision-making.',
    architecture: 'Python backend with Pandas for financial time-series calculations, combined with Streamlit charts and Google Gemini API for automated technical summaries.',
    keyFeatures: [
      'Interactive stock charting with configurable moving averages and Bollinger bands.',
      'Automated summary of market trends powered by Gemini LLM.',
      'Real-time price quote polling and historical range visualization.',
      'Clean and accessible layout for quick ticker lookups.'
    ],
    challengesSolved: [
      'Synchronized multi-timeframe financial datasets into smooth interactive plots.'
    ]
  },
  {
    id: 'student-performance',
    title: 'Student Performance Predictor',
    tagline: 'Production-ready ML ensemble pipeline containerized with Docker and Flask',
    category: 'machine-learning',
    categoryLabel: 'Machine Learning & Analytics',
    featured: false,
    date: '2024',
    role: 'ML Engineer',
    image: 'assets/img/projects/student-performance.png',
    technologies: ['Scikit-Learn', 'XGBoost', 'CatBoost', 'Flask', 'Docker', 'Pandas'],
    metrics: [
      { label: 'Model Ensemble', value: 'XGBoost & CatBoost' },
      { label: 'Packaging', value: 'Docker Container' },
      { label: 'Serving', value: 'Flask Web App' }
    ],
    github: 'https://github.com/yashpinjarkar10/mlproject',
    live: 'https://yashpinjarkar10-ml-project.hf.space',
    overview: 'An end-to-end machine learning system predicting academic outcomes based on demographic and behavioral indicators, featuring data pipelines, model registry, and containerized deployment.',
    architecture: 'Trained using XGBoost and CatBoost ensemble regressors with automated cross-validation, feature encoding, hyperparameter tuning, and containerized via Docker on Hugging Face Spaces.',
    keyFeatures: [
      'Modular ML pipeline structure separating ingestion, transformation, and training.',
      'Ensemble model benchmarking yielding optimal generalization score.',
      'Containerized with Docker for repeatable production deployments.',
      'Interactive web form for real-time predictions and score factor breakdowns.'
    ],
    challengesSolved: [
      'Engineered automated handling for missing data and categorical feature encoding across varying test distributions.'
    ]
  }
];

export const getProjectById = (id) => {
  return projectsData.find((p) => p.id === id) || null;
};
