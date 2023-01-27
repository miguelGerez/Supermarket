package com.supermercado.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supermercado.model.Product;

public interface IProductRepo extends JpaRepository<Product, Integer> {

	@Query(value = "SELECT * FROM product WHERE brand_id = :id", nativeQuery = true)
	List<Product> listByBrand(@Param("id") Integer id);

	@Query(value = "SELECT * FROM product WHERE category_id = :id", nativeQuery = true)
	List<Product> listByCategory(@Param("id") Integer id);

	@Query(value = "SELECT * FROM product WHERE category_id = :idCategory and brand_id = :idBrand", nativeQuery = true)
	List<Product> listByCategoryAndBrand(@Param("idBrand") Integer idBrand, @Param("idCategory") Integer idCategory);

	@Query(value = "SELECT * FROM product WHERE bard_code = :string", nativeQuery = true)
	Product listByBarCode(@Param("string") String string);

	@Query(value = "SELECT * FROM product WHERE quick_access = true", nativeQuery = true)
	List<Product> listByQuickAccess();

	@Query(value = "SELECT p.* FROM product_provider pp INNER JOIN product p ON p.product_id = pp.product_id INNER JOIN provider ppp ON ppp.provider_id = pp.provider_id WHERE ppp.provider_id = :id", nativeQuery = true)
	List<Product> listByProvider(@Param("id") Integer id);

	@Query(value = "SELECT * FROM product WHERE sale_price IS NULL", nativeQuery = true)
	List<Product> listByNoPrice();

	@Query(value = "SELECT * FROM product WHERE LOWER(name) LIKE CONCAT('%', :string, '%') OR bard_code = :string", nativeQuery = true)
	List<Product> listByAutoComplete(@Param("string") String string);

}
