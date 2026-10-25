package com.api.gateway.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(GatewayConfig.class);

    @Bean
    public GlobalFilter customGlobalFilter() {
        return (exchange, chain) -> {
            LOGGER.info("Incoming request path: {}", exchange.getRequest().getPath());
            return chain.filter(exchange);
        };
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // --- USER SERVICE ROUTE ---
                .route("user-service-route", r -> r
                        .path("/users/**") // Match clean path
                        .filters(f -> f.prefixPath("/api/v1")) // Prepend /api/v1
                        .uri("http://localhost:8081")) // Forward to backend

                // --- ORDER SERVICE ROUTE ---
                .route("order-service-route", r -> r
                        .path("/orders/**")
                        .uri("http://localhost:8082"))
                .build();
    }
}
