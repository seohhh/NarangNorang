package com.narang_norang.NarangNorang.member.auth;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class MemberDetailService implements UserDetailsService {

    @Autowired
    MemberService memberService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberService.getMemberByMemberId(username);
        if (member != null) {
            MemberDetails memberDetails = new MemberDetails(member);
            return memberDetails;
        }
        return null;
    }
}
