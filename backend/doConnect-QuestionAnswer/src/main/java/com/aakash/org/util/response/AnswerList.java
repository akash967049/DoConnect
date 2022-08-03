package com.aakash.org.util.response;

/*
 * @Author - Aakash Verma
 */

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class AnswerList {
	
	List<AnswerResponse> answers = new ArrayList<>();
	
	public AnswerList(){
		this.answers = new ArrayList<>();
	}

}
