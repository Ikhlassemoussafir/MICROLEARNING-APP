package ma.ensa.microlearning.controller;

import ma.ensa.microlearning.entity.QuizAttempt;
import ma.ensa.microlearning.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QuizAttempt>> getAttemptsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(quizService.getAttemptsByUser(userId));
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizAttempt> submitQuiz(@RequestBody QuizAttempt attempt) {
        return ResponseEntity.ok(quizService.saveQuizAttempt(attempt));
    }
}
