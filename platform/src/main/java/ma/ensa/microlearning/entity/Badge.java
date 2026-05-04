package ma.ensa.microlearning.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_id")
    private Long badgeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "badge_type", length = 50)
    private String badgeType;

    @Column(name = "badge_name", nullable = false, length = 100)
    private String badgeName;

    @Column(name = "badge_description", columnDefinition = "TEXT")
    private String badgeDescription;

    @Column(name = "badge_icon_url", columnDefinition = "TEXT")
    private String badgeIconUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grain_id")
    private Grain grain;

    // Notice we just map these as IDs or create relations if there's a Module entity.
    // For simplicity, using Long to avoid full Module entity load if it's not strictly necessary, 
    // or we can map them if we already have Module/Course entities.
    @Column(name = "module_id")
    private Long moduleId;

    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "earned_at")
    private LocalDateTime earnedAt;

    public Badge() {}

    // Getters and Setters
    public Long getBadgeId() { return badgeId; }
    public void setBadgeId(Long badgeId) { this.badgeId = badgeId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getBadgeType() { return badgeType; }
    public void setBadgeType(String badgeType) { this.badgeType = badgeType; }

    public String getBadgeName() { return badgeName; }
    public void setBadgeName(String badgeName) { this.badgeName = badgeName; }

    public String getBadgeDescription() { return badgeDescription; }
    public void setBadgeDescription(String badgeDescription) { this.badgeDescription = badgeDescription; }

    public String getBadgeIconUrl() { return badgeIconUrl; }
    public void setBadgeIconUrl(String badgeIconUrl) { this.badgeIconUrl = badgeIconUrl; }

    public Grain getGrain() { return grain; }
    public void setGrain(Grain grain) { this.grain = grain; }

    public Long getModuleId() { return moduleId; }
    public void setModuleId(Long moduleId) { this.moduleId = moduleId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public LocalDateTime getEarnedAt() { return earnedAt; }
    public void setEarnedAt(LocalDateTime earnedAt) { this.earnedAt = earnedAt; }

    @PrePersist
    protected void onCreate() {
        if (earnedAt == null) earnedAt = LocalDateTime.now();
    }
}
