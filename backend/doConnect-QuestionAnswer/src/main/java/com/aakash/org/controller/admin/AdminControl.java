package com.aakash.org.controller.admin;

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

import com.aakash.org.service.AnswerService;
import com.aakash.org.service.QuestionService;
import com.aakash.org.util.request.IdRequest;
import com.aakash.org.util.response.AnswerList;
import com.aakash.org.util.response.Feedback;
import com.aakash.org.util.response.QuestionList;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("admin/")
public class AdminControl {
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private AnswerService answerService;
	
	
	private ResponseEntity<?> response;
	
	@GetMapping("welcome")
	public ResponseEntity<?> welcome(HttpServletRequest request) {
		response = ResponseEntity.ok()
				.body(new Feedback("You are most welcome"));
		return response;
	}
	
	// Approve question and answer controlls
	
	
	@PostMapping("approveanswer")
	public ResponseEntity<?> approveAnswer(@RequestBody IdRequest idRequest){
		String massage = answerService.getAnswerApproved(idRequest);
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}
	
	@PostMapping("approvequestion")
	public ResponseEntity<?> approveQuestion(@RequestBody IdRequest idRequest){
		String massage = questionService.getQuestionApproved(idRequest);
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}
	
	
	// get unapproved question and answer controls
	
	@GetMapping("getunapprovedanswers")
	public ResponseEntity<?> getUnapprovedAnswer(){
		AnswerList answerList= answerService.getUnapprovedAnswers();
		if(answerList == null) {
			answerList = new AnswerList();
		}
		response = ResponseEntity.ok()
				.body(answerList);
		return response;
	}

	
	@GetMapping("getunapprovedquestions")
	public ResponseEntity<?> getUnapprovedQuestion(){
		QuestionList questionList = questionService.getUnapprovedQuestion();
		if(questionList == null) {
			questionList = new QuestionList();
		}
		response = ResponseEntity.ok()
				.body(questionList);
		return response;
	}
	
	// delete question and answer
	
	@PostMapping("deleteanswer")
	public ResponseEntity<?> deleteAnswer(@RequestBody IdRequest idRequest){
		String massage = answerService.deleteAnswer(idRequest);
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}
	
	@PostMapping("deletequestion")
	public ResponseEntity<?> deleteQuestion(@RequestBody IdRequest idRequest){
		String massage = questionService.deleteQuestion(idRequest);
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}
	
}
