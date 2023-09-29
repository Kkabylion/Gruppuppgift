package com.example.dashboard;
//importerar de nödvändiga klasser och paket för att kunna kommunicera med databasen via JPA
import jakarta.persistence.*;
import java.util.Date;

// Markerar denna klass som en entitet (tabell) i databasen.
@Entity
// mappar klassen "name" till tabellen "temperatur" i databasen
@Table(name = "temperatur")

public class Temperature {
    // Anger att ID är tabellens primärnyckel
    @Id
    // Anger hur ID-värdet ska genereras (i detta fall automatiskt av databasen).
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    // Mappar till "Temp" kolumnen i databasen.
    @Column(name = "Temp") // kolumn namn i mySql
    private float temp;

    // Mappar till "Datum" kolumnen i databasen.
    @Column(name = "Datum")  // kolumn namn i mySql
    private Date date;

    // getters and setters metod för att hämta ID-värdet.
    public Long getId() {
        return id;
    }

    // Getter-metod för att hämta temperaturvärdet.
    public float getTemp() {
        return temp;
    }

    // Getter-metod för att hämta datumvärdet.
    public Date getDate() {
        return date;
    }

}
