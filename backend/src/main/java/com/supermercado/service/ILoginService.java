package com.supermercado.service;

import com.supermercado.model.User;

public interface ILoginService {

	User checkUsername(String user);
	
	void changePassword(String clave, String nombre);
}
