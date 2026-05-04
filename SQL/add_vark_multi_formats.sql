-- ================================================================
--  MICROLEARNING — MISE À JOUR COMPLÈTE DES CONTENUS VARK
--  Tous les liens Google Drive exacts fournis par l'enseignant
--  Exécuter dans pgAdmin ou psql sur la base microlearning
-- ================================================================

-- STEP 1 : Ajouter toutes les colonnes nécessaires
ALTER TABLE grains ADD COLUMN IF NOT EXISTS visual_content_url      TEXT;
ALTER TABLE grains ADD COLUMN IF NOT EXISTS auditory_content_url    TEXT;
ALTER TABLE grains ADD COLUMN IF NOT EXISTS reading_content_url     TEXT;
ALTER TABLE grains ADD COLUMN IF NOT EXISTS kinesthetic_content_url TEXT;
ALTER TABLE grains ADD COLUMN IF NOT EXISTS available_formats       TEXT[];
ALTER TABLE grains ADD COLUMN IF NOT EXISTS video_urls              TEXT[];
ALTER TABLE grains ADD COLUMN IF NOT EXISTS slide_urls              TEXT[];
ALTER TABLE grains ADD COLUMN IF NOT EXISTS mindmap_urls            TEXT[];
ALTER TABLE grains ADD COLUMN IF NOT EXISTS kinesthetic_text        TEXT;

-- ================================================================
--  GRAIN 1 : C'est quoi une base de données ?
--  Vidéos : 2 | Slides : 2 | MindMaps : 2
-- ================================================================
UPDATE grains SET
  auditory_content_url  = 'https://drive.google.com/file/d/1Dnr8QAEv4PU2vTi_tehjXVv7QYRwi5W7/preview',
  reading_content_url   = 'https://docs.google.com/presentation/d/1rBGA7hpgsJN_bZTv5gosT0JaQEZHEGMh/embed?start=false&loop=false&delayms=3000',
  visual_content_url    = 'https://drive.google.com/file/d/1iQ_P9aPUCH33SJ4un5SF2-X_A15kejq-/preview',
  kinesthetic_content_url = NULL,

  video_urls = ARRAY[
    'https://drive.google.com/file/d/1Dnr8QAEv4PU2vTi_tehjXVv7QYRwi5W7/preview',
    'https://drive.google.com/file/d/1YPDqQHi7QO2Uongtiu3XZr4TzxFzU-To/preview'
  ],
  slide_urls = ARRAY[
    'https://docs.google.com/presentation/d/1rBGA7hpgsJN_bZTv5gosT0JaQEZHEGMh/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1O0WAh0O6_yEiiClre9eXxbhWfe4zpBof/embed?start=false&loop=false&delayms=3000'
  ],
  mindmap_urls = ARRAY[
    'https://drive.google.com/file/d/1iQ_P9aPUCH33SJ4un5SF2-X_A15kejq-/preview',
    'https://drive.google.com/file/d/1ad5K0D-CP-fNoeGHNovh-SOuZNjXEf91/preview'
  ],
  available_formats = ARRAY['AUDITIF','LECTURE','VISUEL','KINESTHESIQUE']
WHERE grain_id = 1;

-- ================================================================
--  GRAIN 2 : Tables, colonnes et types de données
--  Vidéos : 3 | Slides : 3 | MindMaps : 2
-- ================================================================
UPDATE grains SET
  auditory_content_url  = 'https://drive.google.com/file/d/1rTv5Wppc4VPRwHi5uzGynljItykhnYBf/preview',
  reading_content_url   = 'https://docs.google.com/presentation/d/1MkUnLYrKYVKrVDA6tOq_JcOAeIdl7psq/embed?start=false&loop=false&delayms=3000',
  visual_content_url    = 'https://drive.google.com/file/d/1w4_HHppB7jnDATeBeaNbIe_UyVedOPlm/preview',
  kinesthetic_content_url = NULL,

  video_urls = ARRAY[
    'https://drive.google.com/file/d/1rTv5Wppc4VPRwHi5uzGynljItykhnYBf/preview',
    'https://drive.google.com/file/d/1O1ChI5dU_bnfOTHmZn_UKSc1eom8ifvu/preview',
    'https://drive.google.com/file/d/1msBuDsabGPbuxZwFqxAQ2PjMlySppYrB/preview'
  ],
  slide_urls = ARRAY[
    'https://docs.google.com/presentation/d/1MkUnLYrKYVKrVDA6tOq_JcOAeIdl7psq/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1iOq2cYyJ63wH4xj9OZQgSiDlwH-FgIfY/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1yaG8hLYlya9XfFGiuZ1Bha4FH3sPPlhY/embed?start=false&loop=false&delayms=3000'
  ],
  mindmap_urls = ARRAY[
    'https://drive.google.com/file/d/1w4_HHppB7jnDATeBeaNbIe_UyVedOPlm/preview',
    'https://drive.google.com/file/d/1u84QLeOwC5XbgLajDGaXyK1ThVC9RkZr/preview'
  ],
  available_formats = ARRAY['AUDITIF','LECTURE','VISUEL','KINESTHESIQUE']
