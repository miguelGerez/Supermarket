package com.supermercado.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supemercado.exception.ModeloNotFoundException;
import com.supermercado.model.Product;
import com.supermercado.service.ProductService;
import com.supermercado.service.TagService;
import com.supermercado.util.Excel;

@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private ProductService productService;

	@Autowired
	private TagService tagService;

	@GetMapping
	public List<Product> list() throws Exception {
		return productService.list();
	}

	@GetMapping("/{id}")
	public Product getById(@PathVariable("id") Integer id) throws Exception {
		return productService.listById(id);
	}

	@GetMapping("/brand/{id}")
	public List<Product> listByBrand(@PathVariable("id") Integer id) throws Exception {
		return productService.listByBrand(id);
	}

	@GetMapping("/category/{id}")
	public List<Product> listByCategory(@PathVariable("id") Integer id) throws Exception {
		return productService.listByCategory(id);
	}

	@GetMapping("/provider/{id}")
	public List<Product> listByProvider(@PathVariable("id") Integer id) throws Exception {
		return productService.listByProvider(id);
	}

	@GetMapping("/brand/{brandId}/category/{categoryId}")
	public List<Product> listByCategoryAndBrand(@PathVariable("brandId") Integer brandId,
			@PathVariable("categoryId") Integer categoryId) throws Exception {
		return productService.listByCategoryAndBrand(brandId, categoryId);
	}

	@GetMapping("/bar_code/{string}")
	public ResponseEntity<Product> listByBarCode(@PathVariable("string") String string) throws Exception {
		Product product = productService.listByBarCode(string);
		return new ResponseEntity<>(product, HttpStatus.OK);
	}

	@GetMapping("/autocomplete/{string}")
	public ResponseEntity<List<Product>> listByAutocomplete(@PathVariable("string") String string) throws Exception {
		List<Product> products = productService.listByAutoComplete(string);
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@GetMapping("/quick_access/")
	public ResponseEntity<List<Product>> listByQuickAccess() throws Exception {
		List<Product> products = productService.listByQuickAccess();
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@GetMapping("/no_price/")
	public ResponseEntity<List<Product>> listByNoPrice() throws Exception {
		List<Product> products = productService.listByNoPrice();
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@GetMapping("/exportarExcel/")
	public void exportarListadoAExcel(HttpServletResponse response) throws Exception {
		response.setContentType("aplication/octet-stream");

		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		String fechaActual = dateFormatter.format(new Date());

		String cabecera = "Content-Disposition";
		String valor = "attachment; filename=Empleados_" + fechaActual + ".xlsx";

		response.setHeader(cabecera, valor);

		List<Product> productos = productService.list();

		Excel exporter = new Excel(productos);
		exporter.exportar(response);
	}

	@PostMapping
	public ResponseEntity<Product> register(@RequestBody Product product) throws Exception {
		Product existingProduct = productService.listByBarCode(product.getBard_code());
		if (existingProduct != null) {
			throw new ModeloNotFoundException("A product with that barcode already exists.");
		}

		Product newProduct = productService.register(product);
		return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
	}

	@PostMapping("/bulk-register")
	public boolean bulkRegister(@RequestBody List<Product> products) throws Exception {
		for (Product product : products) {
			Product existingProduct = productService.listById(product.getId());
			if (existingProduct.getSalePrice() != product.getSalePrice()) {
				product.setPriceUptime(LocalDateTime.now());
			}
			product.setModifyUptime(LocalDateTime.now());
			productService.modify(product);
		}
		return true;
	}

	@PutMapping
	public Product update(@RequestBody Product p) throws Exception {
		Product existingProduct = productService.listById(p.getId());
		if (existingProduct.getSalePrice() != p.getSalePrice()) {
			p.setPriceUptime(LocalDateTime.now());
			tagService.productToTag(p);
		} else {
			p.setModifyUptime(LocalDateTime.now());
		}
		return productService.modify(p);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) throws Exception {
		productService.delete(id);
	}
}
