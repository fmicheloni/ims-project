package com.unibz.receiver;

import com.google.gson.Gson;
import com.unibz.dao.entity.UserEntity;
import com.unibz.receiver.mail.CustomMailSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by fabriziomicheloni on 05/01/17.
 */
public class MessageReceiver {

    private static Logger logger = LoggerFactory.getLogger( MessageReceiver.class );

    private CustomMailSender customMailSender;

    public void receiveMessage( String rawUser ) {
        logger.debug( "New message found." );

        final UserEntity userEntity = new Gson().fromJson( rawUser, UserEntity.class );

        customMailSender.sendEmail( userEntity );
    }

    public MessageReceiver customMailSender( CustomMailSender customMailSender ) {
        this.customMailSender = customMailSender;
        return this;
    }
}
