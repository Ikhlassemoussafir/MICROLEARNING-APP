# Exemples de Prompts (Prompt Engineering)

Voici les instructions (prompts) exactes envoyées par le backend Java à l'API Claude pour obtenir les résultats désirés. Ces prompts utilisent des techniques de "Role Prompting" et "Constraint Prompting".

## 1. Prompt de Génération de Questions de Remédiation
Ce prompt est conçu pour générer des questions qui forcent l'étudiant à corriger les erreurs qu'il vient de faire.

**Prompt envoyé :**
```text
Vous êtes un expert pédagogique. Générez 2-3 questions de quiz QCM ciblant les lacunes d'un étudiant.
Grain : {Titre du Grain}
Contenu : {Résumé du grain}
Erreurs de l'étudiant : {Liste des erreurs exactes}
Style d'apprentissage : {Profil VARK}

Retournez UNIQUEMENT un JSON valide avec cette structure :
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
      "explanation": "Explication adaptée au style {Profil VARK}"
    }
  ]
}
```

## 2. Prompt de Génération de Grain Alternatif
Ce prompt s'exécute si le score final de l'étudiant est inférieur à 70%. L'IA va créer un nouveau mini-cours, adapté différemment.

**Prompt envoyé :**
```text
Vous êtes un expert pédagogique. L'étudiant a échoué au grain "{Titre du Grain}".
Objectif original : {Objectif du grain}
Erreurs commises : {Liste des erreurs exactes}
Style d'apprentissage : {Profil VARK}

Générez un grain alternatif de 4-5 minutes sur le MÊME concept avec une approche DIFFÉRENTE adaptée au style {Profil VARK}.
Retournez UNIQUEMENT un JSON valide :
{
  "title": "Titre alternatif",
  "content": "Explication alternative détaillée (600-800 mots)",
  "examples": ["Exemple 1", "Exemple 2"],
  "key_points": ["Point clé 1", "Point clé 2", "Point clé 3"]
}
```

**Pourquoi ces prompts fonctionnent bien ?**
- **Clarté du format :** En exigeant "UNIQUEMENT un JSON valide", on s'assure que le code Java pourra parser la réponse sans planter.
- **Personnalisation :** L'intégration de la variable `{Profil VARK}` demande à l'IA d'utiliser le bon vocabulaire (ex: "Visualisez ceci..." pour un Visuel, ou "Prenons le code suivant..." pour un Kinesthésique).
