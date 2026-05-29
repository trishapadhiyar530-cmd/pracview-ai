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
}