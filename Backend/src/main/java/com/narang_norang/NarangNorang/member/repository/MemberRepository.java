package com.narang_norang.NarangNorang.member.repository;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @EntityGraph(attributePaths = "authorities")
    Optional<Member> findByMemberId(String memberId);
}
