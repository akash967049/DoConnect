package com.aakash.org.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aakash.org.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

}
