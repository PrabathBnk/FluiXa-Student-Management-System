package org.fluixa.controller;

import org.fluixa.dto.Guardian;
import org.fluixa.service.GuardianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class GuardianController {

    @Autowired
    GuardianService service;

    @PostMapping("add-guardian")
    public void addGuardian(@RequestBody Guardian guardian){
        service.addGuardian(guardian);
    }

    @GetMapping("get-guardians")
    public List<Guardian> getAllGuardian(){
        return service.getAllGuardians();
    }

    @PutMapping("update-guardian")
    public void updateGuardian(@RequestBody Guardian guardian){
        service.updateGuardian(guardian);
    }

    @DeleteMapping("delete-guardian/{studentId}")
    public void deleteGuardian(@PathVariable String studentId){
        service.deleteGuardian(studentId);
    }

    @GetMapping("get-guardian/{studentId}")
    public Guardian getGuardian(@PathVariable String studentId){
        return service.getGuardianById(studentId);
    }
}
