export interface Profile {
  name: string;
  title: string;
  characterClass: string;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  xp: number;
  nextLevelXp: number;
  bio: string;
  location: string;
  status: string;
  specialty: string;
  inventory: string[];
  socialLinks: Record<string, string>;
}

export interface Skill {
  name: string;
  category: "BACKEND" | "FRONTEND" | "DEVOPS" | "DATABASE";
  powerLevel: number; // 1-100
  rank: "S-RANK" | "A-RANK" | "B-RANK";
  icon: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  questCode: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  unlockScore: number;
  badge: string;
  loot: string;
}

export interface Experience {
  id: string;
  role: string;
  guildOrCompany: string;
  period: string;
  location: string;
  questType: string;
  duties: string[];
  techArtifacts: string[];
}

export interface ScoreEntry {
  id?: string;
  playerInitials: string;
  score: number;
  coins: number;
  rank?: number;
  characterClass?: string;
  timestamp?: string;
}

export interface ContactMessage {
  id?: string;
  senderName: string;
  email: string;
  message: string;
  sentAt?: string;
}

export interface SystemStats {
  systemStatus: string;
  engineVersion: string;
  totalQuestsCompleted: number;
  totalSkillsMastered: number;
  serverUptime: string;
  jvmVersion: string;
}
