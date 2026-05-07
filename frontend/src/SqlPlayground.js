import React, { useState, useEffect, useRef } from 'react';

// ============================================================
//  EXERCICES SQL PAR GRAIN
// ============================================================
const exercicesByGrain = {
  1: {
    titre: "Explorer une base de données",
    description: "Une table 'etudiants' est déjà créée. Écris des requêtes pour l'explorer.",
    schema: `CREATE TABLE etudiants (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  age INTEGER,
  ville TEXT
);
INSERT INTO etudiants VALUES (1, 'Youssef', 22, 'Casablanca');
INSERT INTO etudiants VALUES (2, 'Sara', 20, 'Rabat');
INSERT INTO etudiants VALUES (3, 'Amine', 25, 'El Jadida');
INSERT INTO etudiants VALUES (4, 'Fatima', 21, 'Marrakech');`,
    exercices: [
      {
        id: 1,
        consigne: "Affiche tous les étudiants",
        solution: "SELECT * FROM etudiants;",
        indice: "Utilise SELECT * FROM nom_table;"
      },
      {
        id: 2,
        consigne: "Affiche seulement les noms et villes",
        solution: "SELECT nom, ville FROM etudiants;",
        indice: "Précise les colonnes après SELECT"
      },
      {
        id: 3,
        consigne: "Compte le nombre total d'étudiants",
        solution: "SELECT COUNT(*) FROM etudiants;",
        indice: "Utilise la fonction COUNT(*)"
      }
    ]
  },
  2: {
    titre: "Tables, colonnes et types",
    description: "Explore la structure des tables et les types de données.",
    schema: `CREATE TABLE produits (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  prix REAL,
  stock INTEGER,
  disponible INTEGER
);
INSERT INTO produits VALUES (1, 'Stylo', 2.50, 100, 1);
INSERT INTO produits VALUES (2, 'Cahier', 8.00, 50, 1);
INSERT INTO produits VALUES (3, 'Calculatrice', 45.00, 10, 0);
INSERT INTO produits VALUES (4, 'Règle', 3.50, 75, 1);`,
    exercices: [
      {
        id: 1,
        consigne: "Affiche tous les produits disponibles (disponible = 1)",
        solution: "SELECT * FROM produits WHERE disponible = 1;",
        indice: "Utilise WHERE disponible = 1"
      },
      {
        id: 2,
        consigne: "Affiche le nom et le prix des produits triés par prix croissant",
        solution: "SELECT nom, prix FROM produits ORDER BY prix ASC;",
        indice: "Utilise ORDER BY colonne ASC"
      },
      {
        id: 3,
        consigne: "Quel est le prix maximum parmi tous les produits ?",
        solution: "SELECT MAX(prix) FROM produits;",
        indice: "Utilise la fonction MAX()"
      }
    ]
  },
  3: {
    titre: "Clé primaire et clé étrangère",
    description: "Explore les relations entre tables avec les clés.",
    schema: `CREATE TABLE clients (
  client_id INTEGER PRIMARY KEY,
  nom TEXT,
  email TEXT
);
CREATE TABLE commandes (
  commande_id INTEGER PRIMARY KEY,
  client_id INTEGER,
  produit TEXT,
  montant REAL
);
INSERT INTO clients VALUES (1, 'Youssef', 'y@mail.ma');
INSERT INTO clients VALUES (2, 'Sara', 's@mail.ma');
INSERT INTO clients VALUES (3, 'Amine', 'a@mail.ma');
INSERT INTO commandes VALUES (1, 1, 'Cahier', 8.00);
INSERT INTO commandes VALUES (2, 1, 'Stylo', 2.50);
INSERT INTO commandes VALUES (3, 2, 'Calculatrice', 45.00);
INSERT INTO commandes VALUES (4, 3, 'Règle', 3.50);`,
    exercices: [
      {
        id: 1,
        consigne: "Affiche toutes les commandes du client avec client_id = 1",
        solution: "SELECT * FROM commandes WHERE client_id = 1;",
        indice: "Filtre par client_id dans la table commandes"
      },
      {
        id: 2,
        consigne: "Affiche les noms des clients et leurs commandes (JOIN)",
        solution: "SELECT clients.nom, commandes.produit, commandes.montant FROM clients JOIN commandes ON clients.client_id = commandes.client_id;",
        indice: "Utilise JOIN ... ON clients.client_id = commandes.client_id"
      },
      {
        id: 3,
        consigne: "Combien de commandes a passé chaque client ? (GROUP BY)",
        solution: "SELECT client_id, COUNT(*) as nb_commandes FROM commandes GROUP BY client_id;",
        indice: "Utilise COUNT(*) et GROUP BY client_id"
      }
    ]
  },
  4: {
    titre: "La commande SELECT",
    description: "Maîtrise toutes les variantes de SELECT.",
    schema: `CREATE TABLE employes (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  departement TEXT,
  salaire REAL,
  annee_embauche INTEGER
);
INSERT INTO employes VALUES (1, 'Karim', 'Informatique', 8000, 2020);
INSERT INTO employes VALUES (2, 'Nadia', 'Marketing', 6500, 2019);
INSERT INTO employes VALUES (3, 'Omar', 'Informatique', 9000, 2018);
INSERT INTO employes VALUES (4, 'Leila', 'RH', 7000, 2021);
INSERT INTO employes VALUES (5, 'Tariq', 'Marketing', 7500, 2020);`,
    exercices: [
      {
        id: 1,
        consigne: "Affiche les noms et salaires de tous les employés",
        solution: "SELECT nom, salaire FROM employes;",
        indice: "Sélectionne uniquement les colonnes nom et salaire"
      },
      {
        id: 2,
        consigne: "Affiche les départements sans doublons (DISTINCT)",
        solution: "SELECT DISTINCT departement FROM employes;",
        indice: "Utilise DISTINCT après SELECT"
      },
      {
        id: 3,
        consigne: "Affiche les employés avec leur salaire annuel (salaire * 12)",
        solution: "SELECT nom, salaire * 12 AS salaire_annuel FROM employes;",
        indice: "Tu peux faire des calculs dans SELECT et utiliser AS pour nommer"
      }
    ]
  },
  5: {
    titre: "Filtrer avec WHERE",
    description: "Utilise WHERE pour filtrer précisément les données.",
    schema: `CREATE TABLE etudiants (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  note REAL,
  ville TEXT,
  age INTEGER
);
INSERT INTO etudiants VALUES (1, 'Youssef', 15.5, 'Casablanca', 22);
INSERT INTO etudiants VALUES (2, 'Sara', 18.0, 'Rabat', 20);
INSERT INTO etudiants VALUES (3, 'Amine', 11.0, 'El Jadida', 25);
INSERT INTO etudiants VALUES (4, 'Fatima', 16.5, 'Casablanca', 21);
INSERT INTO etudiants VALUES (5, 'Karim', 9.5, 'Rabat', 23);`,
    exercices: [
      {
        id: 1,
        consigne: "Affiche les étudiants ayant une note supérieure à 14",
        solution: "SELECT * FROM etudiants WHERE note > 14;",
        indice: "Utilise WHERE note > 14"
      },
      {
        id: 2,
        consigne: "Affiche les étudiants de Casablanca ET avec une note >= 15",
        solution: "SELECT * FROM etudiants WHERE ville = 'Casablanca' AND note >= 15;",
        indice: "Combine deux conditions avec AND"
      },
      {
        id: 3,
        consigne: "Affiche les étudiants dont le nom commence par 'S' (LIKE)",
        solution: "SELECT * FROM etudiants WHERE nom LIKE 'S%';",
        indice: "Utilise LIKE 'S%' — le % remplace n'importe quel caractère"
      }
    ]
  },
  6: {
    titre: "Les jointures JOIN",
    description: "Combine des données de plusieurs tables.",
    schema: `CREATE TABLE professeurs (
  prof_id INTEGER PRIMARY KEY,
  nom TEXT,
  matiere TEXT
);
CREATE TABLE cours (
  cours_id INTEGER PRIMARY KEY,
  titre TEXT,
  prof_id INTEGER,
  niveau TEXT
);
INSERT INTO professeurs VALUES (1, 'Dr. Benali', 'Bases de Données');
INSERT INTO professeurs VALUES (2, 'Dr. Alami', 'Algorithmique');
INSERT INTO professeurs VALUES (3, 'Dr. Idrissi', 'Réseaux');
INSERT INTO cours VALUES (1, 'SQL Avancé', 1, 'Master');
INSERT INTO cours VALUES (2, 'Introduction BDD', 1, 'Licence');
INSERT INTO cours VALUES (3, 'Algo de tri', 2, 'Licence');
INSERT INTO cours VALUES (4, 'TCP/IP', 3, 'Master');`,
    exercices: [
      {
        id: 1,
        consigne: "Affiche le titre des cours avec le nom du professeur",
        solution: "SELECT cours.titre, professeurs.nom FROM cours JOIN professeurs ON cours.prof_id = professeurs.prof_id;",
        indice: "JOIN professeurs ON cours.prof_id = professeurs.prof_id"
      },
      {
        id: 2,
        consigne: "Affiche les cours de niveau 'Master' avec le nom du prof",
        solution: "SELECT cours.titre, professeurs.nom FROM cours JOIN professeurs ON cours.prof_id = professeurs.prof_id WHERE cours.niveau = 'Master';",
        indice: "Ajoute WHERE cours.niveau = 'Master' après le JOIN"
      },
      {
        id: 3,
        consigne: "Combien de cours donne chaque professeur ?",
        solution: "SELECT professeurs.nom, COUNT(*) as nb_cours FROM professeurs JOIN cours ON professeurs.prof_id = cours.prof_id GROUP BY professeurs.nom;",
        indice: "JOIN + COUNT(*) + GROUP BY professeurs.nom"
      }
    ]
  },
  7: {
    titre: "GROUP BY et agrégations",
    description: "Analyse et agrège des données avec COUNT, SUM, AVG.",
    schema: `CREATE TABLE ventes (
  id INTEGER PRIMARY KEY,
  produit TEXT,
  categorie TEXT,
  quantite INTEGER,
  prix_unitaire REAL
);
INSERT INTO ventes VALUES (1, 'Stylo', 'Papeterie', 50, 2.50);
INSERT INTO ventes VALUES (2, 'Cahier', 'Papeterie', 30, 8.00);
INSERT INTO ventes VALUES (3, 'Souris', 'Informatique', 15, 120.00);
INSERT INTO ventes VALUES (4, 'Clavier', 'Informatique', 10, 200.00);
INSERT INTO ventes VALUES (5, 'Règle', 'Papeterie', 100, 1.50);
INSERT INTO ventes VALUES (6, 'Écran', 'Informatique', 5, 800.00);`,
    exercices: [
      {
        id: 1,
        consigne: "Affiche le nombre de produits par catégorie",
        solution: "SELECT categorie, COUNT(*) as nb_produits FROM ventes GROUP BY categorie;",
        indice: "Utilise COUNT(*) et GROUP BY categorie"
      },
      {
        id: 2,
        consigne: "Affiche la quantité totale vendue par catégorie",
        solution: "SELECT categorie, SUM(quantite) as total_vendu FROM ventes GROUP BY categorie;",
        indice: "Utilise SUM(quantite) et GROUP BY categorie"
      },
      {
        id: 3,
        consigne: "Affiche les catégories ayant vendu plus de 50 unités au total (HAVING)",
        solution: "SELECT categorie, SUM(quantite) as total FROM ventes GROUP BY categorie HAVING SUM(quantite) > 50;",
        indice: "Après GROUP BY, utilise HAVING SUM(quantite) > 50"
      }
    ]
  },
  8: {
    titre: "Les sous-requêtes",
    description: "Imbrique des requêtes SQL pour des analyses avancées.",
    schema: `CREATE TABLE employes (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  departement TEXT,
  salaire REAL
);
INSERT INTO employes VALUES (1, 'Karim', 'Informatique', 8000);
INSERT INTO employes VALUES (2, 'Nadia', 'Marketing', 6500);
INSERT INTO employes VALUES (3, 'Omar', 'Informatique', 9000);
INSERT INTO employes VALUES (4, 'Leila', 'RH', 7000);
INSERT INTO employes VALUES (5, 'Tariq', 'Marketing', 7500);
INSERT INTO employes VALUES (6, 'Amal', 'RH', 6000);`,
    exercices: [
      {
        id: 1,
        consigne: "Affiche les employés qui gagnent plus que la moyenne",
        solution: "SELECT nom, salaire FROM employes WHERE salaire > (SELECT AVG(salaire) FROM employes);",
        indice: "WHERE salaire > (SELECT AVG(salaire) FROM employes)"
      },
      {
        id: 2,
        consigne: "Affiche le nom de l'employé le mieux payé",
        solution: "SELECT nom FROM employes WHERE salaire = (SELECT MAX(salaire) FROM employes);",
        indice: "WHERE salaire = (SELECT MAX(salaire) FROM employes)"
      },
      {
        id: 3,
        consigne: "Affiche les employés du département qui a le plus d'employés",
        solution: "SELECT * FROM employes WHERE departement = (SELECT departement FROM employes GROUP BY departement ORDER BY COUNT(*) DESC LIMIT 1);",
        indice: "Sous-requête avec GROUP BY + ORDER BY COUNT(*) DESC + LIMIT 1"
      }
    ]
  },
  9: {
    titre: "Transactions et intégrité",
    description: "Comprends COMMIT, ROLLBACK et les contraintes.",
    schema: `CREATE TABLE comptes (
  id INTEGER PRIMARY KEY,
  proprietaire TEXT,
  solde REAL
);
CREATE TABLE historique (
  id INTEGER PRIMARY KEY,
  compte_id INTEGER,
  operation TEXT,
  montant REAL
);
INSERT INTO comptes VALUES (1, 'Youssef', 5000);
INSERT INTO comptes VALUES (2, 'Sara', 3000);
INSERT INTO comptes VALUES (3, 'Amine', 1500);
INSERT INTO historique VALUES (1, 1, 'depot', 5000);
INSERT INTO historique VALUES (2, 2, 'depot', 3000);
INSERT INTO historique VALUES (3, 3, 'depot', 1500);`,
    exercices: [
      {
        id: 1,
        consigne: "Affiche tous les comptes avec leur solde",
        solution: "SELECT * FROM comptes;",
        indice: "Simple SELECT * FROM comptes"
      },
      {
        id: 2,
        consigne: "Affiche le solde total de tous les comptes",
        solution: "SELECT SUM(solde) as solde_total FROM comptes;",
        indice: "Utilise SUM(solde)"
      },
      {
        id: 3,
        consigne: "Effectue un virement : débite 500 de Youssef (id=1) et crédite Sara (id=2)",
        solution: "UPDATE comptes SET solde = solde - 500 WHERE id = 1;\nUPDATE comptes SET solde = solde + 500 WHERE id = 2;\nSELECT * FROM comptes;",
        indice: "Deux UPDATE : un avec -500 pour id=1, un avec +500 pour id=2"
      }
    ]
  }
};

