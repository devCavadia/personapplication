package com.atenea.personapp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAddress;
    @Column(nullable = false, length = 50)
    private String street;
    @Column(nullable = false, length = 50)
    private String city;
    @Column(nullable = false, length = 50)
    private String state;
    @Column(nullable = false)
    private Long postalCode;
    @Column(nullable = false, length = 50)
    private String country;

    @OneToOne
    @JoinColumn(name = "idPerson")
    @JsonIgnoreProperties("address")
    private Person person;
}
