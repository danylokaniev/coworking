package com.example.demo.classes.repos;

import com.example.demo.classes.person.Person;
import com.example.demo.classes.token.Token;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface TokenRepo extends CrudRepository<Token, UUID> {

    Token getTokenById(UUID id);
}