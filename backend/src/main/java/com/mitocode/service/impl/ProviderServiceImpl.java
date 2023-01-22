package com.mitocode.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mitocode.model.Provider;
import com.mitocode.repo.IProviderRepo;
import com.mitocode.service.ProviderService;

@Service
public class ProviderServiceImpl implements ProviderService {

	@Autowired
	private IProviderRepo repo;
	
	
	@Override
	public Provider registrar(Provider p) throws Exception {
		return repo.save(p);
	}

	@Override
	public Provider modificar(Provider p) throws Exception {
		return repo.save(p);
	}
	

	@Override
	public List<Provider> listar() throws Exception {
		return repo.findAll(Sort.by(Sort.Direction.ASC, "nombre"));
	}
	

	@Override
	public void eliminar(Integer id) throws Exception {
		repo.deleteById(id);	
	}

}
