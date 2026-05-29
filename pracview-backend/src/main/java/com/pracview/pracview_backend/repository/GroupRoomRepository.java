package com.pracview.pracview_backend.repository;

import com.pracview.pracview_backend.entity.GroupRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupRoomRepository
        extends JpaRepository<GroupRoom, Long> {

    Optional<GroupRoom> findByRoomCode(String roomCode);
}