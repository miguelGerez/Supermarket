package com.supermercado.dto;

public class AnnualSaleDTO {

	private String mes;
	private Integer cantidad;
	private Integer total;

	public AnnualSaleDTO() {

	}
	

	public AnnualSaleDTO(Integer id, String mes, Integer cantidad, Integer total) {
		super();
		this.mes = mes;
		this.cantidad = cantidad;
		this.total = total;
	}




	public String getMes() {
		return mes;
	}


	public void setMes(String mes) {
		this.mes = mes;
	}


	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}


	public Integer getTotal() {
		return total;
	}


	public void setTotal(Integer total) {
		this.total = total;
	}

	

	

}
