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



@Component
@Slf4j
@AllArgsConstructor
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator routeValidator;
    @Autowired
    private JwtService jwtService;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            log.info("filter gateway worked");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                if (jwtService.validateToken(token)) {
                    log.info("filter gateway worked VALID TOKEN TOGOROT");
                    return chain.filter(exchange); // Продолжаем выполнение цепочки фильтров
                } else {
                    return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid JWT token"));
                }
            } else {
                log.warn("No valid JWT token found in Authorization header");
                return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No valid JWT token found"));
            }
        };
    }

    public static class Config {

    }
}
