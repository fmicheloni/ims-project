package com.unibz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by fabriziomicheloni on 19/12/16.
 */
@Entity
@Table( name = "users" )
public class User {

    @Id
    private String username;

    @Column
    private String name;

    @Column
    private String surname;

    @Column( nullable = false )
    private Date dateOfBirth;

    @Column( nullable = false )
    private String country;

    @Column( nullable = false )
    private String city;

    @Column
    private String picture;

    @Column
    private boolean gender;

    public String getUsername() {
        return username;
    }

    public void setUsername( String username ) {
        this.username = username;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth( Date dateOfBirth ) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry( String country ) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity( String city ) {
        this.city = city;
    }

    public User username( String username ) {
        this.username = username;
        return this;
    }

    public User dateOfBirth( Date dateOfBirth ) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public User country( String country ) {
        this.country = country;
        return this;
    }

    public User city( String city ) {
        this.city = city;
        return this;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender( final boolean gender ) {
        this.gender = gender;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture( final String picture ) {
        this.picture = picture;
    }

    public User picture( String picture ) {
        this.picture = picture;
        return this;
    }

    public String getName() {
        return name;
    }

    public void setName( final String name ) {
        this.name = name;
    }

    public User name( String name ) {
        this.name = name;
        return this;
    }

    public User surname( String surname ) {
        this.surname = surname;
        return this;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname( final String surname ) {
        this.surname = surname;
    }

    @Override public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", picture='" + picture + '\'' +
                '}';
    }

    public User gender( boolean gender ) {
        this.gender = gender;
        return this;
    }
}
