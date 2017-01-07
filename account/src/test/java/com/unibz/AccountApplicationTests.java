package com.unibz;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.File;

public class AccountApplicationTests {

    private static Logger logger = LoggerFactory.getLogger( AccountApplicationTests.class );

    @Test
    public void testValidation() {
        RestTemplate restTemplate = new RestTemplate();

        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmbW" +
                "ljaGVsb25pIiwiY3JlYXRlZCI6MTQ4MzI5OTI2NzI2" +
                "OCwiZXhwIjoxNDg1ODkxMjY3LCJ1c2VybmFtZSI6Im" +
                "ZtaWNoZWxvbmkifQ.VKzB0YIZGYtVgoSuqIycKTfZk" +
                "5otwENT1pUy59DwfKoj29Hbcf8edPPvQWhFeqxKOGe" +
                "s6aAPYl1k_MFHhGLEew";

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>( token, headers );

        final ResponseEntity<String> exchange = restTemplate.exchange(
                "http://localhost:5001/validate",
                HttpMethod.POST, entity,
                String.class );

        logger.debug( "Status code for auth is [{}]", exchange.getStatusCode().value() );
    }

    @Test
    public void asdasd() {
        // open image
        File imgPath = new File( "/Users/fabriziomicheloni/images/fabri.png" );
        System.out.println( imgPath.getAbsolutePath() );
        try {
            BufferedImage bufferedImage = ImageIO.read( imgPath );

            WritableRaster raster = bufferedImage .getRaster();
            DataBufferByte data   = (DataBufferByte) raster.getDataBuffer();


            byte[] image = data.getData();

        } catch ( Exception e ) {
            e.printStackTrace();
        }
    }
}
