export const quizData = {
  1: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Quelle est la définition correcte d'une base de données ?",
        options: [
          { id: 'a', text: "Un logiciel pour créer des sites web", correct: false },
          { id: 'b', text: "Un ensemble organisé d'informations stockées de façon structurée", correct: true },
          { id: 'c', text: "Un type de fichier Excel", correct: false },
          { id: 'd', text: "Un réseau d'ordinateurs connectés", correct: false }
        ],
        explanation: "Une base de données est un ensemble organisé d'informations structurées, accessibles et manipulables efficacement."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "Quel est l'avantage principal d'une base de données par rapport à Excel ?",
        options: [
          { id: 'a', text: "Elle est plus jolie graphiquement", correct: false },
          { id: 'b', text: "Elle coûte moins cher", correct: false },
          { id: 'c', text: "Les données sont centralisées et accessibles par plusieurs personnes simultanément", correct: true },
          { id: 'd', text: "Elle fonctionne sans ordinateur", correct: false }
        ],
        explanation: "La centralisation et l'accès multi-utilisateurs simultané sont les avantages fondamentaux d'une BDD."
      },
      { id: 3, type: 'qcm', difficulty: 'medium',
        question: "PostgreSQL est un exemple de quel type de base de données ?",
        options: [
          { id: 'a', text: "NoSQL", correct: false },
          { id: 'b', text: "Relationnelle (SQL)", correct: true },
          { id: 'c', text: "Graphe", correct: false },
          { id: 'd', text: "Orientée document", correct: false }
        ],
        explanation: "PostgreSQL est une base de données relationnelle qui utilise le langage SQL."
      },
      { id: 4, type: 'qcm', difficulty: 'easy',
        question: "Dans laquelle de ces applications trouve-t-on une base de données ?",
        options: [
          { id: 'a', text: "Une calculatrice de bureau", correct: false },
          { id: 'b', text: "Un réseau social comme Instagram", correct: true },
          { id: 'c', text: "Un réveil téléphonique simple", correct: false },
          { id: 'd', text: "Une lampe connectée basique", correct: false }
        ],
        explanation: "Un réseau social stocke des millions de profils, posts et relations dans des bases de données."
      },
      { id: 5, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Identifier les composants d'une BDD",
        consigne: "Dans une application de bibliothèque, on stocke : livres, auteurs, emprunts, membres. Quelle modélisation est CORRECTE ?",
        options: [
          { id: 'a', text: "Une seule grande table avec toutes les informations mélangées", correct: false },
          { id: 'b', text: "4 tables séparées : Livres, Auteurs, Emprunts, Membres", correct: true },
          { id: 'c', text: "Les bases de données ne peuvent pas stocker des relations entre entités", correct: false },
          { id: 'd', text: "Un fichier Excel par type d'information", correct: false }
        ],
        explanation: "La normalisation consiste à séparer les entités dans des tables distinctes pour éviter la redondance."
      },
      { id: 6, type: 'qcm', difficulty: 'easy',
        question: "Que signifie SGBD ?",
        options: [
          { id: 'a', text: "Système de Gestion de Base de Données", correct: true },
          { id: 'b', text: "Service Général de Bases de Données", correct: false },
          { id: 'c', text: "Système Global de Bases Distribuées", correct: false },
          { id: 'd', text: "Structure de Gestion de Big Data", correct: false }
        ],
        explanation: "Un SGBD est le logiciel qui gère la base de données : MySQL, PostgreSQL, Oracle sont des exemples."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Choisir le bon SGBD",
        consigne: "Votre startup stocke des données financières avec des relations complexes entre clients, transactions et comptes. Quel type de base choisir ?",
        options: [
          { id: 'a', text: "NoSQL car c'est plus moderne", correct: false },
          { id: 'b', text: "Relationnelle SQL car les relations entre données sont importantes", correct: true },
          { id: 'c', text: "Un simple fichier CSV car c'est plus rapide", correct: false },
          { id: 'd', text: "Une base graphe car les graphes sont puissants", correct: false }
        ],
        explanation: "Les bases relationnelles sont idéales quand les données ont des relations structurées et nécessitent une intégrité forte."
      }
    ]
  },
  2: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Qu'est-ce qu'une ligne dans une table SQL ?",
        options: [
          { id: 'a', text: "Une colonne de données", correct: false },
          { id: 'b', text: "Un type de données", correct: false },
          { id: 'c', text: "Un enregistrement concret — une instance de l'entité", correct: true },
          { id: 'd', text: "Une requête SQL", correct: false }
        ],
        explanation: "Une ligne (tuple) représente un enregistrement concret."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "Quel type de données utiliser pour stocker le nom d'un étudiant ?",
        options: [
          { id: 'a', text: "INTEGER", correct: false },
          { id: 'b', text: "BOOLEAN", correct: false },
          { id: 'c', text: "VARCHAR(50)", correct: true },
          { id: 'd', text: "DATE", correct: false }
        ],
        explanation: "VARCHAR est utilisé pour les chaînes de caractères de longueur variable."
      },
      { id: 3, type: 'qcm', difficulty: 'medium',
        question: "Quelle est la différence entre CHAR(n) et VARCHAR(n) ?",
        options: [
          { id: 'a', text: "Il n'y a aucune différence", correct: false },
          { id: 'b', text: "CHAR est pour les nombres, VARCHAR pour le texte", correct: false },
          { id: 'c', text: "CHAR est de longueur fixe, VARCHAR de longueur variable", correct: true },
          { id: 'd', text: "VARCHAR est plus lent que CHAR", correct: false }
        ],
        explanation: "CHAR(n) alloue toujours n caractères. VARCHAR n'alloue que le nécessaire."
      },
      { id: 4, type: 'qcm', difficulty: 'easy',
        question: "Quel type utiliser pour stocker la date d'inscription d'un étudiant ?",
        options: [
          { id: 'a', text: "VARCHAR", correct: false },
          { id: 'b', text: "INTEGER", correct: false },
          { id: 'c', text: "BOOLEAN", correct: false },
          { id: 'd', text: "DATE", correct: true }
        ],
        explanation: "Le type DATE stocke les dates au format YYYY-MM-DD."
      },
      { id: 5, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Concevoir une table ETUDIANT",
        consigne: "Choisissez les bons types pour : identifiant unique, nom complet, âge, email, date d'inscription, actif ou non.",
        options: [
          { id: 'a', text: "id INTEGER, nom VARCHAR(100), age INTEGER, email VARCHAR(255), date_inscription DATE, actif BOOLEAN", correct: true },
          { id: 'b', text: "id TEXT, nom INTEGER, age VARCHAR, email DATE, date_inscription BOOLEAN", correct: false },
          { id: 'c', text: "Toutes les colonnes en VARCHAR car c'est plus simple", correct: false },
          { id: 'd', text: "id BOOLEAN, nom TEXT, age DATE, email INTEGER", correct: false }
        ],
        explanation: "Chaque colonne doit avoir le type adapté : INTEGER pour les nombres, VARCHAR pour le texte, DATE pour les dates, BOOLEAN pour vrai/faux."
      },
      { id: 6, type: 'qcm', difficulty: 'medium',
        question: "Que signifie la contrainte NOT NULL ?",
        options: [
          { id: 'a', text: "La colonne doit contenir des nombres", correct: false },
          { id: 'b', text: "La colonne ne peut pas être vide — une valeur est obligatoire", correct: true },
          { id: 'c', text: "La colonne doit avoir une valeur nulle", correct: false },
          { id: 'd', text: "La colonne n'existe pas encore", correct: false }
        ],
        explanation: "NOT NULL force l'insertion d'une valeur dans cette colonne."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Identifier les erreurs de types",
        consigne: "Table : id VARCHAR(10), nom INTEGER, salaire DATE, est_actif BOOLEAN. Combien d'erreurs de types y a-t-il ?",
        options: [
          { id: 'a', text: "0 erreur, tout est correct", correct: false },
          { id: 'b', text: "1 erreur seulement", correct: false },
          { id: 'c', text: "3 erreurs : id→INTEGER, nom→VARCHAR, salaire→DECIMAL", correct: true },
          { id: 'd', text: "4 erreurs, tout est faux", correct: false }
        ],
        explanation: "id → INTEGER, nom → VARCHAR, salaire → DECIMAL. BOOLEAN pour est_actif est correct."
      },
      { id: 8, type: 'qcm', difficulty: 'hard',
        question: "Quelle est la valeur maximale d'un INTEGER en PostgreSQL ?",
        options: [
          { id: 'a', text: "1 000", correct: false },
          { id: 'b', text: "32 767", correct: false },
          { id: 'c', text: "2 147 483 647", correct: true },
          { id: 'd', text: "Illimité", correct: false }
        ],
        explanation: "INTEGER en PostgreSQL stocke des valeurs jusqu'à ~2,1 milliards. Pour plus grand, utiliser BIGINT."
      }
    ]
  },
  3: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Quelle est la règle principale d'une clé primaire ?",
        options: [
          { id: 'a', text: "Elle doit être un nombre entier", correct: false },
          { id: 'b', text: "Elle doit identifier de façon unique chaque ligne et ne jamais être nulle", correct: true },
          { id: 'c', text: "Elle peut avoir des doublons si les autres colonnes sont différentes", correct: false },
          { id: 'd', text: "Elle doit obligatoirement s'appeler 'id'", correct: false }
        ],
        explanation: "Une clé primaire doit être UNIQUE et NOT NULL."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "À quoi sert une clé étrangère ?",
        options: [
          { id: 'a', text: "À sécuriser la base de données avec un mot de passe", correct: false },
          { id: 'b', text: "À stocker des données chiffrées", correct: false },
          { id: 'c', text: "À créer une relation entre deux tables en référençant la clé primaire d'une autre table", correct: true },
          { id: 'd', text: "À dupliquer les données pour la sécurité", correct: false }
        ],
        explanation: "La clé étrangère (FOREIGN KEY) référence la clé primaire d'une autre table."
      },
      { id: 3, type: 'qcm', difficulty: 'medium',
        question: "Peut-on insérer une inscription pour un etudiant_id qui n'existe pas dans ETUDIANT ?",
        options: [
          { id: 'a', text: "Oui, sans problème", correct: false },
          { id: 'b', text: "Oui, mais il faut le préciser", correct: false },
          { id: 'c', text: "Non, la contrainte de clé étrangère l'interdit", correct: true },
          { id: 'd', text: "Ça dépend du type de la colonne", correct: false }
        ],
        explanation: "La contrainte FOREIGN KEY garantit l'intégrité référentielle."
      },
      { id: 4, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Clés dans un schéma",
        consigne: "TABLE COURS(cours_id PK, titre, prof_id FK→PROFESSEUR). Que se passe-t-il si on supprime un professeur qui a des cours associés ?",
        options: [
          { id: 'a', text: "Les cours sont automatiquement supprimés aussi", correct: false },
          { id: 'b', text: "La suppression est refusée par la contrainte FOREIGN KEY", correct: true },
          { id: 'c', text: "La suppression réussit et prof_id devient NULL", correct: false },
          { id: 'd', text: "Rien de spécial ne se passe", correct: false }
        ],
        explanation: "Par défaut, PostgreSQL refuse la suppression d'un enregistrement référencé par une clé étrangère."
      },
      { id: 5, type: 'qcm', difficulty: 'medium',
        question: "Pourquoi stocker etudiant_id dans INSCRIPTION plutôt que le nom de l'étudiant ?",
        options: [
          { id: 'a', text: "Pour éviter la redondance et les incohérences si le nom change", correct: true },
          { id: 'b', text: "Parce que les noms sont trop longs", correct: false },
          { id: 'c', text: "Pour rendre la base de données plus lente", correct: false },
          { id: 'd', text: "Il n'y a pas de raison particulière", correct: false }
        ],
        explanation: "Stocker un identifiant évite la redondance et les incohérences si le nom change."
      },
      { id: 6, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Concevoir les relations Many-to-Many",
        consigne: "Des étudiants peuvent s'inscrire à plusieurs cours, et un cours peut avoir plusieurs étudiants. Quelle est la bonne modélisation ?",
        options: [
          { id: 'a', text: "Une seule table ETUDIANT avec une colonne 'cours' en TEXT", correct: false },
          { id: 'b', text: "Tables ETUDIANT et COURS + table INSCRIPTION(etudiant_id FK, cours_id FK)", correct: true },
          { id: 'c', text: "Dupliquer les étudiants dans la table COURS", correct: false },
          { id: 'd', text: "Une table COURS avec une colonne qui liste tous les étudiants", correct: false }
        ],
        explanation: "Une relation Many-to-Many nécessite une table intermédiaire avec deux clés étrangères."
      },
      { id: 7, type: 'qcm', difficulty: 'hard',
        question: "Une table peut-elle avoir plusieurs clés étrangères ?",
        options: [
          { id: 'a', text: "Non, une seule clé étrangère est autorisée", correct: false },
          { id: 'b', text: "Oui, une table peut avoir autant de clés étrangères que nécessaire", correct: true },
          { id: 'c', text: "Oui, mais maximum 2 clés étrangères", correct: false },
          { id: 'd', text: "Seulement si la table n'a pas de clé primaire", correct: false }
        ],
        explanation: "Une table peut avoir plusieurs FK. La table INSCRIPTION a FK vers ETUDIANT et FK vers COURS."
      }
    ]
  },
  4: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Quelle requête affiche le nom et l'email de tous les étudiants ?",
        options: [
          { id: 'a', text: "GET nom, email FROM ETUDIANT;", correct: false },
          { id: 'b', text: "SELECT * FROM ETUDIANT;", correct: false },
          { id: 'c', text: "SELECT nom, email FROM ETUDIANT;", correct: true },
          { id: 'd', text: "DISPLAY nom, email FROM ETUDIANT;", correct: false }
        ],
        explanation: "SELECT colonne1, colonne2 FROM table; est la syntaxe correcte."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "Que retourne SELECT * FROM ETUDIANT; ?",
        options: [
          { id: 'a', text: "Seulement la première ligne", correct: false },
          { id: 'b', text: "Seulement les colonnes numériques", correct: false },
          { id: 'c', text: "Toutes les colonnes et toutes les lignes de la table", correct: true },
          { id: 'd', text: "Le nombre total d'étudiants", correct: false }
        ],
        explanation: "Le * est un joker qui sélectionne toutes les colonnes."
      },
      { id: 3, type: 'exercice', difficulty: 'easy',
        question: "🛠️ Exercice : Écrire un SELECT ciblé",
        consigne: "TABLE PRODUIT : id, nom, prix, categorie, stock. Affichez uniquement le nom et le prix de tous les produits.",
        options: [
          { id: 'a', text: "SELECT * FROM PRODUIT;", correct: false },
          { id: 'b', text: "SELECT nom, prix FROM PRODUIT;", correct: true },
          { id: 'c', text: "GET nom AND prix FROM PRODUIT;", correct: false },
          { id: 'd', text: "SELECT PRODUIT.nom, PRODUIT.prix;", correct: false }
        ],
        explanation: "SELECT nom, prix FROM PRODUIT; sélectionne exactement les deux colonnes demandées."
      },
      { id: 4, type: 'qcm', difficulty: 'medium',
        question: "Comment afficher les valeurs uniques d'une colonne (sans doublons) ?",
        options: [
          { id: 'a', text: "SELECT UNIQUE colonne FROM table;", correct: false },
          { id: 'b', text: "SELECT DIFFERENT colonne FROM table;", correct: false },
          { id: 'c', text: "SELECT DISTINCT colonne FROM table;", correct: true },
          { id: 'd', text: "SELECT ONE colonne FROM table;", correct: false }
        ],
        explanation: "DISTINCT élimine les doublons dans les résultats."
      },
      { id: 5, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Calculs et alias",
        consigne: "TABLE EMPLOYE : id, nom, salaire_mensuel. Affichez le nom et le salaire annuel (×12) avec le label 'salaire_annuel'.",
        options: [
          { id: 'a', text: "SELECT nom, salaire_mensuel FROM EMPLOYE;", correct: false },
          { id: 'b', text: "SELECT nom, salaire_mensuel * 12 AS salaire_annuel FROM EMPLOYE;", correct: true },
          { id: 'c', text: "SELECT nom, salaire_annuel = salaire_mensuel * 12 FROM EMPLOYE;", correct: false },
          { id: 'd', text: "SELECT nom, CALCULATE(salaire_mensuel, 12) FROM EMPLOYE;", correct: false }
        ],
        explanation: "AS permet de renommer une colonne ou expression."
      },
      { id: 6, type: 'qcm', difficulty: 'medium',
        question: "Quelle est la syntaxe correcte d'un SELECT avec alias de table ?",
        options: [
          { id: 'a', text: "SELECT e.nom FROM ETUDIANT AS e;", correct: true },
          { id: 'b', text: "SELECT ETUDIANT.e.nom FROM ETUDIANT;", correct: false },
          { id: 'c', text: "SELECT nom AS ETUDIANT FROM e;", correct: false },
          { id: 'd', text: "SELECT e FROM ETUDIANT(nom);", correct: false }
        ],
        explanation: "AS e crée un alias 'e' pour la table ETUDIANT."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Ordre d'exécution SQL",
        consigne: "Dans quel ordre SQL exécute-t-il : SELECT nom FROM ETUDIANT WHERE age > 20 ORDER BY nom; ?",
        options: [
          { id: 'a', text: "SELECT → FROM → WHERE → ORDER BY", correct: false },
          { id: 'b', text: "FROM → WHERE → SELECT → ORDER BY", correct: true },
          { id: 'c', text: "WHERE → FROM → ORDER BY → SELECT", correct: false },
          { id: 'd', text: "L'ordre d'écriture est l'ordre d'exécution", correct: false }
        ],
        explanation: "SQL exécute : FROM → WHERE → SELECT → ORDER BY."
      }
    ]
  },
  5: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Quelle requête affiche les étudiants de plus de 20 ans ?",
        options: [
          { id: 'a', text: "SELECT * FROM ETUDIANT IF age > 20;", correct: false },
          { id: 'b', text: "SELECT * FROM ETUDIANT WHERE age > 20;", correct: true },
          { id: 'c', text: "SELECT * FROM ETUDIANT FILTER age > 20;", correct: false },
          { id: 'd', text: "SELECT * FROM ETUDIANT HAVING age > 20;", correct: false }
        ],
        explanation: "WHERE est la clause de filtrage des lignes."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "Comment filtrer les étudiants de Casablanca ET de plus de 18 ans ?",
        options: [
          { id: 'a', text: "WHERE ville = 'Casablanca' OR age > 18", correct: false },
          { id: 'b', text: "WHERE ville = 'Casablanca' AND age > 18", correct: true },
          { id: 'c', text: "WHERE ville = 'Casablanca' THEN age > 18", correct: false },
          { id: 'd', text: "WHERE (ville, age) = ('Casablanca', 18)", correct: false }
        ],
        explanation: "AND exige que les deux conditions soient vraies simultanément."
      },
