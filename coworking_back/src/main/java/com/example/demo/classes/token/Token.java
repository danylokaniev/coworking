package com.example.demo.classes.token;

import com.example.demo.classes.PersonType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;
import java.util.UUID;

@Entity
@EnableAutoConfiguration
public class Token {

    @Id
    private UUID id;

    public Token(UUID id) {
        this.id = id;
    }


    public Token() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
