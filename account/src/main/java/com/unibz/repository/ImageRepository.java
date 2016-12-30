package com.unibz.repository;

import com.unibz.entity.Image;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by fabriziomicheloni on 30/12/16.
 */
public interface ImageRepository extends CrudRepository<Image, String> {
    public Image findByUsername( String username);
}
