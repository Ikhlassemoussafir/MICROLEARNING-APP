package ma.ensa.microlearning.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommendation_id")
    private Long recommendationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grain_id", nullable = false)
    private Grain grain;

    @Column(name = "recommendation_score", precision = 5, scale = 2)
    private BigDecimal recommendationScore;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(name = "recommendation_type", length = 50)
    private String recommendationType;

    @Column(name = "algorithm_used", length = 100)
    private String algorithmUsed;

    @Column(name = "is_accepted")
    private Boolean isAccepted;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "accepted_at")
    private LocalDateTime acceptedAt;

    public Recommendation() {}

    // Getters and Setters
    public Long getRecommendationId() { return recommendationId; }
    public void setRecommendationId(Long recommendationId) { this.recommendationId = recommendationId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Grain getGrain() { return grain; }
    public void setGrain(Grain grain) { this.grain = grain; }

    public BigDecimal getRecommendationScore() { return recommendationScore; }
    public void setRecommendationScore(BigDecimal recommendationScore) { this.recommendationScore = recommendationScore; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getRecommendationType() { return recommendationType; }
    public void setRecommendationType(String recommendationType) { this.recommendationType = recommendationType; }

    public String getAlgorithmUsed() { return algorithmUsed; }
    public void setAlgorithmUsed(String algorithmUsed) { this.algorithmUsed = algorithmUsed; }

    public Boolean getIsAccepted() { return isAccepted; }
    public void setIsAccepted(Boolean isAccepted) { this.isAccepted = isAccepted; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getAcceptedAt() { return acceptedAt; }
    public void setAcceptedAt(LocalDateTime acceptedAt) { this.acceptedAt = acceptedAt; }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
