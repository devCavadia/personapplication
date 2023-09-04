package com.atenea.personapp.controller;

import com.atenea.personapp.model.Address;
import com.atenea.personapp.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
@CrossOrigin(origins = "*")
public class AddressController {
    @Autowired
    private AddressService adService;

    @GetMapping("/all")
    public List<Address> getAddresses(){
        return adService.getAddresses();
    }

    @GetMapping("/one/{id}")
    public Address getOneAddress(@PathVariable("id") Long idAddress){
        return adService.getOneAddress(idAddress);
    }
    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addAddress(@RequestBody Address address){
        adService.addAddress(address);
    }
    @PutMapping("/upd")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateAddress(@RequestBody Address address){
        adService.updateAddress(address);
    }

    @DeleteMapping("/del/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAddress(@PathVariable("id") Long idAddress){
        adService.deleteAddress(idAddress);
    }
}
