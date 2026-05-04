-- =========================================================================
-- MIGRATION POUR PLATEFORME MICRO-LEARNING (PFA HAMZA)
-- Ajout des données pédagogiques enrichies (Objectifs, Points Clés, Résumés)
-- =========================================================================

-- 1. AJOUT DES NOUVELLES COLONNES DANS LA TABLE grains
ALTER TABLE grains ADD COLUMN IF NOT EXISTS learning_objectives_list TEXT[];
ALTER TABLE grains ADD COLUMN IF NOT EXISTS key_points TEXT[];
ALTER TABLE grains ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE grains ADD COLUMN IF NOT EXISTS vark_explanation TEXT;

-- 2. MISE À JOUR DES 9 GRAINS AVEC DU CONTENU RÉEL

-- GRAIN 1 : C'est quoi une base de données ? (Style: VISUEL)
UPDATE grains SET 
  target_vark_style = 'VISUEL',
  learning_objectives_list = ARRAY[
    'Définir ce qu''est une base de données et expliquer son rôle dans la gestion des informations',
    'Distinguer une base de données relationnelle d''un simple fichier Excel',
    'Identifier les 3 composantes principales : tables, lignes (enregistrements) et colonnes (champs)',
    'Expliquer pourquoi les entreprises utilisent des BDD (cohérence, sécurité, performances)',
    'Reconnaître les principaux SGBD du marché (MySQL, PostgreSQL, Oracle)'
  ],
  key_points = ARRAY[
    'Une base de données stocke des informations de manière structurée et sécurisée',
    'Contrairement à Excel, une BDD gère efficacement des millions d''enregistrements simultanément',
    'SQL (Structured Query Language) est le langage standard pour interagir avec ces bases',
    'Un SGBD (Système de Gestion de Base de Données) est le logiciel qui gère la base de données'
  ],
  summary = 'Une base de données est un système informatique permettant de stocker, organiser et gérer de grandes quantités d''informations. Contrairement à un tableur Excel limité, une BDD gère efficacement des millions de données tout en garantissant cohérence, sécurité et accès multi-utilisateurs rapide grâce au langage SQL.',
  vark_explanation = 'Ce grain utilise des schémas visuels, des diagrammes d''architecture et des icônes pour illustrer le fonctionnement des bases de données. L''apprentissage visuel facilite la compréhension des concepts abstraits de stockage.'
WHERE grain_id = 1;

-- GRAIN 2 : Les tables, colonnes et types (Style: LECTURE)
UPDATE grains SET 
  target_vark_style = 'LECTURE',
  learning_objectives_list = ARRAY[
    'Comprendre la structure tabulaire d''une base de données relationnelle',
    'Définir ce qu''est une colonne (attribut) et une ligne (enregistrement)',
    'Identifier les types de données fondamentaux (INT, VARCHAR, DATE, BOOLEAN)',
    'Choisir le type de données approprié pour une information spécifique',
    'Comprendre la notion de contrainte de base (NOT NULL)'
  ],
  key_points = ARRAY[
    'Une table représente une entité spécifique (ex: Clients, Produits, Commandes)',
    'Chaque colonne définit une caractéristique de l''entité avec un type de données strict',
    'Chaque ligne représente une occurrence unique de cette entité',
    'Le choix du bon type de données (VARCHAR vs TEXT, INT vs FLOAT) optimise les performances'
  ],
  summary = 'Les bases de données relationnelles organisent les informations sous forme de tables (similaires à des grilles). Les colonnes définissent la structure stricte (noms, âges, dates) en imposant des types de données spécifiques (INT, VARCHAR, DATE) pour éviter les erreurs. Chaque ligne ajoutée dans cette table constitue un enregistrement.',
  vark_explanation = 'Le contenu textuel est structuré avec des définitions claires, des listes à puces et des exemples écrits. L''accent est mis sur la lecture et l''analyse de texte pour ancrer la logique de structuration des données.'
WHERE grain_id = 2;

-- GRAIN 3 : La clé primaire et étrangère (Style: VISUEL)
UPDATE grains SET 
  target_vark_style = 'VISUEL',
  learning_objectives_list = ARRAY[
    'Définir le rôle crucial d''une clé primaire (Primary Key)',
    'Comprendre pourquoi une clé primaire doit être unique et non nulle',
    'Définir le concept de clé étrangère (Foreign Key)',
    'Expliquer comment les clés étrangères lient les tables entre elles',
    'Comprendre l''intégrité référentielle'
  ],
  key_points = ARRAY[
    'La Clé Primaire (PK) identifie de manière unique chaque ligne d''une table (ex: ID_Client)',
    'La Clé Étrangère (FK) pointe vers la clé primaire d''une autre table pour créer un lien',
    'Ces clés forment l''aspect "relationnel" des bases de données relationnelles',
    'L''intégrité référentielle empêche de lier un enregistrement à un identifiant qui n''existe pas'
  ],
  summary = 'Les clés sont le ciment des bases de données relationnelles. La clé primaire garantit l''unicité absolue de chaque enregistrement (comme un numéro de CIN). La clé étrangère permet de lier différentes tables entre elles (ex: lier une table Commande à la table Client) tout en maintenant la cohérence globale des données.',
  vark_explanation = 'Ce grain utilise des diagrammes entité-relation (ERD) avec un code couleur connectant visuellement les tables entre elles. Visualiser les liens aide à mémoriser le concept de clés relationnelles.'
