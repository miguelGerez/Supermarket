package com.supermercado.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Box {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, nullable = true)
	private String bard_code;
	
	private String name;

	 @OneToOne
	 @JoinColumn(name = "product_box")
	 private Product product;
	 
	 private BigDecimal purchasePrice;

	private BigDecimal salePrice;
	
	private Integer gain;

	private LocalDateTime priceUptime;

	private LocalDateTime modifyUptime;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne
	@JoinColumn(name = "classification_id")
	private Classification classification;
	
	@ManyToMany
	@JoinTable(name = "product_provider", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "provider_id"))
	private Set<Provider> providers;
	
	private String descripcion;

	private BigDecimal profit;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBard_code() {
		return bard_code;
	}

	public void setBard_code(String bard_code) {
		this.bard_code = bard_code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public BigDecimal getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(BigDecimal purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public BigDecimal getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	public Integer getGain() {
		return gain;
	}

	public void setGain(Integer gain) {
		this.gain = gain;
	}

	public LocalDateTime getPriceUptime() {
		return priceUptime;
	}

	public void setPriceUptime(LocalDateTime priceUptime) {
		this.priceUptime = priceUptime;
	}

	public LocalDateTime getModifyUptime() {
		return modifyUptime;
	}

	public void setModifyUptime(LocalDateTime modifyUptime) {
		this.modifyUptime = modifyUptime;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Classification getClassification() {
		return classification;
	}

	public void setClassification(Classification classification) {
		this.classification = classification;
	}

	public Set<Provider> getProviders() {
		return providers;
	}

	public void setProviders(Set<Provider> providers) {
		this.providers = providers;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public BigDecimal getProfit() {
		return profit;
	}

	public void setProfit(BigDecimal profit) {
		this.profit = profit;
	}

	
	
}
