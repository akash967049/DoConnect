package com.aakash.org.exceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.aakash.org.customException.InvalidUserNamePasswordException;
import com.aakash.org.customException.UserAlreadyExistsException;

@ControllerAdvice
public class ExceptionController {

	@ExceptionHandler(value = UserAlreadyExistsException.class)
	public ResponseEntity<String> userAlreadyExistsExceptionHandler(UserAlreadyExistsException exception) {
		return new ResponseEntity<String>(exception.getMessage().toString(), HttpStatus.CONFLICT);
	}

	@ExceptionHandler(value = InvalidUserNamePasswordException.class)
	public ResponseEntity<String> InvalidUserNamePasswordExceptionHandler(InvalidUserNamePasswordException exception) {
		return new ResponseEntity<String>(exception.getMessage().toString(), HttpStatus.UNAUTHORIZED);
	}

}
