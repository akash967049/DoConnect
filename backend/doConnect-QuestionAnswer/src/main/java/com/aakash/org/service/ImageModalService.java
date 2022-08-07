package com.aakash.org.service;

/*
 * @Author - Aakash Verma
 */

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aakash.org.entity.ImageModal;
import com.aakash.org.repository.ImageModalRepository;

@Service
public class ImageModalService {
	
	@Autowired
	private ImageModalRepository imageModalRepository;
	
	// Upload Image to database
	
	public String uplaodImage(MultipartFile file, String name) throws IOException {
		System.out.println("Original Image Byte Size - " + file.getBytes().length);
		ImageModal img = new ImageModal(name, file.getContentType(),
				compressBytes(file.getBytes()));
		imageModalRepository.save(img);
		return "Image uploded successfully";
	}


	public ImageModal getImage(String imageName) {
		ImageModal img = imageModalRepository.findByName(imageName).orElse(null);
		if(img!=null) {
		 img = new ImageModal(img.getName(), img.getType(),
				decompressBytes(img.getPicByte()));
		}
		return img;
	}
	
	// delete Image from database
	
	public String deleteImage(String imageName) {
		ImageModal img = imageModalRepository.findByName(imageName).orElse(null);
		if(img!=null) {
			imageModalRepository.delete(img);
			return "Image deleted succefully";
		}else {
			return "Image Not found";
		}
		
	}

	// compress the image bytes before storing it in the database
	public static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {
		}
		System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

		return outputStream.toByteArray();
	}

	// uncompress the image bytes before returning it to the angular application
	public static byte[] decompressBytes(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException ioe) {
		} catch (DataFormatException e) {
		}
		return outputStream.toByteArray();
	}


}
