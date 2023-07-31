package com.narang_norang.NarangNorang.member.security.jwt;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.narang_norang.NarangNorang.member.auth.MemberDetails;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.service.MemberService;
import com.narang_norang.NarangNorang.member.util.ResponseBodyWriteUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private MemberService memberService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, MemberService memberService) {
        super(authenticationManager);
        this.memberService = memberService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        String header = request.getHeader(JwtTokenUtil.HEADER_STRING);

        if (header == null || !header.startsWith(JwtTokenUtil.TOKEN_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            Authentication authentication = getAuthentication(request);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            ResponseBodyWriteUtil.sendError(request, response, e);
            return;
        }

        filterChain.doFilter(request, response);
    }

    @Transactional(readOnly = true)
    public Authentication getAuthentication(HttpServletRequest request) throws Exception {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);

        if (token != null) {
            JWTVerifier verifier = JwtTokenUtil.getVerifier();
            JwtTokenUtil.handleError(token);
            DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
            String memberId = decodedJWT.getSubject();

            if (memberId != null) {
                Member member = memberService.getMemberByMemberId(memberId);

                if (member != null) {
                    MemberDetails memberDetails = new MemberDetails(member);
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(
                            memberId, null, memberDetails.getAuthorities());
                    jwtAuthentication.setDetails(memberDetails);
                    return jwtAuthentication;
                }
            }
            return null;
        }

        return null;
    }
}
