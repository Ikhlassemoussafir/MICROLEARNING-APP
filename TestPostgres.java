import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class TestPostgres {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/microlearning_db?stringtype=unspecified";
        String user = "microlearning_user";
        String password = "microlearning_pass_2026";
        
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            String sql = "INSERT INTO grains (title, difficulty_level, target_vark_style, learning_objective, order_index) VALUES ('Test', 'DEBUTANT', 'VISUEL', 'Test', 1)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.executeUpdate();
            System.out.println("Success!");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
