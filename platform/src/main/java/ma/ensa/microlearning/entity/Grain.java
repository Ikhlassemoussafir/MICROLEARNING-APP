package ma.ensa.microlearning.entity;

import jakarta.persistence.*;
import ma.ensa.microlearning.enums.DifficultyLevel;
import ma.ensa.microlearning.enums.VarkStyle;
import java.time.LocalDateTime;

@Entity
@Table(name = "grains")
public class Grain {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grain_id")
    private Long grainId;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM)
    @Column(name = "difficulty_level", nullable = false)
    private DifficultyLevel difficultyLevel;
    
    @Column(name = "estimated_duration")
    private Integer estimatedDuration;
    
    @Enumerated(EnumType.STRING)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM)
    @Column(name = "target_vark_style", nullable = false)
    private VarkStyle targetVarkStyle;
    
    @Column(name = "learning_objective", columnDefinition = "TEXT", nullable = false)
    private String learningObjective;
    
    @Column(name = "h5p_content_id")
    private String h5pContentId;
    
    @Column(name = "h5p_content_url", columnDefinition = "TEXT")
    private String h5pContentUrl;
    
    @Column(name = "h5p_quiz_id")
    private String h5pQuizId;
    
    @Column(name = "h5p_quiz_url", columnDefinition = "TEXT")
    private String h5pQuizUrl;
    
    @Column(name = "quiz_passing_score")
    private Integer quizPassingScore = 70;
    
    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
    
    @Column(name = "is_published")
    private Boolean isPublished = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "visual_content_url", columnDefinition = "TEXT")
    private String visualContentUrl;

    @Column(name = "auditory_content_url", columnDefinition = "TEXT")
    private String auditoryContentUrl;

    @Column(name = "reading_content_url", columnDefinition = "TEXT")
    private String readingContentUrl;

    @Column(name = "kinesthetic_content_url", columnDefinition = "TEXT")
    private String kinestheticContentUrl;

    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.ARRAY)
    @Column(name = "available_formats", columnDefinition = "text[]")
    private String[] availableFormats;

    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.ARRAY)
    @Column(name = "video_urls", columnDefinition = "text[]")
    private String[] videoUrls;

    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.ARRAY)
    @Column(name = "slide_urls", columnDefinition = "text[]")
    private String[] slideUrls;

    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.ARRAY)
    @Column(name = "mindmap_urls", columnDefinition = "text[]")
    private String[] mindmapUrls;

    @Column(name = "kinesthetic_text", columnDefinition = "TEXT")
    private String kinestheticText;

    // Constructeurs
    public Grain() {
    }
    
    // Getters et Setters
    public Long getGrainId() {
        return grainId;
    }
    
    public void setGrainId(Long grainId) {
        this.grainId = grainId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public DifficultyLevel getDifficultyLevel() {
        return difficultyLevel;
    }
    
    public void setDifficultyLevel(DifficultyLevel difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }
    
    public Integer getEstimatedDuration() {
        return estimatedDuration;
    }
    
    public void setEstimatedDuration(Integer estimatedDuration) {
        this.estimatedDuration = estimatedDuration;
    }
    
    public VarkStyle getTargetVarkStyle() {
        return targetVarkStyle;
    }
    
    public void setTargetVarkStyle(VarkStyle targetVarkStyle) {
        this.targetVarkStyle = targetVarkStyle;
    }
    
    public String getLearningObjective() {
        return learningObjective;
    }
    
    public void setLearningObjective(String learningObjective) {
        this.learningObjective = learningObjective;
    }
    
    public String getH5pContentId() {
        return h5pContentId;
    }
    
    public void setH5pContentId(String h5pContentId) {
        this.h5pContentId = h5pContentId;
    }
    
    public String getH5pContentUrl() {
        return h5pContentUrl;
    }
    
    public void setH5pContentUrl(String h5pContentUrl) {
        this.h5pContentUrl = h5pContentUrl;
    }
    
    public String getH5pQuizId() {
        return h5pQuizId;
    }
    
    public void setH5pQuizId(String h5pQuizId) {
        this.h5pQuizId = h5pQuizId;
    }
    
    public String getH5pQuizUrl() {
        return h5pQuizUrl;
    }
    
    public void setH5pQuizUrl(String h5pQuizUrl) {
        this.h5pQuizUrl = h5pQuizUrl;
    }
    
    public Integer getQuizPassingScore() {
        return quizPassingScore;
    }
    
    public void setQuizPassingScore(Integer quizPassingScore) {
        this.quizPassingScore = quizPassingScore;
    }
    
    public Integer getOrderIndex() {
        return orderIndex;
    }
    
    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }
    
    public Boolean getIsPublished() {
        return isPublished;
    }
    
    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
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
    
    public String getVisualContentUrl() {
        return visualContentUrl;
    }

    public void setVisualContentUrl(String visualContentUrl) {
        this.visualContentUrl = visualContentUrl;
    }

    public String getAuditoryContentUrl() {
        return auditoryContentUrl;
    }

    public void setAuditoryContentUrl(String auditoryContentUrl) {
        this.auditoryContentUrl = auditoryContentUrl;
    }

    public String getReadingContentUrl() {
        return readingContentUrl;
    }

    public void setReadingContentUrl(String readingContentUrl) {
        this.readingContentUrl = readingContentUrl;
    }

    public String getKinestheticContentUrl() {
        return kinestheticContentUrl;
    }

    public void setKinestheticContentUrl(String kinestheticContentUrl) {
        this.kinestheticContentUrl = kinestheticContentUrl;
    }

    public String[] getAvailableFormats() { return availableFormats; }
    public void setAvailableFormats(String[] availableFormats) { this.availableFormats = availableFormats; }

    public String[] getVideoUrls() { return videoUrls; }
    public void setVideoUrls(String[] videoUrls) { this.videoUrls = videoUrls; }

    public String[] getSlideUrls() { return slideUrls; }
    public void setSlideUrls(String[] slideUrls) { this.slideUrls = slideUrls; }

    public String[] getMindmapUrls() { return mindmapUrls; }
    public void setMindmapUrls(String[] mindmapUrls) { this.mindmapUrls = mindmapUrls; }

    public String getKinestheticText() { return kinestheticText; }
    public void setKinestheticText(String kinestheticText) { this.kinestheticText = kinestheticText; }

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
