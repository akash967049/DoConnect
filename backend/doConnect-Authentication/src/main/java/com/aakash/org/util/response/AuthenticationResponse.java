package com.aakash.org.util.response;

/*
 * @Author - Aakash Verma
 */

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticationResponse {

	private final String jwt;
}
