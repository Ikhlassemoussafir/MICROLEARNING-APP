-- Script de mise à jour pour les grains 5 à 9
-- Remplacez les IDs (VOTRE_ID_...) par les IDs réels de vos fichiers Google Drive

-- Grain 5: WHERE
UPDATE grains SET 
    h5p_content_id = 'https://drive.google.com/file/d/VOTRE_ID_PPTX_GRAIN5/preview',
    h5p_quiz_id = 'https://drive.google.com/file/d/VOTRE_ID_MP4_GRAIN5/preview'
WHERE grain_id = 5;

-- Grain 6: JOIN
UPDATE grains SET 
    h5p_content_id = 'https://drive.google.com/file/d/VOTRE_ID_PPTX_GRAIN6/preview',
    h5p_quiz_id = 'https://drive.google.com/file/d/VOTRE_ID_MP4_GRAIN6/preview'
WHERE grain_id = 6;

-- Grain 7: Agrégation
UPDATE grains SET 
    h5p_content_id = 'https://drive.google.com/file/d/VOTRE_ID_PPTX_GRAIN7/preview',
    h5p_quiz_id = 'https://drive.google.com/file/d/VOTRE_ID_MP4_GRAIN7/preview'
WHERE grain_id = 7;

-- Grain 8: Sous-req
UPDATE grains SET 
    h5p_content_id = 'https://drive.google.com/file/d/VOTRE_ID_PPTX_GRAIN8/preview',
    h5p_quiz_id = 'https://drive.google.com/file/d/VOTRE_ID_MP4_GRAIN5/preview'
WHERE grain_id = 8;

-- Grain 9: Transactions
UPDATE grains SET 
    h5p_content_id = 'https://drive.google.com/file/d/VOTRE_ID_PPTX_GRAIN9/preview',
    h5p_quiz_id = 'https://drive.google.com/file/d/VOTRE_ID_MP4_GRAIN5/preview'
WHERE grain_id = 9;

-- Vérification
SELECT grain_id, title, h5p_content_id, h5p_quiz_id FROM grains WHERE grain_id >= 5;
