package com.mitocode.service;

import java.util.List;

import com.mitocode.model.Tag;
import com.mitocode.model.Product;

public interface TagService {

	Tag register(Tag p) throws Exception;

	Tag modify(Tag p) throws Exception;

	Tag listUnprintedTags() throws Exception;

	Tag productToTag(Product p) throws Exception;

	List<Tag> list() throws Exception;

	List<Tag> listPrintedTags() throws Exception;

	void delete(Integer id) throws Exception;

}
