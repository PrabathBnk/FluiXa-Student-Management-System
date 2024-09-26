package org.fluixa.service;


import org.fluixa.dto.Guardian;

import java.util.List;

public interface GuardianService {
    void addGuardian(Guardian guardian);
    List<Guardian> getAllGuardians();
    void updateGuardian(Guardian guardian);
    void deleteGuardian(String studentId);
    Guardian getGuardianById(String studentId);
}
