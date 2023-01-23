package com.supermercado.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supermercado.model.PaymentMethod;

public interface IPaymentMethodRepo extends JpaRepository<PaymentMethod, Integer> {

	// @Query(JPQL)

}
