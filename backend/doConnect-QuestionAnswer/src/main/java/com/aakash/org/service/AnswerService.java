package com.aakash.org.service;

/*
 * @Author - Aakash Verma
 */

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.aakash.org.entity.Answer;
import com.aakash.org.entity.Question;
import com.aakash.org.entity.User;
import com.aakash.org.repository.AnswerRepository;
import com.aakash.org.repository.QuestionRepository;
import com.aakash.org.repository.UserRepository;
import com.aakash.org.util.JwtUtil;
import com.aakash.org.util.mapper.AnswerMapper;
import com.aakash.org.util.request.AnswerRequest;
import com.aakash.org.util.request.IdRequest;
import com.aakash.org.util.request.SearchRequest;
import com.aakash.org.util.response.AnswerList;
import com.aakash.org.util.response.AnswerResponse;

@Service
public class AnswerService {

	@Autowired
	private AnswerRepository answerRepository;

	@Autowired
	private QuestionRepository questionRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EntityManager entityManger;

	@Autowired
	private EmailSenderService emailSenderService;

	@Autowired
	private ImageModalService imageModalService;

	@Autowired
	private JwtUtil jwtTokenUtil;

	// To add question

	public String addAnswer(AnswerRequest answerRequest, MultipartFile file, String token) {
		String username = jwtTokenUtil.extractUsername(token);
		User user = userRepository.findByUserName(username).orElse(null);
		Question question = questionRepository.findById(answerRequest.getQuestionId()).orElse(null);
		if (user != null && question != null) {
			Answer answer = AnswerMapper.mapAnswerRequest(answerRequest, user, question);
			answerRepository.save(answer);
			emailSenderService.requestToApproveAnswer(username, answer);

			String massage = "Answer uploded Successfully";
			AnswerList unapprovedAnswers = this.getUnapprovedAnswers();
			if (file != null) {
				AnswerResponse ansResponse = null;
				for (AnswerResponse ans : unapprovedAnswers.getAnswers()) {
					if (ans.getDescription().equals(answerRequest.getDescription())) {
						ansResponse = ans;
					}
				}
				if (!file.isEmpty()) {
					System.out.println("It is not empty file");
					try {
						String name = "a" + ansResponse.getId();
						massage += "\n" + imageModalService.uplaodImage(file, name);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						System.out.println(("some error occured in uploding image"));
						e.printStackTrace();
						massage += "\nerror in uploading image";
					}
				}
			}
			return massage;
		} else {
			return "Solution Not Added Succefully";
		}
	}

	// to get Answer of a question only approved once

	@Transactional
	public AnswerList getAnswerByQuestionId(IdRequest idRequest) {

		int questionId = idRequest.getId();
		List<Answer> answers = answerRepository.findByQuestionId(questionId);
		Question question = questionRepository.findById(questionId).orElse(null);
		if (question != null && answers != null && answers.size() != 0) {
			AnswerList answersResponse = new AnswerList();
			for (Answer ans : answers) {
				answersResponse.getAnswers().add(AnswerMapper.mapAnswer(ans, question, ans.getUser()));
			}
			return answersResponse;
		} else {
			return null;
		}

	}

	// to get Answer of a question both approved and non approved

	@Transactional
	public AnswerList getAllAnswerByQuestionId(IdRequest idRequest) {

		int questionId = idRequest.getId();
		List<Answer> answers = answerRepository.findByQuestionId(questionId);
		Question question = questionRepository.findById(questionId).orElse(null);
		if (question != null && answers != null && answers.size() != 0) {
			AnswerList answersResponse = new AnswerList();
			for (Answer ans : answers) {
				answersResponse.getAnswers().add(AnswerMapper.mapAnswer(ans, question, ans.getUser()));
			}
			return answersResponse;
		} else {
			return null;
		}

	}

	// get approved answer

	public String getAnswerApproved(IdRequest idRequest) {

		int id = idRequest.getId();
		Answer answer = answerRepository.findById(id).orElse(null);
		if (answer != null) {
			answer.setIsApproved(true);
			answerRepository.save(answer);
			return "Answer Approved";
		} else {
			return "Answer not found";
		}
	}

	// Delete a Answer

	public String deleteAnswer(IdRequest idRequest) {
		int id = idRequest.getId();
		Answer answer = answerRepository.findById(id).orElse(null);
		if (answer != null) {
			imageModalService.deleteImage("a" + answer.getId());
			answerRepository.delete(answer);
			return "Answer Deleted";
		} else {
			return "Answer not found";
		}
	}

	// get list of unapproved answers

	@Transactional
	public AnswerList getUnapprovedAnswers() {
		List<Answer> answers = answerRepository.findByIsUnapproved();
		if (answers != null && answers.size() != 0) {
			AnswerList answersResponse = new AnswerList();
			for (Answer ans : answers) {
				answersResponse.getAnswers().add(AnswerMapper.mapAnswer(ans, ans.getQuestion(), ans.getUser()));
			}
			return answersResponse;
		} else {
			return null;
		}

	}

	// search answer
	@Transactional
	private AnswerList searchAnswerByDiscription(SearchRequest searchRequest) {
		String sqlQuery = "from Answer where (description like : description)";
		AnswerList answerList = new AnswerList();

		List<Answer> answers = (entityManger.createQuery(sqlQuery, Answer.class)
				.setParameter("description", "%" + searchRequest.getSearchtext() + "%").getResultList());
		if (answers != null && answers.size() != 0) {
			for (Answer ans : answers) {
				answerList.getAnswers().add(AnswerMapper.mapAnswer(ans, ans.getQuestion(), ans.getUser()));
			}
			return answerList;
		} else {
			return null;
		}

	}

}
