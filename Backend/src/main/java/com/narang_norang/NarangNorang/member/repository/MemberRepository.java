package com.narang_norang.NarangNorang.member.repository;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberId(String memberId);
    boolean existsByMemberId(String memberId);
}
