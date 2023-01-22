package com.supermercado.service;

import java.util.List;

import com.supermercado.model.Product;
import com.supermercado.model.Tag;

public interface TagService {

	Tag register(Tag p) throws Exception;

	Tag modify(Tag p) throws Exception;

	Tag listUnprintedTags() throws Exception;

	Tag productToTag(Product p) throws Exception;

	List<Tag> list() throws Exception;

	List<Tag> listPrintedTags() throws Exception;

	void delete(Integer id) throws Exception;

}
