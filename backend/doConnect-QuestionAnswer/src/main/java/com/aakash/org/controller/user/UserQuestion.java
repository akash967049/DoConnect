package com.aakash.org.controller.user;

/*
 * @Author - Aakash Verma
 */

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aakash.org.service.ImageModalService;
import com.aakash.org.service.QuestionService;
import com.aakash.org.util.request.QuestionRequest;
import com.aakash.org.util.response.Feedback;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("user/")
public class UserQuestion {
	
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
	
	@PostMapping(value = {"createquestion"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> createQuestion(
			@RequestPart("question") QuestionRequest questionRequest,
			@RequestPart(name = "imageFile", required =  false) MultipartFile file,
			HttpServletRequest request
			){
		String token = request.getHeader("Authorization").substring(7);
		String massage = questionService.addQuestion(questionRequest, file, token);
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}
	
	// upload image file
	
	@PostMapping("uploadimage")
	public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file){
		String massage ="Image Not Uploaded";
		if(file.isEmpty()) {
			return ResponseEntity.ok()
					.body(new Feedback(massage));
		}
		System.out.println(file.getOriginalFilename());
		try {
			massage = imageModalService.uplaodImage(file, "check");
		}catch(Exception e) {
			return ResponseEntity.ok()
					.body(new Feedback("Image Not Uploaded"));
		}
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}
	
	

}
