package com.supermercado.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supermercado.model.Account;

public interface IAccountRepo extends JpaRepository<Account, Integer> {

	// select * from user where username = ?
	Account findOneByUsername(String username);

	@Query(value = "UPDATE account us SET us.enabled = :status WHERE us.id = :id", nativeQuery = true)
	Account changeStatus(@Param("id") Integer id, @Param("status") Boolean status);

	/*
	 * @Query(value ="select * from user_Category uc\r\n" +
	 * "inner join user u on u.id_user = uc.id_user\r\n" +
	 * "inner join Category c on c.id_Category = uc.id_rol\r\n" +
	 * "where c.id_Category = :id", nativeQuery = true) List<User>
	 * ListarPorEspecialidad(@Param("id") Integer id);
	 */

}
