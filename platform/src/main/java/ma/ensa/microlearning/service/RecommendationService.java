package ma.ensa.microlearning.service;

import ma.ensa.microlearning.entity.Recommendation;
import ma.ensa.microlearning.entity.User;
import ma.ensa.microlearning.entity.Grain;
import ma.ensa.microlearning.entity.VarkProfile;
import ma.ensa.microlearning.enums.VarkStyle;
import ma.ensa.microlearning.repository.RecommendationRepository;
import ma.ensa.microlearning.repository.GrainRepository;
import ma.ensa.microlearning.repository.VarkProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    @Autowired
    private GrainRepository grainRepository;
    
    @Autowired
    private VarkProfileRepository varkProfileRepository;

    public List<Recommendation> getActiveRecommendations(Long userId) {
        return recommendationRepository.findByUserUserIdAndIsActiveTrue(userId);
    }

    public Recommendation generateRecommendation(User user, Grain currentGrain, int score) {
        Recommendation rec = new Recommendation();
        rec.setUser(user);
        rec.setIsActive(true);
        rec.setAlgorithmUsed("Rule-based VARK");

        // Obtenir le profil VARK de l'étudiant
        VarkStyle userDominantStyle = null;
        Optional<VarkProfile> profileOpt = varkProfileRepository.findByUserId(user.getUserId());
        if (profileOpt.isPresent()) {
            userDominantStyle = profileOpt.get().getDominantStyle();
        }

        if (score >= 70) {
            rec.setRecommendationType("NEXT_GRAIN");
            rec.setReason("Vous avez maîtrisé le concept ! Passez au grain suivant.");
            rec.setRecommendationScore(new BigDecimal("90.00"));
            
            Grain nextGrain = null;
            if (userDominantStyle != null) {
                nextGrain = grainRepository.findFirstByTargetVarkStyleAndOrderIndexGreaterThanOrderByOrderIndexAsc(userDominantStyle, currentGrain.getOrderIndex()).orElse(null);
            }
            
            // Fallback si aucun grain ne correspond exactement au style VARK
            if (nextGrain == null) {
                nextGrain = grainRepository.findFirstByOrderIndexGreaterThanOrderByOrderIndexAsc(currentGrain.getOrderIndex()).orElse(null);
            }
            
            if (nextGrain != null) {
                rec.setGrain(nextGrain);
            } else {
                rec.setReason("Félicitations, vous avez terminé le module !");
                rec.setGrain(currentGrain); // fallback
            }
        } else {
            rec.setRecommendationType("ALTERNATIVE");
            rec.setReason("Il semble que certaines notions nécessitent d'être revues. Essayez ce grain sous un autre format.");
            rec.setRecommendationScore(new BigDecimal("85.00"));
            
            // Recommander le même grain pour le relire, ou si on avait des grains de remédiation, on les chercherait ici.
            rec.setGrain(currentGrain);
        }

        return recommendationRepository.save(rec);
    }
}
