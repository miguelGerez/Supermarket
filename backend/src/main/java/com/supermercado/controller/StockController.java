package com.supermercado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermercado.model.Stock;
import com.supermercado.service.IStockService;

@RestController
@RequestMapping("/stock")
public class StockController {
	
	@Autowired
	private IStockService service;
	
	@GetMapping("/listByProduct/{id}")
	public Stock listByProduct(Integer id) throws Exception {
		return service.listByProduct(id);
	}
	
}
