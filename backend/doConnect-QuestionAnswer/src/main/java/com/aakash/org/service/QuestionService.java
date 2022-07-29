package com.aakash.org.service;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aakash.org.entity.Question;
import com.aakash.org.entity.User;
import com.aakash.org.repository.QuestionRepository;
import com.aakash.org.repository.UserRepository;
import com.aakash.org.util.JwtUtil;
import com.aakash.org.util.mapper.QuestionMapper;
import com.aakash.org.util.request.IdRequest;
import com.aakash.org.util.request.QuestionRequest;
import com.aakash.org.util.request.SearchRequest;
import com.aakash.org.util.response.AnswerList;
import com.aakash.org.util.response.AnswerResponse;
import com.aakash.org.util.response.QuestionList;
import com.aakash.org.util.response.QuestionResponse;

@Service
public class QuestionService {
	
	@Autowired
	private QuestionRepository questionRepository;
		
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EntityManager entityManger;
	
	@Autowired
	private AnswerService answerService;
	
	@Autowired
	private EmailSenderService emailSenderService;
	
	@Autowired
	private ImageModalService imageModalService;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	
	// Add a question
	
	public String addQuestion(QuestionRequest questionRequest, String token) {
		
		String username = jwtTokenUtil.extractUsername(token);

		User user = userRepository.findByUserName(username).orElse(null);
		Question question = QuestionMapper.mapQuestionRequest(questionRequest, user);
		questionRepository.save(question);
		emailSenderService.requestToApproveQuestion(username, question);
		return "Q"+question.getId();
	}
	
	// get a question by id
	
	@Transactional
	public QuestionResponse searchQuestionById(IdRequest idRequest) {
		int id= idRequest.getId();
		Question question = questionRepository.findById(id).orElse(null);
		QuestionResponse questionResponse=null;
		if(question!=null) {
			questionResponse = QuestionMapper.mapQuestion(question, question.getUser());
		}
		return questionResponse;
	}
	
	// search question
	@Transactional
	public QuestionList searchQuestionByDiscription(SearchRequest searchRequest) {
		String sqlQuery = "from Question where (description like : description) and isApproved = 1";
		QuestionList questionList = new QuestionList();
		
		List<Question> questions = (entityManger
				.createQuery(sqlQuery, Question.class)
				.setParameter("description","%" + searchRequest.getSearchtext() + "%")
				.getResultList());
		if(questions!=null && questions.size()!=0) {
			for(Question ques: questions) {
				questionList.getQuestions().add(QuestionMapper.mapQuestion(ques, ques.getUser()));
			}
			return questionList;
		}else {
			return null;
		}
		
	}
	
	// search question by Topic
	
	@Transactional
	public QuestionList searchQuestionByTopic(SearchRequest searchRequest) {
		List<Question> questions;
		if(searchRequest.getSearchtext().equalsIgnoreCase("ALL")) {
			questions = questionRepository.findByIsApproved();
		}else {
			questions = questionRepository.findByTopicAndApproved(searchRequest.getSearchtext());
		}
		QuestionList questionList = new QuestionList();
		if(questions!=null && questions.size()!=0) {
			for(Question ques: questions) {
				questionList.getQuestions().add(QuestionMapper.mapQuestion(ques, ques.getUser()));
			}
			return questionList;
		}else {
			return null;
		}
	}
	
	// get unapproved question
	
	@Transactional
	public QuestionList getUnapprovedQuestion() {
		List<Question> questions = questionRepository.findByIsUnapproved();
		QuestionList questionList = new QuestionList();
		if(questions!=null && questions.size()!=0) {
			for(Question ques: questions) {
				questionList.getQuestions().add(QuestionMapper.mapQuestion(ques, ques.getUser()));
			}
			return questionList;
		}else {
			return null;
		}
		
	}
	
	// Approve a question
	
	public String getQuestionApproved(IdRequest idRequest) {
		Question question = questionRepository.findById(idRequest.getId()).orElse(null);
		if(question!=null) {
			question.setIsApproved(true);
			questionRepository.save(question);
			return "Question Approved";
		}else {
			return "Question not found";
		}
	}
	
	// delete a question
	
	public String deleteQuestion(IdRequest idRequest) {
		int id = idRequest.getId();
		Question question = questionRepository.findById(id).orElse(null);
		if(question!=null) {
			
			// delete all the question related to this Question
			
			AnswerList answerList = answerService.getAllAnswerByQuestionId(new IdRequest(question.getId()));
			if(answerList!=null) {
				for(AnswerResponse ans: answerList.getAnswers()) {
					answerService.deleteAnswer(new IdRequest(ans.getId()));
				}		
			}
			imageModalService.deleteImage("Q"+question.getId());
			questionRepository.delete(question);
			return "Question Deleted";
		}else {
			return "Question not found";
		}
	}
	
	

}
