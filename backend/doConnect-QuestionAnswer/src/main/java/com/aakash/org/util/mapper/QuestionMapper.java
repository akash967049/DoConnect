package com.aakash.org.util.mapper;


import com.aakash.org.entity.Question;
import com.aakash.org.entity.User;
import com.aakash.org.util.request.QuestionRequest;
import com.aakash.org.util.response.QuestionResponse;

public class QuestionMapper {
	
	public static Question mapQuestionRequest(QuestionRequest questionRequest,User user) {
		Question question = Question.builder()
				.topic(questionRequest.getTopic())
				.description(questionRequest.getDescription())
				.user(user)
				.isApproved(false)
				.build();
		return question;
	}
	
	public static QuestionResponse mapQuestion(Question question, User user) {
		QuestionResponse questionResponse = QuestionResponse.builder()
				.id(question.getId())
				.username(user.getUserName())
				.topic(question.getTopic())
				.description(question.getDescription())
				.build();
		return questionResponse;
	}

}
