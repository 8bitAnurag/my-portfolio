/**
 * ============================================================================
 * CENTRAL PORTFOLIO CONFIGURATION
 * Populated from Anurag Gautam's CV (anurag_cv_e.pdf) & profile.md.
 * Edit any field below to update your website.
 * ============================================================================
 */

export type ProjectCategory = 'Backend' | 'Systems' | 'AI / RAG';
export type SkillCategory =
  | 'Languages'
  | 'Frameworks'
  | 'Databases'
  | 'DevOps & Tools';

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'mail' | 'resume';
}

export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  status: 'LIVE' | 'IN PROGRESS' | 'ARCHIVED';
  featured?: boolean;
  categories: ProjectCategory[];
  summary: string;
  engineeringTagline: string;
  engineeringDetails: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  previewTheme: 'slate' | 'emerald' | 'amber' | 'violet' | 'cyan';
  previewCode: string;
  previewImage?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  highlights?: string;
  coursework?: string[];
}

export interface ExperienceStat {
  value: string;
  label: string;
  href?: string;
}

export interface OpenSourcePR {
  repo: string;
  prNumber: string;
  title: string;
  summary: string;
  tags: string[];
  url: string;
}

export interface SkillItem {
  name: string;
  category: SkillCategory;
  color: string;
  badge: string;
}

export interface ArticleItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  url: string;
  tags: string[];
}

export interface QuoteItem {
  text: string;
  author: string;
}

export interface ProfileConfig {
  brandName: string;
  fullName: string;
  roles: string[];
  location: string;
  timeZone: string;
  email: string;
  githubHandle: string;
  githubUrl: string;
  mediumHandle?: string;
  mediumUrl?: string;
  bannerImage: string;
  avatars: string[];
  baseViewCount: number;
  enableOneko: boolean;
  aboutBullets: string[];
  snapshot: string[];
  spokenLanguages: { language: string; level: string }[];
  contactLinks: SocialLink[];
  projects: ProjectItem[];
  education: EducationItem[];
  experience: {
    role: string;
    company: string;
    period: string;
    summary: string;
    stats: ExperienceStat[];
  };
  openSource: OpenSourcePR[];
  skills: SkillItem[];
  articles: ArticleItem[];
  githubContributionsTotal: number;
  quotes: QuoteItem[];
}

