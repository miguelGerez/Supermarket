package com.supermercado.service;

import java.util.List;

import com.supermercado.model.Product;

public interface ProductService  {

		Product register(Product p) throws Exception;

		Product modify(Product p) throws Exception;

		Product listById(Integer id) throws Exception;
		
		Product listByBarCode(String string) throws Exception;
		
		List<Product> list() throws Exception;

		List<Product> listByCategoryAndBrand(Integer idBrand, Integer idCategory);

		List<Product> listByCategory(Integer id);

		List<Product> listByBrand(Integer id);

		List<Product> listByQuickAccess();

		List<Product> listByNoPrice();
		
		List<Product> listByProvider(Integer id);
		
		List<Product> listByAutoComplete(String string) throws Exception;

		void delete(Integer id) throws Exception;

}
