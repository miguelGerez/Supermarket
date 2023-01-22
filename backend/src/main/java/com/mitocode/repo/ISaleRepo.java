package com.mitocode.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mitocode.model.Sale;


public interface ISaleRepo extends JpaRepository<Sale, Integer> {
	
	//@Query(JPQL)
	
	@Query(value ="Select * FROM sale where date(date) = :date ", nativeQuery = true)
	List<Sale> listSalesByDate(@Param("date") LocalDate date);

	@Query(value="select count(*) as quantity, to_char(s.date, 'TMMonth') as month, sum(d.price) from sale s \r\n"
	+ "inner join sale_details d on s.id = d.sale_id\r\n"
	+ "group by to_char(s.date, 'TMMonth')",nativeQuery = true)
	List<Object[]> annualStatistics();
}
