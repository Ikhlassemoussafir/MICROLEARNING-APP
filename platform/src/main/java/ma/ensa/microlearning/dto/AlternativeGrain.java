package ma.ensa.microlearning.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AlternativeGrain {
    private String title;
    private String content;
    private List<String> examples;
    private List<String> key_points;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public List<String> getExamples() { return examples; }
    public void setExamples(List<String> examples) { this.examples = examples; }
    public List<String> getKey_points() { return key_points; }
    public void setKey_points(List<String> key_points) { this.key_points = key_points; }
}
