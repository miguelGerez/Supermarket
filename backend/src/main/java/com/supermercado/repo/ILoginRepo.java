package com.supermercado.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.supermercado.model.User;

public interface ILoginRepo extends IGenericRepo<User, Integer>{

	@Query("FROM user us where us.username =:username")
	User checkUsername(@Param("username")String username);
	
	@Transactional
	@Modifying
	@Query("UPDATE user us SET us.password =:password WHERE us.username =:name")
	void changePassword(@Param("password") String password, @Param("name") String name);
	
}
