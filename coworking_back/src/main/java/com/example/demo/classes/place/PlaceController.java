package com.example.demo.classes.place;

import com.example.demo.classes.person.PersonService;
import com.example.demo.classes.token.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "/places")
public class PlaceController {

    private final PlaceService service;

    @Autowired
    public PlaceController(PlaceService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<String> getPlaces(@RequestParam String token) throws Exception {
        if(TokenService.checkToken(UUID.fromString(token))) {
            return ResponseEntity.ok(service.getPlaces());
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getPlaces(@RequestParam UUID token, @PathVariable Integer id) throws Exception {
        if(TokenService.checkToken(token)) {
            return ResponseEntity.ok(service.getPlace(id));
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }




    @PostMapping
    public ResponseEntity<String> fillPlace(@RequestParam String startTime,@RequestParam  String finishTime,
                                           @RequestParam  UUID clientId,@RequestParam  String nameOfCompany,
                                           @RequestParam Integer placeId, @RequestParam UUID token) throws Exception {
        if(TokenService.checkToken(token)) {
            String response = (String) service.fillPlace(startTime, finishTime, clientId, nameOfCompany, placeId);
            if(response != null) {
                return ResponseEntity.ok(response);
            } else {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }

        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> fillPlace(@RequestParam UUID token, @RequestParam Integer amount) throws Exception {
        if (TokenService.checkToken(token)) {
            for (int i = 0; i < amount; i++) {
                service.addNewPlace();
            }
            return ResponseEntity.ok("true");
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }


    @PutMapping
    public ResponseEntity<String> updatePlaces(@RequestParam UUID token) throws Exception {
        if(TokenService.checkToken(token)) {
            return ResponseEntity.ok(service.updatePlaces().toString());
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }


    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam UUID token) throws Exception {
        if(TokenService.checkToken(token)) {
            service.deleteAll();
            return ResponseEntity.ok("true");
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }
}
