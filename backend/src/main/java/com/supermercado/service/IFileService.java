package com.supermercado.service;

import com.supermercado.model.File;

public interface IFileService {

	int guardar(File archivo);
	byte[] leerArchivo(Integer idArchivo);
}
