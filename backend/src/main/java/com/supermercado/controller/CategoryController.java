package com.supermercado.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermercado.dto.CategoryDTO;
import com.supermercado.model.Category;
import com.supermercado.model.Product;
import com.supermercado.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {

	@Autowired
	private CategoryService service;

	@GetMapping
	public List<Category> list() throws Exception {
		return service.list();
	}

	@GetMapping("/cantidadPorId")
	public List<CategoryDTO> listProductsCountByCategory() throws Exception {
		return service.listProductsCountByCategory();
	}

	@PostMapping
	public ResponseEntity<Category> register(@RequestBody Category p) throws Exception {
		Category category = service.register(p);
		return new ResponseEntity<>(category, HttpStatus.OK);
	}

	@PutMapping
	public Category modify(@RequestBody Category p) throws Exception {
		return service.modify(p);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) throws Exception {
		service.delete(id);
	}
}