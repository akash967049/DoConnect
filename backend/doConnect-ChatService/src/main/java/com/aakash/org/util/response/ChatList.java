package com.aakash.org.util.response;

/*
 * @Author - Aakash Verma
 */

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChatList {
	
	List<ChatResponse> chatlist;

}
