package com.supermercado.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supermercado.model.Product;
import com.supermercado.model.Tag;
import com.supermercado.repo.ITagRepo;
import com.supermercado.service.TagService;

@Service
public class TagServiceImpl implements TagService {

	@Autowired
	private ITagRepo repo;

	@Override
	public Tag register(Tag p) throws Exception {
	    return repo.save(p);
	}

	@Override
	public Tag modify(Tag p) throws Exception {
	    p.setDate(LocalDateTime.now());
	    return repo.save(p);
	}

	@Override
	public List<Tag> list() throws Exception {
	    return repo.findAll();
	}

	@Override
	public void delete(Integer id) throws Exception {
	    repo.deleteById(id);
	}

	@Override
	public Tag listUnprintedTags() throws Exception {
	    return repo.listUnprintedTags();
	}

	@Override
	public List<Tag> listPrintedTags() throws Exception {
	    return repo.listPrintedTags();
	} 

	@Override
	public Tag productToTag(Product p) throws Exception {
	    Tag tag = repo.listUnprintedTags();
	    List<Product> products = new ArrayList<Product>();

	    if (tag == null) {
	        tag = new Tag();
	    } else {
	        products = tag.getProducts();
	    }
	    products.add(p);
	    tag.setProducts(products);
	    return repo.save(tag);
	}

}
