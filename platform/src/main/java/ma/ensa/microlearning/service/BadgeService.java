package ma.ensa.microlearning.service;

import ma.ensa.microlearning.entity.Badge;
import ma.ensa.microlearning.entity.LearnerProgress;
import ma.ensa.microlearning.entity.QuizAttempt;
import ma.ensa.microlearning.entity.User;
import ma.ensa.microlearning.repository.BadgeRepository;
import ma.ensa.microlearning.repository.LearnerProgressRepository;
import ma.ensa.microlearning.repository.QuizAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BadgeService {

    @Autowired
    private BadgeRepository badgeRepository;

    @Autowired
    private LearnerProgressRepository learnerProgressRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    public List<Badge> getBadgesByUser(Long userId) {
        return badgeRepository.findByUserUserId(userId);
    }

    public Badge awardBadge(Badge badge) {
        return badgeRepository.save(badge);
    }

    public void evaluateBadgesForUser(User user) {
        if (user == null || user.getUserId() == null) return;

        Long userId = user.getUserId();

        // 1. FIRST_GRAIN - Premier Pas
        if (!hasBadge(userId, "FIRST_GRAIN")) {
            List<LearnerProgress> progressList = learnerProgressRepository.findByUserUserId(userId);
            long completedCount = progressList.stream()
                .filter(p -> "COMPLETED".equalsIgnoreCase(p.getStatus()))
                .count();
            
            if (completedCount >= 1) {
                createAndAwardBadge(user, "FIRST_GRAIN", "Premier Pas", "Compléter votre premier grain", "🎯");
            }
        }

        // 2. STREAK_3 - En Série (3 quiz réussis avec >70%)
        if (!hasBadge(userId, "STREAK_3")) {
            List<QuizAttempt> attempts = quizAttemptRepository.findByUserUserId(userId);
            long passedCount = attempts.stream()
                .filter(a -> a.getScore() != null && a.getScore() >= 70)
                .count();

            if (passedCount >= 3) {
                createAndAwardBadge(user, "STREAK_3", "En Série", "3 grains consécutifs avec >70%", "🔥");
            }
        }
        
        // 3. PERFECT_SCORE - Perfection
        if (!hasBadge(userId, "PERFECT_SCORE")) {
            List<QuizAttempt> attempts = quizAttemptRepository.findByUserUserId(userId);
            long perfectCount = attempts.stream()
                .filter(a -> a.getScore() != null && a.getScore() == 100)
                .count();

            if (perfectCount >= 1) {
                createAndAwardBadge(user, "PERFECT_SCORE", "Perfection", "Obtenir 100% à un quiz", "⭐");
            }
        }
    }

    private boolean hasBadge(Long userId, String badgeType) {
        // Since we modified existsByUserUserIdAndBadgeName earlier, 
        // we should actually check by badgeType, or badgeName if we set them equally.
        // For safety, let's just fetch and check:
        return badgeRepository.findByUserUserId(userId).stream()
                .anyMatch(b -> badgeType.equals(b.getBadgeType()));
    }

    private void createAndAwardBadge(User user, String type, String name, String description, String icon) {
        Badge badge = new Badge();
        badge.setUser(user);
        badge.setBadgeType(type); // This matches the frontend 'id'
        badge.setBadgeName(name);
        badge.setBadgeDescription(description);
        badge.setBadgeIconUrl(icon);
        badge.setEarnedAt(LocalDateTime.now());
        awardBadge(badge);
    }
}
