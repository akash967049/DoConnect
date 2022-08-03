package com.aakash.org.util.mapper;

/*
 * @Author - Aakash Verma
 */

import com.aakash.org.entity.PersonalInformation;
import com.aakash.org.entity.User;
import com.aakash.org.util.request.SignupRequest;
import com.aakash.org.util.response.UserInformationResponse;

public class Mapper {

	public static User user;

	public static PersonalInformation perInfo;
	
	public static UserInformationResponse userInfo;

	public static User mapToUser(SignupRequest signupRequest) {
		user = User.builder().userName(signupRequest.getUsername()).password(signupRequest.getPassword()).active(true)
				.authorities("user").build();

		return user;
	}

	public static PersonalInformation mapToPersonalInformation(SignupRequest signupRequest) {
		perInfo = PersonalInformation.builder().firstName(signupRequest.getFirstName())
				.middleName(signupRequest.getMiddleName()).lastName(signupRequest.getLastName())
				.phone(signupRequest.getPhone()).email(signupRequest.getEmail()).gender(mapGender(signupRequest.getGender()))
				.build();

		return perInfo;
	}
	
	public static UserInformationResponse mapToUserInformationResponse(PersonalInformation pi, User user) {
		userInfo = UserInformationResponse.builder()
				.username(user.getUserName())
				.firstname(pi.getFirstName())
				.middlename(pi.getMiddleName())
				.lastname(pi.getLastName())
				.gender(pi.getGender())
				.phone(pi.getPhone())
				.email(pi.getEmail())
				.dateofbirth(pi.getDateOfBirth())
				.address(pi.getAddress()).build();
		
		return userInfo;
	}
	
	private static char mapGender(String gender) {
		char gen= 'N';
		if(gender!=null) {
			gen = gender.charAt(0);
		}
		return gen;
	}

}