WHERE grain_id = 2;

-- ================================================================
--  GRAIN 3 : Clé primaire et clé étrangère
--  Vidéos : 2 | Slides : 3 | MindMaps : 2
-- ================================================================
UPDATE grains SET
  auditory_content_url  = 'https://drive.google.com/file/d/18Rdn3xc0Rb25lJErDHSdpdh2iwUhPJjI/preview',
  reading_content_url   = 'https://docs.google.com/presentation/d/16nR7xsmZ18Nvm4FSU_wmFLfQNg0PQq3f/embed?start=false&loop=false&delayms=3000',
  visual_content_url    = 'https://drive.google.com/file/d/1XSGdCbB25cW3VdxGA_DgbrdQmwnAObbd/preview',
  kinesthetic_content_url = NULL,

  video_urls = ARRAY[
    'https://drive.google.com/file/d/18Rdn3xc0Rb25lJErDHSdpdh2iwUhPJjI/preview',
    'https://drive.google.com/file/d/1me4iEJbLTypu6yMaGnfqvhLCBbYjPSO9/preview'
  ],
  slide_urls = ARRAY[
    'https://docs.google.com/presentation/d/16nR7xsmZ18Nvm4FSU_wmFLfQNg0PQq3f/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1qOV4dkhqxXbNP8dUQHiMJjzjXGnT0pUa/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1WUBaRVKKd3hgGNFoik5k9lZV_PdJ4AIc/embed?start=false&loop=false&delayms=3000'
  ],
  mindmap_urls = ARRAY[
    'https://drive.google.com/file/d/1XSGdCbB25cW3VdxGA_DgbrdQmwnAObbd/preview',
    'https://drive.google.com/file/d/1wfDco1XkFNF9VDhsA3MdwgcrB9Q-7I6L/preview'
  ],
  available_formats = ARRAY['AUDITIF','LECTURE','VISUEL','KINESTHESIQUE']
WHERE grain_id = 3;

-- ================================================================
--  GRAIN 4 : La commande SELECT
--  Vidéos : 2 | Slides : 2 | MindMaps : 2
-- ================================================================
UPDATE grains SET
  auditory_content_url  = 'https://drive.google.com/file/d/14ZQw0Hs47onr-afri-FuRj9BM6IJLiMe/preview',
  reading_content_url   = 'https://docs.google.com/presentation/d/10NjEXfbnqaIioxOoH-osaso2mSFxSxyT/embed?start=false&loop=false&delayms=3000',
  visual_content_url    = 'https://drive.google.com/file/d/15L_0fZoyP21ZC3ZyRx-m29qQhkT4UYyl/preview',
  kinesthetic_content_url = NULL,

  video_urls = ARRAY[
    'https://drive.google.com/file/d/14ZQw0Hs47onr-afri-FuRj9BM6IJLiMe/preview',
    'https://drive.google.com/file/d/1Xxbyg9OfMagozeU9eJj2alJCZ-u93usu/preview'
  ],
  slide_urls = ARRAY[
    'https://docs.google.com/presentation/d/10NjEXfbnqaIioxOoH-osaso2mSFxSxyT/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1h8okfpaftYulAAA8MGiy8ND1nyUS8yY0/embed?start=false&loop=false&delayms=3000'
  ],
  mindmap_urls = ARRAY[
    'https://drive.google.com/file/d/15L_0fZoyP21ZC3ZyRx-m29qQhkT4UYyl/preview',
    'https://drive.google.com/file/d/1BqxyvjPrWAumKgknVVzvLLVCqVH7p1id/preview'
  ],
  available_formats = ARRAY['AUDITIF','LECTURE','VISUEL','KINESTHESIQUE']
WHERE grain_id = 4;

