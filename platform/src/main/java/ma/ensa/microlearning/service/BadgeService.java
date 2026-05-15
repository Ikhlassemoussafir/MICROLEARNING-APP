package ma.ensa.microlearning.service;

import ma.ensa.microlearning.entity.*;
import ma.ensa.microlearning.enums.DifficultyLevel;
import ma.ensa.microlearning.enums.VarkStyle;
import ma.ensa.microlearning.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BadgeService {

    @Autowired private BadgeRepository          badgeRepository;
    @Autowired private LearnerProgressRepository learnerProgressRepository;
    @Autowired private QuizAttemptRepository    quizAttemptRepository;
    @Autowired private GrainRepository          grainRepository;
    @Autowired private VarkProfileRepository    varkProfileRepository;

    public List<Badge> getBadgesByUser(Long userId) {
        return badgeRepository.findByUserUserId(userId);
    }

    public Badge awardBadge(Badge badge) {
        return badgeRepository.save(badge);
    }

    @Transactional
    public void evaluateBadgesForUser(User user) {
        if (user == null || user.getUserId() == null) return;

        Long userId = user.getUserId();

        List<LearnerProgress> progressList = learnerProgressRepository.findByUserUserId(userId);
        List<QuizAttempt>     attempts     = quizAttemptRepository.findByUserUserId(userId);

        long completedCount = progressList.stream()
            .filter(p -> isCompleted(p.getStatus()))
            .count();

        if (!hasBadge(userId, "FIRST_GRAIN") && completedCount >= 1) {
            award(user, "FIRST_GRAIN", "Premier Pas", "Compléter votre premier grain", "🎯");
        }

        if (!hasBadge(userId, "STREAK_3")) {
            long passed = attempts.stream()
                .filter(a -> a.getScore() != null && a.getScore() >= 70)
                .count();
            if (passed >= 3) award(user, "STREAK_3", "En Série", "3 grains consécutifs avec >70%", "🔥");
        }

        if (!hasBadge(userId, "PERFECT_SCORE")) {
            boolean perfect = attempts.stream()
                .anyMatch(a -> a.getScore() != null && a.getScore() == 100);
            if (perfect) award(user, "PERFECT_SCORE", "Perfection", "Obtenir 100% à un quiz", "⭐");
        }

        if (!hasBadge(userId, "FAST_LEARNER")) {
            boolean fast = attempts.stream()
                .anyMatch(a -> a.getScore() != null && a.getScore() >= 70
                            && a.getDuration() != null && a.getDuration() <= 180);
            if (fast) award(user, "FAST_LEARNER", "Apprenant Rapide", "Grain complété en moins de 3 minutes", "⚡");
        }

        if (!hasBadge(userId, "MODULE_MASTER") && completedCount >= 5) {
            award(user, "MODULE_MASTER", "Maître du Module", "Compléter tous les grains d'un module", "🏆");
        }

        if (!hasBadge(userId, "STREAK_7") && hasConsecutiveDays(attempts, 7)) {
            award(user, "STREAK_7", "Semaine Parfaite", "7 jours consécutifs d'apprentissage", "👑");
        }

        if (!hasBadge(userId, "ALL_LEVELS")) {
            Set<DifficultyLevel> levels = progressList.stream()
                .filter(p -> isCompleted(p.getStatus()) && p.getGrain() != null)
                .map(p -> p.getGrain().getDifficultyLevel())
                .collect(Collectors.toSet());
            if (levels.containsAll(Arrays.asList(
                    DifficultyLevel.DEBUTANT,
                    DifficultyLevel.INTERMEDIAIRE,
                    DifficultyLevel.AVANCE))) {
                award(user, "ALL_LEVELS", "Polyvalent", "Un grain de chaque niveau", "🎯");
            }
        }

        if (!hasBadge(userId, "HIGH_ACHIEVER") && attempts.size() >= 3) {
            double avg = attempts.stream()
                .filter(a -> a.getScore() != null)
                .mapToInt(QuizAttempt::getScore)
                .average()
                .orElse(0);
            if (avg > 85) award(user, "HIGH_ACHIEVER", "Excellence", "Moyenne générale >85%", "📈");
        }

        if (!hasBadge(userId, "SPEED_DEMON")) {
            List<Integer> durations = attempts.stream()
                .filter(a -> a.getScore() != null && a.getScore() >= 70 && a.getDuration() != null)
                .sorted(Comparator.comparingInt(QuizAttempt::getDuration))
                .limit(5)
                .map(QuizAttempt::getDuration)
                .collect(Collectors.toList());
            if (durations.size() >= 5 && durations.stream().mapToInt(Integer::intValue).sum() <= 1200) {
                award(user, "SPEED_DEMON", "Éclair", "5 grains en moins de 20 minutes", "💨");
            }
        }

        if (!hasBadge(userId, "COMPLETIONIST")) {
            long totalPublished = grainRepository.findByIsPublished(true).size();
            if (totalPublished > 0 && completedCount >= totalPublished) {
                award(user, "COMPLETIONIST", "Complétiste", "Compléter tous les grains du cours", "🏅");
            }
        }

        if (!hasBadge(userId, "VARK_MASTER")) {
            varkProfileRepository.findByUserId(userId).ifPresent(vark -> {
                VarkStyle dominant = vark.getDominantStyle();
                if (dominant != null) {
                    boolean master = attempts.stream()
                        .anyMatch(a -> a.getScore() != null && a.getScore() > 80
                                    && a.getGrain() != null
                                    && dominant.equals(a.getGrain().getTargetVarkStyle()));
                    if (master) award(user, "VARK_MASTER", "Expert VARK", "Score >80% dans votre style dominant", "✨");
                }
            });
        }
    }

    private boolean isCompleted(String status) {
        return "COMPLETE".equalsIgnoreCase(status) || "COMPLETED".equalsIgnoreCase(status);
    }

    private boolean hasConsecutiveDays(List<QuizAttempt> attempts, int days) {
        List<LocalDate> sorted = attempts.stream()
            .filter(a -> a.getCompletedAt() != null)
            .map(a -> a.getCompletedAt().toLocalDate())
            .distinct()
            .sorted()
            .collect(Collectors.toList());

        int streak = 1;
        for (int i = 1; i < sorted.size(); i++) {
            if (sorted.get(i).minusDays(1).equals(sorted.get(i - 1))) {
                if (++streak >= days) return true;
            } else {
                streak = 1;
            }
        }
        return streak >= days;
    }

    private boolean hasBadge(Long userId, String badgeType) {
        return badgeRepository.findByUserUserId(userId).stream()
            .anyMatch(b -> badgeType.equals(b.getBadgeType()));
    }

    private void award(User user, String type, String name, String description, String icon) {
        Badge badge = new Badge();
        badge.setUser(user);
        badge.setBadgeType(type);
        badge.setBadgeName(name);
        badge.setBadgeDescription(description);
        badge.setBadgeIconUrl(icon);
        badge.setEarnedAt(LocalDateTime.now());
        badgeRepository.save(badge);
    }
}