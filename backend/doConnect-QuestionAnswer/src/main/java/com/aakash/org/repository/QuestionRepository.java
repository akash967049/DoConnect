package com.aakash.org.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aakash.org.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
	
	@Query("from Question where isApproved = false")
	public List<Question> findByIsUnapproved();
	
	@Query("from Question where isApproved = true")
	public List<Question> findByIsApproved();
	
	@Query("from Question where topic = ?1 and isApproved = true")
	public List<Question> findByTopicAndApproved(String topic);

}
