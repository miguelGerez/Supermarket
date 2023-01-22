package com.mitocode.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mitocode.model.Category;

public interface ICategoryRepo extends JpaRepository<Category, Integer> {
	
	//@Query(JPQL)
	
	@Query(value ="select Category.*, count(product) as cantidad from Category\r\n"
			+ "inner join producto on producto.Category_id = Category.id\r\n"
			+ "GROUP BY  Category.nombre, Category.id\r\n"
			+ "order by cantidad DESC limit 20", nativeQuery = true)
	List<Object[]> listProductsCountByCategory();
	
}
