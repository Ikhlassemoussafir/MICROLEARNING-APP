package ma.ensa.microlearning.repository;

import ma.ensa.microlearning.entity.AiGeneratedContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiGeneratedContentRepository extends JpaRepository<AiGeneratedContent, Long> {

    List<AiGeneratedContent> findByUserUserIdAndGrainGrainId(Long userId, Long grainId);
    
}
