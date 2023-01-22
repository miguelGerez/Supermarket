package com.mitocode.service;

import com.mitocode.model.User;

public interface ILoginService {

	User verificarNombreUsuario(String usuario);
	void cambiarClave(String clave, String nombre);
}
