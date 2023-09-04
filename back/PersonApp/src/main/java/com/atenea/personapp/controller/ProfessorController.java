package com.atenea.personapp.controller;

import com.atenea.personapp.model.Professor;
import com.atenea.personapp.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professor")
@CrossOrigin(origins = "*")
public class ProfessorController {
    @Autowired
    private ProfessorService proService;

    @GetMapping("/all")
    public List<Professor> getProfessors(){
        return proService.getProfessors();
    }

    @GetMapping("/one/{id}")
    public Professor getOneProfessor(@PathVariable("id") Long idProfessor){
        return proService.getOneProfessor(idProfessor);
    }
    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addProfessor(@RequestBody Professor professor){
        proService.addProfessor(professor);
    }
    @PutMapping("/upd")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateProfessor(@RequestBody Professor professor){
        proService.updateProfessor(professor);
    }

    @DeleteMapping("/del/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProfessor(@PathVariable("id") Long idProfessor){
        proService.deleteProfessor(idProfessor);
    }
}
