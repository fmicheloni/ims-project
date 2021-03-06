package com.unibz.controller;

import com.unibz.service.UserService;
import org.apache.tika.Tika;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Date;


/**
 * Created by fabriziomicheloni on 30/12/16.
 */
@RestController
@Controller
public class ProfileImageController {

    private static Logger logger = LoggerFactory.getLogger( ProfileImageController.class );

    @Value( "${upload.path}" )
    private String storePath;

    @Autowired
    private UserService userService;

    @Autowired
    ServletContext context;

    private Tika tika;

    @RequestMapping( value = "/upload", method = RequestMethod.POST )
    public @ResponseBody ResponseEntity handleImageUpload(
            @RequestParam( "file" ) MultipartFile file,
            @RequestParam( "username" ) String username ) {

        tika = new Tika();

        if ( file.isEmpty() ) {
            return ResponseEntity.status( HttpStatus.BAD_REQUEST ).body( "File cannot be empty." );
        }

        String imageName = null;

        try {
            String detectedType = tika.detect( file.getBytes() );

            logger.debug( "Uploading new file with type: [{}]", detectedType );

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

            userService.updateProfilePicture( imageName, username );

            logger.debug( "Image saved successfully." );

            return ResponseEntity.ok().body( null );
        } catch ( IOException e ) {
            logger.debug( "Extension not supported." );
            return ResponseEntity.status( HttpStatus.BAD_REQUEST ).body( "Extension should be jpg, jpeg or png." );
        } catch ( Exception e ) {
            logger.error( "Error while saving the image.", e );
            new File( imageName ).delete();
            return ResponseEntity.status( HttpStatus.BAD_REQUEST ).body( "Error while saving the image." );
        }
    }

    @RequestMapping( value = "/public/{imageName:.+}", method = RequestMethod.GET )
    public void serveImage( @PathVariable String imageName, HttpServletResponse response ) throws IOException {

        final String finalImagePath = String.format( "%s%s", storePath, imageName );

        logger.debug( "Serving image [{}]", finalImagePath );

        InputStream in = new FileInputStream( finalImagePath );
        response.setContentType( getImageMediaType( finalImagePath ) );
        IOUtils.copy( in, response.getOutputStream() );
        in.close();

        //        // open image
        //        File imgPath = new File( finalImagePath );
        //        BufferedImage bufferedImage = ImageIO.read( imgPath );
        //
        //        // get DataBufferBytes from Raster
        //        WritableRaster raster = bufferedImage.getRaster();
        //        DataBufferByte data = ( DataBufferByte ) raster.getDataBuffer();
        //
        //
        //        byte[] image = data.getData();
        //
        //        return ResponseEntity.ok().contentType( getImageMediaType( imageName ) ).body( image );
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

    private String generateImageName( String extension ) {
        String asd = new Date().getTime() + "" + ( char ) ( ( int ) ( Math.random() * 26 ) + 64 );
        String encoded = Base64Utils.encodeToString( asd.getBytes() );
        encoded = encoded.substring( 0, encoded.length() - 1 );

        return String.format( "%s%s.%s", storePath, encoded, cleanExtension( extension ) );
    }

    private String cleanExtension( String rawExtension ) {
        return rawExtension.substring( rawExtension.indexOf( '/' ) + 1 );
    }
}
