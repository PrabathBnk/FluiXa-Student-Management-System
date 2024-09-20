package org.fluixa.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Student {
    @Id
    private String studentId;
    private String name;
    private Integer age;
    private String gender;
    private String contact;
    private String email;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String studentPicture;
}
