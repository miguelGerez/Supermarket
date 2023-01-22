package com.mitocode.controller;

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

import com.mitocode.model.Provider;
import com.mitocode.service.ProviderService;



@RestController
@RequestMapping("/proovedor")
public class ProovedorController {

	@Autowired
	private ProviderService service;
	

	@GetMapping
	public List<Provider> listar() throws Exception{
		return service.listar();
	}
	
	@PostMapping
	public Provider registrar(@RequestBody Provider p) throws Exception {
		return service.registrar(p);
	}
	
	@PutMapping
	public Provider modificar(@RequestBody Provider p) throws Exception {
		return service.modificar(p);
	}
	
	 
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable("id") Integer id) throws Exception{
		service.eliminar(id);
	}
}
