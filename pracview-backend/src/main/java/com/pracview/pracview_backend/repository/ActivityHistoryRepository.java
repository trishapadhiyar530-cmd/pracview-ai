package com.pracview.pracview_backend.repository;

import com.pracview.pracview_backend.entity.ActivityHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityHistoryRepository
        extends JpaRepository<ActivityHistory, Long> {

    List<ActivityHistory> findByUserEmailOrderByCreatedAtDesc(String userEmail);

    long countByUserEmail(String userEmail);

    long countByUserEmailAndType(String userEmail, String type);
}