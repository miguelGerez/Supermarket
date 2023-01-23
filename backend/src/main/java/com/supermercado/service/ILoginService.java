package com.supermercado.service;

import com.supermercado.model.User;

public interface ILoginService {

	User checkUsername(String username);

	void changePassword(String passowrd, String username);
}
