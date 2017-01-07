package com.unibz.configuration;


import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
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
    Queue queue() {
        return new Queue( queueName, false );
    }

    @Bean
    TopicExchange exchange() {
        return new TopicExchange( "ims-exchange" );
    }

    @Bean
    Binding binding( Queue queue, TopicExchange exchange ) {
        return BindingBuilder.bind( queue ).to( exchange ).with( queueName );
    }
}
