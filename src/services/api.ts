import { Profile, Skill, Project, Experience, ScoreEntry, ContactMessage, SystemStats } from '../types';

const API_BASE = '/api';

// Fallback seed data in case backend server is unreachable
const FALLBACK_PROFILE: Profile = {
  name: "Satria Fitra",
  title: "WEB DEVELOPER & UI DESIGNER",
  characterClass: "KasaV",
  level: 42,
  hp: 100,
  maxHp: 100,
  mp: 85,
  maxMp: 100,
  xp: 8450,
  nextLevelXp: 10000,
  bio: "Seorang Fullstack Engineer yang berdedikasi menciptakan web interaktif berkinerja tinggi, sistem backend tangguh berbasis Java Spring Boot, dan antarmuka modern yang imersif dan bernyawa.",
  location: "INDONESIA / REMOTE",
  status: "TERSEDIA UNTUK PROYEK",
  specialty: "High-Concurrency Distributed Systems & Reactive Frontend Interfaces",
  inventory: ["Mechanical Keyboard of Haste", "Spring Boot Holy Grail v3", "Vite Warp Reactor", "Coffee Potion +50 Energy"],
  socialLinks: {
    github: "https://github.com/kasav-dev",
    linkedin: "https://linkedin.com/in/satriafitra",
    email: "satria.fitra@kasav.dev",
    discord: "KasaV"
  }
};

const FALLBACK_SKILLS: Skill[] = [
  { name: "Java 21 / 25", category: "BACKEND", powerLevel: 95, rank: "S-RANK", icon: "☕", description: "Core language mastery, Virtual Threads, Records, Pattern Matching" },
  { name: "Spring Boot 3", category: "BACKEND", powerLevel: 92, rank: "S-RANK", icon: "🍃", description: "REST APIs, Spring Security, Spring Data JPA, Microservices, Actuator" },
  { name: "React 19 & TypeScript", category: "FRONTEND", powerLevel: 90, rank: "S-RANK", icon: "⚛️", description: "Hooks, Context API, Performance Profiling, Pixel Canvas" },
  { name: "PostgreSQL & Redis", category: "DATABASE", powerLevel: 88, rank: "A-RANK", icon: "🐘", description: "Query Optimization, Indexing, In-Memory Caching, Transactions" },
  { name: "Docker & Kubernetes", category: "DEVOPS", powerLevel: 85, rank: "A-RANK", icon: "🐳", description: "Containerization, Multi-Stage Builds, Pod Orchestration" },
  { name: "Tailwind / Pixel CSS", category: "FRONTEND", powerLevel: 93, rank: "S-RANK", icon: "🎨", description: "Custom Design Systems, CRT Shaders, CSS Animations, Micro-interactions" },
  { name: "Kafka & RabbitMQ", category: "BACKEND", powerLevel: 82, rank: "A-RANK", icon: "📨", description: "Event-driven messaging, Dead Letter Queues, Stream Processing" },
  { name: "Git & CI/CD Pipelines", category: "DEVOPS", powerLevel: 90, rank: "S-RANK", icon: "⚡", description: "GitHub Actions, Automated Testing, Zero-Downtime Deployment" }
];

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "CYBER FLAPPY QUEST PORTFOLIO",
    questCode: "QUEST #01",
    description: "Platform portofolio web interaktif dengan tema 16-bit Cyber Arcade, ditenagai backend Java Spring Boot REST API dan frontend React canvas engine.",
    techStack: ["React 19", "TypeScript", "Java 25", "Spring Boot 3", "Canvas API", "Web Audio API"],
    liveUrl: "https://portfolio.internal",
    githubUrl: "https://github.com/kasav-dev/developer/pixel-arcade-portfolio",
    unlockScore: 0,
    badge: "CURRENT ZONE",
    loot: "+1200 XP • Retro Gaming Archmage"
  },
  {
    id: "proj-2",
    title: "QR-SAR EMERGENCY RESCUE HUB",
    questCode: "QUEST #02",
    description: "Sistem tanggap darurat dan manajemen logistik terdistribusi dengan pemindaian QR real-time dan sinkronisasi data lintas unit operasi.",
    techStack: ["Java Spring Boot", "PostgreSQL", "Redis", "WebSockets", "Docker"],
    liveUrl: "https://qrsar.internal",
    githubUrl: "https://github.com/kasav-dev/developer/qrsar-rescue-be",
    unlockScore: 5,
    badge: "MISSION CRITICAL",
    loot: "+2500 XP • Resilient Backend Shield"
  },
  {
    id: "proj-3",
    title: "NEXUS HIGH-THROUGHPUT API GATEWAY",
    questCode: "QUEST #03",
    description: "Reverse-proxy cerdas berbasis Spring Cloud Gateway dengan dynamic rate-limiting Redis token bucket dan distributed telemetry.",
    techStack: ["Java 25", "Spring Cloud", "Redis", "Prometheus", "Grafana"],
    liveUrl: "https://nexus-gw.internal",
    githubUrl: "https://github.com/kasav-dev/developer/nexus-gateway",
    unlockScore: 10,
    badge: "LEGENDARY",
    loot: "+3000 XP • Concurrency Slayer"
  },
  {
    id: "proj-4",
    title: "PIXEL LABS COMPONENT FORGE",
    questCode: "QUEST #04",
    description: "Design system library berbasis komponen retro pixel modern, mendukung 8-bit UI elements, sound triggers, dan dark/cyber themes.",
    techStack: ["React", "TypeScript", "CSS Custom Props", "Storybook", "NPM"],
    liveUrl: "https://pixellabs.internal",
    githubUrl: "https://github.com/kasav-dev/developer/pixel-components",
    unlockScore: 15,
    badge: "COMMUNITY FAVORITE",
    loot: "+1800 XP • UI Alchemist"
  }
];

