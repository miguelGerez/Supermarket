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

import com.supermercado.model.Local;
import com.supermercado.service.LocalService;

@RestController
@RequestMapping("/local")
public class LocalController {

	@Autowired
	private LocalService service;

	@GetMapping
	public List<Local> list() throws Exception {
		return service.list();
	}


	@PostMapping
	public Local register(@RequestBody Local p) throws Exception {
		return service.register(p);
	}

	@PutMapping
	public Local modify(@RequestBody Local p) throws Exception {
		return service.modify(p);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) throws Exception {
		service.delete(id);
	}
}