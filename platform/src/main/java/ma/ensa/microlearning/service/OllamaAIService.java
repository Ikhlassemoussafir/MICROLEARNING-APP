package ma.ensa.microlearning.service;

import ma.ensa.microlearning.dto.AIGeneratedQuestions;
import ma.ensa.microlearning.dto.AlternativeGrain;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.Instant;
import java.util.*;

@Service
public class OllamaAIService {

    private static final Logger logger = LoggerFactory.getLogger(OllamaAIService.class);

    private static final int    CONNECT_TIMEOUT_MS = 5_000;
    private static final int    READ_TIMEOUT_MS    = 120_000;
    private static final double TEMPERATURE        = 0.7;
    private static final int    NUM_PREDICT        = 2000;

    private static final List<String> SCENARIO_TYPES = List.of(
        "une application e-commerce (commandes, produits, clients)",
        "un système de gestion scolaire (étudiants, cours, notes)",
        "une bibliothèque numérique (livres, auteurs, emprunts)",
        "un réseau social (utilisateurs, publications, commentaires)",
        "un hôpital (patients, médecins, consultations, prescriptions)",
        "une agence de voyage (voyages, réservations, destinations)",
        "un entrepôt logistique (stocks, fournisseurs, livraisons)",
        "une banque (comptes, transactions, clients, agences)"
    );

    private static final List<String> QUESTION_STARTERS = List.of(
        "Dans le contexte de %s, quelle requête SQL permet de",
        "Un développeur travaillant sur %s doit",
        "Analysez ce scénario lié à %s : comment",
        "Pour une application %s, identifiez",
        "Suite à un bug dans %s, quel est",
        "En concevant %s, quelle est la meilleure façon de"
    );

    @Value("${ollama.api.url:http://localhost:11434/api/generate}")
    private String ollamaApiUrl;

    @Value("${ollama.model:llama3.2}")
    private String modelName;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final Random       random;

