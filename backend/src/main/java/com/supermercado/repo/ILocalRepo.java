package com.supermercado.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import com.supermercado.model.Local;

public interface ILocalRepo extends JpaRepository<Local, Integer> {

	

}
