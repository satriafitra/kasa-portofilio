package com.portfolio.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class ScoreEntry {
    private String id;

    @NotBlank(message = "Initials are required")
    @Size(min = 1, max = 3, message = "Initials must be 1 to 3 characters")
    private String playerInitials;

    @PositiveOrZero(message = "Score must be 0 or positive")
    private int score;

    private int coins;
    private int rank;
    private String characterClass;
    private LocalDateTime timestamp;

    public ScoreEntry() {}

    public ScoreEntry(String id, String playerInitials, int score, int coins, int rank, String characterClass, LocalDateTime timestamp) {
        this.id = id;
        this.playerInitials = playerInitials != null ? playerInitials.toUpperCase() : "DEV";
        this.score = score;
        this.coins = coins;
        this.rank = rank;
        this.characterClass = characterClass != null ? characterClass : "BYTE FLAPPER";
        this.timestamp = timestamp != null ? timestamp : LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPlayerInitials() { return playerInitials; }
    public void setPlayerInitials(String playerInitials) { 
        this.playerInitials = playerInitials != null ? playerInitials.toUpperCase() : "DEV"; 
    }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getCoins() { return coins; }
    public void setCoins(int coins) { this.coins = coins; }

    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }

    public String getCharacterClass() { return characterClass; }
    public void setCharacterClass(String characterClass) { this.characterClass = characterClass; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
