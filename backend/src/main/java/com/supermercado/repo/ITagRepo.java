package com.supermercado.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supermercado.model.Tag;

public interface ITagRepo extends JpaRepository<Tag, Integer> {
		
	@Query(value ="select * from etiqueta where printed = false or printed is null", nativeQuery = true)
	Tag listUnprintedTags();

	@Query(value ="select * from etiqueta where printed = true order by date DESC", nativeQuery = true)
	List<Tag> listPrintedTags();
	
}
