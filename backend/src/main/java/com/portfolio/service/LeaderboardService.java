package com.portfolio.service;

import com.portfolio.model.ScoreEntry;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class LeaderboardService {

    private final List<ScoreEntry> scores = new CopyOnWriteArrayList<>();

    public LeaderboardService() {
        // Seed default arcade high-scores
        scores.add(new ScoreEntry(UUID.randomUUID().toString(), "KAG", 4250, 88, 1, "CYBER ARCHMAGE", LocalDateTime.now().minusDays(2)));
        scores.add(new ScoreEntry(UUID.randomUUID().toString(), "DEV", 3890, 72, 2, "BYTE FLAPPER", LocalDateTime.now().minusDays(1)));
        scores.add(new ScoreEntry(UUID.randomUUID().toString(), "ACE", 2980, 54, 3, "PIXEL GLIDER", LocalDateTime.now().minusHours(18)));
        scores.add(new ScoreEntry(UUID.randomUUID().toString(), "JVA", 2420, 45, 4, "GARBAGE COLLECTOR", LocalDateTime.now().minusHours(12)));
        scores.add(new ScoreEntry(UUID.randomUUID().toString(), "RCT", 1950, 36, 5, "HOOK WIZARD", LocalDateTime.now().minusHours(6)));
        scores.add(new ScoreEntry(UUID.randomUUID().toString(), "NEO", 1450, 24, 6, "MATRIX RUNNER", LocalDateTime.now().minusHours(3)));
        scores.add(new ScoreEntry(UUID.randomUUID().toString(), "BUG", 980, 15, 7, "STACK TRACER", LocalDateTime.now().minusHours(1)));
        recalculateRanks();
    }

    public synchronized List<ScoreEntry> getTopScores(int limit) {
        List<ScoreEntry> sorted = new ArrayList<>(scores);
        sorted.sort(Comparator.comparingInt(ScoreEntry::getScore).reversed());
        return sorted.subList(0, Math.min(limit, sorted.size()));
    }

    public synchronized ScoreEntry addScore(ScoreEntry entry) {
        if (entry.getId() == null) {
            entry.setId(UUID.randomUUID().toString());
        }
        if (entry.getTimestamp() == null) {
            entry.setTimestamp(LocalDateTime.now());
        }
        if (entry.getPlayerInitials() == null || entry.getPlayerInitials().trim().isEmpty()) {
            entry.setPlayerInitials("GUEST");
        }
        scores.add(entry);
        recalculateRanks();
        return entry;
    }

    private void recalculateRanks() {
        List<ScoreEntry> sorted = new ArrayList<>(scores);
        sorted.sort(Comparator.comparingInt(ScoreEntry::getScore).reversed());
        for (int i = 0; i < sorted.size(); i++) {
            sorted.get(i).setRank(i + 1);
        }
    }
}
