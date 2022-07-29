package com.aakash.org.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aakash.org.service.UserService;
import com.aakash.org.util.request.AuthenticationRequest;
import com.aakash.org.util.request.SignupRequest;
import com.aakash.org.util.response.Feedback;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("all/")
public class LoginSignup {

	@Autowired
	private UserService userService;
	
	private ResponseEntity<?> response;
	

	@GetMapping("welcome")
	public ResponseEntity<?> welcome(HttpServletRequest request) {
		
//		String token = request.getHeader("Authorization").substring(7);
		response = ResponseEntity.ok()
				.body(new Feedback("You are most welcome"));
		return response;
	}
	
	

	@PostMapping("usersignin")
	public ResponseEntity<?> usersignin(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {

		String jwt = userService.login(authenticationRequest);
		String role = userService.getUserRoles(jwt);
		response = ResponseEntity.ok()
				.header("Authorization", "Bearer " + jwt)
				.header("Access-Control-Expose-Headers", "Authorization")
				.body(new Feedback(role+" Successfully Logged In"));

		return response;
	}

	@PostMapping("usersignup")
	public ResponseEntity<?> usersignup(@RequestBody SignupRequest signupRequest) throws Exception {
		String massage = userService.signup(signupRequest);
		response = ResponseEntity.ok().body(new Feedback(massage));

		return response;
	}
	
	
}
