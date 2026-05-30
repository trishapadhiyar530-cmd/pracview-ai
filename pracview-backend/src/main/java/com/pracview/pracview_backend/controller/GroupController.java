package com.pracview.pracview_backend.controller;

import com.pracview.pracview_backend.entity.GroupRoom;
import com.pracview.pracview_backend.repository.GroupRoomRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/group")
@CrossOrigin(origins = "*")
public class GroupController {

    private final GroupRoomRepository groupRoomRepository;

    public GroupController(GroupRoomRepository groupRoomRepository) {
        this.groupRoomRepository = groupRoomRepository;
    }

    @PostMapping("/create")
    public GroupRoom createRoom(
            @RequestBody Map<String, String> request
    ) {

        String email = request.get("email");

        GroupRoom room = new GroupRoom();

        room.setRoomCode(
                "PV-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 5)
                        .toUpperCase()
        );

        room.setHostEmail(email);
        room.setParticipants(email);

        return groupRoomRepository.save(room);
    }
    @PostMapping("/join")
    public GroupRoom joinRoom(
            @RequestBody Map<String, String> request
    ) {

        String roomCode = request.get("roomCode");
        String email = request.get("email");

        GroupRoom room = groupRoomRepository
                .findByRoomCode(roomCode)
                .orElseThrow(
                        () -> new RuntimeException("Room not found")
                );

        String participants = room.getParticipants();

        if (!participants.contains(email)) {

            room.setParticipants(
                    participants + "," + email
            );

            groupRoomRepository.save(room);
        }

        return room;
    }
    @GetMapping("/{roomCode}")
    public GroupRoom getRoom(
            @PathVariable String roomCode
    ) {

        return groupRoomRepository
                .findByRoomCode(roomCode)
                .orElseThrow(
                        () -> new RuntimeException("Room not found")
                );
    }
}