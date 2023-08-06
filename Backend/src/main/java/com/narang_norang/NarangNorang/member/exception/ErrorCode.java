package com.narang_norang.NarangNorang.member.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    NOT_FOUND(404, "NOT FOUND"),
    DUPLICATION(400, "DUPLICATED"),
    INTER_SERVER_ERROR(500, "INTER SERVER ERROR");

    private int status;
    private String message;
}
