package com.unibz.service.impl;

import com.unibz.entity.Excursion;
import com.unibz.repository.ExcursionRepository;
import com.unibz.service.ExcursionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by fabriziomicheloni on 30/12/16.
 */
@Service
public class ExcursionServiceImpl implements ExcursionService {

    @Autowired
    private ExcursionRepository excursionRepository;

    @Override
    public Excursion saveExcursion( Excursion excursion ) {
        return this.excursionRepository.save( excursion );
    }

    @Override
    public List<Excursion> findByUsername( final String username ) {
        return this.excursionRepository.findByUsername( username );
    }

    @Override
    public List<Excursion> findByTitle( final String title ) {
        return this.excursionRepository.findByTitle( title );
    }
}
