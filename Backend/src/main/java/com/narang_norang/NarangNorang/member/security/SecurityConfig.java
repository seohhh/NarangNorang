package com.narang_norang.NarangNorang.member.security;

import com.narang_norang.NarangNorang.member.auth.LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${jwt.secret")
    private String secret;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            // rest api
            .httpBasic().disable()
            // csrf 사용X
            .csrf().disable()
            // 인가된 사용자만 허용하는지
            .authorizeHttpRequests()
                .anyRequest().permitAll()
//                .antMatchers("/api/member").permitAll()
                .and()
            .formLogin()
                .usernameParameter("id")
                .passwordParameter("pwd")
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .successHandler(loginSuccessHandler())
                .and()
            .logout()
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/home")
                .and()
            // JWT Token을 위한 Filter
            // 세션저장 끄기
            .addFilter(jwtAuthenticationFilter())
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler();
    }

    @Bean
    public JwtUtils jwtUtils() {
        return new JwtUtils(secret);
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception {
        return new JwtAuthenticationFilter(authenticationManager(), jwtUtils());
    }

}
