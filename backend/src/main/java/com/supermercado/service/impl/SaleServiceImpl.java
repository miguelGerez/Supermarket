package com.supermercado.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supermercado.dto.AnnualSaleDTO;
import com.supermercado.model.Sale;
import com.supermercado.repo.ISaleRepo;
import com.supermercado.service.SaleService;

@Service
public class SaleServiceImpl implements SaleService {

	@Autowired
	private ISaleRepo repo;

	@Override
	public Sale register(Sale sell) throws Exception {
		sell.setDate(LocalDateTime.now());
		return repo.save(sell);
	}

	@Override
	public Sale modify(Sale sell) throws Exception {
		return repo.save(sell);
	}

	@Override
	public List<Sale> list() throws Exception {
		return repo.findAll();
	}

	@Override
	public Sale listById(Integer id) throws Exception {
		Optional<Sale> op = repo.findById(id);
		return op.orElse(new Sale());
	}

	@Override
	public void delete(Integer id) throws Exception {
		repo.deleteById(id);
	}

	@Override
	public List<Sale> listSalesByDate(LocalDate date) throws Exception {
		return repo.listSalesByDate(date);
	}

	@Override
	public List<AnnualSaleDTO> annualStatistics() throws Exception {
		List<AnnualSaleDTO> list = new ArrayList<>();
		repo.annualStatistics().forEach(x -> {
			AnnualSaleDTO cr = new AnnualSaleDTO();
			cr.setQuantity(Integer.parseInt(String.valueOf(x[0])));
			cr.setMonth(String.valueOf(x[1]));
			cr.setSum(Integer.parseInt(String.valueOf(x[2])));
			list.add(cr);
		});
		return list;
	}

}
