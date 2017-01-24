package com.unibz.service;

import com.unibz.entity.Excursion;

import java.util.List;

/**
 * Created by fabriziomicheloni on 11/01/17.
 */
public interface ExcursionService {
    public Excursion saveExcursion( Excursion excursion );

    public List<Excursion> findByUsername( String username );

    public List<Excursion> findByTitle( String title );
}
