package com.example.demo.classes.token;

import com.example.demo.classes.repos.TokenRepo;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
public class TokenService {

    private static  TokenRepo repos = null;

    public TokenService(TokenRepo repos) {
        this.repos = repos;
    }

    static public boolean checkToken(UUID id) {

        try{
            UUID token = repos.getTokenById(id).getId();
        } catch (Exception e) {
            return  false;
        }
        return true;

    }

    static public UUID generateToken() {
        UUID id = UUID.randomUUID();
        repos.save(new Token(id));
        return id;
    }

}
