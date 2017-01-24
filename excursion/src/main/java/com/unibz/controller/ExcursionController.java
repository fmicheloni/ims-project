package com.unibz.controller;

import com.google.gson.Gson;
import com.unibz.entity.Excursion;
import com.unibz.service.ExcursionService;
import org.apache.tika.Tika;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Date;
import java.util.List;

/**
 * Created by fabriziomicheloni on 06/01/17.
 */

@RestController
public class ExcursionController {

    private static Logger logger = LoggerFactory.getLogger( ExcursionController.class );

    @Value( "${upload.path}" )
    private String storePath;

    private Tika tika;

    @Autowired
    private ExcursionService excursionService;

    @RequestMapping( value = "/add", method = RequestMethod.POST )
    public @ResponseBody ResponseEntity handleImageUpload(
            @RequestParam( "file" ) MultipartFile file,
            @RequestParam( "title" ) String title,
            @RequestParam( "description" ) String description,
            @RequestParam( "place" ) String place,
            @RequestParam( "people" ) String people,
            @RequestParam( "username" ) String username ) throws IOException {

        logger.info( "File: [{}]", file );
        logger.info( "title: [{}]", title );
        logger.info( "description: [{}]", description );
        logger.info( "place: [{}]", place );
        logger.info( "people: [{}]", people );

        tika = new Tika();

        String imageName = null;

        String detectedType = tika.detect( file.getBytes() );

        if ( !detectedType.equals( "image/png" )
                && !detectedType.equals( "image/jpg" )
                && !detectedType.equals( "image/jpeg" ) ) {
            throw new IOException();
        }

        imageName = generateImageName( detectedType );

        byte[] bytes = file.getBytes();
        BufferedOutputStream stream;
        stream = new BufferedOutputStream( new FileOutputStream( new File( imageName ) ) );
        stream.write( bytes );
        stream.close();

        excursionService.saveExcursion( new Excursion()
                .title( title.substring( title.length() / 2 + 1 ) )
                .longDescription( description.substring( description.length() / 2 + 1 ) )
                .placeTarget( place.substring( place.length() / 2 + 1 ) )
                .peopleTarget( people.substring( people.length() / 2 + 1 ) )
                .image( imageName )
                .username( username.substring( username.length() / 2 + 1 ) )
                .insertionDate( new Date() ) );

        logger.debug( "Excursion saved successfully." );

        return ResponseEntity.ok( "Ok" );
    }

    private String generateImageName( String extension ) {
        String asd = new Date().getTime() + "" + ( char ) ( ( int ) ( Math.random() * 26 ) + 64 );
        String encoded = Base64Utils.encodeToString( asd.getBytes() );
        encoded = encoded.substring( 0, encoded.length() - 1 );

        return String.format( "%s%s.%s", storePath, encoded, cleanExtension( extension ) );
    }

    private String cleanExtension( String rawExtension ) {
        return rawExtension.substring( rawExtension.indexOf( '/' ) + 1 );
    }

    @RequestMapping( value = "/myexcursions", method = RequestMethod.GET )
    public @ResponseBody ResponseEntity myExcursion( @RequestParam( value = "username" ) String username ) {
        final List<Excursion> byUsername = this.excursionService.findByUsername( username );

        Gson gson = new Gson();

        return ResponseEntity.ok( gson.toJson( byUsername ) );
    }

    @RequestMapping( value = "/public/{imageName:.+}", method = RequestMethod.GET )
    public void serveImage( @PathVariable String imageName, HttpServletResponse response ) throws IOException {

        final String finalImagePath = String.format( "%s%s", storePath, imageName );

        logger.debug( "Serving image [{}]", finalImagePath );

        InputStream in = new FileInputStream( finalImagePath );
        response.setContentType( getImageMediaType( finalImagePath ) );
        IOUtils.copy( in, response.getOutputStream() );
        in.close();
    }

    private String getImageMediaType( String imageName ) {
        if ( imageName.endsWith( "png" ) ) {
            return MediaType.IMAGE_PNG_VALUE;
        }

        if ( imageName.endsWith( "gif" ) ) {
            return MediaType.IMAGE_GIF_VALUE;
        }

        return MediaType.IMAGE_JPEG_VALUE;
    }

    @RequestMapping( value = "/search", method = RequestMethod.GET )
    public @ResponseBody ResponseEntity searchExcursion(
            @RequestParam( value = "title" ) String title ) {
        logger.debug( "Title is: [{}]", title );

        final List<Excursion> byTitle = this.excursionService.findByTitle( title );

        Gson gson = new Gson();

        return ResponseEntity.ok( gson.toJson( byTitle ) );
    }
}
