package com.atenea.personapp.controller;

import com.atenea.personapp.model.Student;
import com.atenea.personapp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
public class StudentController {
    @Autowired
    private StudentService stdService;

    @GetMapping("/all")
    public List<Student> getStudents(){
        return stdService.getStudents();
    }

    @GetMapping("/one/{id}")
    public Student getOneStudent(@PathVariable("id") Long idStudent){
        return stdService.getOneStudent(idStudent);
    }
    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addStudent(@RequestBody Student student){
        stdService.addStudent(student);
    }
    @PutMapping("/upd")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateStudent(@RequestBody Student student){
        stdService.updateStudent(student);
    }

    @DeleteMapping("/del/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStudent(@PathVariable("id") Long idStudent){
        stdService.deleteStudent(idStudent);
    }
}
