package com.mitocode.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mitocode.model.Product;
import com.mitocode.repo.IProductRepo;
import com.mitocode.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private IProductRepo repo;
	
	@Override
	public Product register(Product p) throws Exception {
		return repo.save(p);
	}

	@Override
	public Product modify(Product p) throws Exception {
		return repo.save(p);
	}
	

	@Override
	public List<Product> list() throws Exception {
		return repo.findAll();
	}
	

	@Override
	public Product listById(Integer id) throws Exception {
		Optional<Product> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Product();
	}
	
	@Override
	public void delete(Integer id) throws Exception {
		repo.deleteById(id);
	}

	@Override
	public Product listByBarCode(String string) throws Exception {
		return repo.listByBarCode(string);
	}

	@Override
	public List<Product> listByCategoryAndBrand(Integer idBrand, Integer idCategory) {
		return repo.listByCategoryAndBrand(idBrand, idCategory);
	}

	@Override
	public List<Product> listByCategory(Integer id) {
		return repo.listByCategory(id);
	}

	@Override
	public List<Product> listByBrand(Integer id) {
		return repo.listByBrand(id);
	}

	@Override
	public List<Product> listByQuickAccess() {
		return repo.listByQuickAccess();
	}

	@Override
	public List<Product> listByNoPrice() {
		return repo.listByNoPrice();
	}

	@Override
	public List<Product> listByProvider(Integer id) {
		return repo.listByProvider(id);
	}

	@Override
	public List<Product> listByAutoComplete(String string) throws Exception {
		return repo.listByAutoComplete(string);
	}
	
	
}
