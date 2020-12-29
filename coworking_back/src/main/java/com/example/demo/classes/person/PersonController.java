package com.example.demo.classes.person;

import com.example.demo.classes.PersonType;
import com.example.demo.classes.token.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.UUID;


@RestController
@RequestMapping(value = "/users")
public class PersonController {

    private final PersonService service;

    @Autowired
    public PersonController(PersonService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<String> correctLogin(@RequestParam String email, @RequestParam String password) throws Exception {
        return ResponseEntity.ok(service.correctLogin(email, password));
    }

    @GetMapping("/all")
    public ResponseEntity<String> getAll() throws Exception{
        return ResponseEntity.ok(service.listOfPersons());
    }

    @GetMapping("/type")
    public ResponseEntity<String> getTypes(@RequestParam PersonType type, @RequestParam(defaultValue = "") UUID token) throws Exception{
        if(TokenService.checkToken(token)) {
            return ResponseEntity.ok(service.listOfTypes(type));
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping("/getInfo")
    public ResponseEntity<String> getInfo(@RequestParam String email) throws JSONException {
        return ResponseEntity.ok(service.getUserInfo(email));
    }

    @PostMapping
    public ResponseEntity<String> addNewUser(@RequestParam String name, @RequestParam String password,@RequestParam(defaultValue = "") String checkCode, @RequestParam String email, @RequestParam String phone,@RequestParam PersonType type) throws Exception {
        return ResponseEntity.ok(service.addNewPerson( password, email,  name,  phone, type, checkCode));
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteUserByEmail(@RequestParam String email) {
        return ResponseEntity.ok(service.deleteByEmail(email));
    }


    @DeleteMapping("/bred")
    public ResponseEntity<String> deleteUserByEmail(@RequestParam Date email) {
        return ResponseEntity.ok(email.toString());
    }


    @DeleteMapping("/all")
    public ResponseEntity<Boolean> deleteAllUsers() {
        return ResponseEntity.ok(service.deleteAllUsers());
    }

}
