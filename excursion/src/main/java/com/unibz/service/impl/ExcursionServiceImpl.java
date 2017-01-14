package com.unibz.service.impl;

import com.unibz.entity.Excursion;
import com.unibz.repository.ExcursionRepository;
import com.unibz.service.ExcursionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by fabriziomicheloni on 30/12/16.
 */
@Service
public class ExcursionServiceImpl implements ExcursionService {

    @Autowired
    private ExcursionRepository excursionRepository;

    public Excursion saveExcursion( Excursion excursion ) {
        return this.excursionRepository.save( excursion );
    }
}
