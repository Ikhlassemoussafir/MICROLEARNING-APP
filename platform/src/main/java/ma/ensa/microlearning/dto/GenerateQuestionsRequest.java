package ma.ensa.microlearning.dto;

import java.util.List;

public class GenerateQuestionsRequest {
    private String grainTitle;
    private String grainContent;
    private List<String> userErrors;
    private String varkStyle;

    public String getGrainTitle() { return grainTitle; }
    public void setGrainTitle(String grainTitle) { this.grainTitle = grainTitle; }
    public String getGrainContent() { return grainContent; }
    public void setGrainContent(String grainContent) { this.grainContent = grainContent; }
    public List<String> getUserErrors() { return userErrors; }
    public void setUserErrors(List<String> userErrors) { this.userErrors = userErrors; }
    public String getVarkStyle() { return varkStyle; }
    public void setVarkStyle(String varkStyle) { this.varkStyle = varkStyle; }
}