WHERE grain_id = 3;

-- GRAIN 4 : Les requêtes SELECT de base (Style: KINESTHESIQUE)
UPDATE grains SET 
  target_vark_style = 'KINESTHESIQUE',
  learning_objectives_list = ARRAY[
    'Écrire une requête SELECT basique pour lire des données',
    'Utiliser le caractère (*) pour sélectionner toutes les colonnes',
    'Sélectionner des colonnes spécifiques pour alléger la requête',
    'Comprendre l''ordre d''exécution d''une requête SQL',
    'Éviter les erreurs de syntaxe courantes en SQL'
  ],
  key_points = ARRAY[
    'SELECT est la commande SQL la plus utilisée ; elle ne modifie jamais les données',
    'La syntaxe de base est : SELECT [colonnes] FROM [table]',
    'Utilisez "SELECT *" avec modération en production pour des raisons de performance',
    'Chaque requête SQL doit se terminer par un point-virgule (;)'
  ],
  summary = 'La commande SELECT est l''outil fondamental pour interroger une base de données. Elle permet d''extraire exactement les informations dont vous avez besoin, que ce soit une table complète ou seulement quelques colonnes spécifiques. Bien que simple, elle constitue la base de 80% des interactions avec une base de données.',
  vark_explanation = 'Le focus est mis sur la pratique et l''expérimentation immédiate. Vous serez invité à observer des exemples de code et à imaginer mentalement l''action de taper ces commandes pour consolider l''apprentissage par l''action.'
WHERE grain_id = 4;

-- GRAIN 5 : Les filtres WHERE et ORDER BY (Style: KINESTHESIQUE)
UPDATE grains SET 
  target_vark_style = 'KINESTHESIQUE',
  learning_objectives_list = ARRAY[
    'Filtrer les résultats d''une requête avec la clause WHERE',
    'Utiliser les opérateurs de comparaison (=, >, <, !=)',
    'Combiner des conditions avec les opérateurs logiques (AND, OR, NOT)',
    'Trier les résultats avec ORDER BY (ASC, DESC)',
    'Limiter le nombre de résultats avec LIMIT'
  ],
  key_points = ARRAY[
    'WHERE s''applique TOUJOURS avant le tri ORDER BY',
    'L''opérateur IN permet de tester une liste de valeurs plus lisiblement que de multiples OR',
    'L''opérateur LIKE permet de faire des recherches partielles sur du texte (ex: LIKE ''%A%'')',
    'ORDER BY peut s''appliquer sur plusieurs colonnes simultanément'
  ],
  summary = 'La clause WHERE permet d''isoler uniquement les données pertinentes (ex: clients majeurs uniquement). En la combinant avec les opérateurs logiques (AND/OR), vous créez des filtres précis. Enfin, ORDER BY organise vos résultats alphabétiquement ou numériquement pour les rendre lisibles.',
  vark_explanation = 'Ce grain favorise l''approche par résolution de problèmes. Le contenu mime des exercices interactifs pour vous faire ressentir la logique d''entonnoir (filtrage) et de réorganisation (tri) des données.'
WHERE grain_id = 5;

-- GRAIN 6 : Les jointures INNER JOIN (Style: VISUEL)
UPDATE grains SET 
  target_vark_style = 'VISUEL',
  learning_objectives_list = ARRAY[
    'Comprendre le concept de jointure pour fusionner des données',
    'Écrire une requête INNER JOIN',
    'Maîtriser la clause ON pour spécifier la condition de jointure',
    'Utiliser les alias de tables (AS) pour raccourcir le code',
    'Comprendre la différence visuelle avec LEFT/RIGHT JOIN'
  ],
  key_points = ARRAY[
    'INNER JOIN ne retourne QUE les lignes qui ont une correspondance dans LES DEUX tables',
    'La jointure se fait presque toujours entre une clé primaire et une clé étrangère',
    'L''utilisation d''alias (ex: FROM Utilisateurs u) rend les requêtes complexes plus lisibles',
    'Une mauvaise condition ON peut créer un "produit cartésien" ralentissant le serveur'
  ],
  summary = 'Les bases de données séparent les informations dans plusieurs tables pour éviter les doublons. L''INNER JOIN est la commande magique qui permet de recoller ces morceaux à la volée. Elle fusionne les lignes de deux tables en se basant sur les clés correspondantes, restituant une vue unifiée des données.',
  vark_explanation = 'Le concept de jointure est expliqué à l''aide de diagrammes de Venn (cercles qui s''entrecoupent) et d''animations visuelles montrant comment les lignes de différentes tables fusionnent.'
