package com.supermercado.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supermercado.model.Role;
import com.supermercado.repo.IRolRepo;
import com.supermercado.service.IRolService;


@Service
public class RolServiceImpl implements IRolService {

	@Autowired
	private IRolRepo repo;
	
	
	@Override
	public Role registrar(Role p) throws Exception {
		return repo.save(p);
	}
	

	@Override
	public Role modificar(Role p) throws Exception {
		return repo.save(p);
	}

	@Override
	public List<Role> listar() throws Exception {
		return repo.findAll();
	}

	@Override
	public Role ListarPorId(Integer id) throws Exception {
		
		Optional<Role> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Role();
	}

	@Override
	public void eliminar(Integer id) throws Exception {
		repo.deleteById(id);
	}


	@Override
	public List<Role> listarSinProgramador() throws Exception {
		return repo.ListarSinProgramador();
	}
}
