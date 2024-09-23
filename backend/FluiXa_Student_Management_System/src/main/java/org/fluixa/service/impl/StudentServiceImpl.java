package org.fluixa.service.impl;

import org.fluixa.dto.Student;
import org.fluixa.repository.StudentRepository;
import org.fluixa.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository repository;

    @Override
    public void addStudent(Student student, MultipartFile file) throws IOException {
        student.setStudentPicture(Base64.getEncoder().encodeToString(file.getBytes()));
        repository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    @Override
    public void updateStudent(Student student, MultipartFile file) throws IOException {
        student.setStudentPicture(Base64.getEncoder().encodeToString(file.getBytes()));
        repository.save(student);
    }

    @Override
    public void deleteStudentById(String studentId) {
        repository.delete(getStudentById(studentId));
    }

    @Override
    public Student getStudentById(String studentId) {
        List<Student> studentList = getAllStudents();

        for (Student student: studentList){
            if(student.getStudentId().equals(studentId)) return student;
        }

        return null;
    }
}
