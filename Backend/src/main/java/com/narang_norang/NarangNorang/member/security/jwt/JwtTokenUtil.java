package com.narang_norang.NarangNorang.member.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;

import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private static String secretKey;

    @Value("${jwt.token-validity-in-second}")
    private static Integer expirationTime;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "ssafy.com";

//    @Autowired
//    public JwtTokenUtil(@Value("${jwt.secret}") String secretKey, @Value("${jwt.token-validity-in-second}") Integer expirationTime) {
//        this.secretKey = secretKey;
//        this.expirationTime = expirationTime;
//    }

    public void setExpirationTime() {
        JwtTokenUtil.expirationTime = expirationTime;
    }

    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public static String getToken(String memberId) {
        Date expires = JwtTokenUtil.getTokenExpiration(expirationTime);
        return JWT.create()
                .withSubject(memberId)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

//    public static String getToken(Instant expires, String memberId) {
//
//    }

    public static Date getTokenExpiration(int expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }
}
