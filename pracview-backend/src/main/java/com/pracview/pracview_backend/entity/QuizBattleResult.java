package com.pracview.pracview_backend.entity;
import jakarta.persistence.*;

@Entity
public class QuizBattleResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomCode;

    private String userEmail;

    private int score;
}
