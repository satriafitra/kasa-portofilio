package com.portfolio.service;

import com.portfolio.model.Experience;
import com.portfolio.model.Profile;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class PortfolioService {

    private final Profile profile;
    private final List<Skill> skills = new ArrayList<>();
    private final List<Project> projects = new ArrayList<>();
    private final List<Experience> experiences = new ArrayList<>();

    public PortfolioService() {
        // Initialize Profile for Satria Fitra (KasaV)
        Map<String, String> social = new LinkedHashMap<>();
        social.put("github", "https://github.com/kasav-dev");
        social.put("linkedin", "https://linkedin.com/in/satriafitra");
        social.put("email", "satria.fitra@kasav.dev");
        social.put("dribbble", "https://dribbble.com/kasav");

        this.profile = new Profile(
                "Satria Fitra",
                "WEB DEVELOPER & UI DESIGNER",
                "KasaV",
                24,
                100,
                100,
                90,
                100,
                7800,
                10000,
                "Web Developer dan UI Designer yang berfokus menciptakan produk digital dengan estetika visual yang bersih, pengalaman pengguna yang intuitif, serta arsitektur kode frontend dan backend yang terstruktur rapi.",
                "INDONESIA / REMOTE",
                "TERSEDIA UNTUK PROYEK",
                "Web Development (React, TypeScript, Java Spring) & UI/UX Design (Figma, Design Systems)",
                Arrays.asList("Figma Design Kit", "React 19 & TypeScript", "Spring Boot REST Engine", "Tailwind & CSS Systems"),
                social
        );

        // Initialize Skills (Developer & Designer blend)
        skills.add(new Skill("UI/UX & Product Design", "DESIGN", 92, "EXPERT", "📐", "Figma, Wireframing, Prototyping, Design Systems, Typography, Layouting"));
        skills.add(new Skill("React & TypeScript", "FRONTEND", 90, "EXPERT", "⚛️", "Component Architecture, Hooks, State Management, Responsive Web"));
        skills.add(new Skill("Java & Spring Boot", "BACKEND", 85, "PROFICIENT", "☕", "RESTful APIs, Spring Security, Validation, Clean Architecture"));
        skills.add(new Skill("HTML5 & Modern CSS", "FRONTEND", 95, "MASTER", "🎨", "Modern Layouts, Flexbox, Grid, Clean Micro-interactions, Accessibility"));
        skills.add(new Skill("Design Systems", "DESIGN", 88, "EXPERT", "🧩", "Design Tokens, Reusable Component Libraries, UI Consistency"));
        skills.add(new Skill("PostgreSQL & SQL", "BACKEND", 82, "PROFICIENT", "🗄️", "Relational Database Design, Query Optimization, JPA"));
        skills.add(new Skill("Git & Development Workflow", "TOOLS", 88, "EXPERT", "⚡", "Version Control, GitHub Actions, Clean Commit Workflow"));
        skills.add(new Skill("RESTful API Integration", "BACKEND", 90, "EXPERT", "🔌", "Client-Server Contract, Axios, JSON Schema, Error Handling"));

        // Initialize Projects
        projects.add(new Project(
                "proj-1",
                "KasaV Interactive Game Portfolio",
                "WEB & UI",
                "Portofolio web modern dengan integrasi mini-game Flappy Dev retro, memadukan landing page bersih dan backend Java Spring Boot.",
                Arrays.asList("React 19", "TypeScript", "Java Spring Boot", "Canvas API", "Figma"),
                "http://localhost:5173",
                "https://github.com/kasav-dev/interactive-portfolio",
                0,
                "FEATURED",
                "Creative Web & Architecture"
        ));

        projects.add(new Project(
                "proj-2",
                "Basarnas Emergency Rescue Portal",
                "FULLSTACK",
                "Redesain antarmuka UI/UX dan implementasi sistem backend tanggap darurat dengan integrasi scanning QR real-time.",
                Arrays.asList("UI/UX Design", "Java Spring Boot", "React", "PostgreSQL"),
                "https://qrsar.internal",
                "https://github.com/kasav-dev/qrsar-rescue",
                5,
                "PRODUCTION",
                "Design System & Enterprise API"
        ));

        projects.add(new Project(
                "proj-3",
                "Fintech Analytics Dashboard",
                "UI/UX & WEB",
                "Dashboard keuangan web interaktif dengan sistem visualisasi data grafik, palet warna gelap elegan, dan flow navigasi efisien.",
                Arrays.asList("Figma", "React", "TypeScript", "Chart.js", "Tailwind"),
                "https://dashboard.kasav.dev",
                "https://github.com/kasav-dev/fintech-dashboard",
                10,
                "CASE STUDY",
                "Data Visualization & UX Flow"
        ));

        projects.add(new Project(
                "proj-4",
                "Aura Minimalist Component Library",
                "DESIGN SYSTEM",
                "Koleksi komponen UI modern bebas AI-slop dengan fokus pada tipografi presisi, spacing harmonis, dan aksesibilitas.",
                Arrays.asList("Design Tokens", "React", "CSS Modules", "Storybook"),
                "https://aura-ui.kasav.dev",
                "https://github.com/kasav-dev/aura-design-system",
                15,
                "OPEN SOURCE",
                "UI Components & Tokens"
        ));

        // Initialize Experience
        experiences.add(new Experience(
                "exp-1",
                "Web Developer & UI Designer",
                "Freelance & Independent Studio (KasaV)",
                "2023 - SEKARANG",
                "Remote / Indonesia",
                "PROFESIONAL",
                Arrays.asList(
                        "Merancang antarmuka UI/UX di Figma dan menerjemahkannya ke dalam kode React dan TypeScript yang bersih.",
                        "Membangun API backend menggunakan Java Spring Boot untuk kebutuhan integrasi data yang stabil.",
                        "Membantu klien UMKM dan korporat meningkatkan konversi landing page dengan desain yang berorientasi pengguna."
                ),
                Arrays.asList("Figma", "React", "TypeScript", "Java Spring Boot", "CSS Architecture")
        ));

        experiences.add(new Experience(
                "exp-2",
                "Frontend & Web Developer",
                "Digital Creative Agency",
                "2021 - 2023",
                "Bandung, Indonesia",
                "KARIER",
                Arrays.asList(
                        "Mengembangkan lebih dari 12 website interaktif klien dengan fokus pada responsivitas dan performa cepat.",
                        "Berkolaborasi erat dengan tim desain untuk menjaga konsistensi visual dan design tokens antarmuka.",
                        "Mengoptimalkan performa web (Core Web Vitals) hingga mencapai skor 95+ di Google PageSpeed."
                ),
                Arrays.asList("HTML5", "CSS3/SCSS", "JavaScript", "React", "UI/UX Design")
        ));

        experiences.add(new Experience(
                "exp-3",
                "Frontend & Interactive Web Developer",
                "RETRO PIXEL STUDIOS",
                "2019 - 2021",
                "Jakarta, Indonesia",
                "ORIGIN QUEST",
                Arrays.asList(
                        "Mengembangkan lebih dari 15 web interaktif berskala tinggi dengan animasi halus dan asset game 2D.",
                        "Menghadirkan zero-dependency micro-interactions dan performa 60 FPS pada mobile browser."
                ),
                Arrays.asList("React", "TypeScript", "Canvas 2D", "WebGL", "REST APIs")
        ));
    }

    public Profile getProfile() {
        return profile;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public List<Experience> getExperiences() {
        return experiences;
    }
}
