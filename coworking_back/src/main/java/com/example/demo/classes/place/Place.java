package com.example.demo.classes.place;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;
import java.util.UUID;

@Entity
@EnableAutoConfiguration
public class Place {
    private static int count = 1;

    @Id
    private Integer id;
    private Date startTime;
    private Date finishtime;
    private UUID clientId;
    private String nameOfCompany;


    public Place(Date startTime, Date finishtime, UUID clientId, String nameOfCompany) {
        this.startTime = startTime;
        this.finishtime = finishtime;
        this.clientId = clientId;
        this.nameOfCompany = nameOfCompany;
        this.id = count;
        count++;
    }


    public Place() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getFinishtime() {
        return finishtime;
    }

    public void setFinishtime(Date finishtime) {
        this.finishtime = finishtime;
    }

    public UUID getClientId() {
        return clientId;
    }

    public void setClientId(UUID clientId) {
        this.clientId = clientId;
    }

    public String getNameOfCompany() {
        return nameOfCompany;
    }

    public void setNameOfCompany(String nameOfCompany) {
        this.nameOfCompany = nameOfCompany;
    }
}
