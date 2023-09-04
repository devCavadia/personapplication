package com.atenea.personapp.service;

import com.atenea.personapp.model.Professor;
import com.atenea.personapp.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {
    @Autowired
    private ProfessorRepository proRepository;

    public List<Professor> getProfessors(){
        return proRepository.findAll();
    }

    public Professor getOneProfessor(Long idProfessor){
        Optional<Professor> optional = proRepository.findById(idProfessor);
        if (optional.isPresent()){
            return optional.get();
        }
        return null;
    }

    public void addProfessor(Professor professor){
        proRepository.save(professor);
    }

    public void updateProfessor(Professor professor){
        if (professor.getIdPerson()!=null){
            Optional<Professor> optional = proRepository.findById(professor.getIdPerson());
            if (optional.isPresent()){
                Professor aux = optional.get();

                if (!aux.getName().equals("")) aux.setName(professor.getName());
                if (!aux.getEmailAddress().equals("")) aux.setEmailAddress(professor.getEmailAddress());
                if (aux.getAddress()!=null) aux.setAddress(professor.getAddress());
                if (aux.getSalary()!=null) aux.setSalary(professor.getSalary());

                proRepository.save(aux);
            }
        }
    }
    public void deleteProfessor(Long idProfessor){
        proRepository.deleteById(idProfessor);
    }
}
