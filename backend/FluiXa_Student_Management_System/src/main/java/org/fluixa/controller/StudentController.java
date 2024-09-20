package org.fluixa.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.fluixa.dto.Student;
import org.fluixa.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class StudentController {

    @Autowired
    StudentService service;

    @GetMapping("/student")
    public List<Student> getStudents(){
        return service.getAllStudents();
    }

    @PostMapping("/add-student")
    public void addStudent(@RequestPart("student") String studentJson, @RequestPart("file") MultipartFile imageFile){
        try {
            Student student = new ObjectMapper().readValue(studentJson, Student.class);
            service.addStudent(student, imageFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("get-student/{studentId}")
    public Student getStudentById(@PathVariable String studentId){
        return service.getStudentById(studentId);
    }
}
