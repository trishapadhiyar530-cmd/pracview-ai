package com.pracview.pracview_backend.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

import com.pracview.pracview_backend.entity.ActivityHistory;
import com.pracview.pracview_backend.repository.ActivityHistoryRepository;
import java.time.LocalDateTime;

@Service
public class AIService {

    @Value("${openrouter.api.key:}")
    private String apiKey;
    @Autowired
    private ActivityHistoryRepository historyRepository;
    private void saveHistory(
                String userEmail,
                String type,
                String title,
                String result
        ) {
        ActivityHistory history = new ActivityHistory(
                userEmail,
                type,
                title,
                result,
                LocalDateTime.now()
        );

        historyRepository.save(history);
        }

    private final WebClient webClient = WebClient.create();

        public String askAI(String userMessage) {

        String url = "https://openrouter.ai/api/v1/chat/completions";

        Map<String, Object> requestBody = Map.of(
                "model", "openai/gpt-4o-mini",
                "max_tokens", 100,
                "temperature", 0.7,
                "messages", List.of(
                Map.of(
                        "role", "system",
                        "content",
                        """
                        You are PracView AI Career Coach 🤖

                        You behave like a premium mentor assistant similar to ChatGPT coaching mode.

                        STRICT RULES:

                        1. NEVER give long essays.
                        2. Keep replies short and engaging.
                        3. Maximum 4–8 lines.
                        4. Break learning into steps.
                        5. Teach progressively.
                        6. Ask user if they want NEXT or more details.
                        7. Always sound human, warm, supportive.
                        8. If user feels sad/stressed/rejected, encourage them emotionally.
                        9. Use emojis naturally.
                        10. Never dump everything at once.

                        Response style examples:

                        GOOD:

                        🚀 Great choice.

                        Start with these first:
                        • Java OOP
                        • Collections
                        • Exception Handling

                        Want the next roadmap step? 👇

                        GOOD:

                        💙 One failed interview doesn't define you.

                        Even strong engineers face rejection.

                        Let's improve together.

                        Want help finding what went wrong?

                        BAD:
                        - giant essays
                        - robotic explanations
                        - long paragraphs
                        - information dumping

                        Act like a real mentor conversation.
                        """
                ),
                Map.of(
                        "role", "user",
                        "content", userMessage
                )
                )
        );

        try {
            Object rawResponse = webClient.post()
                    .uri(url)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Object.class)
                    .block();

            Map<?, ?> response = (Map<?, ?>) rawResponse;
            List<?> choices = (List<?>) response.get("choices");
            Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
            Map<?, ?> message = (Map<?, ?>) firstChoice.get("message");

            String aiResponse = message.get("content").toString();

                // hard limit words
                String[] words = aiResponse.split("\\s+");

                if (words.length > 100) {
                StringBuilder shortResponse = new StringBuilder();

                for (int i = 0; i < 100; i++) {
                        shortResponse.append(words[i]).append(" ");
                }

                aiResponse = shortResponse.toString().trim();
                aiResponse += "\n\n━━━━━━━━━━━━━━━━━━\n👉 Type NEXT to continue 💙";
                }

                return aiResponse;

        } catch (Exception e) {
            e.printStackTrace();
            return "AI service unavailable.";
        }
    }
        public String generateInterviewQuestions(
                String role,
                String difficulty,
                String count
        ) {
        String prompt = """
                You are PracView AI Interview Coach.

                Generate %s interview questions for %s role.

                Difficulty: %s

                STRICT RULES:
                - short clear interview questions
                - numbered list
                - no long explanations
                - realistic interview style
                - professional tone
                """
                .formatted(count, role, difficulty);

        String url = "https://openrouter.ai/api/v1/chat/completions";

        Map<String, Object> requestBody = Map.of(
                "model", "openai/gpt-4o-mini",
                "max_tokens", 250,
                "temperature", 0.8,
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                )
        );

        try {
                Object rawResponse = webClient.post()
                        .uri(url)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .bodyValue(requestBody)
                        .retrieve()
                        .bodyToMono(Object.class)
                        .block();

                Map<?, ?> response = (Map<?, ?>) rawResponse;
                List<?> choices = (List<?>) response.get("choices");
                Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
                Map<?, ?> message = (Map<?, ?>) firstChoice.get("message");

                return message.get("content").toString();

        } catch (Exception e) {
                e.printStackTrace();
                return "Failed to generate interview questions.";
        }
        }
        public String evaluateInterview(Map<String, Object> data) {

        String prompt = """
                You are PracView AI Interview Evaluator.

                Evaluate this mock interview professionally.

                Give:

                🎯 Technical Score (/10)
                🎤 Communication Score (/10)
                🚀 Confidence Score (/10)

                Then:
                💪 Strengths
                ⚠️ Weaknesses
                📚 Improvement Tips

                Keep response short, premium, structured, motivational.

                Interview data:
                """ + data.toString();

        String url = "https://openrouter.ai/api/v1/chat/completions";

        Map<String, Object> requestBody = Map.of(
                "model", "openai/gpt-4o-mini",
                "max_tokens", 250,
                "temperature", 0.7,
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                )
        );

        try {
        Object rawResponse = webClient.post()
                .uri(url)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Object.class)
                .block();


        Map<?, ?> response = (Map<?, ?>) rawResponse;

        if (!response.containsKey("choices")) {
                return "AI evaluation service unavailable.";
        }

        List<?> choices = (List<?>) response.get("choices");

        if (choices == null || choices.isEmpty()) {
                return "AI evaluation returned empty response.";
        }

        Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
        Map<?, ?> message = (Map<?, ?>) firstChoice.get("message");

        String result = message.get("content").toString();

        String userEmail = data.get("userEmail") != null
                ? data.get("userEmail").toString()
                : "guest@pracview.com";

        saveHistory(
                userEmail,
                "INTERVIEW",
                "Mock Interview Evaluation",
                result
        );

        return result;

        } catch (Exception e) {
        e.printStackTrace();
        return "Evaluation failed.";
        }
        }
        public String analyzeResume(MultipartFile file,String userEmail) {
                try {
                        PDDocument document = Loader.loadPDF(file.getBytes());
                        PDFTextStripper stripper = new PDFTextStripper();
                        String resumeText = stripper.getText(document);
                        document.close();

                        String prompt = """
                                You are PracView AI Resume Analyzer.

                                Analyze this resume professionally.

                                Give:

                                📊 ATS Score (/100)

                                💪 Strengths
                                ⚠️ Missing Skills
                                📚 Improvement Suggestions

                                Keep response premium, structured, concise, helpful.

                                Resume:
                                """ + resumeText;

                        String url = "https://openrouter.ai/api/v1/chat/completions";

                        Map<String, Object> requestBody = Map.of(
                                "model", "openai/gpt-4o-mini",
                                "max_tokens", 400,
                                "temperature", 0.7,
                                "messages", List.of(
                                        Map.of(
                                                "role", "user",
                                                "content", prompt
                                        )
                                )
                        );

                        Object rawResponse = webClient.post()
                                .uri(url)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                                .bodyValue(requestBody)
                                .retrieve()
                                .bodyToMono(Object.class)
                                .block();

                        Map<?, ?> response = (Map<?, ?>) rawResponse;
                        List<?> choices = (List<?>) response.get("choices");
                        Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
                        Map<?, ?> message = (Map<?, ?>) firstChoice.get("message");

                        String result = message.get("content").toString();

                        String emailToSave =
                        userEmail != null ? userEmail : "guest@pracview.com";

                        saveHistory(
                                emailToSave,
                                "RESUME",
                                "Resume Analysis",
                                result
                        );

                        return result;

                } catch (Exception e) {
                        e.printStackTrace();
                        return "Resume analysis failed.";
                }
        }
        public Object generateQuiz(Map<String, Object> data) {
                try {
                        String prompt = """
                                Generate a technical multiple-choice quiz.

                                Subject: %s
                                Difficulty: %s
                                Number of questions: %s

                                Return ONLY valid JSON array.

                                EXACT FORMAT:

                                [
                                {
                                "question": "What is JVM?",
                                "options": [
                                "Java Virtual Machine",
                                "Java Variable Method",
                                "Java Verified Module",
                                "Joint Virtual Memory"
                                ],
                                "answer": "Java Virtual Machine"
                                }
                                ]

                                Rules:
                                - exactly 4 options
                                - one correct answer
                                - no explanation
                                - no markdown
                                - valid JSON only
                                """
                                .formatted(
                                        data.get("subject"),
                                        data.get("difficulty"),
                                        data.get("count")
                                );

                        String url = "https://openrouter.ai/api/v1/chat/completions";

                        Map<String, Object> requestBody = Map.of(
                                "model", "openai/gpt-4o-mini",
                                "max_tokens", 1200,
                                "temperature", 0.7,
                                "messages", List.of(
                                        Map.of(
                                                "role", "user",
                                                "content", prompt
                                        )
                                )
                        );

                        Object rawResponse = webClient.post()
                                .uri(url)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                                .bodyValue(requestBody)
                                .retrieve()
                                .bodyToMono(Object.class)
                                .block();

                        Map<?, ?> response = (Map<?, ?>) rawResponse;
                        List<?> choices = (List<?>) response.get("choices");
                        Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
                        Map<?, ?> message = (Map<?, ?>) firstChoice.get("message");

                        String jsonText = message.get("content").toString()
                        .replace("```json", "")
                        .replace("```", "")
                        .trim();

                        ObjectMapper mapper = new ObjectMapper();

                        Object quizData = mapper.readValue(jsonText, Object.class);

                        String userEmail = data.get("userEmail") != null
                                ? data.get("userEmail").toString()
                                : "guest@pracview.com";

                        saveHistory(
                                userEmail,
                                "QUIZ",
                                data.get("subject") + " Quiz",
                                "Generated " + data.get("count") + " questions"
                        );

                        return quizData;

                } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
                }
        }

}