package com.supermercado.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermercado.model.User;
import com.supermercado.repo.IUserRepo;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private IUserRepo repo;

	@Autowired
	private BCryptPasswordEncoder bcrypt;

	@GetMapping
	public List<User> list() throws Exception {
		return repo.findAll();
	}

	@GetMapping("/{id}")
	public User listById(@PathVariable("id") Integer id) throws Exception {
		return repo.getOne(id);
	}

	@GetMapping("/username/{username}")
	public User findOneByUsername(@PathVariable("username") String username) throws Exception {
		return repo.findOneByUsername(username);
	}

	@PostMapping
	public User register(@RequestBody User p) throws Exception {
		p.setPassword(bcrypt.encode(p.getPassword()));
		return repo.save(p);
	}

	@PutMapping
	public User modify(@RequestBody User p) throws Exception {
		return repo.save(p);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) throws Exception {
		repo.deleteById(id);
	}
}
