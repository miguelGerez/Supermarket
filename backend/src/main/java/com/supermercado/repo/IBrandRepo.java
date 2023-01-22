package com.supermercado.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supermercado.model.Brand;



public interface IBrandRepo extends JpaRepository<Brand, Integer> {
	
	//@Query(JPQL)
	
	@Query(value ="Select count(*) FROM producto where marca_id = :id", nativeQuery = true)
	Integer listarCantidadDeProductosPorMarca(@Param("id") Integer id);
	
}