    public OllamaAIService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(CONNECT_TIMEOUT_MS);
        factory.setReadTimeout(READ_TIMEOUT_MS);
        this.restTemplate = new RestTemplate(factory);
        this.objectMapper = new ObjectMapper();
        this.random       = new Random();
    }

    public AIGeneratedQuestions generateSupplementaryQuestions(
            String grainTitle,
            String grainContent,
            List<String> userErrors,
            String varkStyle) {

        logger.info("[IA] Génération questions remédiation — Grain : [{}] | VARK : [{}] | Erreurs : {}",
                grainTitle, varkStyle, userErrors != null ? userErrors.size() : 0);

        try {
            String prompt      = buildSupplementaryQuestionsPrompt(grainTitle, grainContent, userErrors, varkStyle);
            String rawResponse = callOllamaAPI(prompt);
            String cleanedJson = cleanJsonResponse(rawResponse);

            AIGeneratedQuestions result = parseQuestionsResponse(cleanedJson, grainTitle);
            logger.info("[IA] {} questions générées pour [{}]", result.getQuestions().size(), grainTitle);
            return result;

        } catch (Exception e) {
            logger.error("[IA] Échec génération questions pour [{}] : {}", grainTitle, e.getMessage());
            return createFallbackQuestions(grainTitle);
        }
    }

    public AlternativeGrain generateAlternativeGrain(
            String originalTitle,
            String originalObjective,
            List<String> userErrors,
            String varkStyle) {

        logger.info("[IA] Génération grain alternatif — Grain : [{}] | VARK : [{}]", originalTitle, varkStyle);

        try {
            String prompt      = buildAlternativeGrainPrompt(originalTitle, originalObjective, userErrors, varkStyle);
            String rawResponse = callOllamaAPI(prompt);
            String cleanedJson = cleanJsonResponse(rawResponse);

            AlternativeGrain result = objectMapper.readValue(cleanedJson, AlternativeGrain.class);
            logger.info("[IA] Grain alternatif généré pour [{}]", originalTitle);
            return result;

        } catch (Exception e) {
            logger.error("[IA] Échec génération grain alternatif pour [{}] : {}", originalTitle, e.getMessage());
            return createFallbackAlternativeGrain(originalTitle, varkStyle);
        }
    }

    @SuppressWarnings("unchecked")
    private String callOllamaAPI(String prompt) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new LinkedHashMap<>();
        requestBody.put("model",  modelName);
        requestBody.put("prompt", prompt);
        requestBody.put("stream", false);
        requestBody.put("format", "json");
        requestBody.put("options", Map.of(
                "temperature", TEMPERATURE,
                "num_predict", NUM_PREDICT,
                "seed",        (int)(System.nanoTime() % 100_000)
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response =
                restTemplate.postForEntity(ollamaApiUrl, request, String.class);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Ollama statut inattendu : " + response.getStatusCode());
        }

        Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), Map.class);
        String responseText = (String) responseMap.get("response");

        if (responseText == null || responseText.isBlank()) {
            throw new RuntimeException("Ollama a retourné une réponse vide.");
        }

        return responseText;
    }

    private String buildSupplementaryQuestionsPrompt(
            String grainTitle,
            String grainContent,
            List<String> userErrors,
            String varkStyle) {

        String errorsStr = formatErrors(userErrors);
        String styleHint = getStyleHint(varkStyle);
        String seed      = String.valueOf(Instant.now().toEpochMilli() % 9999);
        String scenario  = pickRandom(SCENARIO_TYPES);
        String starter   = String.format(pickRandom(QUESTION_STARTERS), scenario);

        return String.format(
            "Tu es un expert pédagogique en bases de données SQL. "
            + "Génère exactement 3 questions QCM de remédiation DIFFÉRENTES et VARIÉES en français.\n\n"
            + "SEED_GÉNÉRATION : %s (utilise ce seed pour générer des questions totalement uniques)\n\n"
            + "CONTEXTE DU GRAIN : %s\n"
            + "CONTENU : %s\n"
            + "ERREURS DE L'ÉTUDIANT : %s\n"
            + "STYLE D'APPRENTISSAGE : %s — %s\n"
            + "SCÉNARIO À UTILISER : %s\n"
            + "FORMULATION D'INTRO SUGGÉRÉE : \"%s...\"\n\n"
            + "DISTRIBUTION DE DIFFICULTÉ OBLIGATOIRE :\n"
            + "  - Question 1 : niveau 'easy'\n"
            + "  - Question 2 : niveau 'medium'\n"
            + "  - Question 3 : niveau 'hard'\n\n"
            + "RÈGLES STRICTES :\n"
            + "1. Réponds UNIQUEMENT avec un JSON valide, aucun texte avant ou après.\n"
            + "2. Chaque question DOIT cibler directement une erreur commise par l'étudiant.\n"
            + "3. Les 3 questions doivent être DIFFÉRENTES dans leur formulation et leur concept.\n"
            + "4. Varie les types de questions : définition, identification d'erreur, écriture de requête.\n"
            + "5. Les fausses réponses doivent être plausibles mais clairement incorrectes pour un expert.\n"
            + "6. L'explication doit être adaptée au style %s (max 2 phrases, pédagogique).\n"
            + "7. N'utilise PAS les mêmes exemples que dans le grain original.\n\n"
            + "FORMAT JSON OBLIGATOIRE :\n"
            + "{\n"
            + "  \"questions\": [\n"
            + "    {\n"
            + "      \"question\": \"Énoncé de la question en français ?\",\n"
            + "      \"difficulty\": \"easy\",\n"
            + "      \"options\": [\n"
            + "        {\"id\": \"a\", \"text\": \"Option A\", \"correct\": false},\n"
            + "        {\"id\": \"b\", \"text\": \"Option B (correcte)\", \"correct\": true},\n"
            + "        {\"id\": \"c\", \"text\": \"Option C\", \"correct\": false},\n"
            + "        {\"id\": \"d\", \"text\": \"Option D\", \"correct\": false}\n"
            + "      ],\n"
            + "      \"explanation\": \"Explication pédagogique claire en 1-2 phrases.\"\n"
            + "    }\n"
            + "  ]\n"
            + "}",
            seed, grainTitle,
            grainContent != null ? grainContent.substring(0, Math.min(200, grainContent.length())) : "",
            errorsStr, varkStyle, styleHint, scenario, starter, varkStyle
        );
    }

    private String buildAlternativeGrainPrompt(
            String originalTitle,
            String originalObjective,
            List<String> userErrors,
            String varkStyle) {

        String errorsStr = formatErrors(userErrors);
        String styleHint = getStyleHint(varkStyle);
        String seed      = String.valueOf(Instant.now().toEpochMilli() % 9999);
        String scenario  = pickRandom(SCENARIO_TYPES);

        return String.format(
            "Tu es un expert pédagogique en SQL. L'étudiant a échoué au grain \"%s\".\n"
            + "SEED : %s\n"
            + "Objectif pédagogique : %s\n"
            + "Erreurs commises : %s\n"
            + "Style d'apprentissage : %s — %s\n"
            + "Scénario concret à utiliser : %s\n\n"
            + "Génère une explication alternative ORIGINALE (300-400 mots) du MÊME concept "
            + "avec une approche COMPLÈTEMENT DIFFÉRENTE adaptée au style %s.\n\n"
            + "RÈGLES STRICTES :\n"
            + "1. Réponds UNIQUEMENT avec un JSON valide.\n"
            + "2. Le contenu doit être en français.\n"
            + "3. N'utilise PAS les mêmes exemples que l'explication originale.\n"
            + "4. Adapte le vocabulaire et les métaphores au style d'apprentissage %s.\n"
            + "5. Les exemples doivent être concrets, tirés du scénario %s.\n"
            + "6. Les points clés doivent corriger spécifiquement les erreurs commises.\n\n"
            + "FORMAT JSON OBLIGATOIRE :\n"
            + "{\n"
            + "  \"title\": \"Titre alternatif accrocheur\",\n"
            + "  \"content\": \"Explication alternative complète (300-400 mots)\",\n"
            + "  \"examples\": [\n"
            + "    \"Exemple concret 1 tiré du scénario\",\n"
            + "    \"Exemple concret 2 avec code SQL si pertinent\"\n"
            + "  ],\n"
            + "  \"key_points\": [\n"
            + "    \"Point clé 1 ciblant une erreur spécifique\",\n"
            + "    \"Point clé 2 avec règle à retenir\",\n"
            + "    \"Point clé 3 avec astuce mnémotechnique\"\n"
            + "  ]\n"
            + "}",
            originalTitle, seed, originalObjective, errorsStr,
            varkStyle, styleHint, scenario, varkStyle, varkStyle, scenario
        );
    }

    private AIGeneratedQuestions parseQuestionsResponse(String json, String grainTitle) {
        try {
            return objectMapper.readValue(json, AIGeneratedQuestions.class);
        } catch (Exception e) {
            logger.warn("[IA] Désérialisation directe échouée, tentative JsonNode : {}", e.getMessage());
        }

        try {
            JsonNode root          = objectMapper.readTree(json);
            JsonNode questionsNode = root.path("questions");

            if (questionsNode.isMissingNode() || !questionsNode.isArray()) {
                throw new RuntimeException("Nœud 'questions' absent ou invalide.");
            }

            List<AIGeneratedQuestions.Question> questions = new ArrayList<>();

            for (JsonNode qNode : questionsNode) {
                AIGeneratedQuestions.Question q = new AIGeneratedQuestions.Question();
                q.setQuestion(qNode.path("question").asText("Question non disponible"));
                q.setExplanation(qNode.path("explanation").asText("Voir le cours pour plus de détails."));

                List<AIGeneratedQuestions.Option> options = new ArrayList<>();
                JsonNode optionsNode = qNode.path("options");

                if (optionsNode.isArray()) {
                    for (JsonNode optNode : optionsNode) {
                        AIGeneratedQuestions.Option opt = new AIGeneratedQuestions.Option();
                        opt.setId(optNode.path("id").asText("a"));
                        opt.setText(optNode.path("text").asText("Option non disponible"));
                        opt.setCorrect(optNode.path("correct").asBoolean(false));
                        options.add(opt);
                    }
                }

                if (options.stream().noneMatch(AIGeneratedQuestions.Option::isCorrect) && !options.isEmpty()) {
                    options.get(0).setCorrect(true);
                }

                q.setOptions(options);
                questions.add(q);
            }

            if (questions.isEmpty()) throw new RuntimeException("Aucune question valide extraite.");

            AIGeneratedQuestions result = new AIGeneratedQuestions();
            result.setQuestions(questions);
            logger.info("[IA] {} questions extraites via JsonNode.", questions.size());
            return result;

        } catch (Exception e) {
            logger.error("[IA] Parsing JsonNode échoué : {}", e.getMessage());
            return createFallbackQuestions(grainTitle);
        }
    }

    private String cleanJsonResponse(String response) {
        if (response == null || response.isBlank()) return "{}";

        response = response
                .replaceAll("(?is)```json", "")
                .replaceAll("```", "")
                .trim();

        int start = response.indexOf('{');
        if (start < 0) {
            logger.warn("[IA] Aucun bloc JSON trouvé dans la réponse Ollama.");
            return "{}";
        }

        int depth = 0;
        int end   = -1;
        for (int i = start; i < response.length(); i++) {
            char c = response.charAt(i);
            if      (c == '{') depth++;
            else if (c == '}') { depth--; if (depth == 0) { end = i; break; } }
        }

        if (end < 0) {
            logger.warn("[IA] JSON incomplet dans la réponse Ollama.");
            return response.substring(start) + "}".repeat(depth);
        }

        return response.substring(start, end + 1);
    }

    private String getStyleHint(String varkStyle) {
        if (varkStyle == null) return "approche pédagogique générale, claire et structurée";
        return switch (varkStyle.toUpperCase()) {
            case "VISUEL"        -> "utilise des schémas textuels, tableaux comparatifs, et descriptions visuelles structurées";
            case "AUDITIF"       -> "utilise des explications narratives fluides, des analogies sonores et une progression logique";
            case "LECTURE"       -> "utilise des définitions précises, listes structurées, termes techniques avec leur définition";
            case "KINESTHESIQUE" -> "utilise des exemples de code SQL concrets, des cas pratiques et des erreurs réelles à corriger";
            default              -> "approche pédagogique claire, concrète et structurée avec exemples";
        };
    }

    private String formatErrors(List<String> userErrors) {
        if (userErrors == null || userErrors.isEmpty()) return "concepts généraux du grain";
        return String.join(" | ", userErrors);
    }

    private <T> T pickRandom(List<T> list) {
        return list.get(random.nextInt(list.size()));
    }

    private AIGeneratedQuestions createFallbackQuestions(String grainTitle) {
        logger.warn("[IA] Fallback questions statiques pour : [{}]", grainTitle);

        AIGeneratedQuestions result = new AIGeneratedQuestions();

        AIGeneratedQuestions.Question q1 = new AIGeneratedQuestions.Question();
        q1.setQuestion("Concernant \"" + grainTitle + "\", quelle affirmation est correcte ?");
        q1.setOptions(Arrays.asList(
            createOption("a", "La définition et manipulation des données sont au cœur de SQL (DDL / DML)", true),
            createOption("b", "SQL est uniquement utilisé pour créer des interfaces graphiques",            false),
            createOption("c", "Les bases de données relationnelles n'utilisent pas SQL",                    false),
            createOption("d", "SQL ne supporte pas les relations entre tables",                              false)
        ));
        q1.setExplanation("SQL est le langage standard pour définir (DDL) et manipuler (DML) les données.");

        AIGeneratedQuestions.Question q2 = new AIGeneratedQuestions.Question();
        q2.setQuestion("Quelle clause SQL permet de filtrer les lignes d'une table selon une condition ?");
        q2.setOptions(Arrays.asList(
            createOption("a", "ORDER BY — pour trier les résultats",       false),
            createOption("b", "GROUP BY — pour regrouper les lignes",      false),
            createOption("c", "WHERE — pour filtrer les lignes",           true),
            createOption("d", "HAVING — pour filtrer les groupes agrégés", false)
        ));
        q2.setExplanation("WHERE filtre les lignes AVANT l'agrégation. HAVING filtre les groupes APRÈS un GROUP BY.");

        AIGeneratedQuestions.Question q3 = new AIGeneratedQuestions.Question();
        q3.setQuestion("Quelle est la différence entre PRIMARY KEY et FOREIGN KEY ?");
        q3.setOptions(Arrays.asList(
            createOption("a", "PRIMARY KEY identifie chaque ligne de façon unique ; FOREIGN KEY référence la PRIMARY KEY d'une autre table", true),
            createOption("b", "Ce sont deux noms différents pour le même concept",    false),
            createOption("c", "FOREIGN KEY doit toujours être un entier",             false),
            createOption("d", "PRIMARY KEY peut contenir des valeurs NULL",           false)
        ));
        q3.setExplanation("PRIMARY KEY = unicité + non-null. FOREIGN KEY = lien vers la PK d'une autre table.");

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
        logger.warn("[IA] Fallback grain alternatif pour : [{}]", title);
        AlternativeGrain result = new AlternativeGrain();
        result.setTitle(title + " — Approche alternative (" + varkStyle + ")");
        result.setContent(
            "Le service de génération IA est temporairement indisponible. "
            + "Voici les points essentiels du grain \"" + title + "\" à retenir. "
            + "Nous vous recommandons de revoir les ressources disponibles dans les onglets "
            + "Vidéos et Slides, puis de retenter le quiz pour valider votre compréhension."
        );
        result.setExamples(Arrays.asList(
            "Relisez les slides du grain pour identifier les concepts clés manquants",
            "Regardez la vidéo associée en notant les exemples pratiques présentés"
        ));
        result.setKey_points(Arrays.asList(
            "Revoyez les définitions fondamentales du grain avant de retenter",
            "Pratiquez avec des requêtes SQL simples dans le playground kinesthésique",
            "Consultez les ressources complémentaires disponibles dans les onglets VARK"
        ));
        return result;
    }
}
