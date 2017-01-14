import com.unibz.entity.Excursion;
import com.unibz.service.ExcursionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Date;

@EnableDiscoveryClient
@SpringBootApplication
@EntityScan( "com.unibz.entity" )
@ComponentScan( { "com.unibz.service.impl", "com.unibz.controller" } )
@EnableAutoConfiguration
@Configuration
@EnableJpaRepositories( value = "com.unibz.repository" )
public class ExcursionApplication implements CommandLineRunner {

    private static Logger logger = LoggerFactory.getLogger( ExcursionApplication.class );

    public static void main( String[] args ) {
        SpringApplication.run( ExcursionApplication.class, args );
    }

    @Autowired
    private ExcursionService excursionService;

    @Override
    public void run( final String... strings ) throws Exception {

        this.excursionService.saveExcursion( new Excursion()
                .insertionDate( new Date() )
                .username( "fmicheloni" )
                .image( "MTQ4NDE3NTUzNDgxMlk.png" )
                .peopleTarget( "asdasd" )
                .placeTarget( "myPlace" )
                .title( "My Title" )
                .longDescription( "This is a super cool excursion!!!" ) );

        this.excursionService.saveExcursion( new Excursion()
                .insertionDate( new Date() )
                .username( "fmicheloni" )
                .image( "MTQ4NDE3NTUzNDgxMlk.png" )
                .peopleTarget( "asdasd" )
                .placeTarget( "myPlace" )
                .title( "My Title" )
                .longDescription( "This is a super cool excursion!!!" ) );

        this.excursionService.saveExcursion( new Excursion()
                .insertionDate( new Date() )
                .username( "fmicheloni" )
                .image( "MTQ4NDE3NTUzNDgxMlk.png" )
                .peopleTarget( "asdasd" )
                .placeTarget( "myPlace" )
                .title( "My Title" )
                .longDescription( "This is a super cool excursion!!!" ) );
    }
}
