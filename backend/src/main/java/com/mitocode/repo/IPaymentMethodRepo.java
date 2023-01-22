package com.mitocode.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mitocode.model.PaymentMethod;


public interface IPaymentMethodRepo extends JpaRepository<PaymentMethod, Integer> {
	
	//@Query(JPQL)
	
	
	
}
