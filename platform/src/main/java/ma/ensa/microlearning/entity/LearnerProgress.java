package ma.ensa.microlearning.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learner_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "grain_id"})
})
public class LearnerProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long progressId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grain_id", nullable = false)
    private Grain grain;

    @Column(length = 20)
    private String status;

    @Column(name = "best_score")
    private Integer bestScore;

    @Column(name = "attempts_count")
    private Integer attemptsCount = 0;

    @Column(name = "time_spent")
    private Integer timeSpent = 0;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "last_accessed_at")
    private LocalDateTime lastAccessedAt;

    public LearnerProgress() {}

    // Getters and Setters
    public Long getProgressId() { return progressId; }
    public void setProgressId(Long progressId) { this.progressId = progressId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Grain getGrain() { return grain; }
    public void setGrain(Grain grain) { this.grain = grain; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getBestScore() { return bestScore; }
    public void setBestScore(Integer bestScore) { this.bestScore = bestScore; }

    public Integer getAttemptsCount() { return attemptsCount; }
    public void setAttemptsCount(Integer attemptsCount) { this.attemptsCount = attemptsCount; }

    public Integer getTimeSpent() { return timeSpent; }
    public void setTimeSpent(Integer timeSpent) { this.timeSpent = timeSpent; }

    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public LocalDateTime getLastAccessedAt() { return lastAccessedAt; }
    public void setLastAccessedAt(LocalDateTime lastAccessedAt) { this.lastAccessedAt = lastAccessedAt; }

    @PrePersist
    protected void onCreate() {
        if (lastAccessedAt == null) lastAccessedAt = LocalDateTime.now();
    }
}
