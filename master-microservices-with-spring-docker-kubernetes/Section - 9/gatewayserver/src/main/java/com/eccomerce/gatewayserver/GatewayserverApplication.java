package com.eccomerce.gatewayserver;

import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.timelimiter.TimeLimiterConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.circuitbreaker.resilience4j.ReactiveResilience4JCircuitBreakerFactory;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JConfigBuilder;
import org.springframework.cloud.client.circuitbreaker.Customizer;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteDefinitionLocator;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@SpringBootApplication
public class GatewayserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayserverApplication.class, args);
	}

    @Bean
    public RouteLocator ecommerceRouteConfig(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder.routes()
                .route(p -> p.path("/ecommerce/accounts/**")
                        .filters(f -> f.rewritePath("ecommerce/accounts/?(?<remaining>.*)", "/${remaining}")
                                .addRequestHeader("X-Request-Time", String.valueOf(System.currentTimeMillis()))
                                .addResponseHeader("X-Response-Time",String.valueOf(System.currentTimeMillis()))
                                .circuitBreaker(config -> config.setName("accountsCircuitBreaker")
                                        .setFallbackUri("forward:/contact-support")))
                        .uri("lb://ACCOUNTS"))
                .route(p -> p.path("/ecommerce/loans/**")
                        .filters(f -> f.rewritePath("ecommerce/loans/?(?<remaining>.*)", "/${remaining}")
                                .addRequestHeader("X-Request-Time", LocalDateTime.now().toString())
                                .addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
                                .retry(retryConfig -> retryConfig.setRetries(3)
                                        .setMethods(HttpMethod.GET)
                                        .setBackoff(Duration.ofMillis(100), Duration.ofMillis(1000), 2, true)))
                        .uri("lb://LOANS")
                )
                .route(p -> p.path("/ecommerce/cards/**")
                        .filters(f -> f.rewritePath("ecommerce/cards/?(?<remaining>.*)", "/${remaining}")
                                .addRequestHeader("X-Request-Time", LocalDateTime.now().toString())
                                .addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
                                .requestRateLimiter(config -> config.setRateLimiter(redisRateLimiter())
                                .setKeyResolver(userKeyResolver())))
                        .uri("lb://CARDS"))
//                        .filters(f -> f.rewritePath("ecommerce/accounts/?(?\u003Cremaining\u003E.*)", "/${remaining}")))
                .build();
    }
    
    @Bean
    public Customizer<ReactiveResilience4JCircuitBreakerFactory> defaultCustomizer(){
        return factory -> factory
                .configureDefault(
                id -> new Resilience4JConfigBuilder(id)
                .circuitBreakerConfig(CircuitBreakerConfig.ofDefaults())
                .timeLimiterConfig(TimeLimiterConfig.custom()
                        .timeoutDuration(Duration.ofSeconds(4))
                        .build())
                        .build());
    }
    
    @Bean
    public RedisRateLimiter redisRateLimiter(){
        return new RedisRateLimiter(100, 100, 1);
    }
    
    @Bean
    KeyResolver userKeyResolver(){
        return exchange -> Mono.justOrEmpty(exchange.getRequest().getHeaders().getFirst("user"))
                .defaultIfEmpty("anonymous");
    }
}
