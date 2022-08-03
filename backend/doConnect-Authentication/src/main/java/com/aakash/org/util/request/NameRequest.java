package com.aakash.org.util.request;

/*
 * @Author - Aakash Verma
 */

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
public class NameRequest {
	
	private String firstname;
	private String middlename;
	private String lastname;
	

}