cat > frontend/src/quizData.js << 'ENDOFFILE'
export const quizData = {
  1: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Quelle est la définition correcte d'une base de données ?",
        options: [
          { id: 'a', text: "Un logiciel pour créer des sites web", correct: false },
          { id: 'b', text: "Un ensemble organisé d'informations stockées de façon structurée", correct: true },
          { id: 'c', text: "Un type de fichier Excel", correct: false },
          { id: 'd', text: "Un réseau d'ordinateurs connectés", correct: false }
        ],
        explanation: "Une base de données est un ensemble organisé d'informations structurées, accessibles et manipulables efficacement."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "Quel est l'avantage principal d'une base de données par rapport à Excel ?",
        options: [
          { id: 'a', text: "Elle est plus jolie graphiquement", correct: false },
          { id: 'b', text: "Elle coûte moins cher", correct: false },
          { id: 'c', text: "Les données sont centralisées et accessibles par plusieurs personnes simultanément", correct: true },
          { id: 'd', text: "Elle fonctionne sans ordinateur", correct: false }
        ],
        explanation: "La centralisation et l'accès multi-utilisateurs simultané sont les avantages fondamentaux d'une BDD."
      },
      { id: 3, type: 'qcm', difficulty: 'medium',
        question: "PostgreSQL est un exemple de quel type de base de données ?",
        options: [
          { id: 'a', text: "NoSQL", correct: false },
          { id: 'b', text: "Relationnelle (SQL)", correct: true },
          { id: 'c', text: "Graphe", correct: false },
          { id: 'd', text: "Orientée document", correct: false }
        ],
        explanation: "PostgreSQL est une base de données relationnelle qui utilise le langage SQL."
      },
      { id: 4, type: 'qcm', difficulty: 'easy',
        question: "Dans laquelle de ces applications trouve-t-on une base de données ?",
        options: [
          { id: 'a', text: "Une calculatrice de bureau", correct: false },
          { id: 'b', text: "Un réseau social comme Instagram", correct: true },
          { id: 'c', text: "Un réveil téléphonique simple", correct: false },
          { id: 'd', text: "Une lampe connectée basique", correct: false }
        ],
        explanation: "Un réseau social stocke des millions de profils, posts et relations dans des bases de données."
      },
      { id: 5, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Identifier les composants d'une BDD",
        consigne: "Dans une application de bibliothèque, on stocke : livres, auteurs, emprunts, membres. Quelle modélisation est CORRECTE ?",
        options: [
          { id: 'a', text: "Une seule grande table avec toutes les informations mélangées", correct: false },
          { id: 'b', text: "4 tables séparées : Livres, Auteurs, Emprunts, Membres", correct: true },
          { id: 'c', text: "Les bases de données ne peuvent pas stocker des relations entre entités", correct: false },
          { id: 'd', text: "Un fichier Excel par type d'information", correct: false }
        ],
        explanation: "La normalisation consiste à séparer les entités dans des tables distinctes pour éviter la redondance."
      },
      { id: 6, type: 'qcm', difficulty: 'easy',
        question: "Que signifie SGBD ?",
        options: [
          { id: 'a', text: "Système de Gestion de Base de Données", correct: true },
          { id: 'b', text: "Service Général de Bases de Données", correct: false },
          { id: 'c', text: "Système Global de Bases Distribuées", correct: false },
          { id: 'd', text: "Structure de Gestion de Big Data", correct: false }
        ],
        explanation: "Un SGBD est le logiciel qui gère la base de données : MySQL, PostgreSQL, Oracle sont des exemples."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Choisir le bon SGBD",
        consigne: "Votre startup stocke des données financières avec des relations complexes entre clients, transactions et comptes. Quel type de base choisir ?",
        options: [
          { id: 'a', text: "NoSQL car c'est plus moderne", correct: false },
          { id: 'b', text: "Relationnelle SQL car les relations entre données sont importantes", correct: true },
          { id: 'c', text: "Un simple fichier CSV car c'est plus rapide", correct: false },
          { id: 'd', text: "Une base graphe car les graphes sont puissants", correct: false }
        ],
        explanation: "Les bases relationnelles sont idéales quand les données ont des relations structurées et nécessitent une intégrité forte."
      }
    ]
  },
  2: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Qu'est-ce qu'une ligne dans une table SQL ?",
        options: [
          { id: 'a', text: "Une colonne de données", correct: false },
          { id: 'b', text: "Un type de données", correct: false },
          { id: 'c', text: "Un enregistrement concret — une instance de l'entité", correct: true },
          { id: 'd', text: "Une requête SQL", correct: false }
        ],
        explanation: "Une ligne (tuple) représente un enregistrement concret."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "Quel type de données utiliser pour stocker le nom d'un étudiant ?",
        options: [
          { id: 'a', text: "INTEGER", correct: false },
          { id: 'b', text: "BOOLEAN", correct: false },
          { id: 'c', text: "VARCHAR(50)", correct: true },
          { id: 'd', text: "DATE", correct: false }
        ],
        explanation: "VARCHAR est utilisé pour les chaînes de caractères de longueur variable."
      },
      { id: 3, type: 'qcm', difficulty: 'medium',
        question: "Quelle est la différence entre CHAR(n) et VARCHAR(n) ?",
        options: [
          { id: 'a', text: "Il n'y a aucune différence", correct: false },
          { id: 'b', text: "CHAR est pour les nombres, VARCHAR pour le texte", correct: false },
          { id: 'c', text: "CHAR est de longueur fixe, VARCHAR de longueur variable", correct: true },
          { id: 'd', text: "VARCHAR est plus lent que CHAR", correct: false }
        ],
        explanation: "CHAR(n) alloue toujours n caractères. VARCHAR n'alloue que le nécessaire."
      },
      { id: 4, type: 'qcm', difficulty: 'easy',
        question: "Quel type utiliser pour stocker la date d'inscription d'un étudiant ?",
        options: [
          { id: 'a', text: "VARCHAR", correct: false },
          { id: 'b', text: "INTEGER", correct: false },
          { id: 'c', text: "BOOLEAN", correct: false },
          { id: 'd', text: "DATE", correct: true }
        ],
        explanation: "Le type DATE stocke les dates au format YYYY-MM-DD."
      },
      { id: 5, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Concevoir une table ETUDIANT",
        consigne: "Choisissez les bons types pour : identifiant unique, nom complet, âge, email, date d'inscription, actif ou non.",
        options: [
          { id: 'a', text: "id INTEGER, nom VARCHAR(100), age INTEGER, email VARCHAR(255), date_inscription DATE, actif BOOLEAN", correct: true },
          { id: 'b', text: "id TEXT, nom INTEGER, age VARCHAR, email DATE, date_inscription BOOLEAN", correct: false },
          { id: 'c', text: "Toutes les colonnes en VARCHAR car c'est plus simple", correct: false },
          { id: 'd', text: "id BOOLEAN, nom TEXT, age DATE, email INTEGER", correct: false }
        ],
        explanation: "Chaque colonne doit avoir le type adapté : INTEGER pour les nombres, VARCHAR pour le texte, DATE pour les dates, BOOLEAN pour vrai/faux."
      },
      { id: 6, type: 'qcm', difficulty: 'medium',
        question: "Que signifie la contrainte NOT NULL ?",
        options: [
          { id: 'a', text: "La colonne doit contenir des nombres", correct: false },
          { id: 'b', text: "La colonne ne peut pas être vide — une valeur est obligatoire", correct: true },
          { id: 'c', text: "La colonne doit avoir une valeur nulle", correct: false },
          { id: 'd', text: "La colonne n'existe pas encore", correct: false }
        ],
        explanation: "NOT NULL force l'insertion d'une valeur dans cette colonne."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Identifier les erreurs de types",
        consigne: "Table : id VARCHAR(10), nom INTEGER, salaire DATE, est_actif BOOLEAN. Combien d'erreurs de types y a-t-il ?",
        options: [
          { id: 'a', text: "0 erreur, tout est correct", correct: false },
          { id: 'b', text: "1 erreur seulement", correct: false },
          { id: 'c', text: "3 erreurs : id→INTEGER, nom→VARCHAR, salaire→DECIMAL", correct: true },
          { id: 'd', text: "4 erreurs, tout est faux", correct: false }
        ],
        explanation: "id → INTEGER, nom → VARCHAR, salaire → DECIMAL. BOOLEAN pour est_actif est correct."
      },
      { id: 8, type: 'qcm', difficulty: 'hard',
        question: "Quelle est la valeur maximale d'un INTEGER en PostgreSQL ?",
        options: [
          { id: 'a', text: "1 000", correct: false },
          { id: 'b', text: "32 767", correct: false },
          { id: 'c', text: "2 147 483 647", correct: true },
          { id: 'd', text: "Illimité", correct: false }
        ],
        explanation: "INTEGER en PostgreSQL stocke des valeurs jusqu'à ~2,1 milliards. Pour plus grand, utiliser BIGINT."
      }
    ]
  },
  3: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Quelle est la règle principale d'une clé primaire ?",
        options: [
          { id: 'a', text: "Elle doit être un nombre entier", correct: false },
          { id: 'b', text: "Elle doit identifier de façon unique chaque ligne et ne jamais être nulle", correct: true },
          { id: 'c', text: "Elle peut avoir des doublons si les autres colonnes sont différentes", correct: false },
          { id: 'd', text: "Elle doit obligatoirement s'appeler 'id'", correct: false }
        ],
        explanation: "Une clé primaire doit être UNIQUE et NOT NULL."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "À quoi sert une clé étrangère ?",
        options: [
          { id: 'a', text: "À sécuriser la base de données avec un mot de passe", correct: false },
          { id: 'b', text: "À stocker des données chiffrées", correct: false },
          { id: 'c', text: "À créer une relation entre deux tables en référençant la clé primaire d'une autre table", correct: true },
          { id: 'd', text: "À dupliquer les données pour la sécurité", correct: false }
        ],
        explanation: "La clé étrangère (FOREIGN KEY) référence la clé primaire d'une autre table."
      },
      { id: 3, type: 'qcm', difficulty: 'medium',
        question: "Peut-on insérer une inscription pour un etudiant_id qui n'existe pas dans ETUDIANT ?",
        options: [
          { id: 'a', text: "Oui, sans problème", correct: false },
          { id: 'b', text: "Oui, mais il faut le préciser", correct: false },
          { id: 'c', text: "Non, la contrainte de clé étrangère l'interdit", correct: true },
          { id: 'd', text: "Ça dépend du type de la colonne", correct: false }
        ],
        explanation: "La contrainte FOREIGN KEY garantit l'intégrité référentielle."
      },
      { id: 4, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Clés dans un schéma",
        consigne: "TABLE COURS(cours_id PK, titre, prof_id FK→PROFESSEUR). Que se passe-t-il si on supprime un professeur qui a des cours associés ?",
        options: [
          { id: 'a', text: "Les cours sont automatiquement supprimés aussi", correct: false },
          { id: 'b', text: "La suppression est refusée par la contrainte FOREIGN KEY", correct: true },
          { id: 'c', text: "La suppression réussit et prof_id devient NULL", correct: false },
          { id: 'd', text: "Rien de spécial ne se passe", correct: false }
        ],
        explanation: "Par défaut, PostgreSQL refuse la suppression d'un enregistrement référencé par une clé étrangère."
      },
      { id: 5, type: 'qcm', difficulty: 'medium',
        question: "Pourquoi stocker etudiant_id dans INSCRIPTION plutôt que le nom de l'étudiant ?",
        options: [
          { id: 'a', text: "Pour éviter la redondance et les incohérences si le nom change", correct: true },
          { id: 'b', text: "Parce que les noms sont trop longs", correct: false },
          { id: 'c', text: "Pour rendre la base de données plus lente", correct: false },
          { id: 'd', text: "Il n'y a pas de raison particulière", correct: false }
        ],
        explanation: "Stocker un identifiant évite la redondance et les incohérences si le nom change."
      },
      { id: 6, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Concevoir les relations Many-to-Many",
        consigne: "Des étudiants peuvent s'inscrire à plusieurs cours, et un cours peut avoir plusieurs étudiants. Quelle est la bonne modélisation ?",
        options: [
          { id: 'a', text: "Une seule table ETUDIANT avec une colonne 'cours' en TEXT", correct: false },
          { id: 'b', text: "Tables ETUDIANT et COURS + table INSCRIPTION(etudiant_id FK, cours_id FK)", correct: true },
          { id: 'c', text: "Dupliquer les étudiants dans la table COURS", correct: false },
          { id: 'd', text: "Une table COURS avec une colonne qui liste tous les étudiants", correct: false }
        ],
        explanation: "Une relation Many-to-Many nécessite une table intermédiaire avec deux clés étrangères."
      },
      { id: 7, type: 'qcm', difficulty: 'hard',
        question: "Une table peut-elle avoir plusieurs clés étrangères ?",
        options: [
          { id: 'a', text: "Non, une seule clé étrangère est autorisée", correct: false },
          { id: 'b', text: "Oui, une table peut avoir autant de clés étrangères que nécessaire", correct: true },
          { id: 'c', text: "Oui, mais maximum 2 clés étrangères", correct: false },
          { id: 'd', text: "Seulement si la table n'a pas de clé primaire", correct: false }
        ],
        explanation: "Une table peut avoir plusieurs FK. La table INSCRIPTION a FK vers ETUDIANT et FK vers COURS."
      }
    ]
  },
  4: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Quelle requête affiche le nom et l'email de tous les étudiants ?",
        options: [
          { id: 'a', text: "GET nom, email FROM ETUDIANT;", correct: false },
          { id: 'b', text: "SELECT * FROM ETUDIANT;", correct: false },
          { id: 'c', text: "SELECT nom, email FROM ETUDIANT;", correct: true },
          { id: 'd', text: "DISPLAY nom, email FROM ETUDIANT;", correct: false }
        ],
        explanation: "SELECT colonne1, colonne2 FROM table; est la syntaxe correcte."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "Que retourne SELECT * FROM ETUDIANT; ?",
        options: [
          { id: 'a', text: "Seulement la première ligne", correct: false },
          { id: 'b', text: "Seulement les colonnes numériques", correct: false },
          { id: 'c', text: "Toutes les colonnes et toutes les lignes de la table", correct: true },
          { id: 'd', text: "Le nombre total d'étudiants", correct: false }
        ],
        explanation: "Le * est un joker qui sélectionne toutes les colonnes."
      },
      { id: 3, type: 'exercice', difficulty: 'easy',
        question: "🛠️ Exercice : Écrire un SELECT ciblé",
        consigne: "TABLE PRODUIT : id, nom, prix, categorie, stock. Affichez uniquement le nom et le prix de tous les produits.",
        options: [
          { id: 'a', text: "SELECT * FROM PRODUIT;", correct: false },
          { id: 'b', text: "SELECT nom, prix FROM PRODUIT;", correct: true },
          { id: 'c', text: "GET nom AND prix FROM PRODUIT;", correct: false },
          { id: 'd', text: "SELECT PRODUIT.nom, PRODUIT.prix;", correct: false }
        ],
        explanation: "SELECT nom, prix FROM PRODUIT; sélectionne exactement les deux colonnes demandées."
      },
      { id: 4, type: 'qcm', difficulty: 'medium',
        question: "Comment afficher les valeurs uniques d'une colonne (sans doublons) ?",
        options: [
          { id: 'a', text: "SELECT UNIQUE colonne FROM table;", correct: false },
          { id: 'b', text: "SELECT DIFFERENT colonne FROM table;", correct: false },
          { id: 'c', text: "SELECT DISTINCT colonne FROM table;", correct: true },
          { id: 'd', text: "SELECT ONE colonne FROM table;", correct: false }
        ],
        explanation: "DISTINCT élimine les doublons dans les résultats."
      },
      { id: 5, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Calculs et alias",
        consigne: "TABLE EMPLOYE : id, nom, salaire_mensuel. Affichez le nom et le salaire annuel (×12) avec le label 'salaire_annuel'.",
        options: [
          { id: 'a', text: "SELECT nom, salaire_mensuel FROM EMPLOYE;", correct: false },
          { id: 'b', text: "SELECT nom, salaire_mensuel * 12 AS salaire_annuel FROM EMPLOYE;", correct: true },
          { id: 'c', text: "SELECT nom, salaire_annuel = salaire_mensuel * 12 FROM EMPLOYE;", correct: false },
          { id: 'd', text: "SELECT nom, CALCULATE(salaire_mensuel, 12) FROM EMPLOYE;", correct: false }
        ],
        explanation: "AS permet de renommer une colonne ou expression."
      },
      { id: 6, type: 'qcm', difficulty: 'medium',
        question: "Quelle est la syntaxe correcte d'un SELECT avec alias de table ?",
        options: [
          { id: 'a', text: "SELECT e.nom FROM ETUDIANT AS e;", correct: true },
          { id: 'b', text: "SELECT ETUDIANT.e.nom FROM ETUDIANT;", correct: false },
          { id: 'c', text: "SELECT nom AS ETUDIANT FROM e;", correct: false },
          { id: 'd', text: "SELECT e FROM ETUDIANT(nom);", correct: false }
        ],
        explanation: "AS e crée un alias 'e' pour la table ETUDIANT."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Ordre d'exécution SQL",
        consigne: "Dans quel ordre SQL exécute-t-il : SELECT nom FROM ETUDIANT WHERE age > 20 ORDER BY nom; ?",
        options: [
          { id: 'a', text: "SELECT → FROM → WHERE → ORDER BY", correct: false },
          { id: 'b', text: "FROM → WHERE → SELECT → ORDER BY", correct: true },
          { id: 'c', text: "WHERE → FROM → ORDER BY → SELECT", correct: false },
          { id: 'd', text: "L'ordre d'écriture est l'ordre d'exécution", correct: false }
        ],
        explanation: "SQL exécute : FROM → WHERE → SELECT → ORDER BY."
      }
    ]
  },
  5: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Quelle requête affiche les étudiants de plus de 20 ans ?",
        options: [
          { id: 'a', text: "SELECT * FROM ETUDIANT IF age > 20;", correct: false },
          { id: 'b', text: "SELECT * FROM ETUDIANT WHERE age > 20;", correct: true },
          { id: 'c', text: "SELECT * FROM ETUDIANT FILTER age > 20;", correct: false },
          { id: 'd', text: "SELECT * FROM ETUDIANT HAVING age > 20;", correct: false }
        ],
        explanation: "WHERE est la clause de filtrage des lignes."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "Comment filtrer les étudiants de Casablanca ET de plus de 18 ans ?",
        options: [
          { id: 'a', text: "WHERE ville = 'Casablanca' OR age > 18", correct: false },
          { id: 'b', text: "WHERE ville = 'Casablanca' AND age > 18", correct: true },
          { id: 'c', text: "WHERE ville = 'Casablanca' THEN age > 18", correct: false },
          { id: 'd', text: "WHERE (ville, age) = ('Casablanca', 18)", correct: false }
        ],
        explanation: "AND exige que les deux conditions soient vraies simultanément."
      },
      { id: 3, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Utiliser LIKE",
        consigne: "TABLE CLIENT : id, nom, email, ville. Tous les clients dont l'email se termine par '@gmail.com'.",
        options: [
          { id: 'a', text: "SELECT * FROM CLIENT WHERE email = '@gmail.com';", correct: false },
          { id: 'b', text: "SELECT * FROM CLIENT WHERE email LIKE '%@gmail.com';", correct: true },
          { id: 'c', text: "SELECT * FROM CLIENT WHERE email CONTAINS '@gmail.com';", correct: false },
          { id: 'd', text: "SELECT * FROM CLIENT WHERE email END '@gmail.com';", correct: false }
        ],
        explanation: "LIKE '%@gmail.com' utilise % comme joker."
      },
      { id: 4, type: 'qcm', difficulty: 'easy',
        question: "Quelle requête trie les étudiants par note décroissante ?",
        options: [
          { id: 'a', text: "SELECT * FROM ETUDIANT SORT BY note DESC;", correct: false },
          { id: 'b', text: "SELECT * FROM ETUDIANT ORDER BY note DESC;", correct: true },
          { id: 'c', text: "SELECT * FROM ETUDIANT ORDER note DESC;", correct: false },
          { id: 'd', text: "SELECT * FROM ETUDIANT WHERE note DESC;", correct: false }
        ],
        explanation: "ORDER BY colonne DESC trie du plus grand au plus petit."
      },
      { id: 5, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Combiner filtres et tri",
        consigne: "TABLE PRODUIT : id, nom, prix, categorie. Produits 'Informatique' entre 100 et 500 DH, triés par prix croissant.",
        options: [
          { id: 'a', text: "SELECT * FROM PRODUIT WHERE categorie='Informatique' AND prix BETWEEN 100 AND 500 ORDER BY prix ASC;", correct: true },
          { id: 'b', text: "SELECT * FROM PRODUIT WHERE categorie='Informatique' OR prix > 100 AND prix < 500;", correct: false },
          { id: 'c', text: "SELECT * FROM PRODUIT ORDER BY prix WHERE categorie='Informatique';", correct: false },
          { id: 'd', text: "SELECT * FROM PRODUIT FILTER categorie='Informatique' BETWEEN 100 AND 500;", correct: false }
        ],
        explanation: "BETWEEN 100 AND 500 est équivalent à prix >= 100 AND prix <= 500."
      },
      { id: 6, type: 'qcm', difficulty: 'medium',
        question: "Comment vérifier si une colonne est NULL ?",
        options: [
          { id: 'a', text: "WHERE colonne = NULL", correct: false },
          { id: 'b', text: "WHERE colonne == NULL", correct: false },
          { id: 'c', text: "WHERE colonne IS NULL", correct: true },
          { id: 'd', text: "WHERE colonne EQUALS NULL", correct: false }
        ],
        explanation: "NULL ne peut pas être comparé avec = en SQL. On utilise IS NULL."
      },
      { id: 7, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Opérateur IN",
        consigne: "Étudiants de Casablanca, Rabat OU El Jadida. Quelle est la requête la plus propre ?",
        options: [
          { id: 'a', text: "SELECT * FROM ETUDIANT WHERE ville='Casablanca' OR ville='Rabat' OR ville='El Jadida';", correct: false },
          { id: 'b', text: "SELECT * FROM ETUDIANT WHERE ville IN ('Casablanca', 'Rabat', 'El Jadida');", correct: true },
          { id: 'c', text: "SELECT * FROM ETUDIANT WHERE ville = ('Casablanca', 'Rabat', 'El Jadida');", correct: false },
          { id: 'd', text: "SELECT * FROM ETUDIANT WHERE ville CONTAINS 'Casablanca';", correct: false }
        ],
        explanation: "IN est plus lisible que plusieurs OR."
      },
      { id: 8, type: 'qcm', difficulty: 'hard',
        question: "Que fait LIMIT 5 dans une requête SELECT ?",
        options: [
          { id: 'a', text: "Retourne seulement les 5 dernières lignes", correct: false },
          { id: 'b', text: "Retourne seulement les 5 premières lignes du résultat", correct: true },
          { id: 'c', text: "Interdit les résultats de plus de 5 colonnes", correct: false },
          { id: 'd', text: "Limite la table à 5 enregistrements maximum", correct: false }
        ],
        explanation: "LIMIT n restreint le nombre de lignes retournées."
      }
    ]
  },
  6: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'medium',
        question: "Quelle est la différence principale entre INNER JOIN et LEFT JOIN ?",
        options: [
          { id: 'a', text: "INNER JOIN est plus rapide que LEFT JOIN", correct: false },
          { id: 'b', text: "INNER JOIN retourne seulement les lignes avec correspondance dans les deux tables, LEFT JOIN retourne toutes les lignes de la table gauche", correct: true },
          { id: 'c', text: "LEFT JOIN ne fonctionne qu'avec deux tables", correct: false },
          { id: 'd', text: "Il n'y a aucune différence", correct: false }
        ],
        explanation: "INNER JOIN = intersection. LEFT JOIN = tout de gauche + correspondances de droite."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "On veut afficher tous les étudiants, même ceux sans inscription. Quelle jointure utiliser ?",
        options: [
          { id: 'a', text: "INNER JOIN", correct: false },
          { id: 'b', text: "RIGHT JOIN", correct: false },
          { id: 'c', text: "LEFT JOIN", correct: true },
          { id: 'd', text: "CROSS JOIN", correct: false }
        ],
        explanation: "LEFT JOIN garde toutes les lignes de la table gauche même sans correspondance."
      },
      { id: 3, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Écrire un INNER JOIN",
        consigne: "ETUDIANT(etudiant_id, nom) et INSCRIPTION(inscription_id, etudiant_id, cours_id). Affichez le nom de chaque étudiant avec son cours_id.",
        options: [
          { id: 'a', text: "SELECT ETUDIANT.nom, INSCRIPTION.cours_id FROM ETUDIANT, INSCRIPTION;", correct: false },
          { id: 'b', text: "SELECT e.nom, i.cours_id FROM ETUDIANT e INNER JOIN INSCRIPTION i ON e.etudiant_id = i.etudiant_id;", correct: true },
          { id: 'c', text: "SELECT nom, cours_id FROM ETUDIANT JOIN INSCRIPTION;", correct: false },
          { id: 'd', text: "SELECT ETUDIANT.nom FROM ETUDIANT WHERE etudiant_id = INSCRIPTION.etudiant_id;", correct: false }
        ],
        explanation: "ON spécifie comment lier les tables. Les alias (e, i) rendent le code plus lisible."
      },
      { id: 4, type: 'qcm', difficulty: 'medium',
        question: "Dans un INNER JOIN entre ETUDIANT et INSCRIPTION, que se passe-t-il pour un étudiant sans inscription ?",
        options: [
          { id: 'a', text: "Il apparaît avec NULL dans les colonnes d'inscription", correct: false },
          { id: 'b', text: "Il n'apparaît pas du tout dans le résultat", correct: true },
          { id: 'c', text: "Il génère une erreur SQL", correct: false },
          { id: 'd', text: "Il apparaît en double", correct: false }
        ],
        explanation: "INNER JOIN ne retourne que les lignes qui ont une correspondance dans les DEUX tables."
      },
      { id: 5, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : JOIN avec filtre WHERE",
        consigne: "COMMANDE(commande_id, client_id, montant) et CLIENT(client_id, nom). Commandes de plus de 500 DH avec le nom du client.",
        options: [
          { id: 'a', text: "SELECT c.nom, cmd.montant FROM CLIENT c JOIN COMMANDE cmd ON c.client_id = cmd.client_id WHERE cmd.montant > 500;", correct: true },
          { id: 'b', text: "SELECT nom, montant FROM CLIENT, COMMANDE WHERE montant > 500;", correct: false },
          { id: 'c', text: "SELECT * FROM COMMANDE JOIN CLIENT WHERE montant > 500;", correct: false },
          { id: 'd', text: "SELECT nom FROM CLIENT HAVING montant > 500;", correct: false }
        ],
        explanation: "On combine JOIN et WHERE : d'abord on joint, ensuite on filtre."
      },
      { id: 6, type: 'qcm', difficulty: 'hard',
        question: "Que retourne un CROSS JOIN ?",
        options: [
          { id: 'a', text: "Seulement les lignes communes", correct: false },
          { id: 'b', text: "Le produit cartésien : toutes les combinaisons possibles", correct: true },
          { id: 'c', text: "Les lignes présentes dans une table mais pas dans l'autre", correct: false },
          { id: 'd', text: "La même chose qu'un INNER JOIN", correct: false }
        ],
        explanation: "CROSS JOIN génère n×m lignes."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Jointure triple",
        consigne: "ETUDIANT, INSCRIPTION, COURS. Affichez le nom de l'étudiant et le titre du cours pour chaque inscription.",
        options: [
          { id: 'a', text: "SELECT e.nom, c.titre FROM ETUDIANT e JOIN INSCRIPTION i ON e.etudiant_id = i.etudiant_id JOIN COURS c ON i.cours_id = c.cours_id;", correct: true },
          { id: 'b', text: "SELECT nom, titre FROM ETUDIANT, INSCRIPTION, COURS;", correct: false },
          { id: 'c', text: "SELECT e.nom, c.titre FROM ETUDIANT e, COURS c WHERE e.etudiant_id = c.cours_id;", correct: false },
          { id: 'd', text: "SELECT * FROM ETUDIANT JOIN COURS;", correct: false }
        ],
        explanation: "On peut chaîner plusieurs JOIN. Chaque JOIN ajoute une table avec sa condition ON."
      }
    ]
  },
  7: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Quelle fonction SQL compte le nombre de lignes dans une table ?",
        options: [
          { id: 'a', text: "SUM(*)", correct: false },
          { id: 'b', text: "COUNT(*)", correct: true },
          { id: 'c', text: "TOTAL(*)", correct: false },
          { id: 'd', text: "NUMBER(*)", correct: false }
        ],
        explanation: "COUNT(*) compte toutes les lignes. COUNT(colonne) ignore les valeurs NULL."
      },
      { id: 2, type: 'qcm', difficulty: 'medium',
        question: "Quelle est la différence entre WHERE et HAVING ?",
        options: [
          { id: 'a', text: "WHERE filtre les lignes avant l'agrégation, HAVING filtre les groupes après", correct: true },
          { id: 'b', text: "WHERE est plus rapide que HAVING", correct: false },
          { id: 'c', text: "HAVING s'utilise sans GROUP BY", correct: false },
          { id: 'd', text: "Il n'y a aucune différence", correct: false }
        ],
        explanation: "WHERE filtre les lignes individuelles. HAVING filtre les résultats des groupes."
      },
      { id: 3, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : GROUP BY basique",
        consigne: "TABLE VENTE : id, produit, categorie, prix. Chiffre d'affaires total (SUM de prix) par catégorie.",
        options: [
          { id: 'a', text: "SELECT SUM(prix) FROM VENTE;", correct: false },
          { id: 'b', text: "SELECT categorie, SUM(prix) AS ca_total FROM VENTE GROUP BY categorie;", correct: true },
          { id: 'c', text: "SELECT categorie, SUM(prix) FROM VENTE WHERE categorie;", correct: false },
          { id: 'd', text: "SELECT categorie FROM VENTE GROUP BY SUM(prix);", correct: false }
        ],
        explanation: "GROUP BY regroupe les lignes, puis SUM calcule le total dans chaque groupe."
      },
      { id: 4, type: 'qcm', difficulty: 'easy',
        question: "Quelle requête donne le nombre d'étudiants par niveau ?",
        options: [
          { id: 'a', text: "SELECT COUNT(*) FROM ETUDIANT;", correct: false },
          { id: 'b', text: "SELECT niveau, COUNT(*) FROM ETUDIANT GROUP BY niveau;", correct: true },
          { id: 'c', text: "SELECT niveau, SUM(*) FROM ETUDIANT;", correct: false },
          { id: 'd', text: "SELECT COUNT(niveau) FROM ETUDIANT;", correct: false }
        ],
        explanation: "GROUP BY niveau regroupe par niveau, COUNT(*) compte dans chaque groupe."
      },
      { id: 5, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : HAVING",
        consigne: "TABLE COMMANDE : client_id, montant. Clients qui ont passé plus de 3 commandes.",
        options: [
          { id: 'a', text: "SELECT client_id FROM COMMANDE WHERE COUNT(*) > 3 GROUP BY client_id;", correct: false },
          { id: 'b', text: "SELECT client_id, COUNT(*) AS nb FROM COMMANDE GROUP BY client_id HAVING COUNT(*) > 3;", correct: true },
          { id: 'c', text: "SELECT client_id FROM COMMANDE GROUP BY client_id WHERE nb > 3;", correct: false },
          { id: 'd', text: "SELECT client_id FROM COMMANDE HAVING commandes > 3;", correct: false }
        ],
        explanation: "HAVING filtre APRÈS l'agrégation. WHERE ne peut pas utiliser des fonctions d'agrégation."
      },
      { id: 6, type: 'qcm', difficulty: 'hard',
        question: "Quelle est l'erreur dans : SELECT ville, nom, COUNT(*) FROM ETUDIANT GROUP BY ville; ?",
        options: [
          { id: 'a', text: "COUNT(*) est incorrect", correct: false },
          { id: 'b', text: "La colonne 'nom' n'est pas dans GROUP BY ni dans une agrégation", correct: true },
          { id: 'c', text: "Il faut ajouter ORDER BY", correct: false },
          { id: 'd', text: "Il n'y a pas d'erreur", correct: false }
        ],
        explanation: "Toute colonne dans SELECT doit être soit dans GROUP BY, soit dans une fonction d'agrégation."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : WHERE + HAVING combinés",
        consigne: "TABLE VENTE : produit, categorie, prix, annee. Catégories de 2025 dont la moyenne de prix dépasse 200 DH.",
        options: [
          { id: 'a', text: "SELECT categorie, AVG(prix) FROM VENTE WHERE annee=2025 GROUP BY categorie HAVING AVG(prix) > 200;", correct: true },
          { id: 'b', text: "SELECT categorie, AVG(prix) FROM VENTE GROUP BY categorie HAVING annee=2025 AND AVG(prix) > 200;", correct: false },
          { id: 'c', text: "SELECT categorie FROM VENTE WHERE AVG(prix) > 200 AND annee=2025;", correct: false },
          { id: 'd', text: "SELECT categorie, AVG(prix) FROM VENTE HAVING annee=2025 AND AVG(prix) > 200;", correct: false }
        ],
        explanation: "WHERE filtre les lignes AVANT le groupement, HAVING filtre les groupes APRÈS."
      },
      { id: 8, type: 'qcm', difficulty: 'easy',
        question: "Quelle fonction retourne la valeur maximale d'une colonne ?",
        options: [
          { id: 'a', text: "HIGHEST()", correct: false },
          { id: 'b', text: "TOP()", correct: false },
          { id: 'c', text: "MAX()", correct: true },
          { id: 'd', text: "GREATEST()", correct: false }
        ],
        explanation: "MAX() retourne la valeur maximale. MIN() retourne le minimum."
      }
    ]
  },
  8: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Qu'est-ce qu'une sous-requête ?",
        options: [
          { id: 'a', text: "Une requête qui supprime des données", correct: false },
          { id: 'b', text: "Une requête SELECT imbriquée dans une autre requête", correct: true },
          { id: 'c', text: "Une requête qui crée une nouvelle table", correct: false },
          { id: 'd', text: "Un alias pour une colonne", correct: false }
        ],
        explanation: "Une sous-requête est une requête SELECT à l'intérieur d'une autre requête, entre parenthèses."
      },
      { id: 2, type: 'qcm', difficulty: 'medium',
        question: "Dans quel ordre s'exécutent requête principale et sous-requête ?",
        options: [
          { id: 'a', text: "La requête principale s'exécute d'abord", correct: false },
          { id: 'b', text: "Les deux s'exécutent en même temps", correct: false },
          { id: 'c', text: "La sous-requête s'exécute en premier, puis la requête principale utilise son résultat", correct: true },
          { id: 'd', text: "L'ordre dépend de la taille des tables", correct: false }
        ],
        explanation: "La sous-requête est toujours exécutée en premier."
      },
      { id: 3, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Sous-requête avec AVG",
        consigne: "TABLE EMPLOYE : id, nom, salaire. Employés qui gagnent plus que la moyenne générale.",
        options: [
          { id: 'a', text: "SELECT * FROM EMPLOYE WHERE salaire > AVG(salaire);", correct: false },
          { id: 'b', text: "SELECT * FROM EMPLOYE WHERE salaire > (SELECT AVG(salaire) FROM EMPLOYE);", correct: true },
          { id: 'c', text: "SELECT * FROM EMPLOYE HAVING salaire > AVG(salaire);", correct: false },
          { id: 'd', text: "SELECT * FROM EMPLOYE WHERE salaire > AVERAGE;", correct: false }
        ],
        explanation: "AVG() ne peut pas être utilisé directement dans WHERE. La sous-requête calcule d'abord la moyenne."
      },
      { id: 4, type: 'qcm', difficulty: 'medium',
        question: "Quelle requête trouve les étudiants dont la note est supérieure à la moyenne ?",
        options: [
          { id: 'a', text: "SELECT * FROM ETUDIANT WHERE note > AVG(note);", correct: false },
          { id: 'b', text: "SELECT * FROM ETUDIANT WHERE note > (SELECT AVG(note) FROM ETUDIANT);", correct: true },
          { id: 'c', text: "SELECT * FROM ETUDIANT HAVING note > AVG(note);", correct: false },
          { id: 'd', text: "SELECT * FROM ETUDIANT WHERE note > AVERAGE;", correct: false }
        ],
        explanation: "On ne peut pas utiliser AVG() directement dans WHERE. Il faut une sous-requête."
      },
      { id: 5, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Sous-requête avec IN",
        consigne: "ETUDIANT(id, nom) et INSCRIPTION(etudiant_id, cours_id). Étudiants inscrits au cours_id = 5.",
        options: [
          { id: 'a', text: "SELECT * FROM ETUDIANT WHERE id IN (SELECT etudiant_id FROM INSCRIPTION WHERE cours_id = 5);", correct: true },
          { id: 'b', text: "SELECT * FROM ETUDIANT WHERE cours_id = 5;", correct: false },
          { id: 'c', text: "SELECT * FROM ETUDIANT JOIN INSCRIPTION WHERE cours_id = 5;", correct: false },
          { id: 'd', text: "SELECT * FROM ETUDIANT WHERE id = (SELECT * FROM INSCRIPTION WHERE cours_id = 5);", correct: false }
        ],
        explanation: "IN avec sous-requête vérifie si la valeur appartient à l'ensemble retourné."
      },
      { id: 6, type: 'qcm', difficulty: 'hard',
        question: "Quelle est la règle quand une sous-requête est utilisée avec = ?",
        options: [
          { id: 'a', text: "Elle peut retourner plusieurs lignes", correct: false },
          { id: 'b', text: "Elle doit retourner exactement une seule valeur", correct: true },
          { id: 'c', text: "Elle doit retourner toutes les colonnes", correct: false },
          { id: 'd', text: "Il n'y a pas de règle", correct: false }
        ],
        explanation: "Avec =, la sous-requête est scalaire : une seule valeur. Sinon, utilisez IN."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Afficher le meilleur étudiant",
        consigne: "TABLE ETUDIANT : id, nom, note. Affichez le nom de l'étudiant ayant la note la plus haute.",
        options: [
          { id: 'a', text: "SELECT nom FROM ETUDIANT WHERE note = (SELECT MAX(note) FROM ETUDIANT);", correct: true },
          { id: 'b', text: "SELECT MAX(nom) FROM ETUDIANT;", correct: false },
          { id: 'c', text: "SELECT nom FROM ETUDIANT ORDER BY note DESC;", correct: false },
          { id: 'd', text: "SELECT nom FROM ETUDIANT WHERE note > MAX(note);", correct: false }
        ],
        explanation: "La sous-requête calcule d'abord le MAX, puis la requête externe trouve l'étudiant avec cette note."
      }
    ]
  },
  9: {
    h5pQuestions: [
      { id: 1, type: 'qcm', difficulty: 'easy',
        question: "Qu'est-ce que le principe 'tout ou rien' dans une transaction ?",
        options: [
          { id: 'a', text: "Toutes les tables sont supprimées ou aucune", correct: false },
          { id: 'b', text: "Toutes les opérations réussissent ou toutes sont annulées", correct: true },
          { id: 'c', text: "On doit tout valider immédiatement", correct: false },
          { id: 'd', text: "Les données sont dupliquées ou effacées", correct: false }
        ],
        explanation: "L'atomicité garantit que si une opération échoue, toutes les autres sont annulées (ROLLBACK)."
      },
      { id: 2, type: 'qcm', difficulty: 'easy',
        question: "Quelle commande valide définitivement une transaction ?",
        options: [
          { id: 'a', text: "SAVE", correct: false },
          { id: 'b', text: "APPLY", correct: false },
          { id: 'c', text: "COMMIT", correct: true },
          { id: 'd', text: "CONFIRM", correct: false }
        ],
        explanation: "COMMIT valide et rend permanentes toutes les modifications de la transaction."
      },
      { id: 3, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : Scénario virement bancaire",
        consigne: "Virement 1000 DH du compte A vers B : débiter A et créditer B. Que se passe-t-il si le débit réussit mais le crédit échoue SANS transaction ?",
        options: [
          { id: 'a', text: "Rien de grave, le système se corrige automatiquement", correct: false },
          { id: 'b', text: "1000 DH sont perdus : débitées de A mais jamais créditées sur B", correct: true },
          { id: 'c', text: "Le débit est automatiquement annulé", correct: false },
          { id: 'd', text: "Le système fait une nouvelle tentative", correct: false }
        ],
        explanation: "Sans transaction, les opérations partielles créent des incohérences."
      },
      { id: 4, type: 'qcm', difficulty: 'medium',
        question: "Quelle contrainte empêche deux étudiants d'avoir le même email ?",
        options: [
          { id: 'a', text: "NOT NULL", correct: false },
          { id: 'b', text: "CHECK", correct: false },
          { id: 'c', text: "UNIQUE", correct: true },
          { id: 'd', text: "DEFAULT", correct: false }
        ],
        explanation: "UNIQUE garantit qu'une valeur n'apparaît qu'une seule fois dans la colonne."
      },
      { id: 5, type: 'exercice', difficulty: 'medium',
        question: "🛠️ Exercice : ROLLBACK",
        consigne: "Dans une transaction, vous exécutez 3 UPDATE. Le 3ème échoue. Vous faites ROLLBACK. Quel est l'état de la base ?",
        options: [
          { id: 'a', text: "Les 2 premiers UPDATE sont gardés, le 3ème annulé", correct: false },
          { id: 'b', text: "Tous les 3 UPDATE sont annulés, retour à l'état initial", correct: true },
          { id: 'c', text: "Tous les UPDATE sont validés malgré l'erreur", correct: false },
          { id: 'd', text: "La base est corrompue", correct: false }
        ],
        explanation: "ROLLBACK annule TOUTES les modifications depuis le BEGIN."
      },
      { id: 6, type: 'qcm', difficulty: 'hard',
        question: "Que signifie ACID ?",
        options: [
          { id: 'a', text: "Automatique, Concurrent, Intègre, Distribué", correct: false },
          { id: 'b', text: "Atomicité, Cohérence, Isolation, Durabilité", correct: true },
          { id: 'c', text: "Accessible, Cloisonné, Indexé, Dupliqué", correct: false },
          { id: 'd', text: "Asynchrone, Cohérent, Intégré, Durable", correct: false }
        ],
        explanation: "ACID : Atomicité, Cohérence, Isolation, Durabilité."
      },
      { id: 7, type: 'exercice', difficulty: 'hard',
        question: "🛠️ Exercice : Choisir la bonne contrainte",
        consigne: "La colonne 'age' dans ETUDIANT doit être entre 16 et 99 ans. Quelle contrainte utiliser ?",
        options: [
          { id: 'a', text: "NOT NULL", correct: false },
          { id: 'b', text: "UNIQUE", correct: false },
          { id: 'c', text: "CHECK (age BETWEEN 16 AND 99)", correct: true },
          { id: 'd', text: "DEFAULT 18", correct: false }
        ],
        explanation: "CHECK permet de définir une condition que toute valeur insérée doit respecter."
      },
      { id: 8, type: 'qcm', difficulty: 'medium',
        question: "Quelle commande démarre explicitement une transaction en PostgreSQL ?",
        options: [
          { id: 'a', text: "START", correct: false },
          { id: 'b', text: "BEGIN ou START TRANSACTION", correct: true },
          { id: 'c', text: "OPEN TRANSACTION", correct: false },
          { id: 'd', text: "INIT", correct: false }
        ],
        explanation: "BEGIN démarre une transaction. Sans BEGIN, chaque requête est une transaction automatique."
      }
    ]
  }
};

export default quizData;
