package com.example.demo.classes.person;

import com.example.demo.classes.PersonType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
    public ResponseEntity<String> getTypes(@RequestParam PersonType type) throws Exception{
        return ResponseEntity.ok(service.listOfTypes(type));
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


    @DeleteMapping("/all")
    public ResponseEntity<Boolean> deleteAllUsers() {
        return ResponseEntity.ok(service.deleteAllUsers());
    }

}
