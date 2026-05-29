package com.pracview.pracview_backend.service;

import com.pracview.pracview_backend.dto.SignupRequest;
import com.pracview.pracview_backend.entity.User;
import com.pracview.pracview_backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import com.pracview.pracview_backend.dto.LoginRequest;
import java.util.Optional;

import com.pracview.pracview_backend.dto.LoginResponse;
import com.pracview.pracview_backend.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String signup(SignupRequest request) {

        if (userRepository.findByEmailIgnoreCase(request.getEmail()).isPresent()) {
            return "Email already registered";
        }

        User user = new User(
                request.getFullName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getCollege(),
                "STUDENT",
                LocalDateTime.now());

        userRepository.save(user);

        return "User registered successfully";
    }

    public LoginResponse login(LoginRequest request) {

        Optional<User> userOptional = userRepository.findByEmailIgnoreCase(request.getEmail());

        if (userOptional.isEmpty()) {
            System.out.println("USER NOT FOUND");
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();

        System.out.println("INPUT PASSWORD: " + request.getPassword());
        System.out.println("DB PASSWORD: " + user.getPassword());

        boolean match = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword());

        System.out.println("PASSWORD MATCH: " + match);

        if (!match) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        System.out.println("TOKEN GENERATED: " + token);



        return new LoginResponse(token);
    }
   
    public User getProfile(String email) {
        return userRepository.findByEmailIgnoreCase(email).orElse(null);
    }
    public User updateProfile(User updatedUser) {

   Optional<User> userOptional  =
            userRepository.findByEmailIgnoreCase(updatedUser.getEmail());

    if (userOptional.isEmpty()) {
        throw new RuntimeException("User not found");
    }

    User existingUser = userOptional.get();

    if (existingUser == null) {
        throw new RuntimeException("User not found");
    }

    existingUser.setFullName(updatedUser.getFullName());
    existingUser.setCollege(updatedUser.getCollege());
    existingUser.setRole(updatedUser.getRole());

    return userRepository.save(existingUser);
}
}