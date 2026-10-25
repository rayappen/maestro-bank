package com.eccomerce.gatewayserver.filters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

import static java.util.Arrays.stream;


@Component
public class ResponseTraceFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(ResponseTraceFilter.class);
    
    @Autowired
    FilterUtility filterUtility;

    @Bean
    public GlobalFilter postGlobalFilter() {
        return (exchange, chain) -> 
                chain.filter(exchange).then(Mono.fromRunnable(() -> {
                HttpHeaders requestHeaders = exchange.getRequest().getHeaders();
                String correlationID = filterUtility.getCorrelationId(requestHeaders);
                LOGGER.debug("Updated correlationId: {}", correlationID);
                exchange.getResponse().getHeaders().add(FilterUtility.CORRELATION_ID, correlationID);
                
//                if(requestHeaders.get("X-Request-Time") != null){
//                    long requestTime =
//                            Long.parseLong(
//                                    Objects.requireNonNull(exchange.getRequest()
//                                            .getHeaders()
//                                            .getFirst("X-Request-Time")));
//
//                    long processTime =
//                            System.currentTimeMillis() - requestTime;
//
//                    exchange.getResponse()
//                            .getHeaders()
//                            .add("X-Process-Time",
//                                    String.valueOf(processTime));
//                }
            }));
    };
}
