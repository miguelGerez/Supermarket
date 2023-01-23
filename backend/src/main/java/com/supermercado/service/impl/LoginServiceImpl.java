package com.supermercado.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.supermercado.model.Account;
import com.supermercado.repo.ILoginRepo;
import com.supermercado.service.ILoginService;

@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private BCryptPasswordEncoder bcrypt;

	@Autowired
	private ILoginRepo repo;

	@Override
	public Account checkUsername(String username) {
		return repo.checkUsername(username);
	}

	@Override
	public void changePassword(String password, String username) {
		repo.changePassword(bcrypt.encode(password), username);
	}

}
