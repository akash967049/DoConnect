package com.aakash.org.util.response;

/*
 * @Author - Aakash Verma
 */

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AnswerResponse {
	
	
	private int id;
	private String username;
	private String description;
	private int questionId;

}
