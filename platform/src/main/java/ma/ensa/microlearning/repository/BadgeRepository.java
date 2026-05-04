package ma.ensa.microlearning.repository;

import ma.ensa.microlearning.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {

    List<Badge> findByUserUserId(Long userId);
    
    boolean existsByUserUserIdAndBadgeName(Long userId, String badgeName);
    
}
