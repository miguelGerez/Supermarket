package com.mitocode.service;

import java.util.List;

import com.mitocode.model.Provider;

public interface ProviderService  {


	Provider registrar(Provider p) throws Exception;

	Provider modificar(Provider p) throws Exception;

		List<Provider> listar() throws Exception;
		
		void eliminar(Integer id) throws Exception;
	
		
}
