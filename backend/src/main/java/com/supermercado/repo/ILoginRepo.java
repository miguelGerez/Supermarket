package com.supermercado.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.supermercado.model.Account;

public interface ILoginRepo extends IGenericRepo<Account, Integer> {

	@Query("FROM Account us where us.username =:username")
	Account checkUsername(@Param("username") String username);

	@Transactional
	@Modifying
	@Query("UPDATE Account us SET us.password = :password WHERE us.username = :username")
	void changePassword(@Param("password") String password, @Param("username") String username);

}
