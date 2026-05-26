package com.pracview.pracview_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ActivityHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private String type;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String result;

    private LocalDateTime createdAt;

    public ActivityHistory() {}

    public ActivityHistory(
            String userEmail,
            String type,
            String title,
            String result,
            LocalDateTime createdAt
    ) {
        this.userEmail = userEmail;
        this.type = type;
        this.title = title;
        this.result = result;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public String getType() { return type; }
    public String getTitle() { return title; }
    public String getResult() { return result; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public void setType(String type) { this.type = type; }
    public void setTitle(String title) { this.title = title; }
    public void setResult(String result) { this.result = result; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}