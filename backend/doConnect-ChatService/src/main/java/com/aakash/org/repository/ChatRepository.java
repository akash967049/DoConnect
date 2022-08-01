package com.aakash.org.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aakash.org.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

	@Query("from Chat where (sender.id = ?1 or reciever.id = ?1) and (sender.id = ?2 or reciever.id = ?2) order by id")
	public List<Chat> findBySenderReciever(int userId, int senderId);
}
