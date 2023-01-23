package com.supermercado.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supermercado.model.File;
import com.supermercado.repo.IFileRepo;
import com.supermercado.service.IFileService;

@Service
public class FileServiceImpl implements IFileService {

	@Autowired
	private IFileRepo repo;

	@Override
	public int guardar(File archivo) {
		File ar = repo.save(archivo);
		return ar.getId() > 0 ? 1 : 0;
	}

	@Override
	public byte[] leerArchivo(Integer idArchivo) {
		Optional<File> op = repo.findById(idArchivo);
		return op.isPresent() ? op.get().getValue() : new byte[0];
	}

}
