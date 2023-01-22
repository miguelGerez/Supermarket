package com.supermercado.service;

import java.util.List;

import com.supermercado.model.Provider;

public interface ProviderService  {


	Provider register(Provider p) throws Exception;

	Provider modify(Provider p) throws Exception;
	
	List<Provider> list() throws Exception;
	
	void delete(Integer id) throws Exception;
	
		
}
