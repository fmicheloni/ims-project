package com.unibz.configuration;

import com.unibz.receiver.MessageReceiver;
import com.unibz.receiver.mail.CustomMailSender;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by fabriziomicheloni on 05/01/17.
 */
@Configuration
public class RabbitMQConfiguration {

    @Value( "${queue.name}" )
    private String queueName;

    @Bean
    @SuppressWarnings( "SpringJavaAutowiringInspection" )
    public MessageReceiver messageReceiver( CustomMailSender customMailSender ) {
        return new MessageReceiver()
                .customMailSender( customMailSender );
    }

    @Bean
    public MessageListenerAdapter listenerAdapter( MessageReceiver messageReceiver ) {
        return new MessageListenerAdapter( messageReceiver, "receiveMessage" );
    }

    @SuppressWarnings( "SpringJavaAutowiringInspection" )
    @Bean
    public SimpleMessageListenerContainer simpleMessageListenerContainer( ConnectionFactory connectionFactory,
                                                                          MessageListenerAdapter listenerAdapter ) {
        SimpleMessageListenerContainer simpleMessageListenerContainer = new SimpleMessageListenerContainer();
        simpleMessageListenerContainer.setConnectionFactory( connectionFactory );
        simpleMessageListenerContainer.setQueueNames( queueName );
        simpleMessageListenerContainer.setMessageListener( listenerAdapter );
        return simpleMessageListenerContainer;
    }
}
