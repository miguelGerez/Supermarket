package com.supermercado.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supermercado.model.Role;

public interface IRolRepo extends JpaRepository<Role, Integer> {

	@Query(value = "select * from rol where id_rol != 99", nativeQuery = true)
	List<Role> ListarSinProgramador();
}
