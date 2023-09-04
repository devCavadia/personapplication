package com.atenea.personapp.service;

import com.atenea.personapp.model.Person;
import com.atenea.personapp.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {
    @Autowired
    private PersonRepository peRepository;
    public List<Person> getPeople(){
        return peRepository.findAll();
    }

    public Person getOnePerson(Long idPerson){
        Optional<Person> optional = peRepository.findById(idPerson);
        if (optional.isPresent()){
            return optional.get();
        }
        return null;
    }

    public void addPerson(Person person){ peRepository.save(person); }

    public void updatePerson(Person person){
        if (person.getIdPerson()!=null){
            Optional<Person> optional = peRepository.findById(person.getIdPerson());
            if (optional.isPresent()){
                Person aux = optional.get();

                if (!aux.getName().equals("")) aux.setName(person.getName());
                if (!aux.getEmailAddress().equals("")) aux.setEmailAddress(person.getEmailAddress());
                if (aux.getAddress()!=null) aux.setAddress(person.getAddress());

                peRepository.save(aux);
            }
        }
    }

    public void deletePerson(Long idPerson){
        peRepository.deleteById(idPerson);
    }
}
