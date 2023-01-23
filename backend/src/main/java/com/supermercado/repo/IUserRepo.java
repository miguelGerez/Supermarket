package com.supermercado.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supermercado.model.User;

public interface IUserRepo extends JpaRepository<User, Integer>  {

	//select * from user where username = ?
	User findOneByUsername(String username);	
	
	@Query(value = "UPDATE User SET enabled = :enabled WHERE user_id = :id", nativeQuery = true)
    User changeStatus(@Param("id") Integer id, @Param("enabled") Boolean enabled);
	
	/*
	@Query(value ="select * from user_Category uc\r\n"
			+ "inner join user u on u.id_user = uc.id_user\r\n"
			+ "inner join Category c on c.id_Category = uc.id_rol\r\n"
			+ "where c.id_Category = :id", nativeQuery = true)
	List<User> ListarPorEspecialidad(@Param("id") Integer id);
	*/
	

}
