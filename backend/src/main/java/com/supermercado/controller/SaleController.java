package com.supermercado.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermercado.dto.AnnualSaleDTO;
import com.supermercado.model.Sale;
import com.supermercado.repo.ISaleRepo;
import com.supermercado.service.SaleService;

@RestController
@RequestMapping("sale")
public class SaleController {

	@Autowired
	private SaleService service;

	@Autowired
	private ISaleRepo repo;

	@GetMapping
	public List<Sale> list() throws Exception {
		return service.list();
	}

	@GetMapping("/{id}")
	public Sale findById(@PathVariable("id") Integer id) throws Exception {
		return repo.getOne(id);
	}

	@GetMapping("/quantity")
	public Long getQuantity() throws Exception {
		return repo.count();
	}

	@GetMapping("/listByDate/{date}")
	public List<Sale> listByDate(@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date)
			throws Exception {
		return service.listSalesByDate(date);
	}

	@GetMapping("/annual")
	public List<AnnualSaleDTO> annualStatistics() throws Exception {
		return service.annualStatistics();
	}

	@PostMapping
	public Sale register(@RequestBody Sale p) throws Exception {
		return service.register(p);
	}

	@PutMapping
	public Sale modify(@RequestBody Sale p) throws Exception {
		return service.modify(p);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) throws Exception {
		service.delete(id);
	}
}
