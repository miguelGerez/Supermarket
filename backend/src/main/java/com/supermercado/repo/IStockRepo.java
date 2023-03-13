package com.supermercado.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supermercado.model.Stock;

public interface IStockRepo extends JpaRepository<Stock, Integer> {
	
	@Query(value = "select * from stock where product_id = :id", nativeQuery = true)
	Stock listByProduct(@Param("id") Integer id);


}
