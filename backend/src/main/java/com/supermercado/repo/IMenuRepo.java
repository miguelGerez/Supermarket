package com.supermercado.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supermercado.model.Menu;

public interface IMenuRepo extends IGenericRepo<Menu, Integer> {

	@Query(value = "select m.* from menu_rol mr inner join user_rol ur on ur.id_rol = mr.id_rol inner join menu m on m.id_menu = mr.id_menu inner join user u on u.id_user = ur.id_user where u.username = :name", nativeQuery = true)
	List<Menu> listMenusByUser(@Param("name") String name);

}
