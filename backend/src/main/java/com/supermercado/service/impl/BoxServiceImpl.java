package com.supermercado.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.supermercado.model.Box;
import com.supermercado.model.Product;
import com.supermercado.repo.IBoxRepo;
import com.supermercado.service.BoxService;



@Service
public class BoxServiceImpl implements BoxService {

	@Autowired
	private IBoxRepo repo;

	@Override
	public Box register(Box p) throws Exception {
		return repo.save(p);
	}

	@Override
	public Box modify(Box p) throws Exception {
		return repo.save(p);
	}

	@Override
	public List<Box> list() throws Exception {
		return repo.findAll(Sort.by(Sort.Direction.ASC, "name"));
	}

	@Override
	public void delete(Integer id) throws Exception {
		repo.deleteById(id);

	}

	@Override
	public Box listByBarCode(String string) {
		return repo.listByBarCode(string);
	}

	@Override
	public Box listById(Integer id) throws Exception {
		Optional<Box> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Box();
	}


}
