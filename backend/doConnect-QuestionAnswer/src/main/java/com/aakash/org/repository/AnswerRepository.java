package com.aakash.org.repository;

/*
 * @Author - Aakash Verma
 */

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aakash.org.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Integer>{
	
	@Query("from Answer where question.id = ?1 and isApproved = true")
	public List<Answer> findByQuestionId(int id);
	
	@Query("from Answer where question.id = ?1")
	public List<Answer> findAllByQuestionId(int id);
	
	@Query("from Answer where isApproved = false")
	public List<Answer> findByIsUnapproved();

}
