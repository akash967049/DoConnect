package com.aakash.org.repository;

/*
 * @Author - Aakash Verma
 */

import org.springframework.data.jpa.repository.JpaRepository;

import com.aakash.org.entity.PersonalInformation;

public interface PersonalInformationRepository extends JpaRepository<PersonalInformation, Integer> {

	PersonalInformation findById(int id);

}
