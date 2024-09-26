package org.fluixa.service.impl;


import org.fluixa.dto.Guardian;
import org.fluixa.repository.GuardianRepository;
import org.fluixa.service.GuardianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuardianServiceImpl implements GuardianService {

    @Autowired
    GuardianRepository repository;

    @Override
    public void addGuardian(Guardian guardian) {
        repository.save(guardian);
    }

    @Override
    public List<Guardian> getAllGuardians() {
        return repository.findAll();
    }

    @Override
    public void updateGuardian(Guardian guardian) {
        repository.save(guardian);
    }

    @Override
    public void deleteGuardian(String studentId) {
        repository.delete(getGuardianById(studentId));
    }

    @Override
    public Guardian getGuardianById(String studentId) {
        List<Guardian> guardianList = getAllGuardians();

        for (Guardian guardian: guardianList){
            if(studentId.equals(guardian.getStudentId())) return guardian;
        }

        return null;
    }
}
