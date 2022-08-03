package com.aakash.org.service;

/*
 * @Author - Aakash Verma
 */

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aakash.org.customException.InvalidUserNamePasswordException;
import com.aakash.org.customException.UserAlreadyExistsException;
import com.aakash.org.entity.PersonalInformation;
import com.aakash.org.entity.User;
import com.aakash.org.repository.PersonalInformationRepository;
import com.aakash.org.repository.UserRepository;
import com.aakash.org.util.JwtUtil;
import com.aakash.org.util.request.AuthenticationRequest;
import com.aakash.org.util.request.SignupRequest;
import com.aakash.org.util.response.ListOfUsersResponse;
import com.aakash.org.util.mapper.Mapper;

@Service
public class UserService {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private MyUserDetailsService myUserDetailsService;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PersonalInformationRepository pIR;
	
	// Get user Role details
	
	public String getUserRoles(String jwt) {
		String username = jwtTokenUtil.extractUsername(jwt);
		User user = userRepository.findByUserName(username).orElse(null);
		return user.getAuthorities();
	}

	// Authenticate user and provide jwt Token if credentials are correct

	public String login(AuthenticationRequest authenticationRequest) throws InvalidUserNamePasswordException {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new InvalidUserNamePasswordException("Incorrect username or password");
		}
		UserDetails userDetails = myUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		String jwt = jwtTokenUtil.generateToken(userDetails);
		String username = jwtTokenUtil.extractUsername(jwt);
		User user = userRepository.findByUserName(username).orElse(null);
		System.out.println(jwt);
		if(user != null) {
			user.setSession(true);
			userRepository.save(user);
		}
		return jwt;
	}

	// Signup a new user

	@Transactional
	public String signup(SignupRequest signupRequest) throws UserAlreadyExistsException {

		String username = signupRequest.getUsername();
		User checkuser = userRepository.findByUserName(username).orElse(null);

		if (checkuser == null) {
			// Create new user
			User user = Mapper.mapToUser(signupRequest);

			PersonalInformation perInfo = Mapper.mapToPersonalInformation(signupRequest);
			user.setPersonalInformation(perInfo);
			userRepository.save(user);

		} else {
			throw new UserAlreadyExistsException(username);
		}

		return "Account created succesfully";
	}
	
	// logout from device
	
	public String logout(String token) {
		
		String username = jwtTokenUtil.extractUsername(token);
		User user = userRepository.findByUserName(username).orElse(null);
		if(user != null) {
			user.setSession(false);
			userRepository.save(user);
		}
		
		return "Succesfully logged out";
	}
	
	// Delete a user from the system by token
	
	public String deleteUser(String token) {
		String username = jwtTokenUtil.extractUsername(token);
		String message = this.deleteUserByUserName(username);
		return message;
	}

	// Delete a user from the system by username
	
	public String deleteUserByUserName(String username) {
		User user = userRepository.findByUserName(username).orElse(null);
		String message;
		if(user != null && user.getAuthorities().equalsIgnoreCase("user")) {
			PersonalInformation pi = pIR.findById(user.getId());
			userRepository.delete(user);
			pIR.delete(pi);
			message = "Account deleted successfully";
		}else if(!user.getAuthorities().equalsIgnoreCase("user")) {
			message = "Admin account can not be deleted";
		}else {
			message = "Account not deleted";
		}
		return message;
	}
	
	// Return list of all users
	
	public ListOfUsersResponse getAllUsers(String authority) {
		List<User> users = userRepository.findAllByAuthorities(authority);
		ListOfUsersResponse responce = new ListOfUsersResponse(new ArrayList<>());
		for (User user: users) {
			responce.getAllUsers().add(user.getUserName());
			
		}
		return responce;
	}

}
