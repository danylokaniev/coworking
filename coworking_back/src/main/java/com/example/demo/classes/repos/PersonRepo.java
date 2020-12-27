package com.example.demo.classes.repos;

import com.example.demo.classes.person.Person;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface PersonRepo extends CrudRepository<Person, UUID> {
    List<Person> getPersonByEmail(String email);

    List<Person> getPersonById(UUID id);

    List<Person> getPersonByPhone(String  phone);

    void deleteByEmail(String email);

}