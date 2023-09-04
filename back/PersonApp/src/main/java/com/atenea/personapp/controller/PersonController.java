package com.atenea.personapp.controller;

import com.atenea.personapp.model.Person;
import com.atenea.personapp.model.Professor;
import com.atenea.personapp.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = "*")
public class PersonController {
    @Autowired
    private PersonService peService;

    @GetMapping("/all")
    public List<Person> getPeople(){
        return peService.getPeople();
    }

    @GetMapping("/one/{id}")
    public Person getOnePerson(@PathVariable("id") Long idPerson){
        return peService.getOnePerson(idPerson);
    }
    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addPerson(@RequestBody Person person){
        peService.addPerson(person);
    }
    @PutMapping("/upd")
    @ResponseStatus(HttpStatus.CREATED)
    public void updatePerson(@RequestBody Person person){
        peService.updatePerson(person);
    }

    @DeleteMapping("/del/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePerson(@PathVariable("id") Long idPerson){
        peService.deletePerson(idPerson);
    }
}
