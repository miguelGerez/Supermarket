package com.supermercado.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.supermercado.model.User;
import com.supermercado.repo.IUserRepo;

@Service
public class UserServiceImpl implements UserDetailsService {

	@Autowired
	private IUserRepo repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = repo.findOneByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException(String.format("Usuario no existe", username));
		}

		List<GrantedAuthority> roles = new ArrayList<>();

		user.getRoles().forEach(rol -> {
			roles.add(new SimpleGrantedAuthority(rol.getName()));
		});

		UserDetails ud = (UserDetails) new User();

		return ud;

	}

}
