package com.mitocode.repo;



import org.springframework.data.jpa.repository.JpaRepository;


import com.mitocode.model.Provider;



public interface IProviderRepo extends JpaRepository<Provider, Integer> {
	
	//@Query(JPQL)
	
	
}
