package ma.ensa.microlearning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MicrolearningPlatformApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(MicrolearningPlatformApplication.class, args);
        System.out.println("\nPlateforme de Micro-Learning demarree !");
        System.out.println("API disponible sur : http://localhost:8080\n");
    }
}
