package com.unibz.dao;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by fabriziomicheloni on 06/01/17.
 */
@Entity
@Table( name = "excursions" )
public class Excursion {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( nullable = false )
    private long id;

    @Column( nullable = false )
    private String title;

    @Column( nullable = false )
    private String longDescription;

    @Column( nullable = false )
    private String placeTarget;

    @Column( nullable = false )
    private String peopleTarget;

    @Column( nullable = false )
    private String coordinates;

    @Column( nullable = false )
    private String image;

    // foreign key
    @Column( nullable = false )
    private String username;

    @Column( nullable = false )
    private int likes;

    @Column( nullable = false )
    private Date insertionDate;

    public String getTitle() {
        return title;
    }

    public void setTitle( final String title ) {
        this.title = title;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription( final String longDescription ) {
        this.longDescription = longDescription;
    }

    public String getType() {
        return placeTarget;
    }

    public void setType( final String type ) {
        this.placeTarget = type;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates( final String coordinates ) {
        this.coordinates = coordinates;
    }

    public String getImage() {
        return image;
    }

    public void setImage( final String image ) {
        this.image = image;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername( final String username ) {
        this.username = username;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes( final int likes ) {
        this.likes = likes;
    }

    public Date getInsertionDate() {
        return insertionDate;
    }

    public void setInsertionDate( final Date insertionDate ) {
        this.insertionDate = insertionDate;
    }

    public Excursion title( String title ) {
        this.title = title;
        return this;
    }

    public Excursion longDescription( String longDescription ) {
        this.longDescription = longDescription;
        return this;
    }

    public Excursion type( String type ) {
        this.placeTarget = type;
        return this;
    }

    public Excursion coordinates( String coordinates ) {
        this.coordinates = coordinates;
        return this;
    }

    public Excursion image( String image ) {
        this.image = image;
        return this;
    }

    public Excursion username( String username ) {
        this.username = username;
        return this;
    }

    public Excursion likes( int likes ) {
        this.likes = likes;
        return this;
    }

    public Excursion insertionDate( Date insertionDate ) {
        this.insertionDate = insertionDate;
        return this;
    }

    public long getId() {
        return id;
    }
    public void setId( final long id ) {
        this.id = id;
    }
    public String getPlaceTarget() {
        return placeTarget;
    }
    public void setPlaceTarget( final String placeTarget ) {
        this.placeTarget = placeTarget;
    }
    public String getPeopleTarget() {
        return peopleTarget;
    }
    public void setPeopleTarget( final String peopleTarget ) {
        this.peopleTarget = peopleTarget;
    }

    public Excursion id( long id ) {
        this.id = id;
        return this;
    }
    public Excursion placeTarget( String placeTarget ) {
        this.placeTarget = placeTarget;
        return this;
    }
    public Excursion peopleTarget( String peopleTarget ) {
        this.peopleTarget = peopleTarget;
        return this;
    }

    @Override public String toString() {
        return "Excursion{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", longDescription='" + longDescription + '\'' +
                ", placeTarget='" + placeTarget + '\'' +
                ", peopleTarget='" + peopleTarget + '\'' +
                ", coordinates='" + coordinates + '\'' +
                ", image='" + image + '\'' +
                ", username='" + username + '\'' +
                ", likes=" + likes +
                ", insertionDate=" + insertionDate +
                '}';
    }
}
