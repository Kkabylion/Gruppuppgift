package com.example.dashboard;
// Importerar JpaRepository som erbjuder CRUD-operationer för entiteter.
import org.springframework.data.jpa.repository.JpaRepository;

// Importerar Query-annotationen som används för att skapa anpassade SQL- eller JPQL-frågor.
import org.springframework.data.jpa.repository.Query;

// Java's Date-klass för att hantera datum.
import java.util.Date;
import java.util.List;

// Definierar ett interface för att interagera med databasen och hantera Temperature-entiteter.
public interface TemperatureRepository extends JpaRepository<Temperature, Long> {

    // Använder @Query för att definiera en anpassad JPQL-fråga.
    // ?1, ?2, och ?3 är platsmarkörer som representerar metodparametrarna i ordning.
    @Query("SELECT t FROM Temperature t WHERE t.temp >= ?1 AND t.date >= ?2 AND t.date <= ?3")
    // Metod för att hämta temperaturposter baserat på ett minimumvärde samt ett start- och slutdatum.
    List<Temperature> findFiltered(Float minTemp, Date startDate, Date endDate);
}
