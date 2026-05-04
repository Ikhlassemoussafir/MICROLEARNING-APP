package ma.ensa.microlearning.repository;

import ma.ensa.microlearning.entity.VarkProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VarkProfileRepository extends JpaRepository<VarkProfile, Long> {
    Optional<VarkProfile> findByUserId(Long userId);
}
