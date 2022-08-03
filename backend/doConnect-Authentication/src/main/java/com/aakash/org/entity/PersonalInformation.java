package com.aakash.org.entity;

/*
 * @Author - Aakash Verma
 */

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "personalinformation")
public class PersonalInformation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String firstName;
	private String middleName;
	private String lastName;
	private char gender;
	private String email;
	private String phone;
	private String dateOfBirth;
	private String address;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "personalInformation")
	private User user;

	public PersonalInformation(String firstName, String middleName, String lastName, char gender, String email,
			String phone, String dateOfBirth, String address) {
		super();
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.gender = gender;
		this.email = email;
		this.phone = phone;
		this.dateOfBirth = dateOfBirth;
		this.address = address;
	}

	@Override
	public String toString() {
		return "StudentPersonalInformation [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", email=" + email + ", phone=" + phone + ", dateOfBirth=" + dateOfBirth + ", address=" + address
				+ "]";
	}

}
