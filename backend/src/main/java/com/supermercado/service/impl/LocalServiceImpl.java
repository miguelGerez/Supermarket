package com.supermercado.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.supermercado.model.Local;
import com.supermercado.repo.ILocalRepo;
import com.supermercado.service.LocalService;

@Service
public class LocalServiceImpl implements LocalService {

	@Autowired
	private ILocalRepo repo;

	@Override
	public Local register(Local p) throws Exception {
		return repo.save(p);
	}

	@Override
	public Local modify(Local p) throws Exception {
		return repo.save(p);
	}

	@Override
	public List<Local> list() throws Exception {
		return repo.findAll(Sort.by(Sort.Direction.ASC, "name"));
	}

	@Override
	public void delete(Integer id) throws Exception {
		repo.deleteById(id);

	}



}
