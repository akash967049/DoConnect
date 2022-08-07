package com.aakash.org.service;

/*
 * @Author - Aakash Verma
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.aakash.org.entity.Answer;
import com.aakash.org.entity.Question;
import com.aakash.org.util.Variables;

@Service
public class EmailSenderService {
	
	@Autowired
	private JavaMailSender mailSender;
	
	// Send email method 
	
	public void sendEmail(String toEmail, String body, String subject) {
		
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom("akash967049@gmail.com");
		message.setTo(toEmail);
		message.setText(body);
		message.setSubject(subject);
		
		mailSender.send(message);
		
		System.out.println("Mail Sent ....");
		
	}
	
	// Send email for question approval
	
	public void requestToApproveQuestion(String username, Question question) {
		String body = "Hey Aakash Verma!\n Some activity on your doConnect application\n\n"+
	username+" has asked a question on topic "+question.getTopic()+
	". Approve his question so that it is visible on the DoConnect to other users\n\nHave a Good day.";
		
		String subject = "Question asked on DoConnect, approve it!";
		new Thread(() -> this.sendEmail(Variables.emaiUsername, body, subject));
	}
	
	// send email for answer approval
	
	public void requestToApproveAnswer(String username, Answer answer) {
		String body = "Hey Aakash Verma!\n Some activity on your doConnect application\n\n"+
	username+" has given an answer. Approve his Answer so that it is visible on the DoConnect to other users\n\nHave a Good day.";
		
		String subject = "Answer given on DoConnect, approve it!";
		new Thread(() -> this.sendEmail(Variables.emaiUsername, body, subject)).start();;
	}

}
