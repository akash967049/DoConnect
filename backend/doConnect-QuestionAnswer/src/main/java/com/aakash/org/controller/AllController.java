package com.aakash.org.controller;

/*
 * @Author - Aakash Verma
 */

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aakash.org.entity.ImageModal;
import com.aakash.org.service.ImageModalService;
import com.aakash.org.service.QuestionService;
import com.aakash.org.util.request.IdRequest;
import com.aakash.org.util.request.SearchRequest;
import com.aakash.org.util.response.Feedback;
import com.aakash.org.util.response.QuestionList;
import com.aakash.org.util.response.QuestionResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("all/")
public class AllController {
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private ImageModalService imageModalService;
	
	
	private ResponseEntity<?> response;
	
	@GetMapping("welcome")
	public ResponseEntity<?> welcome(HttpServletRequest request) {
		response = ResponseEntity.ok()
				.body(new Feedback("You are most welcome"));
		return response;
	}
	
	// Search questions by description
	
	@PostMapping("searchbydescription")
	public ResponseEntity<?> searchQuestionsByDescription(@RequestBody SearchRequest searchRequest){
		QuestionList questionList = questionService.searchQuestionByDiscription(searchRequest);
		if(questionList == null) {
			questionList = new QuestionList();
		}
		response = ResponseEntity.ok()
				.body(questionList);
		return response;
	}
	
	// Search question by topic
	
	@PostMapping("searchbytopic")
	public ResponseEntity<?> searchQuestionsByTopic(@RequestBody SearchRequest searchRequest){
		QuestionList questionList = questionService.searchQuestionByTopic(searchRequest);
		if(questionList == null) {
			questionList = new QuestionList();
		}
		response = ResponseEntity.ok()
				.body(questionList);
		return response;
	}
	
	// Search question by id
	
	@PostMapping("searchbyid")
	public ResponseEntity<?> searchQuestionsById(@RequestBody IdRequest idRequest){
		QuestionResponse questionResponse = questionService.searchQuestionById(idRequest);
		if(questionResponse == null) {
			questionResponse = new QuestionResponse();
		}
		response = ResponseEntity.ok()
				.body(questionResponse);
		return response;
	}
	
	// Get image by imageName
	
	@PostMapping("searchimage")
	public ResponseEntity<?> searchImage(@RequestBody SearchRequest searchRequest){
		ImageModal img = imageModalService.getImage(searchRequest.getSearchtext());
		if(img==null) {
			img = new ImageModal();
		}
		response = ResponseEntity.ok()
				.body(img);
		return response;
	}

}
