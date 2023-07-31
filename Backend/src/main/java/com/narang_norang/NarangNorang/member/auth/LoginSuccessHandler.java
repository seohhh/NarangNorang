package com.narang_norang.NarangNorang.member.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws ServletException, IOException {


        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String id = userDetails.getUsername();
        HttpSession session = request.getSession();
        session.setAttribute("id", id);

        super.onAuthenticationSuccess(request, response, authentication);
        response.sendRedirect("/home");
    }
}
