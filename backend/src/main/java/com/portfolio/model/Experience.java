package com.portfolio.model;

import java.util.List;

public class Experience {
    private String id;
    private String role;
    private String guildOrCompany;
    private String period;
    private String location;
    private String questType; // "MAIN CAMPAIGN", "RAID EXPEDITION", "SIDE QUEST"
    private List<String> duties;
    private List<String> techArtifacts;

    public Experience() {}

    public Experience(String id, String role, String guildOrCompany, String period, String location,
                      String questType, List<String> duties, List<String> techArtifacts) {
        this.id = id;
        this.role = role;
        this.guildOrCompany = guildOrCompany;
        this.period = period;
        this.location = location;
        this.questType = questType;
        this.duties = duties;
        this.techArtifacts = techArtifacts;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getGuildOrCompany() { return guildOrCompany; }
    public void setGuildOrCompany(String guildOrCompany) { this.guildOrCompany = guildOrCompany; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getQuestType() { return questType; }
    public void setQuestType(String questType) { this.questType = questType; }

    public List<String> getDuties() { return duties; }
    public void setDuties(List<String> duties) { this.duties = duties; }

    public List<String> getTechArtifacts() { return techArtifacts; }
    public void setTechArtifacts(List<String> techArtifacts) { this.techArtifacts = techArtifacts; }
}
