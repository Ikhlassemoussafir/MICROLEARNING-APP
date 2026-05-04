package ma.ensa.microlearning.entity;

import jakarta.persistence.*;
import ma.ensa.microlearning.enums.VarkStyle;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_generated_content")
public class AiGeneratedContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id")
    private Long contentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grain_id", nullable = false)
    private Grain grain;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attempt_id")
    private QuizAttempt attempt;

    @Column(name = "content_type", length = 50)
    private String contentType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "generated_content", columnDefinition = "jsonb", nullable = false)
    private String generatedContent;

    @Column(name = "generation_prompt", columnDefinition = "TEXT")
    private String generationPrompt;

    @Enumerated(EnumType.STRING)
    @Column(name = "adapted_vark_style")
    private VarkStyle adaptedVarkStyle;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "target_concepts", columnDefinition = "text[]")
    private String[] targetConcepts;

    @Column(name = "model_used", length = 50)
    private String modelUsed = "claude-sonnet-4";

    @Column(name = "generation_time")
    private Integer generationTime;

    @Column(name = "tokens_used")
    private Integer tokensUsed;

    @Column(name = "is_helpful")
    private Boolean isHelpful;

    @Column(name = "feedback_text", columnDefinition = "TEXT")
    private String feedbackText;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public AiGeneratedContent() {}

    // Getters and Setters
    public Long getContentId() { return contentId; }
    public void setContentId(Long contentId) { this.contentId = contentId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Grain getGrain() { return grain; }
    public void setGrain(Grain grain) { this.grain = grain; }

    public QuizAttempt getAttempt() { return attempt; }
    public void setAttempt(QuizAttempt attempt) { this.attempt = attempt; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public String getGeneratedContent() { return generatedContent; }
    public void setGeneratedContent(String generatedContent) { this.generatedContent = generatedContent; }

    public String getGenerationPrompt() { return generationPrompt; }
    public void setGenerationPrompt(String generationPrompt) { this.generationPrompt = generationPrompt; }

    public VarkStyle getAdaptedVarkStyle() { return adaptedVarkStyle; }
    public void setAdaptedVarkStyle(VarkStyle adaptedVarkStyle) { this.adaptedVarkStyle = adaptedVarkStyle; }

    public String[] getTargetConcepts() { return targetConcepts; }
    public void setTargetConcepts(String[] targetConcepts) { this.targetConcepts = targetConcepts; }

    public String getModelUsed() { return modelUsed; }
    public void setModelUsed(String modelUsed) { this.modelUsed = modelUsed; }

    public Integer getGenerationTime() { return generationTime; }
    public void setGenerationTime(Integer generationTime) { this.generationTime = generationTime; }

    public Integer getTokensUsed() { return tokensUsed; }
    public void setTokensUsed(Integer tokensUsed) { this.tokensUsed = tokensUsed; }

    public Boolean getIsHelpful() { return isHelpful; }
    public void setIsHelpful(Boolean isHelpful) { this.isHelpful = isHelpful; }

    public String getFeedbackText() { return feedbackText; }
    public void setFeedbackText(String feedbackText) { this.feedbackText = feedbackText; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
