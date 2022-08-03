package com.aakash.org.util.mapper;

/*
 * @Author - Aakash Verma
 */

import com.aakash.org.entity.Answer;
import com.aakash.org.entity.Question;
import com.aakash.org.entity.User;
import com.aakash.org.util.request.AnswerRequest;
import com.aakash.org.util.response.AnswerResponse;

public class AnswerMapper {
	
	public static Answer mapAnswerRequest(AnswerRequest answerRequest, User user, Question question) {
		Answer answer = Answer.builder()
				.user(user)
				.description(answerRequest.getDescription())
				.question(question)
				.isApproved(false)
				.build();
		
		return answer;
	}
	
	public static AnswerResponse mapAnswer(Answer answer, Question question, User user) {
		AnswerResponse answerResponse = AnswerResponse.builder()
				.id(answer.getId())
				.username(user.getUserName())
				.description(answer.getDescription())
				.questionId(question.getId())
				.build();
		return answerResponse;
	}

}
