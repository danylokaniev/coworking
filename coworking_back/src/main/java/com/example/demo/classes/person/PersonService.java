package com.example.demo.classes.person;

import com.example.demo.classes.PersonType;
import com.example.demo.classes.passwordService.PasswordService;
import com.example.demo.classes.repos.PersonRepo;
import com.example.demo.classes.token.TokenService;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepo repos;

    public PersonService(PersonRepo repos) {
        this.repos = repos;
    }

    public String addNewPerson(String password, String email, String name, String phone, PersonType type, String checkCode) throws Exception {
        String response = "";
        Boolean successRegister = false;
        if (type == PersonType.manager) {
            if (!checkCode.equals("manager")) {
                return new JSONObject()
                        .put("response", "Invalid check code")
                        .put("success", successRegister)
                        .toString();
            }
        } else if (type == PersonType.guide) {
            if (!checkCode.equals("guide")) {
                return new JSONObject()
                        .put("response", "Invalid check code")
                        .put("success", successRegister)
                        .toString();
            }
        }
        if (checkExisting(email)) {
            return new JSONObject()
                    .put("response", "Person with this email already exist")
                    .put("success", successRegister)
                    .toString();
        } else {
            String hashPassword = PasswordService.getSaltedHash(password);
            Person person = new Person(hashPassword, email, name, phone, type);
            System.out.println(person);
            repos.save(person);
            successRegister = true;
            return new JSONObject()
                    .put("response", new JSONObject()
                            .put("email", email)
                            .put("name", name)
                            .put("type", type)
                            .put("id", person.getId()))
                    .put("success", successRegister)
                    .put("sessionToken", TokenService.generateToken())
                    .toString();
        }
    }

    public boolean checkExisting(String email) {
        Person person;
        try {
            person = repos.getPersonByEmail(email).get(0);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public boolean deleteByEmail(String email) {
        Person person;
        try {
            person = repos.getPersonByEmail(email).get(0);
        } catch (Exception e) {
            return false;
        }
        repos.delete(person);
        return true;
    }

    public boolean deleteAllUsers() {
        List<Person> list = (List<Person>) repos.findAll();
        int listSize = list.size();
        if (listSize == 0) {
            return false;
        }
        for (int i = 0; i < listSize; i++) {
            repos.delete(list.get(i));
        }
        return true;
    }

    public String getUserInfo(String email) throws JSONException {
        String response = "";
        Boolean success = false;
        Person person = null;
        try {
            person = repos.getPersonByEmail(email).get(0);
        } catch (Exception e) {
            response = "person with email - (" + email + ") does not exsist.";
            return new JSONObject()
                    .put("response", response)
                    .put("success", success)
                    .toString();
        }

        return new JSONObject()
                .put("email", person.getEmail())
                .put("name", person.getname())
                .put("phone", person.getPhone())
                .put("type", person.getType())
                .toString();

    }

    public String correctLogin(String email, String password) throws Exception {
        String response = "";
        Boolean successLogin = false;
        Person person = null;
        try {
            person = repos.getPersonByEmail(email).get(0);
        } catch (Exception e) {
            return new JSONObject()
                    .put("response", new JSONObject()
                            .put("email", person.getEmail())
                            .put("name", person.getname())
                            .put("type", person.getType())
                            .put("id", person.getId()))
                    .put("success", false)
                    .toString();
        }


        Boolean isCorrectPassword = PasswordService.check(password, person.getPassword());
        if (isCorrectPassword) {
            successLogin = true;
        }


        return new JSONObject()
                .put("response", new JSONObject()
                        .put("email", person.getEmail())
                        .put("name", person.getname())
                        .put("type", person.getType())
                        .put("id", person.getId()))
                .put("success", successLogin)
                .put("sessionToken", TokenService.generateToken())
                .toString();
    }

    public String listOfPersons() throws Exception {
        List<Person> list = (List<Person>) repos.findAll();
        int listSize = list.size();

        if (listSize == 0) {
            return new JSONObject()
                    .put("response", "Person's List is empty")
                    .put("success", false)
                    .toString();
        }

        JSONObject jsonString = new JSONObject();

        for (int i = 0; i < listSize; i++) {
            jsonString.put(String.valueOf(i), new JSONObject()
                    .put("id", list.get(i).getId())
                    .put("type", list.get(i).getType())
                    .put("phone", list.get(i).getPhone())
                    .put("name", list.get(i).getname())
                    .put("email", list.get(i).getEmail()));
        }

        return new JSONObject()
                .put("success", true)
                .put("response", jsonString)
                .toString();
    }

    public String listOfTypes(PersonType type) throws Exception {
        List<Person> list = (List<Person>) repos.findAll();
        JSONObject jsonString = new JSONObject();

        list.stream()
                .filter(user -> user.getType() == type)
                .forEach((user) -> {
                            try {
                                jsonString.put(user.getEmail(),
                                        new JSONObject()
                                                .put("id", user.getId())
                                                .put("type", user.getType())
                                                .put("phone", user.getPhone())
                                                .put("name", user.getname())
                                                .put("email", user.getEmail()));
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                );

        return new JSONObject()
                .put("success", true)
                .put("type", type)
                .put("response", jsonString)
                .toString();
    }
}
