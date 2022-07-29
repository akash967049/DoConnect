package com.aakash.org.util.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserInformationResponse {
	
	private String username;
	private String firstname;
	private String middlename;
	private String lastname;
	private char gender;
	private String phone;
	private String email;
	private String dateofbirth;
	private String address;
	

}
