package ma.ensa.microlearning.controller;

import ma.ensa.microlearning.dto.AuthResponse;
import ma.ensa.microlearning.dto.LoginRequest;
import ma.ensa.microlearning.dto.RegisterRequest;
import ma.ensa.microlearning.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        
        if (response.getToken() == null) {
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        
        if (response.getToken() == null) {
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth endpoint fonctionne");
    }

    @Autowired
    private ma.ensa.microlearning.repository.UserRepository userRepository;
    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @GetMapping("/fix-passwords")
    public ResponseEntity<String> fixPasswords() {
        java.util.List<ma.ensa.microlearning.entity.User> users = userRepository.findAll();
        for (ma.ensa.microlearning.entity.User u : users) {
            u.setPasswordHash(passwordEncoder.encode("123456"));
            userRepository.save(u);
        }
        return ResponseEntity.ok("Mots de passe réinitialisés à '123456' pour tous les utilisateurs.");
    }
}
