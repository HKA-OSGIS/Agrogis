import './style.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import { registerEvents } from './js/registerEvents';
import { helloWord } from './js/helloWorld';
import { MapMain } from './js/map/mapMain';
import { setMAP_MAIN } from './js/settings';

import axios from 'axios';
import Chart from 'chart.js/auto';

// Inicialización de eventos y configuración del mapa
registerEvents();
setMAP_MAIN(new MapMain());

// Variables de la API de clima
const WEATHER_API_URL = 'https://api.agromonitoring.com/agro/1.0/weather';
const NDVI_API_URL = 'https://api.agromonitoring.com/agro/1.0/ndvi/history';
const API_KEY = 'a597344f0250c0b03aaa704f7ec99eaf';

// Parámetros de la parcela
const lat = 35;
const lon = 139;
const POLYGON_ID = '6792966ac46b9f16dadfb625'; // Asegúrate de usar el ID correcto

// Función para convertir una fecha en formato "YYYY-MM-DD" a timestamp Unix
function convertToUnixTimestamp(dateString) {
    return Math.floor(new Date(dateString).getTime() / 1000);
}

// Variables de fecha configurables por el usuario
const userStartDate = "2024-01-01";  // Cambia esta fecha según tu necesidad
const userEndDate = "2024-01-31";    // Cambia esta fecha según tu necesidad

// Convertir las fechas a formato Unix
const startDate = convertToUnixTimestamp(userStartDate);
const endDate = convertToUnixTimestamp(userEndDate);

console.log("Fecha de inicio (Unix):", startDate);
console.log("Fecha de fin (Unix):", endDate);

// Botón para actualizar el clima
document.getElementById('update-weather-btn').addEventListener('click', () => {
    fetchWeatherData();
    console.log("Datos climáticos actualizados manualmente");
});

// Botón para actualizar el NDVI
document.getElementById('update-ndvi-btn').addEventListener('click', () => {
    fetchNDVIData();
    console.log("Datos de NDVI actualizados manualmente");
});

// Configuración del gráfico de clima
const weatherChart = new Chart(document.getElementById('weather-chart').getContext('2d'), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperatura (K)',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Humedad (%)',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        layout: {
            padding: {
                bottom: 20
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                suggestedMax: 400,
                ticks: {
                    stepSize: 50
                }
            }
        }
    }
});

// Configuración del gráfico de NDVI
const ndviChart = new Chart(document.getElementById('ndvi-chart').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'NDVI',
                data: [],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        layout: {
            padding: {
                bottom: 20
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                suggestedMax: 1,
                ticks: {
                    stepSize: 0.1
                }
            }
        }
    }
});

console.log('Inicializando gráficos:', weatherChart, ndviChart);

// Función para obtener datos de la API de clima
async function fetchWeatherData() {
    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                lat: lat,
                lon: lon,
                appid: API_KEY
            }
        });

        const data = response.data;
        console.log('Datos climáticos recibidos:', data);

        // Actualizar gráfico de clima
        updateWeatherChart(data);
    } catch (error) {
        console.error('Error obteniendo los datos del clima:', error);
    }
}

// Obtener datos de NDVI
async function fetchNDVIData() {
    try {
        const response = await axios.get(NDVI_API_URL, {
            params: {
                start: startDate,
                end: endDate,
                polyid: POLYGON_ID,
                appid: API_KEY
            }
        });

        console.log('Respuesta completa NDVI:', response.data);

        if (response.data.length === 0) {
            console.error("No se encontraron datos NDVI.");
            return;
        }

        updateNDVIChart(response.data);
    } catch (error) {
        console.error('Error obteniendo los datos de NDVI:', error);
    }
}

// Función para actualizar el gráfico de clima
function updateWeatherChart(data) {
    console.log("Actualizando gráfico de clima con datos:", data);

    if (!data || !data.main) {
        console.error("Datos climáticos no válidos:", data);
        return;
    }

    const temperature = data.main.temp || 0;
    const humidity = data.main.humidity || 0;

    const currentTime = new Date().toLocaleTimeString();

    weatherChart.data.labels.push(currentTime);
    weatherChart.data.datasets[0].data.push(temperature);
    weatherChart.data.datasets[1].data.push(humidity);

    if (weatherChart.data.labels.length > 10) {
        weatherChart.data.labels.shift();
        weatherChart.data.datasets[0].data.shift();
        weatherChart.data.datasets[1].data.shift();
    }

    weatherChart.update();
}

function updateNDVIChart(data) {
    console.log("Datos recibidos para el gráfico NDVI:", data);

    if (!data || data.length === 0) {
        console.error("Datos NDVI no disponibles o vacíos.");
        return;
    }

    const labels = [];
    const ndviValues = [];

    data.forEach(entry => {
        const date = new Date(entry.dt * 1000).toLocaleDateString(); // Convertir Unix a fecha
        labels.push(date);
        ndviValues.push(entry.data.mean); // Obtener el valor medio de NDVI
    });

    console.log("Fechas procesadas:", labels);
    console.log("Valores de NDVI procesados:", ndviValues);

    // Actualizar el gráfico
    ndviChart.data.labels = labels;
    ndviChart.data.datasets[0].data = ndviValues;

    ndviChart.update();
}


// Llamada inicial a la API para obtener datos al cargar la página
fetchWeatherData();
fetchNDVIData();
