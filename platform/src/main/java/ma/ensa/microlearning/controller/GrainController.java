package ma.ensa.microlearning.controller;

import ma.ensa.microlearning.entity.Grain;
import ma.ensa.microlearning.enums.DifficultyLevel;
import ma.ensa.microlearning.enums.VarkStyle;
import ma.ensa.microlearning.repository.GrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grains")
public class GrainController {
    
    @Autowired
    private GrainRepository grainRepository;
    
    @GetMapping
    public List<Grain> getAllGrains() {
        return grainRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Grain> getGrainById(@PathVariable Long id) {
        return grainRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/published")
    public List<Grain> getPublishedGrains() {
        return grainRepository.findByIsPublishedOrderByOrderIndexAsc(true);
    }
    
    @GetMapping("/level/{level}")
    public List<Grain> getGrainsByLevel(@PathVariable DifficultyLevel level) {
        return grainRepository.findByDifficultyLevel(level);
    }
    
    @GetMapping("/vark/{style}")
    public List<Grain> getGrainsByVarkStyle(@PathVariable VarkStyle style) {
        return grainRepository.findByTargetVarkStyle(style);
    }

    @PostMapping
    public ResponseEntity<Grain> createGrain(@RequestBody Grain grain) {
        // Optionnel : on pourrait forcer l'ordre ou certaines valeurs par défaut ici
        if (grain.getOrderIndex() == null) {
            grain.setOrderIndex(99); // valeur par défaut
        }
        Grain savedGrain = grainRepository.save(grain);
        return ResponseEntity.ok(savedGrain);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grain> updateGrain(@PathVariable Long id, @RequestBody Grain grainDetails) {
        return grainRepository.findById(id)
                .map(existingGrain -> {
                    existingGrain.setTitle(grainDetails.getTitle());
                    existingGrain.setDescription(grainDetails.getDescription());
                    existingGrain.setDifficultyLevel(grainDetails.getDifficultyLevel());
                    existingGrain.setTargetVarkStyle(grainDetails.getTargetVarkStyle());
                    existingGrain.setEstimatedDuration(grainDetails.getEstimatedDuration());
                    existingGrain.setLearningObjective(grainDetails.getLearningObjective());
                    
                    // URL VARK
                    if(grainDetails.getVisualContentUrl() != null) existingGrain.setVisualContentUrl(grainDetails.getVisualContentUrl());
                    if(grainDetails.getAuditoryContentUrl() != null) existingGrain.setAuditoryContentUrl(grainDetails.getAuditoryContentUrl());
                    if(grainDetails.getReadingContentUrl() != null) existingGrain.setReadingContentUrl(grainDetails.getReadingContentUrl());
                    if(grainDetails.getKinestheticContentUrl() != null) existingGrain.setKinestheticContentUrl(grainDetails.getKinestheticContentUrl());
                    if(grainDetails.getAvailableFormats() != null) existingGrain.setAvailableFormats(grainDetails.getAvailableFormats());
                    
                    if(grainDetails.getVideoUrls() != null) existingGrain.setVideoUrls(grainDetails.getVideoUrls());
                    if(grainDetails.getSlideUrls() != null) existingGrain.setSlideUrls(grainDetails.getSlideUrls());
                    if(grainDetails.getMindmapUrls() != null) existingGrain.setMindmapUrls(grainDetails.getMindmapUrls());
                    if(grainDetails.getKinestheticText() != null) existingGrain.setKinestheticText(grainDetails.getKinestheticText());
                    
                    Grain updated = grainRepository.save(existingGrain);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrain(@PathVariable Long id) {
        return grainRepository.findById(id)
                .map(grain -> {
                    grainRepository.delete(grain);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
