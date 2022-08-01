package com.aakash.org.controller.user;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aakash.org.service.AnswerService;
import com.aakash.org.util.request.AnswerRequest;
import com.aakash.org.util.request.IdRequest;
import com.aakash.org.util.response.AnswerList;
import com.aakash.org.util.response.Feedback;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("user/")
public class UserAnswer {
	
	@Autowired
	private AnswerService answerService;
	
	private ResponseEntity<?> response;
	
	@PostMapping(value = {"createanswer"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> createQuestion(
			@RequestPart("answer") AnswerRequest answerRequest,
			@RequestPart(name = "imageFile", required = false) MultipartFile file,
			HttpServletRequest request){
		String token = request.getHeader("Authorization").substring(7);
		String massage = answerService.addAnswer(answerRequest, file, token);
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}
	
	@PostMapping("answerbyquestionid")
	public ResponseEntity<?> getAnswerByQuestionId(@RequestBody IdRequest idRequest){
		AnswerList answerList = answerService.getAnswerByQuestionId(idRequest);
		if(answerList==null) {
			answerList = new AnswerList();
		}
		response = ResponseEntity.ok()
				.body(answerList);
		return response;
	}
}
