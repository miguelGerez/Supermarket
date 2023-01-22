package com.mitocode.service;

import java.time.LocalDate;
import java.util.List;

import com.mitocode.dto.AnnualSaleDTO;
import com.mitocode.model.Sale;

public interface SaleService  {

		Sale register(Sale sell) throws Exception;

		Sale modify(Sale sell) throws Exception;

		Sale listById(Integer id) throws Exception;
		
		List<Sale> list() throws Exception;
		
		List<AnnualSaleDTO> annualStatistics() throws Exception;
		
		List<Sale> listSalesByDate(LocalDate date) throws Exception;
		
		void delete(Integer id) throws Exception;
		
}
