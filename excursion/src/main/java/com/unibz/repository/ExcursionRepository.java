package com.unibz.repository;

import com.unibz.entity.Excursion;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by fabriziomicheloni on 22/12/16.
 */
@Repository
public interface ExcursionRepository extends CrudRepository<Excursion, Long> {

    @Query("select Excursion excursion where excursion.placeTarget = :picture where excursion.peopleTarget = :peopleTarget")
    public int searchExcursions( @Param("placeTarget") String placeTarget, @Param("peopleTarget") String peopleTarget );

}
