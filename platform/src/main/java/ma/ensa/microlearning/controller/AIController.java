package ma.ensa.microlearning.controller;

import ma.ensa.microlearning.dto.AIGeneratedQuestions;
import ma.ensa.microlearning.dto.AlternativeGrain;
import ma.ensa.microlearning.dto.GenerateAlternativeGrainRequest;
import ma.ensa.microlearning.dto.GenerateQuestionsRequest;
import ma.ensa.microlearning.service.OllamaAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {
    
    @Autowired
    private OllamaAIService ollamaAIService;
    
    @PostMapping("/questions-supplementaires")
    public ResponseEntity<AIGeneratedQuestions> generateQuestions(
        @RequestBody GenerateQuestionsRequest request
    ) {
        AIGeneratedQuestions questions = ollamaAIService.generateSupplementaryQuestions(
            request.getGrainTitle(),
            request.getGrainContent(),
            request.getUserErrors(),
            request.getVarkStyle()
        );
        return ResponseEntity.ok(questions);
    }
    
    @PostMapping("/grain-alternatif")
    public ResponseEntity<AlternativeGrain> generateAlternativeGrain(
        @RequestBody GenerateAlternativeGrainRequest request
    ) {
        AlternativeGrain grain = ollamaAIService.generateAlternativeGrain(
            request.getOriginalTitle(),
            request.getOriginalObjective(),
            request.getUserErrors(),
            request.getVarkStyle()
        );
        return ResponseEntity.ok(grain);
    }
}
