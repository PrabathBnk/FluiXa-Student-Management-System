package org.fluixa.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.fluixa.util.GuardianId;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(GuardianId.class)
public class Guardian {

    @Id
    private String studentId;
    @Id
    private String guardianId;
    private String name;
    private String address;
    private String contact;
}
