package com.narang_norang.NarangNorang.redis;

import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import com.narang_norang.NarangNorang.redis.room.repositoy.RoomRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
public class RoomTest {

    @Autowired
    private RoomRepository roomRepository;

    @Test
    void RoomTest() {
        // given
        String roomId = "room123";
        String hostname = "test";

        roomRepository.save(Room.builder()
                .roomId(roomId)
                .hostname(hostname)
                .build());

        // when
        List<Room> rooms = (List<Room>) roomRepository.findAll();

        // then
        Room room = rooms.get(0);

        assertThat(room.getRoomId()).isEqualTo(roomId);
        assertThat(room.getHostname()).isEqualTo(hostname);
        System.out.println(room);
    }
}