WHERE grain_id = 6;

-- GRAIN 7 : Les fonctions d'agrégation (Style: LECTURE)
UPDATE grains SET 
  target_vark_style = 'LECTURE',
  learning_objectives_list = ARRAY[
    'Utiliser les fonctions COUNT, SUM, AVG, MIN, MAX',
    'Comprendre le regroupement de données avec GROUP BY',
    'Savoir quand utiliser HAVING au lieu de WHERE',
    'Éviter l''erreur fréquente du regroupement incomplet',
    'Générer des statistiques simples en SQL'
  ],
  key_points = ARRAY[
    'COUNT(*) compte toutes les lignes, COUNT(colonne) ignore les valeurs NULL',
    'Dès que vous utilisez GROUP BY, toutes les colonnes du SELECT doivent être soit agrégées, soit listées dans le GROUP BY',
    'WHERE filtre les lignes AVANT l''agrégation, HAVING filtre les groupes APRÈS l''agrégation',
    'AVG() calcule une moyenne en ignorant automatiquement les valeurs NULL'
  ],
  summary = 'Les fonctions d''agrégation transforment des milliers de lignes de données brutes en indicateurs synthétiques (totaux, moyennes, extrêmes). Associées à la clause GROUP BY, elles permettent de générer des statistiques par catégories (ex: chiffre d''affaires total par région) directement depuis la base.',
  vark_explanation = 'L''approche analytique de la lecture est privilégiée ici pour disséquer les règles syntaxiques strictes du GROUP BY et du HAVING, favorisant une compréhension théorique solide.'
WHERE grain_id = 7;

-- GRAIN 8 : Les sous-requêtes (Style: KINESTHESIQUE)
UPDATE grains SET 
  target_vark_style = 'KINESTHESIQUE',
  learning_objectives_list = ARRAY[
    'Définir ce qu''est une sous-requête (requête imbriquée)',
    'Placer une sous-requête dans une clause WHERE',
    'Utiliser les opérateurs IN, ANY, et ALL avec des sous-requêtes',
    'Comprendre l''ordre d''exécution (la sous-requête s''exécute d''abord)',
    'Connaître les alternatives (JOIN) pour les performances'
  ],
  key_points = ARRAY[
    'Une sous-requête est une requête SELECT enfermée dans des parenthèses à l''intérieur d''une autre requête',
    'La requête interne s''exécute toujours avant la requête externe',
    'Une sous-requête dans un WHERE avec le signe "=" ne doit retourner qu''une seule ligne et colonne',
    'Si la sous-requête retourne plusieurs valeurs, il faut utiliser l''opérateur IN au lieu de ='
  ],
  summary = 'Une sous-requête permet de diviser un problème complexe en deux étapes. Au lieu de fournir une valeur statique à un filtre, vous fournissez une requête entière. Le SGBD résout d''abord cette requête interne, puis utilise son résultat dynamique pour exécuter la requête externe principale.',
  vark_explanation = 'L''apprentissage est structuré comme un jeu de poupées russes. Vous décortiquerez pas à pas l''imbrication du code en manipulant d''abord le résultat interne avant de l''injecter dans la requête globale.'
WHERE grain_id = 8;

-- GRAIN 9 : Les transactions (Style: LECTURE)
UPDATE grains SET 
  target_vark_style = 'LECTURE',
  learning_objectives_list = ARRAY[
    'Comprendre le concept de transaction SQL (Tout ou Rien)',
    'Maîtriser les commandes BEGIN, COMMIT et ROLLBACK',
    'Comprendre le principe ACID (Atomicité, Cohérence, Isolation, Durabilité)',
    'Identifier les cas d''usage critiques (transferts bancaires, e-commerce)',
    'Gérer les erreurs et maintenir l''intégrité des données'
  ],
  key_points = ARRAY[
    'Une transaction est un bloc de requêtes traitées comme une opération unique indivisible',
    'COMMIT valide définitivement toutes les modifications du bloc',
    'ROLLBACK annule instantanément toutes les modifications si une erreur survient',
    'Le concept ACID garantit qu''une base de données reste fiable même en cas de panne de courant'
  ],
  summary = 'Les transactions garantissent la sécurité des données lors d''opérations complexes. Lors d''un virement bancaire, on doit débiter un compte ET créditer un autre. Si la deuxième étape échoue, la transaction permet d''annuler automatiquement la première, évitant ainsi toute corruption des données (principe ACID).',
  vark_explanation = 'L''accent est mis sur la narration de scénarios critiques (systèmes bancaires, pannes serveurs). La lecture de ces cas d''usage concrets aide à intérioriser l''importance vitale de la sécurité des données.'
WHERE grain_id = 9;
