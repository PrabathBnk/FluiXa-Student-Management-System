package org.fluixa.service;

import org.fluixa.dto.Student;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface StudentService {
    void addStudent(Student student, MultipartFile file) throws IOException;
    List<Student> getAllStudents();
    void updateStudent(Student student);
    void deleteStudentById(String studentId);
    Student getStudentById(String studentId);
}