// ============================================================
//  COMPOSANT PRINCIPAL
// ============================================================
export default function SqlPlayground({ grain }) {
  const grainId = grain?.grainId || grain?.grain_id || 1;
  const data = exercicesByGrain[grainId] || exercicesByGrain[1];

  const [exerciceIndex, setExerciceIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'partial'
  const [showIndice, setShowIndice] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completedExercices, setCompletedExercices] = useState([]);
  const [dbReady, setDbReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const dbRef = useRef(null);
  const exercice = data.exercices[exerciceIndex];

  // Charger SQL.js depuis CDN
  useEffect(() => {
    setLoading(true);
    setDbReady(false);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js';
    script.onload = async () => {
      try {
        const SQL = await window.initSqlJs({
          locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
        });
        const db = new SQL.Database();
        db.run(data.schema);
        dbRef.current = db;
        setDbReady(true);
        setLoading(false);
      } catch (e) {
        setError("Erreur initialisation SQL: " + e.message);
        setLoading(false);
      }
    };
    script.onerror = () => {
      setError("Impossible de charger SQL.js. Vérifiez votre connexion.");
      setLoading(false);
    };

    // Éviter double chargement
    if (!document.querySelector('script[src*="sql-wasm"]')) {
      document.head.appendChild(script);
    } else if (window.initSqlJs) {
      script.onload();
    }

    return () => {
      if (dbRef.current) {
        dbRef.current.close();
        dbRef.current = null;
      }
    };
  }, [grainId, data.schema]);

  // Réinitialiser quand on change d'exercice
  useEffect(() => {
    setQuery('');
    setResult(null);
    setError(null);
    setStatus(null);
    setShowIndice(false);
    setShowSolution(false);
  }, [exerciceIndex]);

  const executeQuery = () => {
    if (!dbRef.current) return;
    if (!query.trim()) {
      setError("Écris une requête SQL d'abord !");
      return;
    }

    setError(null);
    setResult(null);
    setStatus(null);

    try {
      const queries = query.trim().split(';').filter(q => q.trim());
      let lastResult = null;

      for (const q of queries) {
        if (!q.trim()) continue;
        const res = dbRef.current.exec(q.trim());
        if (res.length > 0) lastResult = res[0];
      }

      if (lastResult) {
        setResult(lastResult);
      } else {
        setResult({ columns: ['Résultat'], values: [['Requête exécutée avec succès ✓']] });
      }

      // Vérifier si c'est correct
      const normalize = s => s.toLowerCase().replace(/\s+/g, ' ').replace(/;/g, '').trim();
      const userNorm = normalize(query);
      const solNorm = normalize(exercice.solution);

      if (userNorm === solNorm || lastResult) {
        setStatus('success');
        if (!completedExercices.includes(exercice.id)) {
          setCompletedExercices([...completedExercices, exercice.id]);
        }
      }

    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      executeQuery();
    }
    // Tab pour indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newQuery = query.substring(0, start) + '  ' + query.substring(end);
      setQuery(newQuery);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const progressPercent = Math.round((completedExercices.length / data.exercices.length) * 100);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.icon}>⌨️</span>
          <div>
            <h2 style={styles.title}>{data.titre}</h2>
            <p style={styles.subtitle}>{data.description}</p>
          </div>
        </div>
        <div style={styles.progressBox}>
          <span style={styles.progressText}>{completedExercices.length}/{data.exercices.length} exercices</span>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs exercices */}
      <div style={styles.tabs}>
        {data.exercices.map((ex, i) => (
          <button
            key={ex.id}
            onClick={() => setExerciceIndex(i)}
            style={{
              ...styles.tab,
              ...(exerciceIndex === i ? styles.tabActive : {}),
              ...(completedExercices.includes(ex.id) ? styles.tabDone : {})
            }}
          >
            {completedExercices.includes(ex.id) ? '✅' : `Ex ${i + 1}`}
          </button>
        ))}
      </div>

      <div style={styles.body}>
        {/* Colonne gauche */}
        <div style={styles.left}>
          {/* Consigne */}
          <div style={styles.consigneBox}>
            <div style={styles.consigneLabel}>📋 Exercice {exerciceIndex + 1}</div>
            <p style={styles.consigneText}>{exercice.consigne}</p>

            <div style={styles.helpRow}>
              <button onClick={() => setShowIndice(!showIndice)} style={styles.hintBtn}>
                💡 {showIndice ? 'Cacher' : 'Indice'}
              </button>
              <button onClick={() => setShowSolution(!showSolution)} style={styles.solutionBtn}>
                🔑 {showSolution ? 'Cacher' : 'Solution'}
              </button>
            </div>

            {showIndice && (
              <div style={styles.indiceBox}>
                <strong>Indice :</strong> {exercice.indice}
              </div>
            )}

            {showSolution && (
              <div style={styles.solutionBox}>
                <strong>Solution :</strong>
                <pre style={styles.solutionCode}>{exercice.solution}</pre>
                <button onClick={() => setQuery(exercice.solution)} style={styles.copyBtn}>
                  📋 Copier dans l'éditeur
                </button>
              </div>
            )}
          </div>

          {/* Schéma */}
          <div style={styles.schemaBox}>
            <div style={styles.schemaLabel}>🗄️ Schéma de la base</div>
            <pre style={styles.schemaCode}>{data.schema}</pre>
          </div>
        </div>

        {/* Colonne droite */}
        <div style={styles.right}>
          {/* Éditeur */}
          <div style={styles.editorBox}>
            <div style={styles.editorHeader}>
              <span style={styles.editorLabel}>✏️ Ton éditeur SQL</span>
              <span style={styles.editorHint}>Ctrl+Entrée pour exécuter</span>
            </div>

            {loading ? (
              <div style={styles.loadingBox}>
                <div style={styles.spinner} />
                <span>Chargement du moteur SQL...</span>
              </div>
            ) : (
              <textarea
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écris ta requête SQL ici..."
                style={styles.editor}
                spellCheck={false}
              />
            )}

            <button
              onClick={executeQuery}
              disabled={!dbReady || loading}
              style={{ ...styles.runBtn, opacity: dbReady ? 1 : 0.5 }}
            >
              ▶ Exécuter
            </button>
          </div>

          {/* Résultat */}
          {error && (
            <div style={styles.errorBox}>
              <strong>❌ Erreur SQL :</strong>
              <p style={{ margin: '4px 0 0', fontSize: 13 }}>{error}</p>
            </div>
          )}

          {result && !error && (
            <div style={styles.resultBox}>
              <div style={styles.resultHeader}>
                <span>📊 Résultat</span>
                {status === 'success' && (
                  <span style={styles.successBadge}>✅ Correct !</span>
                )}
              </div>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {result.columns.map((col, i) => (
                        <th key={i} style={styles.th}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.values.map((row, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                        {row.map((cell, j) => (
                          <td key={j} style={styles.td}>
                            {cell === null ? <em style={{ color: '#999' }}>NULL</em> : String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={styles.rowCount}>
                {result.values.length} ligne(s) retournée(s)
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={styles.navRow}>
            <button
              onClick={() => setExerciceIndex(Math.max(0, exerciceIndex - 1))}
              disabled={exerciceIndex === 0}
              style={{ ...styles.navBtn, opacity: exerciceIndex === 0 ? 0.4 : 1 }}
            >
              ← Précédent
            </button>
            <span style={styles.navInfo}>
              {exerciceIndex + 1} / {data.exercices.length}
            </span>
            <button
              onClick={() => setExerciceIndex(Math.min(data.exercices.length - 1, exerciceIndex + 1))}
              disabled={exerciceIndex === data.exercices.length - 1}
              style={{ ...styles.navBtn, opacity: exerciceIndex === data.exercices.length - 1 ? 0.4 : 1 }}
            >
              Suivant →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  STYLES
// ============================================================
const styles = {
  container: {
    fontFamily: "'Courier New', monospace",
    background: '#0f1117',
    borderRadius: 16,
    overflow: 'hidden',
    color: '#e2e8f0',
    border: '1px solid #2d3748',
    maxWidth: '100%',
  },
  header: {
    background: 'linear-gradient(135deg, #1a1f2e, #2d3748)',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #2d3748',
    flexWrap: 'wrap',
    gap: 12,
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 14 },
  icon: { fontSize: 36 },
  title: { margin: 0, fontSize: 20, fontWeight: 700, color: '#68d391', fontFamily: 'monospace' },
  subtitle: { margin: '4px 0 0', fontSize: 13, color: '#a0aec0' },
  progressBox: { textAlign: 'right', minWidth: 160 },
  progressText: { fontSize: 13, color: '#a0aec0', display: 'block', marginBottom: 6 },
  progressBar: { background: '#2d3748', borderRadius: 6, height: 8, overflow: 'hidden' },
  progressFill: { background: 'linear-gradient(90deg, #68d391, #4fd1c7)', height: '100%', borderRadius: 6, transition: 'width 0.4s ease' },
  tabs: {
    display: 'flex',
    gap: 4,
    padding: '12px 24px',
    background: '#161b27',
    borderBottom: '1px solid #2d3748',
  },
  tab: {
    padding: '6px 16px',
    borderRadius: 6,
    border: '1px solid #2d3748',
    background: '#1a1f2e',
    color: '#a0aec0',
    cursor: 'pointer',
    fontSize: 13,
    fontFamily: 'monospace',
    transition: 'all 0.2s',
  },
  tabActive: {
    background: '#2b6cb0',
    color: '#fff',
    borderColor: '#3182ce',
  },
  tabDone: {
    background: '#276749',
    color: '#9ae6b4',
    borderColor: '#2f855a',
  },
  body: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gap: 0,
    minHeight: 500,
  },
  left: {
    padding: 20,
    borderRight: '1px solid #2d3748',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    overflowY: 'auto',
    maxHeight: 700,
  },
  right: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    overflowY: 'auto',
    maxHeight: 700,
  },
  consigneBox: {
    background: '#1a1f2e',
    borderRadius: 10,
    padding: 16,
    border: '1px solid #2d3748',
  },
  consigneLabel: { fontSize: 12, color: '#68d391', fontWeight: 700, marginBottom: 8, letterSpacing: 1 },
  consigneText: { margin: '0 0 12px', fontSize: 15, color: '#e2e8f0', lineHeight: 1.6 },
  helpRow: { display: 'flex', gap: 8 },
  hintBtn: {
    padding: '5px 12px', borderRadius: 6, border: '1px solid #d69e2e',
    background: 'transparent', color: '#f6e05e', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace'
  },
  solutionBtn: {
    padding: '5px 12px', borderRadius: 6, border: '1px solid #553c9a',
    background: 'transparent', color: '#b794f4', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace'
  },
  indiceBox: {
    marginTop: 10, background: '#2d3205', border: '1px solid #d69e2e',
    borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#faf089'
  },
  solutionBox: {
    marginTop: 10, background: '#1a0533', border: '1px solid #553c9a',
    borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#e9d8fd'
  },
  solutionCode: {
    margin: '6px 0', fontSize: 12, color: '#b794f4',
    background: '#0d001a', padding: 8, borderRadius: 4, overflowX: 'auto'
  },
  copyBtn: {
    marginTop: 6, padding: '4px 10px', borderRadius: 4, border: '1px solid #553c9a',
    background: '#2d0060', color: '#e9d8fd', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace'
  },
  schemaBox: {
    background: '#0d1117',
    borderRadius: 10,
    padding: 14,
    border: '1px solid #2d3748',
    flex: 1,
  },
  schemaLabel: { fontSize: 12, color: '#4fd1c7', fontWeight: 700, marginBottom: 8, letterSpacing: 1 },
  schemaCode: {
    margin: 0, fontSize: 11, color: '#76e4f7', lineHeight: 1.6,
    overflowX: 'auto', whiteSpace: 'pre-wrap'
  },
  editorBox: {
    background: '#0d1117',
    borderRadius: 10,
    border: '1px solid #2d3748',
    overflow: 'hidden',
  },
  editorHeader: {
    background: '#1a1f2e', padding: '8px 14px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderBottom: '1px solid #2d3748'
  },
  editorLabel: { fontSize: 12, color: '#68d391', fontWeight: 700 },
  editorHint: { fontSize: 11, color: '#4a5568' },
  editor: {
    width: '100%', minHeight: 130, background: '#0d1117',
    color: '#68d391', border: 'none', outline: 'none',
    padding: '12px 14px', fontSize: 14, fontFamily: "'Courier New', monospace",
    resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6
  },
  runBtn: {
    width: '100%', padding: '10px', background: 'linear-gradient(135deg, #276749, #2f855a)',
    color: '#9ae6b4', border: 'none', cursor: 'pointer', fontSize: 14,
    fontFamily: 'monospace', fontWeight: 700, letterSpacing: 1, transition: 'opacity 0.2s'
  },
  loadingBox: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '30px 14px', color: '#4fd1c7', fontSize: 13
  },
  spinner: {
    width: 20, height: 20, border: '2px solid #2d3748',
    borderTop: '2px solid #4fd1c7', borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  errorBox: {
    background: '#1a0505', border: '1px solid #742a2a',
    borderRadius: 8, padding: '10px 14px', color: '#fc8181', fontSize: 13
  },
  resultBox: {
    background: '#0d1117', border: '1px solid #2d3748',
    borderRadius: 10, overflow: 'hidden', flex: 1
  },
  resultHeader: {
    background: '#1a1f2e', padding: '8px 14px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: 13, color: '#a0aec0', borderBottom: '1px solid #2d3748'
  },
  successBadge: {
    background: '#276749', color: '#9ae6b4',
    padding: '2px 8px', borderRadius: 4, fontSize: 12
  },
  tableWrapper: { overflowX: 'auto', maxHeight: 250, overflowY: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: {
    background: '#2d3748', color: '#4fd1c7', padding: '6px 12px',
    textAlign: 'left', fontFamily: 'monospace', position: 'sticky', top: 0
  },
  trEven: { background: '#0d1117' },
  trOdd: { background: '#111827' },
  td: { padding: '5px 12px', color: '#e2e8f0', borderBottom: '1px solid #1a1f2e' },
  rowCount: { padding: '6px 14px', fontSize: 11, color: '#4a5568', borderTop: '1px solid #1a1f2e' },
  navRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 'auto', paddingTop: 8
  },
  navBtn: {
    padding: '8px 16px', borderRadius: 6, border: '1px solid #2d3748',
    background: '#1a1f2e', color: '#a0aec0', cursor: 'pointer',
    fontSize: 13, fontFamily: 'monospace', transition: 'opacity 0.2s'
  },
  navInfo: { fontSize: 13, color: '#4a5568' },
};
