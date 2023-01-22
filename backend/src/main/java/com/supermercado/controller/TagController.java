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

import com.supermercado.model.Product;
import com.supermercado.model.Tag;
import com.supermercado.service.TagService;

@RestController
@RequestMapping("/tag")
public class TagController {
	
	@Autowired
	private TagService service;

	@GetMapping
	public List<Tag> list() throws Exception {
		return service.list();
	}

	@GetMapping("/unprinted")
	public Tag listUnprintedTags() throws Exception {
		return service.listUnprintedTags();
	}

	@GetMapping("/printed")
	public List<Tag> listPrintedTags() throws Exception {
		return service.listPrintedTags();
	}

	@PostMapping("/productToTag")
	public Tag productToTag(@RequestBody Product product) throws Exception {
		return service.productToTag(product);
	}

	@PostMapping
	public Tag register(@RequestBody Tag tag) throws Exception {
		return service.register(tag);
	}

	@PutMapping
	public Tag modify(@RequestBody Tag tag) throws Exception {
		return service.modify(tag);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) throws Exception {
		service.delete(id);
	}
}
