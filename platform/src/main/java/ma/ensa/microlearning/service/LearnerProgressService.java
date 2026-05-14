package ma.ensa.microlearning.service;

import ma.ensa.microlearning.entity.LearnerProgress;
import ma.ensa.microlearning.repository.LearnerProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LearnerProgressService {

    @Autowired
    private LearnerProgressRepository learnerProgressRepository;
    
    @Autowired
    private BadgeService badgeService;

    public List<LearnerProgress> getProgressByUser(Long userId) {
        return learnerProgressRepository.findByUserUserId(userId);
    }

    public LearnerProgress saveProgress(LearnerProgress progress) {
        Long userId = progress.getUser().getUserId();
        Long grainId = progress.getGrain().getGrainId();

        Optional<LearnerProgress> existing = learnerProgressRepository
            .findByUserUserIdAndGrainGrainId(userId, grainId);

        if (existing.isPresent()) {
            // UPDATE — enregistrement existant trouvé
            LearnerProgress lp = existing.get();
            lp.setStatus(progress.getStatus());
            if (progress.getBestScore() != null &&
                (lp.getBestScore() == null || progress.getBestScore() > lp.getBestScore())) {
                lp.setBestScore(progress.getBestScore());
            }
            lp.setAttemptsCount((lp.getAttemptsCount() == null ? 0 : lp.getAttemptsCount()) + 1);
            lp.setTimeSpent((lp.getTimeSpent() == null ? 0 : lp.getTimeSpent()) + (progress.getTimeSpent() == null ? 0 : progress.getTimeSpent()));
            lp.setLastAccessedAt(LocalDateTime.now());
            if (progress.getCompletedAt() != null) lp.setCompletedAt(progress.getCompletedAt());
            LearnerProgress saved = learnerProgressRepository.save(lp);
            if (saved.getUser() != null) badgeService.evaluateBadgesForUser(saved.getUser());
            return saved;
        } else {
            // INSERT — premier enregistrement pour ce (userId, grainId)
            progress.setLastAccessedAt(LocalDateTime.now());
            if (progress.getStartedAt() == null) progress.setStartedAt(LocalDateTime.now());
            LearnerProgress saved = learnerProgressRepository.save(progress);
            if (saved.getUser() != null) badgeService.evaluateBadgesForUser(saved.getUser());
            return saved;
        }
    }

    public Optional<LearnerProgress> getProgressByUserAndGrain(Long userId, Long grainId) {
        return learnerProgressRepository.findByUserUserIdAndGrainGrainId(userId, grainId);
    }
}
