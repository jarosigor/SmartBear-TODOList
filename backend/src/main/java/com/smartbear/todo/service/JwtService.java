package com.smartbear.todo.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public interface JwtService {
    public String extractUsername(String token);
    public Date extractExpiration(String token);
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver);
    public Claims extractAllClaims(String token);
    public String generateToken(UserDetails userDetails);

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    );
    public String generateRefreshToken(UserDetails userDetails);
    public String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            Long expiration
    );


    public boolean isTokenValid(String token, UserDetails userDetails);

    public boolean isTokenExpired(String token);
    public Key getSignInKey();
}
