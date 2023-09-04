package com.atenea.personapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Student extends Person{
    private Long studentNumber;
    private Double averageMark;
}
