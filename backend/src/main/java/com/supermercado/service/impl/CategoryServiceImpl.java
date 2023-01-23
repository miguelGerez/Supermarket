package com.supermercado.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.supermercado.dto.CategoryDTO;
import com.supermercado.model.Category;
import com.supermercado.repo.ICategoryRepo;
import com.supermercado.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private ICategoryRepo repo;

	@Override
	public Category register(Category p) throws Exception {
		return repo.save(p);
	}

	@Override
	public Category modify(Category p) throws Exception {
		return repo.save(p);
	}

	@Override
	public List<Category> list() throws Exception {
		return repo.findAll(Sort.by(Sort.Direction.ASC, "name"));
	}

	@Override
	public void delete(Integer id) throws Exception {
		repo.deleteById(id);

	}

	@Override
	public List<CategoryDTO> listProductsCountByCategory() throws Exception {
		List<CategoryDTO> results = new ArrayList<>();
		repo.listProductsCountByCategory().forEach(x -> {
			CategoryDTO dto = new CategoryDTO();
			dto.setId(Integer.parseInt(String.valueOf(x[0])));
			dto.setName((String.valueOf(x[1])));
			dto.setQuantity(Integer.parseInt(String.valueOf(x[2])));
			results.add(dto);
		});
		return results;
	}

}
