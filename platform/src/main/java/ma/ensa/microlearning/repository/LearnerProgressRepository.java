package ma.ensa.microlearning.repository;

import ma.ensa.microlearning.entity.LearnerProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearnerProgressRepository extends JpaRepository<LearnerProgress, Long> {
    
    Optional<LearnerProgress> findByUserUserIdAndGrainGrainId(Long userId, Long grainId);
    
    List<LearnerProgress> findByUserUserId(Long userId);
    
}
