package com.portfolio.model;

import java.util.List;

public class Project {
    private String id;
    private String title;
    private String questCode;
    private String description;
    private List<String> techStack;
    private String liveUrl;
    private String githubUrl;
    private int unlockScore; // Score required in game to unlock or view
    private String badge;    // "FEATURED", "LEGENDARY", "PRODUCTION"
    private String loot;     // e.g. "+500 XP, Clean Architecture Perk"

    public Project() {}

    public Project(String id, String title, String questCode, String description, List<String> techStack,
                   String liveUrl, String githubUrl, int unlockScore, String badge, String loot) {
        this.id = id;
        this.title = title;
        this.questCode = questCode;
        this.description = description;
        this.techStack = techStack;
        this.liveUrl = liveUrl;
        this.githubUrl = githubUrl;
        this.unlockScore = unlockScore;
        this.badge = badge;
        this.loot = loot;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getQuestCode() { return questCode; }
    public void setQuestCode(String questCode) { this.questCode = questCode; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }

    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public int getUnlockScore() { return unlockScore; }
    public void setUnlockScore(int unlockScore) { this.unlockScore = unlockScore; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getLoot() { return loot; }
    public void setLoot(String loot) { this.loot = loot; }
}
