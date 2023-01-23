package com.supermercado.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermercado.model.Brand;
import com.supermercado.repo.IBrandRepo;

@RestController
@RequestMapping("/marca")
public class BrandController {

	@Autowired
	private IBrandRepo repo;

	@GetMapping
	public List<Brand> listar() throws Exception {
		return repo.findAll(Sort.by(Sort.Direction.ASC, "name"));
	}

	@GetMapping("/cantidadPorId/{id}")
	public Integer listarCantidadDeProductosPorMarca(@PathVariable("id") Integer id) throws Exception {
		return repo.listarCantidadDeProductosPorMarca(id);
	}

	@PostMapping
	public Brand register(@RequestBody Brand m) throws Exception {
		return repo.save(m);
	}

	@PutMapping
	public Brand modificar(@RequestBody Brand m) throws Exception {
		return repo.save(m);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable("id") Integer id) throws Exception {
		repo.deleteById(id);
	}

}
