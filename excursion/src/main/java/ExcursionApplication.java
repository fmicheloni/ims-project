import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class ExcursionApplication implements CommandLineRunner {

    private static Logger logger = LoggerFactory.getLogger( ExcursionApplication.class );

    public static void main( String[] args ) {
        SpringApplication.run( ExcursionApplication.class, args );
    }

    @Override public void run( final String... strings ) throws Exception {

    }
}
