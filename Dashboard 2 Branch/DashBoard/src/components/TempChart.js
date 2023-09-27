import "./Styles.css";
import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TempChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch('http://localhost:5000/temperature');
                const rawData = await response.json();
                setData(rawData);
            } catch (error) {
                console.log("Error fetching initial data:", error.message);
            }
        };
            // Asynkron funktion som hämtar den senaste temperaturdatan från servern.
        const fetchLatestData = async () => {
            try {
                const response = await fetch('http://localhost:5000/latest-temperature');
                const latestData = await response.json();
                if (data.length >= 10) {
                    setData([...data.slice(1), latestData[0]]);
                } else {
                    setData([...data, latestData[0]]);
                }
            } catch (error) {
                console.log("Error fetching latest data:", error.message);
            }
        };

        fetchInitialData();
        // Hämta den senaste datan varje sekund.
        const intervalId = setInterval(fetchLatestData, 1000);
        return () => clearInterval(intervalId);
    }, [data]);
        // Bearbetar rådata till användbara arrayer för grafritning: temperaturer och datum.
    const temperatures = data.map(item => parseFloat(item.Temp));
    const dates = data.map(item => new Date(item.Datum).toLocaleString());
        // Beräknar minimi- och maxvärden för temperaturer.
    const minTemp = Math.min(...temperatures); 
    const maxTemp = Math.max(...temperatures);

        // Här är inställningarna för grafen, t.ex. färger, titlar, etc.
    const options = {
        chart: {
            type: 'areaspline', // Här kan man ändra på typen av grafen.
            backgroundColor: 'transparent',
            borderRadius: 100,
        },
        credits: { // Döljer Highcharts.com vattenmärke.
            enabled: false
        },
        // Sätter titeln på grafen och dess färg.
        title: {
            text: 'Stockholm W',
            style: {
                color: '#FFFFFF'
            }
        },

        xAxis: {
            title: {
                text: 'Datum', // Titeln på x-axeln i grafen är 'Datum
                style: {
                    color: '#FFFFFF' // Färgen på x-axelns titel är vit.
                },
                align: 'low', 
                y: 5,  // Y-förskjutning för titeln.
                x: 170,  // X-förskjutning för titeln.
                rotation: 0 
            },
            categories: dates,
            labels: {
                style: {
                    color: '#FFFFFF' // Färgen på x-axelns Datum/tid är vit
                }
            }
        },

        yAxis: {
            min: minTemp - 0.5, // Minsta värde för y-axeln sätts till minsta temperaturen minus 0.5.
            max: maxTemp + 0.5, // Största värde för y-axeln sätts till högsta temperaturen plus 0.5.

            title: {
                text: 'Temperatur (°C)', // Titeln för y-axeln är 'Temperatur (°C)'.
                style: {
                    color: '#FFFFFF' // Färgen på y-axelns titel är vit.
                }
            },
            labels: {
                style: {
                    color: '#FFFFFF' // Färgen på y-axelns etiketter är vit.
                }
            }

        },

        tooltip: {
            useHTML: true,
            borderWidth: 0, // Ingen ram runt tooltip.
            backgroundColor: 'none', // Bakgrundsfärg för tooltip är transparen
            shadow: false, // Ingen skugga runt tooltip.
            padding: 0, // Ingen vaddering i tooltip.
            style: {
                pointerEvents: 'none'
            },
            // Definierar innehållet i tooltipen när användaren hovrar över en datapunkt.
            formatter: function() {
                return '<div style="background: linear-gradient(to bottom, rgb(32,209,126), rgba(0,87,87,0.89)); padding: 5px; border-radius: 5px;">' +
                    'Date: ' + this.x + '<br>' +
                    'Temperature: ' + this.y + '°C' +
                    '</div>';
            },


        },


        legend: {
            itemStyle: {
                color: '#FFFFFF' 
            }
        },
        series: [{
            name: 'Temperatur',
            data: temperatures,
            color: '#20d17e',
            marker: {
                enabled: false // Markeringspunkter på grafen är inaktiverade, om man vill ha dem aktiverade ändra till true.
            },
            fillOpacity: 0.75,
            lineWidth: 3,
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, 'rgba(32,209,126,0.81)'], // Här är kan man ändra på Skugg färgen för linjen.
                    [1, 'rgba(0, 123, 255, 0)'] // semi transparent skugg färg.
                ]
            }
        }]
    };

    return (
        <div className="temp-chart-container">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

export { TempChart };
