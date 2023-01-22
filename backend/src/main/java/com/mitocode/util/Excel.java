package com.mitocode.util;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import com.mitocode.model.Product;

@Component("/excel/productos.xlsx")
public class Excel {

	private XSSFWorkbook libro;

	private XSSFSheet hoja;

	private List<Product> productos;

	public Excel(List<Product> productos) {
		this.productos = productos;
		libro = new XSSFWorkbook();
		hoja = libro.createSheet("Productos");
	}

	private void escribirCabeceraDeTabla() {
		Row fila = hoja.createRow(0);
		CellStyle estilo = libro.createCellStyle();
		XSSFFont fuente = libro.createFont();
		fuente.setBold(true);
		fuente.setFontHeight(16);
		estilo.setFont(fuente);

		Cell celda = fila.createCell(0);
		celda.setCellValue("Id");
		celda.setCellStyle(estilo);

		celda = fila.createCell(1);
		celda.setCellValue("Nombre");
		celda.setCellStyle(estilo);

		celda = fila.createCell(2);
		celda.setCellValue("Precio venta");
		celda.setCellStyle(estilo);

		celda = fila.createCell(3);
		celda.setCellValue("Marca");
		celda.setCellStyle(estilo);

		celda = fila.createCell(4);
		celda.setCellValue("Category");
		celda.setCellStyle(estilo);

	}

	private void escribirDatosDeLaTabla() {
		int numeroFila = 1;

		CellStyle estilo = libro.createCellStyle();
		XSSFFont fuente = libro.createFont();
		fuente.setFontHeight(14);
		estilo.setFont(fuente);

		for (Product producto : productos) {
			Row fila = hoja.createRow(numeroFila++);

			Cell celda = fila.createCell(0);
			celda.setCellValue(producto.getId());
			hoja.autoSizeColumn(0);
			celda.setCellStyle(estilo);

			celda = fila.createCell(1);
			celda.setCellValue(producto.getName());
			hoja.autoSizeColumn(1);
			celda.setCellStyle(estilo);

			celda = fila.createCell(2);
			if (producto.getSalePrice() != null) {
				celda.setCellValue(producto.getSalePrice().toString());
			}
			hoja.autoSizeColumn(2);
			celda.setCellStyle(estilo);

			celda = fila.createCell(3);
			if (producto.getBrand() != null) {
				celda.setCellValue(producto.getBrand().getName().toString());
			}
			hoja.autoSizeColumn(3);
			celda.setCellStyle(estilo);

			celda = fila.createCell(4);
			if (producto.getCategory() != null) {
				celda.setCellValue(producto.getCategory().getName());
			}
			hoja.autoSizeColumn(4);
			celda.setCellStyle(estilo);
		}

	}

	public void exportar(HttpServletResponse response) throws IOException {
		escribirCabeceraDeTabla();
		escribirDatosDeLaTabla();
		ServletOutputStream outPutStream = response.getOutputStream();
		libro.write(outPutStream);
		libro.close();
		outPutStream.close();
	}

}
