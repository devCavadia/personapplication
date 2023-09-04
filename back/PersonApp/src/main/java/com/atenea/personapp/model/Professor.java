package com.atenea.personapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
public class Professor extends Person {
    private Long salary;
}
