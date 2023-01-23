package com.supermercado.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.supermercado.model.Account;

public interface AccountService {

	UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

	Account register(Account user) throws Exception;

	Account modify(Account user) throws Exception;

	List<Account> list() throws Exception;

	Account findById(Integer id) throws Exception;

	List<Account> findBySpecialization(Integer id) throws Exception;

	void delete(Integer id) throws Exception;

}
