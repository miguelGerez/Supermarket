package com.supermercado.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.supermercado.model.Account;
import com.supermercado.model.File;
import com.supermercado.repo.IAccountRepo;
import com.supermercado.service.IFileService;

@RestController
@RequestMapping("/account")
public class UserController {

	@Autowired
	private IAccountRepo repo;

	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	@Autowired
	private IFileService serviceFile;

	@GetMapping
	public List<Account> list() throws Exception {
		return repo.findAll();
	}

	@GetMapping("/{id}")
	public Account listById(@PathVariable("id") Integer id) throws Exception {
		return repo.getOne(id);
	}

	@GetMapping("/username/{username}")
	public Account findOneByUsername(@PathVariable("username") String username) throws Exception {
		return repo.findOneByUsername(username);
	}

	@PostMapping
	public Account register(@RequestBody Account p) throws Exception {
		p.setPassword(bcrypt.encode(p.getPassword()));
		return repo.save(p);
	}

	@PutMapping
	public Account modify(@RequestBody Account p) throws Exception {
		System.out.println(p.getRoles());

		return repo.save(p);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) throws Exception {
		repo.deleteById(id);
	}
	
	@PostMapping(value = "/guardarArchivo", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Integer> guardarArchivo(@RequestParam("adjunto") MultipartFile file) throws IOException {
			
		//@RequestPart("medico") Medico medico
		
		int rpta = 0;

		File ar = new File();
		ar.setFiletype(file.getContentType());
		ar.setFilename(file.getOriginalFilename());
		ar.setValue(file.getBytes());
		
	 		

		rpta = serviceFile.guardar(ar);

		return new ResponseEntity<Integer>(rpta, HttpStatus.OK);
	}
	
	@GetMapping(value = "/leerArchivo/{idArchivo}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<byte[]> leerArchivo(@PathVariable("idArchivo") Integer idArchivo) throws IOException {
				
		byte[] arr = serviceFile.leerArchivo(idArchivo); 

		return new ResponseEntity<byte[]>(arr, HttpStatus.OK);
	}
}
