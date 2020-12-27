package com.example.demo.classes.person;

import com.example.demo.classes.PersonType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@EnableAutoConfiguration
public class Person {

    @Id
    private UUID id;
    private String password;
    private String email;
    private String name;
    private String phone;
    private PersonType type;

    public Person(String password, String email, String name, String phone, PersonType type) {
        this.password = password;
        this.email = email;
        this.name = name;
        this.type = type;
        this.id = UUID.randomUUID();
        this.phone = phone;

    }

    public Person(){

    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getname() {
        return name;
    }

    public void setname(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public PersonType getType() {
        return type;
    }

    public void setType(PersonType type) {
        this.type = type;
    }

    @Override

    public String toString() {
        return ("\n (Person) email: " + email + "\n\t   Password: " + password + "\n\t      ID: " + id);
    }

}
