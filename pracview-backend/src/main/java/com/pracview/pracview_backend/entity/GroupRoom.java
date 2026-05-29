package com.pracview.pracview_backend.entity;

import jakarta.persistence.*;

@Entity
public class GroupRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomCode;

    private String hostEmail;

    @Column(columnDefinition = "TEXT")
    private String participants;

    public GroupRoom() {}

    public Long getId() {
        return id;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public String getHostEmail() {
        return hostEmail;
    }

    public String getParticipants() {
        return participants;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public void setHostEmail(String hostEmail) {
        this.hostEmail = hostEmail;
    }

    public void setParticipants(String participants) {
        this.participants = participants;
    }
}