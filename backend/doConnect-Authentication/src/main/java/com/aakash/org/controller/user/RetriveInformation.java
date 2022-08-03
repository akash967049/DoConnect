package com.aakash.org.controller.user;

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

import com.aakash.org.service.PersonalInformationService;
import com.aakash.org.util.request.UsernameRequest;
import com.aakash.org.util.response.UserInformationResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("user/")
public class RetriveInformation {
	
	@Autowired
	private PersonalInformationService personalInformationService;
	
	private ResponseEntity<?> response;
	
	@PostMapping("getuserinfo")
	public ResponseEntity<?> getUserInfo(@RequestBody UsernameRequest usernameRequest, HttpServletRequest request) {
		String token = request.getHeader("Authorization").substring(7);
		UserInformationResponse userInformationResponse = personalInformationService.getUserInformation(token);
		response = ResponseEntity.ok()
				.body(userInformationResponse);
		return response;
	}

}
