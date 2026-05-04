# Guide d'Utilisation : Adaptation VARK et Multiformats

Ce document explique comment la plateforme micro-learning s'adapte dynamiquement au style d'apprentissage de l'étudiant (VARK).

## 1. Fonctionnement Global
Lorsqu'un étudiant lance un grain, la plateforme détermine son profil VARK dominant (Visuel, Auditif, Lecture, Kinesthésique).
En fonction de ce profil, le composant `GrainDetailSimple` affiche **uniquement** le format pédagogique correspondant.

## 2. Les 4 Formats

### 👁️ VISUEL
- Affiche soit un iframe pointant vers un schéma complexe (ex: Google Drive).
- Si aucune URL visuelle n'est définie en base de données, l'application génère **automatiquement une Mindmap** (Carte Mentale) dynamique en utilisant la bibliothèque `markmap-view` basée sur les "Points Clés" du grain.

### 👂 AUDITIF
- Affiche un lecteur vidéo (MP4 ou iframe Google Drive) avec narration.
- L'accent est mis sur les explications orales.

### 📖 LECTURE (READING)
- Affiche des documents PDF ou des présentations PPTX intégrées via Google Drive.
- L'étudiant peut lire à son rythme et prendre des notes.

### ✋ KINESTHESIQUE
- Affiche un exercice interactif (via iframe H5P, CodePen, etc.).
- Si non disponible, un espace d'exercice simulé invite l'étudiant à la pratique.

## 3. Sélecteur de Format (FormatSelector)
Bien que l'étudiant soit initialement dirigé vers son format optimal, il n'est pas enfermé.
En bas du contenu, un sélecteur lui permet de "switcher" manuellement vers les autres formats disponibles.

## 4. Base de Données
Pour que cela fonctionne, vous devez exécuter le script `add_vark_multi_formats.sql`.
Il ajoute à la table `grains` les colonnes :
- `visual_content_url`
- `auditory_content_url`
- `reading_content_url`
- `kinesthetic_content_url`
- `available_formats` (ARRAY de strings)
