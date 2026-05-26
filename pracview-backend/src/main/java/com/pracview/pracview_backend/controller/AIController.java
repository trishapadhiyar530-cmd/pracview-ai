package com.pracview.pracview_backend.controller;

import com.pracview.pracview_backend.service.AIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import com.pracview.pracview_backend.entity.ActivityHistory;
import com.pracview.pracview_backend.repository.ActivityHistoryRepository;
import com.pracview.pracview_backend.repository.UserRepository;
import com.pracview.pracview_backend.entity.User;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final AIService aiService;
    @Autowired
    private ActivityHistoryRepository historyRepository;
    @Autowired
    private UserRepository userRepository;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        System.out.println("AI endpoint hit");
        String message = request.get("message");
        String response = aiService.askAI(message);

        return Map.of("response", response);
    }
    @PostMapping("/mock-interview")
    public Map<String, String> generateMockInterview(
            @RequestBody Map<String, Object> request
    ) {
        String role = request.get("role").toString();
        String difficulty = request.get("difficulty").toString();
        String count = request.get("count").toString();

        String response = aiService.generateInterviewQuestions(
                role,
                difficulty,
                count
        );

        return Map.of("response", response);
    }
    @PostMapping("/evaluate-interview")
    public Map<String, String> evaluateInterview(
            @RequestBody Map<String, Object> request
    ) {
        String response = aiService.evaluateInterview(request);

        return Map.of("response", response);
    }
    @PostMapping("/analyze-resume")
    public Map<String, String> analyzeResume(
        @RequestParam("file") MultipartFile file,
        @RequestParam("userEmail") String userEmail
        ) {
        String response = aiService.analyzeResume(file, userEmail);

        return Map.of("response", response);
        }
    @PostMapping("/generate-quiz")
    public Object generateQuiz(
            @RequestBody Map<String, Object> request
    ) {
        return aiService.generateQuiz(request);
    }
    @GetMapping("/history")
    public List<ActivityHistory> getHistory(
            @RequestParam String userEmail
    ) {
        return historyRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }
    @GetMapping("/analytics")
        public Map<String, Long> getAnalytics(
                @RequestParam String userEmail
        ) {
        List<ActivityHistory> history =
                historyRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);

        long quizCount = history.stream()
                .filter(h -> "QUIZ".equals(h.getType()))
                .count();

        long interviewCount = history.stream()
                .filter(h -> "INTERVIEW".equals(h.getType()))
                .count();

        long resumeCount = history.stream()
                .filter(h -> "RESUME".equals(h.getType()))
                .count();

        Map<String, Long> analytics = new HashMap<>();

        analytics.put("totalActivities", (long) history.size());
        analytics.put("quizCount", quizCount);
        analytics.put("interviewCount", interviewCount);
        analytics.put("resumeCount", resumeCount);

        return analytics;
        }
    @GetMapping("/profile")
        public User getProfile(
                @RequestParam String email
        ) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        }

}