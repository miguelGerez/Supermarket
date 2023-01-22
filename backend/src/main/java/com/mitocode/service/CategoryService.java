package com.mitocode.service;

import java.util.List;

import com.mitocode.dto.CategoryDTO;
import com.mitocode.model.Category;

public interface CategoryService  {

		Category register(Category p) throws Exception;

		Category modify(Category p) throws Exception;

		List<Category> list() throws Exception;
		
		void delete(Integer id) throws Exception;
		
		List<CategoryDTO> listProductsCountByCategory() throws Exception;

}
