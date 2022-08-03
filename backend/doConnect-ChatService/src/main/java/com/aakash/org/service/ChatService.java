package com.aakash.org.service;

/*
 * @Author - Aakash Verma
 */

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aakash.org.entity.Chat;
import com.aakash.org.entity.User;
import com.aakash.org.repository.ChatRepository;
import com.aakash.org.repository.UserRepository;
import com.aakash.org.util.JwtUtil;
import com.aakash.org.util.mapper.Mapper;
import com.aakash.org.util.request.MessageRequest;
import com.aakash.org.util.request.SenderRequest;
import com.aakash.org.util.response.ChatList;
import com.aakash.org.util.response.ChatResponse;
import com.aakash.org.util.response.UsersList;

@Service
public class ChatService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ChatRepository chatRepository;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	// add a message
	
	public String addMessage(String token, MessageRequest messageRequest) {
		String message;
		User reciever = userRepository.findByUserName(messageRequest.getUsername()).orElse(null);
		String username = jwtTokenUtil.extractUsername(token);
		User sender = userRepository.findByUserName(username).orElse(null);
		if(messageRequest.getMessage()!="" && sender!=null) {
			Chat chat = Mapper.mapToChat(messageRequest, sender, reciever);
			chatRepository.save(chat);
			message = "Massage sent";
		}else {
			message = "Invalid massage or sender address";
		}
		return message;
	}
	
	// get message history
	@Transactional
	public ChatList getMassageHistory(SenderRequest senderRequest, String token) {
		User sender = userRepository.findByUserName(senderRequest.getUsername()).orElse(null);
		String username = jwtTokenUtil.extractUsername(token);
		User user = userRepository.findByUserName(username).orElse(null);
		ChatList chatList = new ChatList(new ArrayList<>());
		System.out.println("outside loop");
		if(user!=null && sender!=null) {
			List<Chat> chats = chatRepository.findBySenderReciever(user.getId(), sender.getId());
			System.out.println("Inside if");
			if(chats != null) {
				for(Chat chat: chats) {
					System.out.println("Inside for");
					chatList.getChatlist().add(new ChatResponse(chat.getMessage(), chat.getSender().getUserName()));
				}
			}
		}
		return chatList;
	}
	
	// get user by username
	
	public UsersList getAllUsers(String token) {
		List<User> users = userRepository.findAll();
		UsersList userList = new UsersList(new ArrayList<>());
		String username = jwtTokenUtil.extractUsername(token);
		if(users != null) {
			for(User user: users) {
				if(!user.getUserName().equalsIgnoreCase(username)) {
					userList.getUsers().add(user.getUserName());
				}
			}
		}
		return userList;
	}

}
