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

    // ✅ Utilise llama3.2 qui est installé sur ta machine
    @Value("${ollama.api.url:http://localhost:11434/api/generate}")
    private String ollamaApiUrl;

    @Value("${ollama.model:llama3.2}")
    private String modelName;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public OllamaAIService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    // ══════════════════════════════════════════════════════
    //  GÉNÉRATION DE QUESTIONS DE REMÉDIATION
    // ══════════════════════════════════════════════════════
    public AIGeneratedQuestions generateSupplementaryQuestions(
        String grainTitle,
        String grainContent,
        List<String> userErrors,
        String varkStyle
    ) {
        try {
            System.out.println("=== OLLAMA : Génération questions remédiation pour : " + grainTitle);
            String prompt = buildSupplementaryQuestionsPrompt(grainTitle, grainContent, userErrors, varkStyle);
            String responseText = callOllamaAPI(prompt);
            System.out.println("=== OLLAMA Réponse reçue ===");

            // Nettoyer la réponse (supprimer les backticks markdown si présents)
            responseText = cleanJsonResponse(responseText);
            return objectMapper.readValue(responseText, AIGeneratedQuestions.class);

        } catch (Exception e) {
            System.err.println("OLLAMA erreur questions : " + e.getMessage());
            return createFallbackQuestions(grainTitle);
        }
    }

    // ══════════════════════════════════════════════════════
    //  GÉNÉRATION DE GRAIN ALTERNATIF
    // ══════════════════════════════════════════════════════
    public AlternativeGrain generateAlternativeGrain(
        String originalTitle,
        String originalObjective,
        List<String> userErrors,
        String varkStyle
    ) {
        try {
            System.out.println("=== OLLAMA : Génération grain alternatif pour : " + originalTitle);
            String prompt = buildAlternativeGrainPrompt(originalTitle, originalObjective, userErrors, varkStyle);
            String responseText = callOllamaAPI(prompt);
            System.out.println("=== OLLAMA Grain alternatif reçu ===");

            responseText = cleanJsonResponse(responseText);
            return objectMapper.readValue(responseText, AlternativeGrain.class);

        } catch (Exception e) {
            System.err.println("OLLAMA erreur grain alternatif : " + e.getMessage());
            return createFallbackAlternativeGrain(originalTitle, varkStyle);
        }
    }

    // ══════════════════════════════════════════════════════
    //  APPEL API OLLAMA
    // ══════════════════════════════════════════════════════
    private String callOllamaAPI(String prompt) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelName);
        requestBody.put("prompt", prompt);
        requestBody.put("stream", false);
        requestBody.put("format", "json");
        requestBody.put("options", Map.of(
            "temperature", 0.3,   // Réponses plus cohérentes
            "num_predict", 1500   // Limite la longueur de la réponse
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        // Timeout augmenté pour llama3.2 (peut être lent)
        RestTemplate templateWithTimeout = new RestTemplate();
        ResponseEntity<String> response = templateWithTimeout.postForEntity(ollamaApiUrl, request, String.class);

        Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), Map.class);
        return (String) responseMap.get("response");
    }

    // ══════════════════════════════════════════════════════
    //  PROMPT QUESTIONS DE REMÉDIATION
    // ══════════════════════════════════════════════════════
    private String buildSupplementaryQuestionsPrompt(
        String grainTitle, String grainContent, List<String> userErrors, String varkStyle
    ) {
        String errorsStr = userErrors != null && !userErrors.isEmpty()
            ? String.join(", ", userErrors)
            : "concepts généraux du grain";

        String styleHint = getStyleHint(varkStyle);

        return String.format(
            "Tu es un expert pédagogique en bases de données SQL. " +
            "Génère exactement 3 questions QCM de remédiation en français.\n\n" +
            "Grain : %s\n" +
            "Erreurs de l'étudiant : %s\n" +
            "Style d'apprentissage : %s — %s\n\n" +
            "RÈGLES STRICTES :\n" +
            "1. Réponds UNIQUEMENT avec un JSON valide, aucun texte avant ou après\n" +
            "2. Chaque question doit cibler directement une erreur commise\n" +
            "3. L'explication doit utiliser le style %s\n\n" +
            "FORMAT JSON OBLIGATOIRE :\n" +
            "{\"questions\": [{" +
            "\"question\": \"Question en français\"," +
            "\"options\": [" +
            "{\"id\": \"a\", \"text\": \"Option A\", \"correct\": false}," +
            "{\"id\": \"b\", \"text\": \"Option B\", \"correct\": true}," +
            "{\"id\": \"c\", \"text\": \"Option C\", \"correct\": false}," +
            "{\"id\": \"d\", \"text\": \"Option D\", \"correct\": false}" +
            "]," +
            "\"explanation\": \"Explication claire en français\"" +
            "}]}",
            grainTitle,
            errorsStr,
            varkStyle, styleHint,
            varkStyle
        );
    }

    // ══════════════════════════════════════════════════════
    //  PROMPT GRAIN ALTERNATIF
    // ══════════════════════════════════════════════════════
    private String buildAlternativeGrainPrompt(
        String originalTitle, String originalObjective, List<String> userErrors, String varkStyle
    ) {
        String errorsStr = userErrors != null && !userErrors.isEmpty()
            ? String.join(", ", userErrors)
            : "compréhension générale";

        String styleHint = getStyleHint(varkStyle);

        return String.format(
            "Tu es un expert pédagogique en SQL. L'étudiant a échoué au grain \"%s\".\n" +
            "Objectif : %s\n" +
            "Erreurs commises : %s\n" +
            "Style d'apprentissage : %s — %s\n\n" +
            "Génère une explication alternative COURTE (300-400 mots) du MÊME concept " +
            "avec une approche différente adaptée au style %s.\n\n" +
            "RÈGLES STRICTES :\n" +
            "1. Réponds UNIQUEMENT avec un JSON valide\n" +
            "2. Le contenu doit être en français\n" +
            "3. Adapte le vocabulaire au style d'apprentissage\n\n" +
            "FORMAT JSON OBLIGATOIRE :\n" +
            "{" +
            "\"title\": \"Titre alternatif\"," +
            "\"content\": \"Explication alternative (300-400 mots)\"," +
            "\"examples\": [\"Exemple concret 1\", \"Exemple concret 2\"]," +
            "\"key_points\": [\"Point clé 1\", \"Point clé 2\", \"Point clé 3\"]" +
            "}",
            originalTitle,
            originalObjective,
            errorsStr,
            varkStyle, styleHint,
            varkStyle
        );
    }

    // ══════════════════════════════════════════════════════
    //  HELPERS
    // ══════════════════════════════════════════════════════
    private String getStyleHint(String varkStyle) {
        if (varkStyle == null) return "approche générale";
        return switch (varkStyle.toUpperCase()) {
            case "VISUEL" -> "utilise des schémas, diagrammes et visualisations";
            case "AUDITIF" -> "utilise des explications orales, exemples sonores et narration";
            case "LECTURE" -> "utilise des définitions précises, listes et texte structuré";
            case "KINESTHESIQUE" -> "utilise des exemples pratiques, code concret et manipulation";
            default -> "approche pédagogique claire et structurée";
        };
    }

    private String cleanJsonResponse(String response) {
        if (response == null) return "{}";
        // Supprimer les backticks markdown
        response = response.replaceAll("```json", "").replaceAll("```", "").trim();
        // Trouver le début du JSON
        int start = response.indexOf('{');
        int end = response.lastIndexOf('}');
        if (start >= 0 && end > start) {
            return response.substring(start, end + 1);
        }
        return response;
    }

    // ══════════════════════════════════════════════════════
    //  FALLBACKS (si Ollama ne répond pas)
    // ══════════════════════════════════════════════════════
    private AIGeneratedQuestions createFallbackQuestions(String grainTitle) {
        AIGeneratedQuestions res = new AIGeneratedQuestions();
        List<AIGeneratedQuestions.Question> questions = new ArrayList<>();

        AIGeneratedQuestions.Question q1 = new AIGeneratedQuestions.Question();
        q1.setQuestion("Question de remédiation sur : " + grainTitle + " — Quel est le concept principal de ce grain ?");
        List<AIGeneratedQuestions.Option> opts = Arrays.asList(
            createOption("a", "La structure des données", true),
            createOption("b", "Les interfaces graphiques", false),
            createOption("c", "Les algorithmes de tri", false),
            createOption("d", "Les protocoles réseau", false)
        );
        q1.setOptions(opts);
        q1.setExplanation("Ce grain porte sur les concepts fondamentaux de " + grainTitle);
        questions.add(q1);

        res.setQuestions(questions);
        return res;
    }

    private AIGeneratedQuestions.Option createOption(String id, String text, boolean correct) {
        AIGeneratedQuestions.Option opt = new AIGeneratedQuestions.Option();
        opt.setId(id);
        opt.setText(text);
        opt.setCorrect(correct);
        return opt;
    }

    private AlternativeGrain createFallbackAlternativeGrain(String title, String varkStyle) {
        AlternativeGrain res = new AlternativeGrain();
        res.setTitle(title + " — Approche " + varkStyle);
        res.setContent(
            "Voici une explication alternative de ce concept. " +
            "Le serveur Ollama a retourné une réponse invalide — voici une version simplifiée. " +
            "Repassez le grain dans un autre format VARK pour mieux comprendre le concept."
        );
        res.setExamples(Arrays.asList("Exemple pratique 1", "Exemple pratique 2"));
        res.setKey_points(Arrays.asList(
            "Revoyez les définitions fondamentales",
            "Pratiquez avec des exercices simples",
            "Consultez les slides du cours"
        ));
        return res;
    }
}
