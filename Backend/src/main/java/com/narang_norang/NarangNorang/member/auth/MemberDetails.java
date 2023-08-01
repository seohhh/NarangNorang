package com.narang_norang.NarangNorang.member.auth;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


public class MemberDetails implements UserDetails {

    @Autowired
    Member member;

    boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentiaNonExpired;
    boolean enabled = false;
    List<GrantedAuthority> roles = new ArrayList<>();

    public MemberDetails(Member member) {
        super();
        this.member = member;
    }

    public Member getMember() {
        return this.member;
    }

    @Override
    public String getPassword() {
        return this.member.getMemberPassword();
    }
    @Override
    public String getUsername() {
        return this.member.getMemberId();
    }
    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }
    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentiaNonExpired;
    }
    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    public void setAuthorities(List<GrantedAuthority> roles) {
        this.roles = roles;
    }

}
