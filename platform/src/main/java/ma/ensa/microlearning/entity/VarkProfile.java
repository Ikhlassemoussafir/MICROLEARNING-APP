package ma.ensa.microlearning.entity;

import jakarta.persistence.*;
import ma.ensa.microlearning.enums.DifficultyLevel;
import ma.ensa.microlearning.enums.VarkStyle;
import java.time.LocalDateTime;

@Entity
@Table(name = "vark_profiles")
public class VarkProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;
    
    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;
    
    @Column(name = "visual_score")
    private Integer visualScore;
    
    @Column(name = "auditory_score")
    private Integer auditoryScore;
    
    @Column(name = "reading_score")
    private Integer readingScore;
    
    @Column(name = "kinesthetic_score")
    private Integer kinestheticScore;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "dominant_style")
    private VarkStyle dominantStyle;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "current_level")
    private DifficultyLevel currentLevel = DifficultyLevel.DEBUTANT;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public VarkProfile() {
    }
    
    public Long getProfileId() {
        return profileId;
    }
    
    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Integer getVisualScore() {
        return visualScore;
    }
    
    public void setVisualScore(Integer visualScore) {
        this.visualScore = visualScore;
    }
    
    public Integer getAuditoryScore() {
        return auditoryScore;
    }
    
    public void setAuditoryScore(Integer auditoryScore) {
        this.auditoryScore = auditoryScore;
    }
    
    public Integer getReadingScore() {
        return readingScore;
    }
    
    public void setReadingScore(Integer readingScore) {
        this.readingScore = readingScore;
    }
    
    public Integer getKinestheticScore() {
        return kinestheticScore;
    }
    
    public void setKinestheticScore(Integer kinestheticScore) {
        this.kinestheticScore = kinestheticScore;
    }
    
    public VarkStyle getDominantStyle() {
        return dominantStyle;
    }
    
    public void setDominantStyle(VarkStyle dominantStyle) {
        this.dominantStyle = dominantStyle;
    }
    
    public DifficultyLevel getCurrentLevel() {
        return currentLevel;
    }
    
    public void setCurrentLevel(DifficultyLevel currentLevel) {
        this.currentLevel = currentLevel;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
