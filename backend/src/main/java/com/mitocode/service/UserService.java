package com.mitocode.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.mitocode.model.User;

public interface UserService  {

	
		UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

		User register(User user) throws Exception;

		User modify(User user) throws Exception;

		List<User> list() throws Exception;

		User findById(Integer id) throws Exception;
		
		List<User> findBySpecialization(Integer id) throws Exception;

		void delete(Integer id) throws Exception;
	
}