export const PROFILE: ProfileConfig = {
  brandName: 'Anurag',
  fullName: 'Anurag Gautam',
  roles: [
    'CS Student @ TU Darmstadt',
    'Backend & Systems Developer',
    'Java & Spring Boot Engineer',
    'C++17 Low-Latency Builder',
  ],
  location: 'Darmstadt, Germany',
  timeZone: 'Europe/Berlin',
  email: 'anuraggautam3395@gmail.com',
  githubHandle: '8bitAnurag',
  githubUrl: 'https://github.com/8bitAnurag',
  bannerImage: '/images/banner.jpg',
  avatars: ['/images/avatar-1.jpg', '/images/avatar-2.jpg'],
  baseViewCount: 1240,
  enableOneko: false,

  aboutBullets: [
    "Hey, I'm Anurag — a Computer Science student at Technische Universität Darmstadt focused on backend engineering, event-driven microservices, and low-latency systems.",
    "I spend most of my time in the terminal, reading docs, or sketching architectures on a whiteboard. I lean backend and systems—not because I don't like frontend, but because I enjoy making polished products actually hold up under the hood.",
    'Currently seeking Working Student (Werkstudent) or Software Engineering Internship opportunities where I can ship clean, scalable production code.',
  ],

  snapshot: [
    'B.Sc. CS @ TU Darmstadt.',
    'Java & Spring Boot Backend.',
    'C++17 Low-Latency Systems.',
    'Obsessed with clean code.',
  ],

  spokenLanguages: [
    { language: 'English', level: 'C2 (Proficient)' },
    { language: 'German', level: 'B2 (Upper Intermediate)' },
  ],

  contactLinks: [
    {
      label: 'GitHub',
      href: 'https://github.com/8bitAnurag',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/anurag-gautam-421545314',
      icon: 'linkedin',
    },
    {
      label: 'Mail',
      href: 'mailto:anuraggautam3395@gmail.com',
      icon: 'mail',
    },
    {
      label: 'Resume',
      href: '/Anurag_Gautam_CV.pdf',
      icon: 'resume',
    },
  ],

  projects: [
    {
      id: 'order-pipeline',
      title: 'Low-Latency Order Pipeline',
      year: '2026',
      status: 'IN PROGRESS',
      featured: true,
      categories: ['Systems', 'Backend'],
      summary:
        'High-performance distributed order processing pipeline in modern C++17 simulating an exchange architecture with separate feed handler, IPC layer, matching engine, and orderbook.',
      engineeringTagline: 'Zero-copy IPC and lock-free concurrency under 1M+ order stress.',
      engineeringDetails:
        'Built a lock-free SPSC queue using atomic operations, cache-friendly preallocated memory pools, O(1) order lookup/cancellations, and memory-mapped file IPC validated with 1M+ order stress tests and concurrency benchmarks.',
      techStack: ['C++17', 'Lock-Free SPSC', 'mmap IPC', 'CMake', 'Linux'],
      githubUrl: 'https://github.com/8bitAnurag',
      previewTheme: 'cyan',
      previewCode: 'spsc_ring.try_push(order_msg);',
      previewImage: '/images/projects/order-pipeline.jpg',
    },
    {
      id: 'nasa-asteroid-alert',
      title: 'NASA Asteroid Collision Alert',
      year: '2026',
      status: 'LIVE',
      featured: true,
      categories: ['Backend'],
      summary:
        "Microservices-based monitoring service that tracks potentially hazardous asteroids using NASA's NeoWs API and dispatches automated collision email alerts.",
      engineeringTagline: 'Decoupled event-driven alerting over Apache Kafka.',
      engineeringDetails:
        'Implemented asynchronous inter-service communication with Apache Kafka consumers, persistent hazard tracking in MySQL, and full Docker containerization for reproducible deployment.',
      techStack: ['React', 'Java', 'Spring Boot', 'Apache Kafka', 'Docker'],
      liveUrl: 'https://nasa-asteroid-collision-alert-servi.vercel.app',
      githubUrl: 'https://github.com/8bitAnurag/nasa-asteroid-collision-alert-service',
      previewTheme: 'emerald',
      previewCode: '@KafkaListener(topics = "asteroid-alerts")',
      previewImage: '/images/projects/nasa-alert.jpg',
    },
    {
      id: 'rag-pdf-chat',
      title: 'RAG PDF Chat Application',
      year: '2026',
      status: 'LIVE',
      categories: ['AI / RAG', 'Backend'],
      summary:
        'Spring AI–powered Retrieval-Augmented Generation app allowing users to upload PDFs and ask natural language questions grounded directly in document content.',
      engineeringTagline: 'Token-aware document ingestion with semantic vector retrieval.',
      engineeringDetails:
        'Built an ingestion pipeline using Apache Tika for PDF extraction and token-based text splitting, storing embeddings in a vector store for low-latency semantic similarity search.',
      techStack: ['React', 'Java', 'Spring AI', 'Ollama', 'pgvector', 'Apache Tika'],
      liveUrl: 'https://retrieval-augmented-generation-app.vercel.app',
      githubUrl: 'https://github.com/8bitAnurag/retrieval-augmented-generation-app',
      previewTheme: 'violet',
      previewCode: 'vectorStore.similaritySearch(query)',
      previewImage: '/images/projects/rag-chat.jpg',
    },
    {
      id: 'stock-tracker',
      title: 'Stock Tracker API',
      year: '2026',
      status: 'LIVE',
      categories: ['Backend'],
      summary:
        'Scalable Spring Boot REST API for managing personalized stock watchlists backed by MySQL and a custom caching layer.',
      engineeringTagline: 'Smart response caching around strict third-party API quotas.',
      engineeringDetails:
        'Designed a MySQL-backed watchlist service and implemented a caching mechanism that minimizes external lookups to overcome the 25 requests/day Alpha Vantage API limit.',
      techStack: ['React', 'Java', 'Spring Boot', 'MySQL / H2', 'REST API', 'Caching'],
      liveUrl: 'https://stock-tracker-wheat-three.vercel.app',
      githubUrl: 'https://github.com/8bitAnurag/stock-tracker',
      previewTheme: 'amber',
      previewCode: '@Cacheable("quotes") getQuote(ticker)',
      previewImage: '/images/projects/stock-tracker.jpg',
    },
  ],

  education: [
    {
      institution: 'Technische Universität Darmstadt',
      degree: 'Bachelor of Science, Computer Science',
      location: 'Darmstadt, Germany',
      period: 'Oct 2024 – Present',
      coursework: [
        'Software Engineering',
        'Operating Systems',
        'Data Structures & Algorithms',
        'Artificial Intelligence',
        'Distributed Systems',
        'Object-Oriented Design',
      ],
    },
    {
      institution: 'Universität Paderborn',
      degree: 'T-Kurs (Preparatory Course)',
      location: 'Paderborn, Germany',
      period: 'Nov 2023 – Sep 2024',
      highlights: 'Grade 2,2 (German system)',
      coursework: ['German', 'Mathematics', 'Physics', 'Chemistry'],
    },
  ],

  experience: {
    role: 'Software & Backend Engineer (Student)',
    company: 'TU Darmstadt · Open to Werkstudent & Internships',
    period: '2024 – Present',
    summary:
      'Building backend microservices, event-driven architectures, and C++17 systems projects alongside Computer Science coursework in Germany.',
    stats: [
      { value: '4+', label: 'Core Projects', href: '#projects' },
      { value: '3', label: 'Live Apps', href: '#projects' },
      { value: '18+', label: 'Tech & Tools', href: '#techstack' },
      { value: 'C2 / B2', label: 'EN / DE Fluency', href: '#techstack' },
    ],
  },

  openSource: [],

  skills: [
    { name: 'Java', category: 'Languages', color: '#f89820', badge: 'JV' },
    { name: 'C / C++17', category: 'Languages', color: '#659ad2', badge: 'C++' },
    { name: 'Python', category: 'Languages', color: '#3776ab', badge: 'PY' },
    { name: 'JavaScript', category: 'Languages', color: '#f7df1e', badge: 'JS' },
    { name: 'HTML', category: 'Languages', color: '#e34f26', badge: 'HT' },
    { name: 'CSS', category: 'Languages', color: '#38bdf8', badge: 'CS' },

    { name: 'Spring Boot', category: 'Frameworks', color: '#6db33f', badge: 'SB' },
    { name: 'Spring AI', category: 'Frameworks', color: '#10b981', badge: 'AI' },
    { name: 'ReactJS', category: 'Frameworks', color: '#61dafb', badge: '⚛' },

    { name: 'MySQL', category: 'Databases', color: '#00758f', badge: 'MY' },
    { name: 'PostgreSQL', category: 'Databases', color: '#336791', badge: 'PG' },

    { name: 'Docker', category: 'DevOps & Tools', color: '#2496ed', badge: 'DK' },
    { name: 'Apache Kafka', category: 'DevOps & Tools', color: '#a1a1aa', badge: 'KF' },
    { name: 'Linux', category: 'DevOps & Tools', color: '#eab308', badge: 'LX' },
    { name: 'CMake', category: 'DevOps & Tools', color: '#06b6d4', badge: 'CM' },
    { name: 'Git & GitHub', category: 'DevOps & Tools', color: '#f97316', badge: 'GT' },
    { name: 'Postman', category: 'DevOps & Tools', color: '#ff6c37', badge: 'PM' },
    { name: 'VS Code', category: 'DevOps & Tools', color: '#3b82f6', badge: 'VS' },
  ],

  articles: [],

  githubContributionsTotal: 420,

  quotes: [
    {
      text: 'The best software feels effortless only because someone cared obsessively about the unseen edge cases.',
      author: 'Engineering Note',
    },
    {
      text: 'Simplicity is prerequisite for reliability.',
      author: 'Edsger W. Dijkstra',
    },
    {
      text: 'Make it work, make it right, make it fast — in that exact order.',
      author: 'Kent Beck',
    },
  ],
};
