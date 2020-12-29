package com.example.demo.classes.repos;

import com.example.demo.classes.person.Person;
import com.example.demo.classes.place.Place;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface PlaceRepo extends CrudRepository<Place, Integer> {

    Place getPlaceById(int id);


}