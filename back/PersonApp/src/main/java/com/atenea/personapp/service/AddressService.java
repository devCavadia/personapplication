package com.atenea.personapp.service;

import com.atenea.personapp.model.Address;
import com.atenea.personapp.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    private AddressRepository adRepository;

    public List<Address> getAddresses(){
        return adRepository.findAll();
    }
    public Address getOneAddress(Long idAddress){
        Optional<Address> optional = adRepository.findById(idAddress);
        if (optional.isPresent()){
            return optional.get();
        }
        return null;
    }
    public void addAddress(Address address){
        adRepository.save(address);
    }
    public void updateAddress(Address address){
        if(address.getIdAddress() != null){
            Optional<Address> optional = adRepository.findById(address.getIdAddress());
            if (optional.isPresent()){
                Address aux = optional.get();

                if (!aux.getStreet().equals("")) aux.setStreet(address.getStreet());
                if (!aux.getCity().equals("")) aux.setCity(address.getCity());
                if (!aux.getState().equals("")) aux.setState(address.getState());
                if (aux.getPostalCode()!=null) aux.setPostalCode(address.getPostalCode());
                if (!aux.getCountry().equals("")) aux.setCountry(address.getCountry());
                if (aux.getPerson()!=null) aux.setPerson(address.getPerson());

                adRepository.save(aux);
            }
        }
    }
    public void deleteAddress(Long idAddress){
        adRepository.deleteById(idAddress);
    }
}
