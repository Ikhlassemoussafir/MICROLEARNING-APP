package ma.ensa.microlearning.repository;

import ma.ensa.microlearning.entity.Grain;
import ma.ensa.microlearning.enums.DifficultyLevel;
import ma.ensa.microlearning.enums.VarkStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GrainRepository extends JpaRepository<Grain, Long> {
    
    List<Grain> findByIsPublished(Boolean isPublished);
    
    List<Grain> findByDifficultyLevel(DifficultyLevel difficultyLevel);
    
    List<Grain> findByTargetVarkStyle(VarkStyle varkStyle);
    
    List<Grain> findByDifficultyLevelAndTargetVarkStyle(DifficultyLevel difficultyLevel, VarkStyle varkStyle);
    
    List<Grain> findByIsPublishedOrderByOrderIndexAsc(Boolean isPublished);
    
    Optional<Grain> findFirstByOrderIndexGreaterThanOrderByOrderIndexAsc(Integer orderIndex);
    
    Optional<Grain> findFirstByTargetVarkStyleAndOrderIndexGreaterThanOrderByOrderIndexAsc(VarkStyle varkStyle, Integer orderIndex);
}