-- ================================================================
--  GRAIN 5 : Filtrer avec WHERE
--  Vidéos : 2 | Slides : 2 | MindMaps : 2
-- ================================================================
UPDATE grains SET
  auditory_content_url  = 'https://drive.google.com/file/d/1nWb2PmslOdG9uYjcjdrwhf4BMRg_Av22/preview',
  reading_content_url   = 'https://docs.google.com/presentation/d/17yGh5dQLYwnKebSBbv2z4dft3pmKBXu7/embed?start=false&loop=false&delayms=3000',
  visual_content_url    = 'https://drive.google.com/file/d/1TPci6lYvGjJF20b2A-Y_3t7VpkfXzwBQ/preview',
  kinesthetic_content_url = NULL,

  video_urls = ARRAY[
    'https://drive.google.com/file/d/1nWb2PmslOdG9uYjcjdrwhf4BMRg_Av22/preview',
    'https://drive.google.com/file/d/1JsYGlB4uOzau6VbCPVf8zWz--wIHJHem/preview'
  ],
  slide_urls = ARRAY[
    'https://docs.google.com/presentation/d/17yGh5dQLYwnKebSBbv2z4dft3pmKBXu7/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1H-cjCkzjixUdlmnwOx_11SbIDCCJwcy_/embed?start=false&loop=false&delayms=3000'
  ],
  mindmap_urls = ARRAY[
    'https://drive.google.com/file/d/1TPci6lYvGjJF20b2A-Y_3t7VpkfXzwBQ/preview',
    'https://drive.google.com/file/d/1wX5siIbji2Bfh6x3P11v79JmuX9gxG2P/preview'
  ],
  available_formats = ARRAY['AUDITIF','LECTURE','VISUEL','KINESTHESIQUE']
WHERE grain_id = 5;

-- ================================================================
--  GRAIN 6 : Jointures (JOIN)
--  Vidéos : 2 | Slides : 2 | MindMaps : 2
-- ================================================================
UPDATE grains SET
  auditory_content_url  = 'https://drive.google.com/file/d/1xUEAn5ZcEmQvqGMyIzPqXrZjjGfJ4cqW/preview',
  reading_content_url   = 'https://docs.google.com/presentation/d/18tuzvTs8HJiN_nl-MjiKBQCSPVOH_or0/embed?start=false&loop=false&delayms=3000',
  visual_content_url    = 'https://drive.google.com/file/d/14v8V-ao7i_mqXjJY6-sPCNpf9z1vPba3/preview',
  kinesthetic_content_url = NULL,

  video_urls = ARRAY[
    'https://drive.google.com/file/d/1xUEAn5ZcEmQvqGMyIzPqXrZjjGfJ4cqW/preview',
    'https://drive.google.com/file/d/1GCuKZ789vy9rMp2ZYhpDTRQNKMqztLqg/preview'
  ],
  slide_urls = ARRAY[
    'https://docs.google.com/presentation/d/18tuzvTs8HJiN_nl-MjiKBQCSPVOH_or0/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1W29bjIyz4ACre-azssY8t2hcc4hoKkXk/embed?start=false&loop=false&delayms=3000'
  ],
  mindmap_urls = ARRAY[
    'https://drive.google.com/file/d/14v8V-ao7i_mqXjJY6-sPCNpf9z1vPba3/preview',
    'https://drive.google.com/file/d/1yrUbTAefqtstZpozFzEwUXEDSoTEUYeh/preview'
  ],
  available_formats = ARRAY['AUDITIF','LECTURE','VISUEL','KINESTHESIQUE']
WHERE grain_id = 6;

-- ================================================================
--  GRAIN 7 : GROUP BY et agrégations
--  Vidéos : 2 | Slides : 3 | MindMaps : 2
-- ================================================================
UPDATE grains SET
  auditory_content_url  = 'https://drive.google.com/file/d/1I66EBDXK2hZctMXaAEPD4nH_6pXb8EHk/preview',
  reading_content_url   = 'https://docs.google.com/presentation/d/1l6Tqz6Akvt6fPRNeFvIrqBTPRMy-ATk9/embed?start=false&loop=false&delayms=3000',
  visual_content_url    = 'https://drive.google.com/file/d/1VfcIxGsykBO2UjFiRY4nW6CG6l_AveNa/preview',
  kinesthetic_content_url = NULL,

  video_urls = ARRAY[
    'https://drive.google.com/file/d/1I66EBDXK2hZctMXaAEPD4nH_6pXb8EHk/preview',
    'https://drive.google.com/file/d/1v39OJHPJYOUU6h3emEYsnKSM1UXimTSC/preview'
  ],
  slide_urls = ARRAY[
    'https://docs.google.com/presentation/d/1l6Tqz6Akvt6fPRNeFvIrqBTPRMy-ATk9/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1smJWl_ot6QommNoRrLRbCb-MefXJdqT8/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1suLG2b1PQljIY1vTiD4MoRciL9KQOibe/embed?start=false&loop=false&delayms=3000'
  ],
  mindmap_urls = ARRAY[
    'https://drive.google.com/file/d/1VfcIxGsykBO2UjFiRY4nW6CG6l_AveNa/preview',
    'https://drive.google.com/file/d/1jLS8xUzSgXKzxrOQPGDk5kW61lqEjbV7/preview'
  ],
  available_formats = ARRAY['AUDITIF','LECTURE','VISUEL','KINESTHESIQUE']
