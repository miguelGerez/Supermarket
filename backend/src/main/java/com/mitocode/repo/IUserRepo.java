package com.mitocode.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mitocode.model.User;

public interface IUserRepo extends JpaRepository<User, Integer>  {

	//select * from usuario where username = ?
	User findOneByUsername(String username);	
	
	@Query(value = "UPDATE user SET status = :status WHERE user_id = :id", nativeQuery = true)
    User changeStatus(@Param("id") Integer id, @Param("status") Boolean status);
	
	/*
	@Query(value ="select * from usuario_Category uc\r\n"
			+ "inner join usuario u on u.id_usuario = uc.id_usuario\r\n"
			+ "inner join Category c on c.id_Category = uc.id_rol\r\n"
			+ "where c.id_Category = :id", nativeQuery = true)
	List<User> ListarPorEspecialidad(@Param("id") Integer id);
	*/
	

}
