package com.example.demo.classes.place;


import com.example.demo.classes.PersonType;
import com.example.demo.classes.person.Person;
import com.example.demo.classes.repos.PersonRepo;
import com.example.demo.classes.repos.PlaceRepo;
import com.example.demo.classes.token.TokenService;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
public class PlaceService {

    private final PlaceRepo repos;
    private final PersonRepo personRepo;

    public PlaceService(PlaceRepo repos, PersonRepo personRepo) {
        this.repos = repos;
        this.personRepo = personRepo;
    }

    public Boolean addNewPlace() {
        Place place = new Place(null, null, UUID.fromString("00000000-0000-0000-0000-000000000000"), "");
        repos.save(place);
        return true;
    }

    public Boolean updatePlaces() {
        List<Place> list = (List<Place>) repos.findAll();

        for (int i = 0; i < list.size(); i++) {
            if (!list.get(i).getFinishtime().before(new Date())) {
                list.get(i).setClientId(UUID.fromString("00000000-0000-0000-0000-000000000000"));
                list.get(i).setFinishtime(null);
                list.get(i).setStartTime(null);
                list.get(i).setNameOfCompany("");
            }
        }

        return true;
    }

    public Object fillPlace(String startTime, String finishTime, UUID clientId, String nameOfCompany, Integer placeId) throws ParseException, JSONException {

        Date dateBefore = (Date) correctDate(startTime);
        Date dateAfter = (Date) correctDate(finishTime);


        if (dateAfter == null || dateBefore == null || dateAfter.before(dateBefore)) {
            System.out.println("invalid date" +  dateBefore +  dateAfter);
            return null;
        }
        try {
            personRepo.getPersonById(clientId);
        } catch (Exception e) {
            System.out.println("client not found");
            return null;
        }
        Place place = null;
        try {
            place = repos.getPlaceById(placeId);
        } catch (Exception e) {
            System.out.println("Place with id " + placeId + " does not exist");
            return null;
        }


        place.setStartTime(dateBefore);
        place.setFinishtime(dateBefore);
        place.setClientId(clientId);
        place.setNameOfCompany(nameOfCompany);

        String clientName = "";
        try {
            clientName = personRepo.getPersonById(place.getClientId()).get(0).getName();
        } catch (Exception ignored) { }
        repos.save(place);

        return new JSONObject()
                .put("response", new JSONObject()
                        .put("id", place.getId())
                        .put("nameOfCompany", place.getNameOfCompany())
                        .put("clientId", place.getClientId())
                        .put("clientName",clientName)
                        .put("finishTime", place.getFinishtime())
                        .put("startTime", place.getStartTime()))
                .put("success", true)
                .toString();
    }

    public String getPlace(Integer id) throws JSONException {

        Place place = repos.getPlaceById(id);

        String clientName = "";
        try {
            clientName = personRepo.getPersonById(place.getClientId()).get(0).getName();
        } catch (Exception ignored) { }
        return new JSONObject()
                .put("response", new JSONObject()
                        .put("id", place.getId())
                        .put("nameOfCompany", place.getNameOfCompany())
                        .put("clientId", place.getClientId())
                        .put("clientName", clientName)
                        .put("finishTime", place.getFinishtime())
                        .put("startTime", place.getStartTime()))
                .put("success", true)
                .toString();

    }


    public Object correctDate(String data) throws ParseException {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

        Date date;

        try {
            date = formatter.parse(data);
        } catch (Exception e) {
            return null;
        }

        if (Integer.parseInt(data.split("-")[1]) > 12 ||
                Integer.parseInt(data.split("-")[1]) < 1 ||
                Integer.parseInt(data.split("-")[2]) > 31 ||
                Integer.parseInt(data.split("-")[2]) < 1) {
            System.out.println(Integer.parseInt(data.split("-")[1]));
            System.out.println(Integer.parseInt(data.split("-")[0]));
            return null;
        }

        return date;
    }

    public String getPlaces() throws JSONException {
        List<Place> list = (List<Place>) repos.findAll();
        JSONObject jsonString = new JSONObject();

        for (Place place : list) {
            String clientName = "";
            try {
                clientName = personRepo.getPersonById(place.getClientId()).get(0).getName();
            } catch (Exception ignored) { }


            jsonString.put(String.valueOf(place.getId()),
                    new JSONObject()
                            .put("id", place.getId())
                            .put("nameOfCompany", place.getNameOfCompany())
                            .put("clientId", place.getClientId())
                            .put("clientName", clientName)
                            .put("finishTime", place.getFinishtime())
                            .put("startTime", place.getStartTime()));
        }

        return new JSONObject()
                .put("success", true)
                .put("response", jsonString)
                .toString();
    }

    public void deleteAll() {
        repos.deleteAll();
    }
}
