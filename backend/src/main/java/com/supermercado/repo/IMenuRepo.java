package com.supermercado.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supermercado.model.Menu;

public interface IMenuRepo extends IGenericRepo<Menu, Integer> {

	@Query(value = "select m.* from menu_roles mr\r\n"
			+ "inner join account_roles ar\r\n"
			+ "on ar.role_id = mr.role_id\r\n"
			+ "inner join menu m on m.id = mr.menu_id\r\n"
			+ "inner join account a on a.id = ar.account_id\r\n"
			+ "where a.username = :name", nativeQuery = true)
	List<Menu> listMenusByUser(@Param("name") String name);

}
