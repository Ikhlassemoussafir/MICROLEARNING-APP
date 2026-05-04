package ma.ensa.microlearning.repository;

import ma.ensa.microlearning.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    List<Recommendation> findByUserUserId(Long userId);
    
    List<Recommendation> findByUserUserIdAndIsActiveTrue(Long userId);
    
}
