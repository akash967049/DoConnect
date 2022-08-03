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

import com.aakash.org.service.ChatService;
import com.aakash.org.util.request.MessageRequest;
import com.aakash.org.util.request.SenderRequest;
import com.aakash.org.util.response.ChatList;
import com.aakash.org.util.response.Feedback;
import com.aakash.org.util.response.UsersList;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("user/")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	

	private ResponseEntity<?> response;
	
	@GetMapping("welcome")
	public ResponseEntity<?> welcome(HttpServletRequest request) {
		response = ResponseEntity.ok()
				.body(new Feedback("You are most welcome"));
		return response;
	}
	
	@PostMapping("addchat")
	public ResponseEntity<?> addMessage(@RequestBody  MessageRequest messageRequest, HttpServletRequest request){
		String token = request.getHeader("Authorization").substring(7);
		String message = chatService.addMessage(token, messageRequest);
		response = ResponseEntity.ok()
				.body(new Feedback(message));
		return response;
	}
	
	@PostMapping("getchat")
	public ResponseEntity<?> addMessage(@RequestBody  SenderRequest senderRequest, HttpServletRequest request){
		String token = request.getHeader("Authorization").substring(7);
		ChatList chatList = chatService.getMassageHistory(senderRequest, token);
		if(chatList==null) {
			chatList= new ChatList();
		}
		response = ResponseEntity.ok()
				.body(chatList);
		return response;
	}
	
	@GetMapping("getusers")
	public ResponseEntity<?> getAllUsers(HttpServletRequest request){
		String token = request.getHeader("Authorization").substring(7);
		UsersList userList = chatService.getAllUsers(token);
		if(userList==null) {
			userList= new UsersList();
		}
		response = ResponseEntity.ok()
				.body(userList);
		return response;
	}
}
