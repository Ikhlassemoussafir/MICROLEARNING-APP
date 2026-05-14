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

    @PostMapping("/check")
    public ResponseEntity<Void> checkBadges(@RequestBody java.util.Map<String, Object> data) {
        try {
            Long userId = Long.valueOf(data.get("userId").toString());
            ma.ensa.microlearning.entity.User user = new ma.ensa.microlearning.entity.User();
            user.setUserId(userId);
            badgeService.evaluateBadgesForUser(user);
        } catch (Exception e) {
            // silencieux — ne pas bloquer le frontend
        }
        return ResponseEntity.ok().build();
    }
}
