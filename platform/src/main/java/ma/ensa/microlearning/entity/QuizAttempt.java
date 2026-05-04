package ma.ensa.microlearning.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_id")
    private Long attemptId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grain_id", nullable = false)
    private Grain grain;

    private Integer score;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "answers_json", columnDefinition = "jsonb")
    private String answersJson;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "missed_concepts", columnDefinition = "text[]")
    private String[] missedConcepts;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "completed_at", nullable = false)
    private LocalDateTime completedAt;

    private Integer duration;

    @Column(name = "is_passed", insertable = false, updatable = false)
    private Boolean isPassed;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public QuizAttempt() {}

    // Getters and Setters
    public Long getAttemptId() { return attemptId; }
    public void setAttemptId(Long attemptId) { this.attemptId = attemptId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Grain getGrain() { return grain; }
    public void setGrain(Grain grain) { this.grain = grain; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public String getAnswersJson() { return answersJson; }
    public void setAnswersJson(String answersJson) { this.answersJson = answersJson; }

    public String[] getMissedConcepts() { return missedConcepts; }
    public void setMissedConcepts(String[] missedConcepts) { this.missedConcepts = missedConcepts; }

    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }

    public Boolean getIsPassed() { return isPassed; }
    public void setIsPassed(Boolean isPassed) { this.isPassed = isPassed; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
