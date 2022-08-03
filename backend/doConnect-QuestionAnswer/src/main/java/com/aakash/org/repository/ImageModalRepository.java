package com.aakash.org.repository;

/*
 * @Author - Aakash Verma
 */

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aakash.org.entity.ImageModal;

public interface ImageModalRepository extends JpaRepository<ImageModal, Integer> {
	
	public Optional<ImageModal> findByName(String name);
	
}
