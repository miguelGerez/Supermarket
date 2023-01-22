package com.supermercado.service;

import java.util.List;

import com.supermercado.model.Role;

public interface IRolService  {


		Role registrar(Role p) throws Exception;

		Role modificar(Role p) throws Exception;

		List<Role> listar() throws Exception;
		
		List<Role> listarSinProgramador() throws Exception;

		Role ListarPorId(Integer id) throws Exception;

		void eliminar(Integer id) throws Exception;
}
