package com.aakash.org.util.mapper;

/*
 * @Author - Aakash Verma
 */

import com.aakash.org.entity.Chat;
import com.aakash.org.entity.User;
import com.aakash.org.util.request.MessageRequest;

public class Mapper {
	
	public static Chat mapToChat(MessageRequest messageRequest, User sender, User reciever) {
		
		Chat chat = Chat.builder()
				.message(messageRequest.getMessage())
				.sender(sender)
				.reciever(reciever).build();
		return chat;
		
	}

}
