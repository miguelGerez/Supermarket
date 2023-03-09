package com.supermercado.controller;

import java.util.List;
import java.util.Optional;

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

import com.supermercado.model.Box;
import com.supermercado.model.Product;
import com.supermercado.service.BoxService;

@RestController
@RequestMapping("/boxes")
public class BoxController {

    @Autowired
    private BoxService boxService;

    // Get all boxes
    @GetMapping
	public List<Box> list() throws Exception {
		return boxService.list();
	}

	@PostMapping
	public ResponseEntity<Box> register(@RequestBody Box p) throws Exception {
		Box Box = boxService.register(p);
		return new ResponseEntity<>(Box, HttpStatus.OK);
	}

	@PutMapping
	public Box modify(@RequestBody Box p) throws Exception {
		return boxService.modify(p);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) throws Exception {
		boxService.delete(id);
	}
	
	@GetMapping("/{id}")
	public Box getById(@PathVariable("id") Integer id) throws Exception {
		return boxService.listById(id);
	}
	
	@GetMapping("/bard_code/{string}")
	public ResponseEntity<Box> listByBarCode(@PathVariable("string") String string) throws Exception {
		Box box = boxService.listByBarCode(string);
		return new ResponseEntity<>(box, HttpStatus.OK);
	}

  
}