package com.aakash.org.util.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SignupRequest {

	private String firstName;
	private String middleName;
	private String lastName;
	private String username;
	private String password;
	private String gender;
	private String email;
	private String phone;

}
