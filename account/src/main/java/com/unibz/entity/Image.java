package com.unibz.entity;

import javax.persistence.*;

/**
 * Created by fabriziomicheloni on 30/12/16.
 *
 * USER IMAGES NOT IMPLEMENTED
 */
@Entity
@Table( name = "images" )
public class Image {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( nullable = false )
    private long id;

    @Column( nullable = false )
    private String username;

    @Column( nullable = false )
    private String image;

}
