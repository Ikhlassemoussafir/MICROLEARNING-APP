package ma.ensa.microlearning.repository;

import ma.ensa.microlearning.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    List<QuizAttempt> findByUserUserId(Long userId);
    
    List<QuizAttempt> findByUserUserIdAndGrainGrainId(Long userId, Long grainId);
    
}
