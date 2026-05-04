package ma.ensa.microlearning.service;

import ma.ensa.microlearning.entity.QuizAttempt;
import ma.ensa.microlearning.repository.QuizAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;
    
    @Autowired
    private BadgeService badgeService;

    public QuizAttempt saveQuizAttempt(QuizAttempt attempt) {
        QuizAttempt savedAttempt = quizAttemptRepository.save(attempt);
        if (savedAttempt.getUser() != null) {
            badgeService.evaluateBadgesForUser(savedAttempt.getUser());
        }
        return savedAttempt;
    }

    public List<QuizAttempt> getAttemptsByUser(Long userId) {
        return quizAttemptRepository.findByUserUserId(userId);
    }
}
