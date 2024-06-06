package com.example.gatewayserver.filter;



import com.example.gatewayserver.jwt.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;


@Component
@Slf4j
@AllArgsConstructor
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private JwtService jwtService;

    private static final List<String> EXCLUDED_PATHS = List.of(
            "/ws/",
            "/authentication-server/sign-up",
            "/authentication-server/sign-in",
            "/authentication-server/validate-token",
            "/authentication-server/get-token"
    );

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getURI().getPath();
            log.info("filter gateway worked - " + exchange.getRequest().getURI().getPath());

            // Bypass authentication for excluded paths
            if (isExcludedPath(path)) {
                log.info("trow filter");
                return chain.filter(exchange);
            }

            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                if (jwtService.validateToken(token)) {
                    log.info("VALID TOKEN TOGOROT - " + exchange.getRequest().getURI().getPath());
                    return chain.filter(exchange); // Продолжаем выполнение цепочки фильтров
                } else {
                    return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid JWT token"));
                }
            } else {
                log.warn("No valid JWT token found in Authorization header\n" + exchange.getRequest().getPath());
                return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No valid JWT token found"));
            }
        };
    }

    private boolean isExcludedPath(String path) {
        return EXCLUDED_PATHS.stream().anyMatch(path::startsWith);
    }

    public static class Config {
        // Configuration properties for the filter, if needed
    }
}