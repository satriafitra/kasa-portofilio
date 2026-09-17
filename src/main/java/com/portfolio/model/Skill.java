package com.portfolio.model;

public class Skill {
    private String name;
    private String category; // "BACKEND", "FRONTEND", "DEVOPS", "DATABASE"
    private int powerLevel;  // 1 - 100
    private String rank;     // "S-RANK", "A-RANK", "B-RANK"
    private String icon;
    private String description;

    public Skill() {}

    public Skill(String name, String category, int powerLevel, String rank, String icon, String description) {
        this.name = name;
        this.category = category;
        this.powerLevel = powerLevel;
        this.rank = rank;
        this.icon = icon;
        this.description = description;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getPowerLevel() { return powerLevel; }
    public void setPowerLevel(int powerLevel) { this.powerLevel = powerLevel; }

    public String getRank() { return rank; }
    public void setRank(String rank) { this.rank = rank; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
