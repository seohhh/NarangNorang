package com.narang_norang.NarangNorang.member.exception;

import lombok.Getter;

@Getter
public class DuplicateException extends RuntimeException{

    private final ErrorCode errorCode;


    public DuplicateException(String message, ErrorCode errorCode) {
        super(message + " is duplicated");
        this.errorCode = errorCode;
    }
}
