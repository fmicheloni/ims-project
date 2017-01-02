package com.unibz.service;

import com.unibz.entity.Image;
import com.unibz.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by fabriziomicheloni on 30/12/16.
 */
@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Image findImageByUsername( String username ) {
        return imageRepository.findByUsername( username );
    }

    public Image saveImage( Image image ) {
        return imageRepository.save( image );
    }

}
