package com.atenea.personapp.service;

import com.atenea.personapp.model.Student;
import com.atenea.personapp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository stdRepository;
    public List<Student> getStudents(){
        return stdRepository.findAll();
    }

    public Student getOneStudent(Long idStudent){
        Optional<Student> optional = stdRepository.findById(idStudent);
        if (optional.isPresent()){
            return optional.get();
        }
        return null;
    }

    public void addStudent(Student student){ stdRepository.save(student); }

    public void updateStudent(Student student){
        if (student.getIdPerson()!=null){
            Optional<Student> optional = stdRepository.findById(student.getIdPerson());
            if (optional.isPresent()){
                Student aux = optional.get();

                if (!aux.getName().equals("")) aux.setName(student.getName());
                if (!aux.getEmailAddress().equals("")) aux.setEmailAddress(student.getEmailAddress());
                if (aux.getAddress()!=null) aux.setAddress(student.getAddress());
                if (aux.getStudentNumber()!=null) aux.setStudentNumber(student.getStudentNumber());
                if (aux.getAverageMark()!=null) aux.setAverageMark(student.getAverageMark());

                stdRepository.save(aux);
            }
        }
    }
    public void deleteStudent(Long idStudent){
        stdRepository.deleteById(idStudent);
    }
}
