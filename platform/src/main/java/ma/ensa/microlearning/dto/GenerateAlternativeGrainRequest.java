package ma.ensa.microlearning.dto;

import java.util.List;

public class GenerateAlternativeGrainRequest {
    private String originalTitle;
    private String originalObjective;
    private List<String> userErrors;
    private String varkStyle;

    public String getOriginalTitle() { return originalTitle; }
    public void setOriginalTitle(String originalTitle) { this.originalTitle = originalTitle; }
    public String getOriginalObjective() { return originalObjective; }
    public void setOriginalObjective(String originalObjective) { this.originalObjective = originalObjective; }
    public List<String> getUserErrors() { return userErrors; }
    public void setUserErrors(List<String> userErrors) { this.userErrors = userErrors; }
    public String getVarkStyle() { return varkStyle; }
    public void setVarkStyle(String varkStyle) { this.varkStyle = varkStyle; }
}
