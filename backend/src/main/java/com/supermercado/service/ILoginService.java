package com.supermercado.service;

import com.supermercado.model.Account;

public interface ILoginService {

	Account checkUsername(String username);

	void changePassword(String passowrd, String username);
}
