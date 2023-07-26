package com.narang_norang.NarangNorang.member.service;

import com.narang_norang.NarangNorang.member.exception.ErrorCode;
import com.narang_norang.NarangNorang.member.exception.NotFoundException;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Component("userDetailsService")
@RequiredArgsConstructor
public class MemberDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByMemberId(username)
                .orElseThrow(() -> new NotFoundException(username, ErrorCode.NOT_FOUND));


        return User.builder()
                .username(member.getMemberId())
                .password(member.getPassword())
                .build();
    }

//    private User toUser(String memberId, Member member) {
//        return new User(member.getMemberId(), member.getPassword());
//    }
}