WHERE grain_id = 7;

-- ================================================================
--  GRAIN 8 : Sous-requêtes (Subqueries)
--  Vidéos : 2 | Slides : 2 | MindMaps : 2
-- ================================================================
UPDATE grains SET
  auditory_content_url  = 'https://drive.google.com/file/d/1Cf_k-cn9RwAlp84HJeTGuyM0dXvBgJEw/preview',
  reading_content_url   = 'https://docs.google.com/presentation/d/1rycjAfVaMGc1cvrFSK61iaPy1rpDZhJu/embed?start=false&loop=false&delayms=3000',
  visual_content_url    = 'https://drive.google.com/file/d/1SwNfjfOwAd50nhfK_4ayHeXOEuJVfc3a/preview',
  kinesthetic_content_url = NULL,

  video_urls = ARRAY[
    'https://drive.google.com/file/d/1Cf_k-cn9RwAlp84HJeTGuyM0dXvBgJEw/preview',
    'https://drive.google.com/file/d/19QL5b7sgp1BHXWoIQwdiOH9a0yoPVfl5/preview'
  ],
  slide_urls = ARRAY[
    'https://docs.google.com/presentation/d/1rycjAfVaMGc1cvrFSK61iaPy1rpDZhJu/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1ijZSISDjyT1kxwBoDsrWvrgVCvkJ-htK/embed?start=false&loop=false&delayms=3000'
  ],
  mindmap_urls = ARRAY[
    'https://drive.google.com/file/d/1SwNfjfOwAd50nhfK_4ayHeXOEuJVfc3a/preview',
    'https://drive.google.com/file/d/1jcbdP_8gIQZXlHk85hE2yjF99LkmMeEL/preview'
  ],
  available_formats = ARRAY['AUDITIF','LECTURE','VISUEL','KINESTHESIQUE']
WHERE grain_id = 8;

-- ================================================================
--  GRAIN 9 : Transactions et intégrité
--  Vidéos : 2 | Slides : 2 | MindMaps : 2
-- ================================================================
UPDATE grains SET
  auditory_content_url  = 'https://drive.google.com/file/d/1ScK4B7fTlkIOJr2fzveUpeBvAxrHiOKU/preview',
  reading_content_url   = 'https://docs.google.com/presentation/d/1iVncCQOKi2zA1l3MPc6DFYYEfudA_7J3/embed?start=false&loop=false&delayms=3000',
  visual_content_url    = 'https://drive.google.com/file/d/1A6TrNO6BwhtPJxS9ZsuCcKVr5tgfMWJ_/preview',
  kinesthetic_content_url = NULL,

  video_urls = ARRAY[
    'https://drive.google.com/file/d/1ScK4B7fTlkIOJr2fzveUpeBvAxrHiOKU/preview',
    'https://drive.google.com/file/d/1aD2OTmcKMS7-p5Ux45zLzvnKnCeg6eVx/preview'
  ],
  slide_urls = ARRAY[
    'https://docs.google.com/presentation/d/1iVncCQOKi2zA1l3MPc6DFYYEfudA_7J3/embed?start=false&loop=false&delayms=3000',
    'https://docs.google.com/presentation/d/1pwGZEAA5jUJ55XA8jLtXS1VHz1W5d1wD/embed?start=false&loop=false&delayms=3000'
  ],
  mindmap_urls = ARRAY[
    'https://drive.google.com/file/d/1A6TrNO6BwhtPJxS9ZsuCcKVr5tgfMWJ_/preview',
    'https://drive.google.com/file/d/1rksCm95ZY-ux6TL4isbaPHc3Hgnl7Ejo/preview'
  ],
  available_formats = ARRAY['AUDITIF','LECTURE','VISUEL','KINESTHESIQUE']
WHERE grain_id = 9;

-- ================================================================
--  VÉRIFICATION FINALE
-- ================================================================
SELECT
  grain_id,
  title,
  array_length(video_urls,   1) AS nb_videos,
  array_length(slide_urls,   1) AS nb_slides,
  array_length(mindmap_urls, 1) AS nb_mindmaps
FROM grains
ORDER BY grain_id;
