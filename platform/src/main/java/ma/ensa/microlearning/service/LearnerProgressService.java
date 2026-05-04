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
        progress.setLastAccessedAt(LocalDateTime.now());
        if (progress.getStartedAt() == null) {
            progress.setStartedAt(LocalDateTime.now());
        }
        LearnerProgress savedProgress = learnerProgressRepository.save(progress);
        
        if (savedProgress.getUser() != null) {
            badgeService.evaluateBadgesForUser(savedProgress.getUser());
        }
        
        return savedProgress;
    }

    public Optional<LearnerProgress> getProgressByUserAndGrain(Long userId, Long grainId) {
        return learnerProgressRepository.findByUserUserIdAndGrainGrainId(userId, grainId);
    }
}
