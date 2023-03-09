package com.supermercado.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.supermercado.model.Box;


public interface IBoxRepo extends JpaRepository<Box, Integer> {

	// @Query(JPQL)
	
	@Query(value = "SELECT * FROM product WHERE bard_code = :string", nativeQuery = true)
	Box listByBarCode(@Param("string") String string);


}
