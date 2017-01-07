package com.unibz.receiver.mail;

import com.unibz.dao.entity.UserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Created by fabriziomicheloni on 06/01/17.
 */
@Component
public class CustomMailSender {

    private static Logger logger = LoggerFactory.getLogger( CustomMailSender.class );

    @Value( "${custommail.from}" )
    private String mailFrom;

    @Value( "${custommail.development}" )
    private boolean developmentMode;

    @Autowired
    private JavaMailSender javaMailSender;

    private String mailText =
            "Click here: %s";

    public void sendEmail( UserEntity userEntity ) {
        logger.debug( "Sending new email..." );

        MimeMessage mail = javaMailSender.createMimeMessage();
        try {
            String activationUrl = String.format( "http://mail.unibz.com:8001/activate/%s", userEntity.getUsername() );

            MimeMessageHelper helper = new MimeMessageHelper( mail, true );
            helper.setTo( userEntity.getEmail() );
            helper.setFrom( mailFrom );
            helper.setSubject( "Account Activation" );
            helper.setText( String.format( mailText, activationUrl ) );
        } catch ( MessagingException e ) {
            logger.error( "Unable to send mail.", e );
        } finally {
            if ( !developmentMode ) {
                javaMailSender.send( mail );
            } else {
                logger.info( "Mail sent - development mode!" );
            }
        }
    }

    public CustomMailSender javaMailSender( JavaMailSender javaMailSender ) {
        this.javaMailSender = javaMailSender;
        return this;
    }
}
