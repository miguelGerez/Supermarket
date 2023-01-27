package com.supermercado.dto;

public class AnnualSaleDTO {

	private String month;
	private Integer quantity;
	private Integer sum;

	public AnnualSaleDTO() {

	}

	public AnnualSaleDTO(String month, Integer quantity, Integer sum) {
		super();
		this.month = month;
		this.quantity = quantity;
		this.sum = sum;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getSum() {
		return sum;
	}

	public void setSum(Integer sum) {
		this.sum = sum;
	}

	
}
