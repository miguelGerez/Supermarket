package com.supermercado.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.supermercado.model.Provider;
import com.supermercado.repo.IProviderRepo;
import com.supermercado.service.ProviderService;

@Service
public class ProviderServiceImpl implements ProviderService {

	@Autowired
	private IProviderRepo repo;

	@Override
	public Provider register(Provider p) throws Exception {
		return repo.save(p);
	}

	@Override
	public Provider modify(Provider p) throws Exception {
		return repo.save(p);
	}

	@Override
	public List<Provider> list() throws Exception {
		return repo.findAll(Sort.by(Sort.Direction.ASC, "name"));
	}

	@Override
	public void delete(Integer id) throws Exception {
		repo.deleteById(id);
	}

}
