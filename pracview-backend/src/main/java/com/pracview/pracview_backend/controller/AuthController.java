package com.pracview.pracview_backend.controller;

import com.pracview.pracview_backend.dto.SignupRequest;
import com.pracview.pracview_backend.service.AuthService;
import org.springframework.web.bind.annotation.*;
import com.pracview.pracview_backend.dto.LoginRequest;
import com.pracview.pracview_backend.dto.LoginResponse;
import org.springframework.security.core.Authentication;
import com.pracview.pracview_backend.entity.User;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/profile")
    public User profile(@RequestParam String email) {
        return authService.getProfile(email);
    }
}