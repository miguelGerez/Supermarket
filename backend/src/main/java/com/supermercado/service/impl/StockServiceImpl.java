package com.supermercado.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supermercado.model.Stock;
import com.supermercado.repo.IStockRepo;
import com.supermercado.service.IStockService;

@Service
public class StockServiceImpl implements IStockService {
	
	@Autowired
	private IStockRepo repo;

	@Override
	public Stock listByProduct(Integer id) {
		return repo.listByProduct(id);
	}

}