const FALLBACK_EXPERIENCE: Experience[] = [
  {
    id: "exp-1",
    role: "Lead Fullstack Engineer",
    guildOrCompany: "BASARNAS / ASQI TECH GUILD",
    period: "2023 - PRESENT",
    location: "Bandung, Indonesia",
    questType: "MAIN CAMPAIGN",
    duties: [
      "Memimpin arsitektur backend Java Spring Boot untuk portal operasi penyelamatan darurat dengan throughput tinggi.",
      "Mengoptimasi query database PostgreSQL dan Redis caching sehingga waktu respons API terpangkas hingga 60%.",
      "Membangun dashboard monitoring real-time berbasis WebSockets dan antarmuka web modern."
    ],
    techArtifacts: ["Java 25", "Spring Boot", "PostgreSQL", "Redis", "React", "Docker"]
  },
  {
    id: "exp-2",
    role: "Senior Backend Specialist",
    guildOrCompany: "CYBERNETIC ENTERPRISE LABS",
    period: "2021 - 2023",
    location: "Remote Cyberspace",
    questType: "RAID EXPEDITION",
    duties: [
      "Merancang microservices berbasis Spring Cloud dan Apache Kafka untuk pemrosesan jutaan event per hari.",
      "Mengintegrasikan OAuth2/OIDC security architecture dan automated CI/CD pipelines.",
      "Melakukan mentoring kepada 8 developer junior dalam best practices clean architecture dan unit testing."
    ],
    techArtifacts: ["Java 17", "Spring Cloud", "Kafka", "Kubernetes", "JUnit 5"]
  },
  {
    id: "exp-3",
    role: "Frontend & Interactive Web Developer",
    guildOrCompany: "RETRO PIXEL STUDIOS",
    period: "2019 - 2021",
    location: "Jakarta, Indonesia",
    questType: "ORIGIN QUEST",
    duties: [
      "Mengembangkan lebih dari 15 web interaktif berskala tinggi dengan animasi halus dan asset game 2D.",
      "Menghadirkan zero-dependency micro-interactions dan performa 60 FPS pada mobile browser."
    ],
    techArtifacts: ["React", "TypeScript", "Canvas 2D", "WebGL", "REST APIs"]
  }
];

const FALLBACK_LEADERBOARD: ScoreEntry[] = [
  { playerInitials: "KAG", score: 4250, coins: 88, rank: 1, characterClass: "CYBER ARCHMAGE" },
  { playerInitials: "DEV", score: 3890, coins: 72, rank: 2, characterClass: "BYTE FLAPPER" },
  { playerInitials: "ACE", score: 2980, coins: 54, rank: 3, characterClass: "PIXEL GLIDER" },
  { playerInitials: "JVA", score: 2420, coins: 45, rank: 4, characterClass: "GARBAGE COLLECTOR" },
  { playerInitials: "RCT", score: 1950, coins: 36, rank: 5, characterClass: "HOOK WIZARD" }
];

export async function fetchProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_BASE}/profile`);
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return await res.json();
  } catch {
    return FALLBACK_PROFILE;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return await res.json();
  } catch {
    return FALLBACK_SKILLS;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return await res.json();
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function fetchExperience(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_BASE}/experience`);
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return await res.json();
  } catch {
    return FALLBACK_EXPERIENCE;
  }
}

export async function fetchStats(): Promise<SystemStats> {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return await res.json();
  } catch {
    return {
      systemStatus: "ONLINE [SIMULATED / BACKEND SYNC READY]",
      engineVersion: "ARCADE_V2.5-STABLE",
      totalQuestsCompleted: 7,
      totalSkillsMastered: 8,
      serverUptime: "99.99%",
      jvmVersion: "25.0.3"
    };
  }
}

export async function fetchLeaderboard(limit = 10): Promise<ScoreEntry[]> {
  try {
    const res = await fetch(`${API_BASE}/leaderboard?limit=${limit}`);
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return await res.json();
  } catch {
    return FALLBACK_LEADERBOARD;
  }
}

export async function submitScore(entry: ScoreEntry): Promise<ScoreEntry> {
  try {
    const res = await fetch(`${API_BASE}/leaderboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
    if (!res.ok) throw new Error("Failed to submit score");
    return await res.json();
  } catch {
    return { ...entry, rank: 99 };
  }
}

export async function submitContact(msg: ContactMessage): Promise<ContactMessage> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg)
    });
    if (!res.ok) throw new Error("Failed to submit message");
    return await res.json();
  } catch {
    return { ...msg, id: "offline-" + Date.now() };
  }
}

export async function fetchGuestbook(): Promise<ContactMessage[]> {
  try {
    const res = await fetch(`${API_BASE}/contact`);
    if (!res.ok) throw new Error("Failed to fetch guestbook");
    return await res.json();
  } catch {
    return [
      {
        id: "msg-1",
        senderName: "RECRUITER_ALPHA",
        email: "talent@futurecorp.tech",
        message: "Impression score: MAXIMUM! Loved the Flappy Dev arcade flow. Looking forward to discussing Lead Architect roles with you.",
        sentAt: new Date().toISOString()
      }
    ];
  }
}

