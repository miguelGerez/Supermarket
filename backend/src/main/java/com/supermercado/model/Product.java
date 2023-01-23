package com.supermercado.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;

	private BigDecimal purchasePrice;

	private BigDecimal salePrice;

	private String descripcion;

	private String bard_code;

	private BigDecimal profit;

	private String netContent;

	private Boolean quickAccess;

	private LocalDateTime priceUptime;

	private LocalDateTime modifyUptime;

	@ManyToOne()
	@JoinColumn(name = "brand_id")
	private Brand brand;

	@ManyToOne()
	@JoinColumn(name = "payment_method_id")
	private PaymentMethod paymentMethod;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne
	@JoinColumn(name = "classification_id")
	private Classification classification;

	@ManyToMany
	@JoinTable(name = "producto_proovedor", joinColumns = { @JoinColumn(name = "id_producto") }, inverseJoinColumns = {
			@JoinColumn(name = "id_proovedor") })

	private Set<Provider> providers;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getBard_code() {
		return bard_code;
	}

	public void setBard_code(String bard_code) {
		this.bard_code = bard_code;
	}

	public BigDecimal getProfit() {
		return profit;
	}

	public void setProfit(BigDecimal profit) {
		this.profit = profit;
	}

	public String getNetContent() {
		return netContent;
	}

	public void setNetContent(String netContent) {
		this.netContent = netContent;
	}

	public Boolean getQuickAccess() {
		return quickAccess;
	}

	public void setQuickAccess(Boolean quickAccess) {
		this.quickAccess = quickAccess;
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

	public Brand getBrand() {
		return brand;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}

	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
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

}