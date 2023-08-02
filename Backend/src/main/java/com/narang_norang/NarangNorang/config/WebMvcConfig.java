package com.narang_norang.NarangNorang.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

    /**
     * CORS 정책 허용 URL, METHOD
     * @param corsRegistry
     */
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**")
                .allowedOrigins("https://3.36.126.169:3000", "http://3.36.126.169:3000",
                        "http://i9c208.p.ssafy.io:3000", "https://i9c208.p.ssafy.io:3000",
                        "https://i9c208.p.ssafy.io", "https://3.36.126.169", "http://localhost:3000")
                .allowedMethods((ALLOWED_METHOD_NAMES.split(",")));
    }
}
