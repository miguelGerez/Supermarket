package com.supermercado.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermercado.model.PaymentMethod;
import com.supermercado.repo.IPaymentMethodRepo;

@RestController
@RequestMapping("/metodoDePago")
public class PaymentMethodController {

	@Autowired
	private IPaymentMethodRepo repo;
	


	@GetMapping
	public List<PaymentMethod> listar() throws Exception{
		return repo.findAll();
	}
	
	@PostMapping
	public PaymentMethod registrar(@RequestBody PaymentMethod m) throws Exception {
		return repo.save(m);
	}
	
	@PutMapping
	public PaymentMethod modificar(@RequestBody PaymentMethod m) throws Exception {
		return repo.save(m);
	}
	
	 
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable("id") Integer id) throws Exception{
		repo.deleteById(id);
	}
}
