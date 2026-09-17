package com.portfolio.controller;

import com.portfolio.model.ScoreEntry;
import com.portfolio.service.LeaderboardService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public ResponseEntity<List<ScoreEntry>> getLeaderboard(@RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(leaderboardService.getTopScores(limit));
    }

    @PostMapping
    public ResponseEntity<ScoreEntry> recordScore(@Valid @RequestBody ScoreEntry entry) {
        ScoreEntry saved = leaderboardService.addScore(entry);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
