package com.supermercado.service;

import com.supermercado.model.Stock;

public interface IStockService {
	
	Stock listByProduct(Integer id);

}
