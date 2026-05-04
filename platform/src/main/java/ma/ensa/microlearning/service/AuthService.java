package ma.ensa.microlearning.service;

import ma.ensa.microlearning.dto.AuthResponse;
import ma.ensa.microlearning.dto.LoginRequest;
import ma.ensa.microlearning.dto.RegisterRequest;
import ma.ensa.microlearning.entity.User;
import ma.ensa.microlearning.enums.UserRole;
import ma.ensa.microlearning.repository.UserRepository;
import ma.ensa.microlearning.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null, null, null, "Email deja utilise");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole() != null ? request.getRole() : UserRole.APPRENANT);
        user.setIsActive(true);
        
        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        
        return new AuthResponse(token, user.getEmail(), user.getRole().name(), "Inscription reussie");
    }
    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);
        
        if (user == null) {
            return new AuthResponse(null, null, null, "Email ou mot de passe incorrect");
        }
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            return new AuthResponse(null, null, null, "Email ou mot de passe incorrect");
        }
        
        if (!user.getIsActive()) {
            return new AuthResponse(null, null, null, "Compte desactive");
        }
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        
        return new AuthResponse(token, user.getEmail(), user.getRole().name(), "Connexion reussie");
    }
}
