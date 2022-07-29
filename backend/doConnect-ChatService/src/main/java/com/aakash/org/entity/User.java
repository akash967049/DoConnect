package com.aakash.org.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "username")
	private String userName;

	@Column(name = "password")
	private String password;

	private boolean active;
	
	private boolean session;

	private String authorities;


	public User(String userName, String password, boolean active, String authorities) {
		this.userName = userName;
		this.password = password;
		this.active = true;
		this.authorities = authorities;
	}
}
