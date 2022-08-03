package com.aakash.org.service;

/*
 * @Author - Aakash Verma
 */

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aakash.org.entity.PersonalInformation;
import com.aakash.org.entity.User;
import com.aakash.org.repository.PersonalInformationRepository;
import com.aakash.org.repository.UserRepository;
import com.aakash.org.util.JwtUtil;
import com.aakash.org.util.mapper.Mapper;
import com.aakash.org.util.response.UserInformationResponse;

@Service
public class PersonalInformationService {

	@Autowired
	private PersonalInformationRepository pIR;
	
	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private UserRepository userRepository;

	// add new student Personal Information

	public PersonalInformation addPI(PersonalInformation personalInformation) {
		return pIR.save(personalInformation);
	}

	// Get student Personal Information by id
	public PersonalInformation getPIById(int id) {
		return pIR.findById(id);
	}

	// delete a student Personal Information by id

	public String removePI(int id) {
		pIR.deleteById(id);
		return "Student Persoanl Information removed at id | " + id;
	}
	
	// Get personal info of user by token
	
	public UserInformationResponse getUserInformation(String token) {
		String username = jwtTokenUtil.extractUsername(token);
		return this.getUserInformationByUsername(username);
		
	}
	
	// Get personal info of user by token
	
		public UserInformationResponse getUserInformationByUsername(String username) {
			User user = userRepository.findByUserName(username).orElse(null);
			if(user!=null) {
				PersonalInformation pi = pIR.findById(user.getId());
				UserInformationResponse userInformationResponse = Mapper.mapToUserInformationResponse(pi, user);
				return userInformationResponse;
			}else {
				return null;
			}
			
		}
	

	// Update student Personal Information record

	public PersonalInformation updateStudentPI(PersonalInformation personalInformation) {
		if (personalInformation.getId() != 0) {
			return pIR.save(personalInformation);
		} else {
			return null;
		}
	}
	
	
	/*
	 * from here different data from userinfo can be updated 
	 * 1 = name of user 
	 * 2 = gender of user 
	 * 3 = phone of user 
	 * 4 = email of user 
	 * 5 = date of birth of user 
	 * 6 = address of user
	 *`
	 */
	
	// Update record one at a time
	
	public String updateoneinfo(String token, String value, int choice) {
		String username = jwtTokenUtil.extractUsername(token);
		String massage = this.updateOneInfoByUsername(username, value, choice);
		return massage;
	}
	
	// Update record one at a time by username
	
	public String updateOneInfoByUsername(String username, String value, int choice) {
		User user = userRepository.findByUserName(username).orElse(null);
		PersonalInformation personalInformation = pIR.findById(user.getId());
		String massage;
		switch (choice) {
		case 1: {
			value =value+"a";
			List<String> name = Arrays.stream(value.split(","))
					.map(String::new)
					.collect(Collectors.toList());
			personalInformation.setFirstName(name.get(0));
			personalInformation.setMiddleName(name.get(1));
			personalInformation.setLastName(name.get(2).substring(0,name.get(2).length()-1));
			massage = "Name";
			break;
		} case 2: {
			personalInformation.setGender(value.charAt(0));
			massage = "Gender";
			break;
		}case 3: {
			personalInformation.setEmail(value);
			massage = "Email";
			break;
		}case 4: {
			personalInformation.setPhone(value);
			massage = "Phone";
			break;
		}case 5: {
			personalInformation.setDateOfBirth(value);
			massage = "Date of birth";
			break;
		}case 6: {
			personalInformation.setAddress(value);
			massage = "Address";
			break;
		}
		default:
			throw new IllegalArgumentException("Unexpected value: " + choice);
		}
		pIR.save(personalInformation);
		return massage+" updated successfully";
	}
	

}
