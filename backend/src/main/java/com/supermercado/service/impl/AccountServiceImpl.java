package com.supermercado.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.supermercado.model.Account;
import com.supermercado.repo.IAccountRepo;

@Service
public class AccountServiceImpl implements UserDetailsService {

	@Autowired
	private IAccountRepo repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Account user = repo.findOneByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException(String.format("Usuario no existe", username));
		}

		List<GrantedAuthority> roles = new ArrayList<>();

		user.getRoles().forEach(rol -> {
			roles.add(new SimpleGrantedAuthority(rol.getName()));
		});

		UserDetails ud = new User(user.getUsername(), user.getPassword(), user.isEnabled(), true, true, true,
				roles);

		return ud;

	}

}
