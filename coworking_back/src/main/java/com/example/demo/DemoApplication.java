package com.example.demo;

import com.example.demo.classes.token.TokenService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) throws ParseException {
        SpringApplication.run(DemoApplication.class, args);


        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

        String dateInString = "2020-12-12";
        String dateInString1 = "2020-12-13";
        Date date = formatter.parse(dateInString);
        Date date1 = formatter.parse(dateInString1);


        System.out.println(TokenService.checkToken(UUID.fromString("79f29089-fd86-4dc4-a137-16e34c682f66")));


    }

}
