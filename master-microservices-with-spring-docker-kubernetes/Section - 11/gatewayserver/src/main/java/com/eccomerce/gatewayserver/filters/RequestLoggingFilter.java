package com.eccomerce.gatewayserver.filters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Order(1)
@Component
public class RequestLoggingFilter implements GlobalFilter {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(RequestLoggingFilter.class);
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        long startTimeMillis = System.currentTimeMillis();
        LOGGER.info("Routing request {} {}", exchange.getRequest().getMethod(), exchange.getRequest().getURI());
        return chain.filter(exchange).doFinally(signalType -> {
            long durationMillis = System.currentTimeMillis() - startTimeMillis;
            LOGGER.info("Completed request {} {} with status {} in {} ms", exchange.getRequest().getMethod(),
                    exchange.getRequest().getURI(), exchange.getResponse().getStatusCode(), durationMillis);
        });
    }
}
