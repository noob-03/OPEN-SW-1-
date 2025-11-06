package org.example.assignments;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(vaue = HttpStatus.NOT_FOUND, reason = "entity not found")
public class DataNotFoundException {
    private static final long serialVersionUID = 1L;
    public DataNotFoundException(String message){
        super(message);
    }
}
