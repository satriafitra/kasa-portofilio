package com.portfolio.model;

import java.util.List;
import java.util.Map;

public class Profile {
    private String name;
    private String title;
    private String characterClass;
    private int level;
    private int hp;
    private int maxHp;
    private int mp;
    private int maxMp;
    private int xp;
    private int nextLevelXp;
    private String bio;
    private String location;
    private String status;
    private String specialty;
    private List<String> inventory;
    private Map<String, String> socialLinks;

    public Profile() {
    }

    public Profile(String name, String title, String characterClass, int level, int hp, int maxHp, int mp, int maxMp,
                   int xp, int nextLevelXp, String bio, String location, String status, String specialty,
                   List<String> inventory, Map<String, String> socialLinks) {
        this.name = name;
        this.title = title;
        this.characterClass = characterClass;
        this.level = level;
        this.hp = hp;
        this.maxHp = maxHp;
        this.mp = mp;
        this.maxMp = maxMp;
        this.xp = xp;
        this.nextLevelXp = nextLevelXp;
        this.bio = bio;
        this.location = location;
        this.status = status;
        this.specialty = specialty;
        this.inventory = inventory;
        this.socialLinks = socialLinks;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCharacterClass() { return characterClass; }
    public void setCharacterClass(String characterClass) { this.characterClass = characterClass; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    public int getHp() { return hp; }
    public void setHp(int hp) { this.hp = hp; }

    public int getMaxHp() { return maxHp; }
    public void setMaxHp(int maxHp) { this.maxHp = maxHp; }

    public int getMp() { return mp; }
    public void setMp(int mp) { this.mp = mp; }

    public int getMaxMp() { return maxMp; }
    public void setMaxMp(int maxMp) { this.maxMp = maxMp; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public int getNextLevelXp() { return nextLevelXp; }
    public void setNextLevelXp(int nextLevelXp) { this.nextLevelXp = nextLevelXp; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }

    public List<String> getInventory() { return inventory; }
    public void setInventory(List<String> inventory) { this.inventory = inventory; }

    public Map<String, String> getSocialLinks() { return socialLinks; }
    public void setSocialLinks(Map<String, String> socialLinks) { this.socialLinks = socialLinks; }
}
