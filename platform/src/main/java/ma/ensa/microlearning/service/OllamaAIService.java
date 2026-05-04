package ma.ensa.microlearning.service;

import ma.ensa.microlearning.dto.AIGeneratedQuestions;
import ma.ensa.microlearning.dto.AlternativeGrain;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;

@Service
public class OllamaAIService {
    
    @Value("${ollama.api.url:http://localhost:11434/api/generate}")
    private String ollamaApiUrl;
    
    @Value("${ollama.model:llama3}")
    private String modelName;
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    public OllamaAIService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }
    
    public AIGeneratedQuestions generateSupplementaryQuestions(
        String grainTitle,
        String grainContent,
        List<String> userErrors,
        String varkStyle
    ) {
        try {
            String prompt = buildSupplementaryQuestionsPrompt(
                grainTitle, grainContent, userErrors, varkStyle
            );
            
            String responseText = callOllamaAPI(prompt);
            return objectMapper.readValue(responseText, AIGeneratedQuestions.class);
            
        } catch (Exception e) {
            e.printStackTrace();
            return createFallbackQuestions();
        }
    }
    
    public AlternativeGrain generateAlternativeGrain(
        String originalTitle,
        String originalObjective,
        List<String> userErrors,
        String varkStyle
    ) {
        try {
            String prompt = buildAlternativeGrainPrompt(
                originalTitle, originalObjective, userErrors, varkStyle
            );
            
            String responseText = callOllamaAPI(prompt);
            return objectMapper.readValue(responseText, AlternativeGrain.class);
            
        } catch (Exception e) {
            e.printStackTrace();
            return createFallbackAlternativeGrain(originalTitle);
        }
    }
    
    private String callOllamaAPI(String prompt) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelName);
        requestBody.put("prompt", prompt);
        requestBody.put("stream", false);
        requestBody.put("format", "json");
        
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(ollamaApiUrl, request, String.class);
        
        Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), Map.class);
        return (String) responseMap.get("response");
    }
    
    private String buildSupplementaryQuestionsPrompt(
        String grainTitle, String grainContent, List<String> userErrors, String varkStyle
    ) {
        return String.format("""
            Vous êtes un expert pédagogique. Générez 2-3 questions de quiz QCM ciblant les lacunes d'un étudiant.
            Grain : %s
            Contenu : %s
            Erreurs de l'étudiant : %s
            Style d'apprentissage : %s
            
            Règles de génération :
            1. Retournez UNIQUEMENT un objet JSON valide, sans texte avant ni après.
            2. Utilisez exactement cette structure JSON :
            {
              "questions": [
                {
                  "question": "Question ciblée sur l'erreur...",
                  "options": [
                    {"id": "a", "text": "Option A", "correct": false},
                    {"id": "b", "text": "Option B", "correct": true},
                    {"id": "c", "text": "Option C", "correct": false},
                    {"id": "d", "text": "Option D", "correct": false}
                  ],
                  "explanation": "Explication adaptée au style %s"
                }
              ]
            }
            """, grainTitle, grainContent != null ? grainContent.substring(0, Math.min(500, grainContent.length())) : "", String.join("\n", userErrors), varkStyle, varkStyle);
    }
    
    private String buildAlternativeGrainPrompt(
        String originalTitle, String originalObjective, List<String> userErrors, String varkStyle
    ) {
        return String.format("""
            Vous êtes un expert pédagogique. L'étudiant a échoué au grain "%s".
            Objectif original : %s
            Erreurs commises : %s
            Style d'apprentissage : %s
            
            Règles de génération :
            1. Générez un grain alternatif de 4-5 minutes sur le MÊME concept avec une approche DIFFÉRENTE adaptée au style %s.
            2. Retournez UNIQUEMENT un objet JSON valide, sans texte avant ni après.
            3. Utilisez exactement cette structure JSON :
            {
              "title": "Titre alternatif",
              "content": "Explication alternative détaillée (600-800 mots)",
              "examples": ["Exemple 1", "Exemple 2"],
              "key_points": ["Point clé 1", "Point clé 2", "Point clé 3"]
            }
            """, originalTitle, originalObjective, String.join("\n", userErrors), varkStyle, varkStyle);
    }
    
    private AIGeneratedQuestions createFallbackQuestions() {
        AIGeneratedQuestions res = new AIGeneratedQuestions();
        AIGeneratedQuestions.Question q1 = new AIGeneratedQuestions.Question();
        q1.setQuestion("Question de remédiation générée (Mode Fallback Local) - Qu'est-ce qu'une table ?");
        
        AIGeneratedQuestions.Option o1 = new AIGeneratedQuestions.Option(); o1.setId("a"); o1.setText("Une structure de données"); o1.setCorrect(true);
        AIGeneratedQuestions.Option o2 = new AIGeneratedQuestions.Option(); o2.setId("b"); o2.setText("Un meuble"); o2.setCorrect(false);
        q1.setOptions(List.of(o1, o2));
        q1.setExplanation("Dans une BDD relationnelle, une table stocke des données.");
        res.setQuestions(List.of(q1));
        return res;
    }
    
    private AlternativeGrain createFallbackAlternativeGrain(String title) {
        AlternativeGrain res = new AlternativeGrain();
        res.setTitle(title + " (Version Alternative Ollama)");
        res.setContent("Ollama n'est pas démarré ou n'a pas pu générer. Voici une explication alternative générée en fallback local.");
        res.setExamples(List.of("Exemple local 1"));
        res.setKey_points(List.of("Point clé alternatif"));
        return res;
    }
}
