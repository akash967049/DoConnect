package com.aakash.org.repository;

/*
 * @Author - Aakash Verma
 */

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aakash.org.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUserName(String userName);
	
	@Query("from User where (authorities = ?1) and (active = true) order by id")
	List<User> findAllUsers(String role);

}
