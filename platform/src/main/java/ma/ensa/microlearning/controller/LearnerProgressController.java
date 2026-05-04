package ma.ensa.microlearning.controller;

import ma.ensa.microlearning.entity.LearnerProgress;
import ma.ensa.microlearning.service.LearnerProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*") // À configurer plus strictement en production
public class LearnerProgressController {

    @Autowired
    private LearnerProgressService learnerProgressService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearnerProgress>> getProgressByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(learnerProgressService.getProgressByUser(userId));
    }

    @PostMapping
    public ResponseEntity<LearnerProgress> saveProgress(@RequestBody LearnerProgress progress) {
        return ResponseEntity.ok(learnerProgressService.saveProgress(progress));
    }
}
