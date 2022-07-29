package com.aakash.org.controller.user;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aakash.org.service.PersonalInformationService;
import com.aakash.org.service.UserService;
import com.aakash.org.util.request.NameRequest;
import com.aakash.org.util.request.UpdateRequest;
import com.aakash.org.util.request.UsernameRequest;
import com.aakash.org.util.response.Feedback;

@RestController
@CrossOrigin
@RequestMapping("user/")
public class LogoutUpdate {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PersonalInformationService pIS;

	private ResponseEntity<?> response;

	
	@GetMapping("welcome")
	public ResponseEntity<?> welcome() {
		String massage = "Welcome to user controlle";
		response = ResponseEntity.ok().body(new Feedback(massage));
		return response;
	}
	
	// Controller for logout application

	@GetMapping("userlogout")
	public ResponseEntity<?> logout(HttpServletRequest request) {

		String token = request.getHeader("Authorization").substring(7);
		String massage = userService.logout(token);
		
		response = ResponseEntity.ok().body(new Feedback(massage));

		return response;
	}

	/*
	 * from here different data from userinfo can be updated 
	 * name of user 
	 * gender of user 
	 * phone of user 
	 * email of user 
	 * date of birth of user 
	 * address of user
	 * 
	 */

	// Update name of user

	@PostMapping("updatename")
	public ResponseEntity<?> updatename(@RequestBody UpdateRequest updateRequest, HttpServletRequest request) {
		NameRequest name = updateRequest.getNameRequest(); 
		String value = name.getFirstname()+","+name.getMiddlename()+","+name.getLastname();
		String token = request.getHeader("Authorization").substring(7);
		String massage = pIS.updateoneinfo(token, value, 1);
		
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}

	// Update gender of user

	@PostMapping("updategender")
	public ResponseEntity<?> updategender(@RequestBody UpdateRequest updateRequest, HttpServletRequest request) {
		String token = request.getHeader("Authorization").substring(7);
		String massage = pIS.updateoneinfo(token, updateRequest.getValue(), 2);
		
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}

	// Update email of user

	@PostMapping("updateemail")
	public ResponseEntity<?> updateemail(@RequestBody UpdateRequest updateRequest, HttpServletRequest request) {

		String token = request.getHeader("Authorization").substring(7);
		String massage = pIS.updateoneinfo(token, updateRequest.getValue(), 3);
		
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}
	
	// Update phone of user

	@PostMapping("updatephone")
	public ResponseEntity<?> updatephone(@RequestBody UpdateRequest updateRequest, HttpServletRequest request) {

		String token = request.getHeader("Authorization").substring(7);
		String massage = pIS.updateoneinfo(token, updateRequest.getValue(), 4);
		
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}

	// Update date of birth of user

	@PostMapping("updatedateofbirth")
	public ResponseEntity<?> updatedateofbirth(@RequestBody UpdateRequest updateRequest, HttpServletRequest request) {

		String token = request.getHeader("Authorization").substring(7);
		String massage = pIS.updateoneinfo(token, updateRequest.getValue(), 5);
		
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}

	// Update date of birth of user

	@PostMapping("updateaddress")
	public ResponseEntity<?> updateaddress(@RequestBody UpdateRequest updateRequest, HttpServletRequest request) {

		String token = request.getHeader("Authorization").substring(7);
		String massage = pIS.updateoneinfo(token, updateRequest.getValue(), 6);
		
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}
	
	// delete Account of user
	
	@PostMapping("deleteuser")
	public ResponseEntity<?> deleteuser(@RequestBody UsernameRequest usernameRequest, HttpServletRequest request) {
		String token = request.getHeader("Authorization").substring(7);
		
		String massage = userService.deleteUser(token);
		response = ResponseEntity.ok()
				.body(new Feedback(massage));
		return response;
	}

}
