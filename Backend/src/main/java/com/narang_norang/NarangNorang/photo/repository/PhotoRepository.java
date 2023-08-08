package com.narang_norang.NarangNorang.photo.repository;

import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query(value ="SELECT p FROM Photo p JOIN FETCH Member m WHERE m.member_id = :memberId")
    List<Photo> findByMemberSeq(Long memberSeq);

    Optional<Photo> findByPhotoSeq(Long photoSeq);


}
