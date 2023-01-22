package com.supermercado.service;

import java.util.List;

import com.supermercado.model.Menu;

public interface IMenuService extends ICRUD<Menu, Integer>{
	
	List<Menu> listMenusByUser(String name);

}
