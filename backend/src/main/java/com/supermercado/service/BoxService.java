package com.supermercado.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.supermercado.model.Box;



public interface BoxService {

	Box register(Box p) throws Exception;

	Box modify(Box p) throws Exception;

	List<Box> list() throws Exception;

	void delete(Integer id) throws Exception;
	
	Box listByBarCode(@Param("string") String string);

	Box listById(Integer id) throws Exception;
	

}
