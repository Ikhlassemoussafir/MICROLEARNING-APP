package ma.ensa.microlearning.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DataUpdater {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void updateGrainsVarkUrls() {
        System.out.println("=== MISE A JOUR AUTOMATIQUE DES URLS VARK DANS LA BASE DE DONNÉES ===");
        try {
            // S'assurer que les colonnes existent
            jdbcTemplate.execute("ALTER TABLE grains ADD COLUMN IF NOT EXISTS visual_content_url TEXT");
            jdbcTemplate.execute("ALTER TABLE grains ADD COLUMN IF NOT EXISTS auditory_content_url TEXT");
            jdbcTemplate.execute("ALTER TABLE grains ADD COLUMN IF NOT EXISTS reading_content_url TEXT");
            jdbcTemplate.execute("ALTER TABLE grains ADD COLUMN IF NOT EXISTS kinesthetic_content_url TEXT");
            jdbcTemplate.execute("ALTER TABLE grains ADD COLUMN IF NOT EXISTS available_formats TEXT[]");

            // Mettre à jour le Grain 1 avec les liens fournis
            String sqlGrain1 = "UPDATE grains SET " +
                    "visual_content_url = 'https://drive.google.com/file/d/1iQ_P9aPUCH33SJ4un5SF2-X_A15kejq-/preview', " +
                    "auditory_content_url = 'https://drive.google.com/file/d/1Dnr8QAEv4PU2vTi_tehjXVv7QYRwi5W7/preview', " +
                    "reading_content_url = 'https://docs.google.com/presentation/d/1rBGA7hpgsJN_bZTv5gosT0JaQEZHEGMh/embed?start=false&loop=false&delayms=3000', " +
                    "kinesthetic_content_url = NULL, " +
                    "available_formats = ARRAY['VISUEL', 'AUDITIF', 'LECTURE', 'KINESTHESIQUE'] " +
                    "WHERE grain_id = 1";
            jdbcTemplate.execute(sqlGrain1);

            // Mettre à jour le Grain 2 avec le dossier embarqué
            String sqlGrain2 = "UPDATE grains SET " +
                    "visual_content_url = NULL, " +
                    "auditory_content_url = 'https://drive.google.com/embeddedfolderview?id=1OlAw7nGiyxIIQd5Cz43js8OmmFlZ2HpD#grid', " +
                    "reading_content_url = 'https://drive.google.com/embeddedfolderview?id=1OlAw7nGiyxIIQd5Cz43js8OmmFlZ2HpD#grid', " +
                    "kinesthetic_content_url = NULL, " +
                    "available_formats = ARRAY['VISUEL', 'AUDITIF', 'LECTURE', 'KINESTHESIQUE'] " +
                    "WHERE grain_id = 2";
            jdbcTemplate.execute(sqlGrain2);

            // Grain 3
            String sqlGrain3 = "UPDATE grains SET visual_content_url = NULL, auditory_content_url = 'https://drive.google.com/embeddedfolderview?id=1A8mkcoW6_ckvfPP5Dg2PgHZn4Cv8T8N_#grid', reading_content_url = 'https://drive.google.com/embeddedfolderview?id=1A8mkcoW6_ckvfPP5Dg2PgHZn4Cv8T8N_#grid', kinesthetic_content_url = NULL, available_formats = ARRAY['VISUEL', 'AUDITIF', 'LECTURE', 'KINESTHESIQUE'] WHERE grain_id = 3";
            jdbcTemplate.execute(sqlGrain3);

            // Grain 4
            String sqlGrain4 = "UPDATE grains SET visual_content_url = NULL, auditory_content_url = 'https://drive.google.com/embeddedfolderview?id=1wwsLar0UFSZu1-nVtgSXvHNp87EDjUqt#grid', reading_content_url = 'https://drive.google.com/embeddedfolderview?id=1wwsLar0UFSZu1-nVtgSXvHNp87EDjUqt#grid', kinesthetic_content_url = NULL, available_formats = ARRAY['VISUEL', 'AUDITIF', 'LECTURE', 'KINESTHESIQUE'] WHERE grain_id = 4";
            jdbcTemplate.execute(sqlGrain4);

            // Grain 5
            String sqlGrain5 = "UPDATE grains SET visual_content_url = NULL, auditory_content_url = 'https://drive.google.com/embeddedfolderview?id=1Bdt_d9NNfUwykCQVik-zpXedMS69qW-E#grid', reading_content_url = 'https://drive.google.com/embeddedfolderview?id=1Bdt_d9NNfUwykCQVik-zpXedMS69qW-E#grid', kinesthetic_content_url = NULL, available_formats = ARRAY['VISUEL', 'AUDITIF', 'LECTURE', 'KINESTHESIQUE'] WHERE grain_id = 5";
            jdbcTemplate.execute(sqlGrain5);

            System.out.println("=== MISE A JOUR TERMINÉE AVEC SUCCÈS ! ===");

        } catch (Exception e) {
            System.err.println("ERREUR lors de la mise à jour des données : " + e.getMessage());
        }
    }
}
