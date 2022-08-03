package com.aakash.org.util.response;

/*
 * @Author - Aakash Verma
 */

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
public class ChatResponse {
	
	private String message;
	private String sender;

}
