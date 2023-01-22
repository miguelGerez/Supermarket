package com.mitocode.service;

import com.mitocode.model.File;

public interface IFileService {

	int guardar(File archivo);
	byte[] leerArchivo(Integer idArchivo);
}
