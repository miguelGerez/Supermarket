package com.supermercado.service;

import java.util.List;

import com.supermercado.model.Local;

public interface LocalService {

	Local register(Local p) throws Exception;

	Local modify(Local p) throws Exception;

	List<Local> list() throws Exception;

	void delete(Integer id) throws Exception;


}
