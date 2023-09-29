package com.example.dashboard;

// Importera Spring Boot-annotationer och klasser
import org.springframework.beans.factory.annotation.Autowired;   // Används för att automatiskt injicera beroenden
import org.springframework.stereotype.Controller;               // Markerar klassen som en Spring MVC-kontroller
import org.springframework.ui.Model;                          // Används för att lägga till attribut som ska skickas till vyn
import org.springframework.web.bind.annotation.GetMapping;     // Markerar en metod som ska svara på GET-förfrågningar
import org.springframework.web.bind.annotation.ResponseBody;  // Anger att en metods returvärde ska skickas som ett svar på en webbförfrågan
import org.springframework.web.bind.annotation.CrossOrigin;  // Tillåter cross-origin förfrågningar för en specifik metod
import java.util.List;                                       // Importera Java List interface

@Controller  // Denna klass definieras som en Spring MVC-kontroller
public class TemperatureController {

    // Använder autowiring för att automatiskt injicera en instans av TemperatureRepository
    @Autowired
    private TemperatureRepository temperatureRepository;

    // Hanterar GET-förfrågningar till "/dashboard"-URL:en
    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        // Hämtar alla temperaturposter från databasen
        List<Temperature> temperatures = temperatureRepository.findAll();

        // Lägger till listan med temperaturposter som ett attribut som ska skickas till vyn
        model.addAttribute("temperatures", temperatures);

        // Returnerar namnet på vyn (antagligen en Thymeleaf-mall) som ska renderas
        return "dashboard";
    }

    // Tillåter cross-origin förfrågningar från "http://localhost:8080"
    @CrossOrigin(origins = "http://localhost:8080")
    // Hanterar GET-förfrågningar till "/latest_temperatures"-URL:en och returnerar datan direkt som JSON
    @GetMapping("/latest_temperatures")
    public @ResponseBody List<Temperature> getLatestTemperatures() {
        // Hämtar alla temperaturposter från databasen
        return temperatureRepository.findAll();
    }
}

