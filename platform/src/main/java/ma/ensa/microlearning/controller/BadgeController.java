package ma.ensa.microlearning.controller;

import ma.ensa.microlearning.entity.Badge;
import ma.ensa.microlearning.service.BadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")

public class BadgeController {

    @Autowired
    private BadgeService badgeService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Badge>> getBadgesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(badgeService.getBadgesByUser(userId));
    }

    @PostMapping("/award")
    public ResponseEntity<Badge> awardBadge(@RequestBody Badge badge) {
        return ResponseEntity.ok(badgeService.awardBadge(badge));
    }
}
