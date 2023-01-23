package com.supermercado.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supermercado.model.Provider;

public interface IProviderRepo extends JpaRepository<Provider, Integer> {

	// @Query(JPQL)

}
