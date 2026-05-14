package ma.ensa.microlearning.service;

import ma.ensa.microlearning.dto.AIGeneratedQuestions;
import ma.ensa.microlearning.dto.AlternativeGrain;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

@Service
public class OllamaAIService {

    private static final Logger logger = LoggerFactory.getLogger(OllamaAIService.class);

    private static final int    CONNECT_TIMEOUT_MS  = 5_000;
    private static final int    READ_TIMEOUT_MS     = 120_000;
    private static final double TEMPERATURE         = 0.3;
    private static final int    NUM_PREDICT         = 1500;

    @Value("${ollama.api.url:http://localhost:11434/api/generate}")
    private String ollamaApiUrl;

    @Value("${ollama.model:llama3.2}")
    private String modelName;

    private final RestTemplate  restTemplate;
    private final ObjectMapper  objectMapper;

    // ══════════════════════════════════════════════════════
    //  CONSTRUCTEUR
    // ══════════════════════════════════════════════════════
    public OllamaAIService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(CONNECT_TIMEOUT_MS);
        factory.setReadTimeout(READ_TIMEOUT_MS);
        this.restTemplate = new RestTemplate(factory);
        this.objectMapper = new ObjectMapper();
    }

    // ══════════════════════════════════════════════════════
    //  GÉNÉRATION DE QUESTIONS DE REMÉDIATION
    // ══════════════════════════════════════════════════════

    /**
     * Génère 3 questions QCM de remédiation adaptées au profil VARK de l'apprenant.
     * En cas d'échec, retourne un contenu de fallback prédéfini.
     */
    public AIGeneratedQuestions generateSupplementaryQuestions(
            String grainTitle,
            String grainContent,
            List<String> userErrors,
            String varkStyle) {

        logger.info("Génération questions remédiation — Grain : [{}] | Style VARK : [{}]", grainTitle, varkStyle);

        try {
            String prompt       = buildSupplementaryQuestionsPrompt(grainTitle, grainContent, userErrors, varkStyle);
            String responseText = cleanJsonResponse(callOllamaAPI(prompt));
            AIGeneratedQuestions result = objectMapper.readValue(responseText, AIGeneratedQuestions.class);
            logger.info("Questions générées avec succès pour le grain : [{}]", grainTitle);
            return result;

        } catch (Exception e) {
            logger.error("Échec génération questions Ollama pour [{}] : {}", grainTitle, e.getMessage());
            return createFallbackQuestions(grainTitle);
        }
    }

    // ══════════════════════════════════════════════════════
    //  GÉNÉRATION DE GRAIN ALTERNATIF
    // ══════════════════════════════════════════════════════

    /**
     * Génère une explication alternative du même grain, adaptée au style VARK dominant.
     * En cas d'échec, retourne un contenu de fallback prédéfini.
     */
    public AlternativeGrain generateAlternativeGrain(
            String originalTitle,
            String originalObjective,
            List<String> userErrors,
            String varkStyle) {

        logger.info("Génération grain alternatif — Grain : [{}] | Style VARK : [{}]", originalTitle, varkStyle);

        try {
            String prompt       = buildAlternativeGrainPrompt(originalTitle, originalObjective, userErrors, varkStyle);
            String responseText = cleanJsonResponse(callOllamaAPI(prompt));
            AlternativeGrain result = objectMapper.readValue(responseText, AlternativeGrain.class);
            logger.info("Grain alternatif généré avec succès pour : [{}]", originalTitle);
            return result;

        } catch (Exception e) {
            logger.error("Échec génération grain alternatif Ollama pour [{}] : {}", originalTitle, e.getMessage());
            return createFallbackAlternativeGrain(originalTitle, varkStyle);
        }
    }

    // ══════════════════════════════════════════════════════
    //  APPEL API OLLAMA
    // ══════════════════════════════════════════════════════

    @SuppressWarnings("unchecked")
    private String callOllamaAPI(String prompt) throws Exception {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new LinkedHashMap<>();
        requestBody.put("model",   modelName);
        requestBody.put("prompt",  prompt);
        requestBody.put("stream",  false);
        requestBody.put("format",  "json");
        requestBody.put("options", Map.of(
                "temperature", TEMPERATURE,
                "num_predict", NUM_PREDICT
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(ollamaApiUrl, request, String.class);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Ollama a retourné un statut inattendu : " + response.getStatusCode());
        }

        Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), Map.class);
        String responseText = (String) responseMap.get("response");

        if (responseText == null || responseText.isBlank()) {
            throw new RuntimeException("Ollama a retourné une réponse vide.");
        }

        return responseText;
    }

    // ══════════════════════════════════════════════════════
    //  CONSTRUCTION DES PROMPTS
    // ══════════════════════════════════════════════════════

    private String buildSupplementaryQuestionsPrompt(
            String grainTitle,
            String grainContent,
            List<String> userErrors,
            String varkStyle) {

        String errorsStr  = (userErrors != null && !userErrors.isEmpty())
                ? String.join(", ", userErrors)
                : "concepts généraux du grain";

        String styleHint  = getStyleHint(varkStyle);

        return String.format(
                "Tu es un expert pédagogique en bases de données SQL. "
                + "Génère exactement 3 questions QCM de remédiation en français.\n\n"
                + "Grain : %s\n"
                + "Erreurs de l'étudiant : %s\n"
                + "Style d'apprentissage : %s — %s\n\n"
                + "RÈGLES STRICTES :\n"
                + "1. Réponds UNIQUEMENT avec un JSON valide, aucun texte avant ou après.\n"
                + "2. Chaque question doit cibler directement une erreur commise.\n"
                + "3. L'explication doit être adaptée au style %s.\n\n"
                + "FORMAT JSON OBLIGATOIRE :\n"
                + "{\"questions\": [{"
                + "\"question\": \"Question en français\","
                + "\"options\": ["
                + "{\"id\": \"a\", \"text\": \"Option A\", \"correct\": false},"
                + "{\"id\": \"b\", \"text\": \"Option B\", \"correct\": true},"
                + "{\"id\": \"c\", \"text\": \"Option C\", \"correct\": false},"
                + "{\"id\": \"d\", \"text\": \"Option D\", \"correct\": false}"
                + "],"
                + "\"explanation\": \"Explication claire en français\""
                + "}]}",
                grainTitle, errorsStr, varkStyle, styleHint, varkStyle
        );
    }

    private String buildAlternativeGrainPrompt(
            String originalTitle,
            String originalObjective,
            List<String> userErrors,
            String varkStyle) {

        String errorsStr = (userErrors != null && !userErrors.isEmpty())
                ? String.join(", ", userErrors)
                : "compréhension générale";

        String styleHint = getStyleHint(varkStyle);

        return String.format(
                "Tu es un expert pédagogique en SQL. L'étudiant a échoué au grain \"%s\".\n"
                + "Objectif pédagogique : %s\n"
                + "Erreurs commises : %s\n"
                + "Style d'apprentissage : %s — %s\n\n"
                + "Génère une explication alternative COURTE (300-400 mots) du MÊME concept "
                + "avec une approche différente adaptée au style %s.\n\n"
                + "RÈGLES STRICTES :\n"
                + "1. Réponds UNIQUEMENT avec un JSON valide.\n"
                + "2. Le contenu doit être en français.\n"
                + "3. Adapte le vocabulaire et les exemples au style d'apprentissage.\n\n"
                + "FORMAT JSON OBLIGATOIRE :\n"
                + "{\"title\": \"Titre alternatif\","
                + "\"content\": \"Explication alternative (300-400 mots)\","
                + "\"examples\": [\"Exemple concret 1\", \"Exemple concret 2\"],"
                + "\"key_points\": [\"Point clé 1\", \"Point clé 2\", \"Point clé 3\"]}",
                originalTitle, originalObjective, errorsStr, varkStyle, styleHint, varkStyle
        );
    }

    // ══════════════════════════════════════════════════════
    //  HELPERS
    // ══════════════════════════════════════════════════════

    /**
     * Retourne une indication pédagogique adaptée au style VARK de l'apprenant,
     * intégrée dans le prompt transmis à Ollama.
     */
    private String getStyleHint(String varkStyle) {
        if (varkStyle == null) return "approche pédagogique générale";
        return switch (varkStyle.toUpperCase()) {
            case "VISUEL"        -> "utilise des schémas, diagrammes et visualisations structurées";
            case "AUDITIF"       -> "utilise des explications narratives, des analogies sonores et une narration fluide";
            case "LECTURE"       -> "utilise des définitions précises, des listes structurées et du texte analytique";
            case "KINESTHESIQUE" -> "utilise des exemples pratiques, du code SQL concret et des cas de manipulation directe";
            default              -> "approche pédagogique claire et structurée";
        };
    }

    /**
     * Nettoie la réponse d'Ollama en supprimant les backticks Markdown
     * et en extrayant uniquement le bloc JSON valide.
     */
    private String cleanJsonResponse(String response) {
        if (response == null || response.isBlank()) return "{}";

        response = response
                .replaceAll("(?i)```json", "")
                .replaceAll("```", "")
                .trim();

        int start = response.indexOf('{');
        int end   = response.lastIndexOf('}');

        if (start >= 0 && end > start) {
            return response.substring(start, end + 1);
        }

        logger.warn("Impossible d'extraire un bloc JSON valide depuis la réponse Ollama.");
        return "{}";
    }

    // ══════════════════════════════════════════════════════
    //  FALLBACKS (si Ollama est indisponible)
    // ══════════════════════════════════════════════════════

    private AIGeneratedQuestions createFallbackQuestions(String grainTitle) {
        logger.warn("Utilisation du fallback questions pour le grain : [{}]", grainTitle);

        AIGeneratedQuestions result = new AIGeneratedQuestions();

        AIGeneratedQuestions.Question q1 = new AIGeneratedQuestions.Question();
        q1.setQuestion("Concernant le grain \"" + grainTitle + "\", quel est le concept SQL fondamental abordé ?");
        q1.setOptions(Arrays.asList(
                createOption("a", "La définition et la manipulation des données (DDL / DML)", true),
                createOption("b", "La gestion des interfaces graphiques",                    false),
                createOption("c", "Les algorithmes de tri en mémoire",                       false),
                createOption("d", "Les protocoles de communication réseau",                  false)
        ));
        q1.setExplanation("Ce grain porte sur les fondamentaux SQL abordés dans : " + grainTitle);

        AIGeneratedQuestions.Question q2 = new AIGeneratedQuestions.Question();
        q2.setQuestion("Quelle clause SQL permet de filtrer les résultats d'une requête SELECT ?");
        q2.setOptions(Arrays.asList(
                createOption("a", "ORDER BY", false),
                createOption("b", "GROUP BY", false),
                createOption("c", "WHERE",    true),
                createOption("d", "HAVING",   false)
        ));
        q2.setExplanation("La clause WHERE permet de filtrer les lignes retournées par une requête SELECT selon une condition.");

        AIGeneratedQuestions.Question q3 = new AIGeneratedQuestions.Question();
        q3.setQuestion("Quelle instruction SQL est utilisée pour insérer une nouvelle ligne dans une table ?");
        q3.setOptions(Arrays.asList(
                createOption("a", "UPDATE", false),
                createOption("b", "INSERT INTO", true),
                createOption("c", "ALTER TABLE", false),
                createOption("d", "CREATE TABLE", false)
        ));
        q3.setExplanation("L'instruction INSERT INTO permet d'ajouter une nouvelle ligne dans une table existante.");

        result.setQuestions(Arrays.asList(q1, q2, q3));
        return result;
    }

    private AIGeneratedQuestions.Option createOption(String id, String text, boolean correct) {
        AIGeneratedQuestions.Option option = new AIGeneratedQuestions.Option();
        option.setId(id);
        option.setText(text);
        option.setCorrect(correct);
        return option;
    }

    private AlternativeGrain createFallbackAlternativeGrain(String title, String varkStyle) {
        logger.warn("Utilisation du fallback grain alternatif pour : [{}]", title);

        AlternativeGrain result = new AlternativeGrain();
        result.setTitle(title + " — Approche alternative (" + varkStyle + ")");
        result.setContent(
                "Le service de génération de contenu est temporairement indisponible. "
                + "Voici un rappel des points essentiels du grain \"" + title + "\". "
                + "Nous vous recommandons de revoir le contenu multimédia disponible dans les onglets "
                + "Vidéos et Slides, puis de retenter le quiz."
        );
        result.setExamples(Arrays.asList(
                "Relisez les slides du grain pour identifier les concepts clés",
                "Regardez la vidéo associée en vous concentrant sur les exemples pratiques"
        ));
        result.setKey_points(Arrays.asList(
                "Revoyez les définitions fondamentales du grain",
                "Pratiquez avec des requêtes SQL simples avant de progresser",
                "Consultez les ressources complémentaires disponibles dans le lecteur de grain"
        ));
        return result;
    }
}