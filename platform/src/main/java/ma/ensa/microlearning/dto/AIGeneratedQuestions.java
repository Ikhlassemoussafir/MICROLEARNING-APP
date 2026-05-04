package ma.ensa.microlearning.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AIGeneratedQuestions {
    private List<Question> questions;

    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Question {
        private String question;
        private List<Option> options;
        private String explanation;

        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
        public List<Option> getOptions() { return options; }
        public void setOptions(List<Option> options) { this.options = options; }
        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Option {
        private String id;
        private String text;
        private boolean correct;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        public boolean isCorrect() { return correct; }
        public void setCorrect(boolean correct) { this.correct = correct; }
    }
}
