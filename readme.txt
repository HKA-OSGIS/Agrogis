Aquí tienes el contenido del archivo `README.txt` en formato de texto plano:

```
EARTH_PIXEL - GIS Web Application

Project Overview
----------------
EARTH_PIXEL is a web-based Geographic Information System (GIS) application designed to manage, visualize, and interact with spatial data. It leverages Django, PostGIS, and GeoServer for backend operations, while the frontend is developed using OpenLayers, JavaScript, and Vite.

Project Structure
-----------------
EARTH_PIXEL/
│-- agro_api/                # Django API backend
│-- app_plot_management/     # Business logic for plots management
│-- app_weather/             # Weather data processing module
│-- front-end-earthpixel/    # Frontend application
│-- docker-compose.yml       # Docker configuration for services
│-- manage.py                # Django management script
│-- requirements.txt         # Backend dependencies
│-- README.txt               # Project documentation

Backend Overview
----------------
The backend is built using Django, with a PostGIS database to store geospatial data. The backend is responsible for:

- Handling API requests (CRUD operations for plot management)
- Interfacing with the spatial database (PostGIS)
- Serving geospatial data via GeoServer

Key Technologies:
- Django: Web framework for the backend.
- PostGIS: A spatial extension for PostgreSQL to handle geographic objects.
- GeoServer: A geospatial server that provides OGC services (WMS/WFS).

Docker Services:
The project uses Docker to orchestrate the following services:

1. PostGIS (Database)
   - Stores geospatial data such as parcels, coordinates, and attributes.

2. pgAdmin (Database Management Tool)
   - Web interface for managing the database.

3. GeoServer (Spatial Data Server)
   - Publishes spatial data via WMS (Web Map Service).

4. Django API
   - Handles API requests from the frontend.

Frontend Overview
-----------------
The frontend is developed using OpenLayers, a powerful JavaScript library for web mapping applications. The frontend provides functionalities such as:

- Viewing spatial layers from GeoServer.
- Drawing polygons on the map.
- Performing CRUD operations via API calls.
- Interacting with WMS layers for geospatial data visualization.

Key Technologies:
- OpenLayers: Mapping library for rendering geospatial data.
- Vite: Frontend build tool.
- Axios: HTTP client for API interactions.

Frontend Structure:

front-end-earthpixel/
│-- js/
│   ├── buildings.js        # CRUD functions for plot management
│   ├── registerEvents.js   # Event handlers for user interactions
│   ├── settings.js         # Configuration settings (API URLs, etc.)
│   ├── señales.js          # Handles data transmission
│   ├── map/                # Map-related functions using OpenLayers
│-- index.html              # Main entry point for the web app
│-- style.css               # Styling for the application
│-- vite.config.js          # Vite configuration for frontend build

How the Frontend Works
----------------------
1. User Interaction:  
   - The user clicks buttons (e.g., Insert, Update, Delete).
   - These actions are captured by registerEvents.js.

2. API Communication:  
   - CRUD operations are handled via buildings.js, which sends API requests to Django.

3. Map Visualization:  
   - The map is rendered using OpenLayers in mapMain.js.
   - Data layers are loaded from GeoServer.

Setting Up the Project
----------------------
Prerequisites:
Ensure you have the following installed:

- Docker and Docker Compose
- Node.js and npm

Installation Steps:

1. Clone the repository:
   git clone https://github.com/your-repository/earth_pixel.git
   cd earth_pixel

2. Run the backend services using Docker:
   docker-compose up -d

3. Set up the frontend:
   cd front-end-earthpixel
   npm install

4. Start the frontend application:
   npm start

Usage
-----
1. Open the web application in your browser at http://localhost:3000.
2. Use the interface to interact with the map:
   - Click "Insert" to add new parcels.
   - Select existing parcels for updating.
   - View geospatial data layers.

Important Endpoints
-------------------
Backend (Django API) Endpoints:
- POST /plots/building_insert/ – Insert a new building plot.
- POST /plots/building_update/ – Update an existing plot.
- POST /plots/building_delete/ – Delete a plot.
- GET /plots/building_select_by_gid/?gid=1 – Get a plot by ID.

GeoServer WMS Services:
- http://localhost:8080/geoserver/agrogis/wms?
  - Provides map layers for visualization in OpenLayers.

Troubleshooting
---------------
- If containers do not start properly, check logs with:
  docker-compose logs -f

- If the frontend does not load, verify that the backend API is running:
  curl http://localhost:8000/plots/

Contribution
------------
If you want to contribute to this project:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes and push to the repository.
4. Submit a pull request.

License
-------
This project is licensed under the MIT License.

Contact
-------
For further inquiries, please contact:  
[Your Name]  
Email: your-email@example.com  
GitHub: https://github.com/your-profile
```

Guarda este contenido como `README.txt` y súbelo a GitHub para proporcionar una visión clara de tu proyecto a otros desarrolladores y colaboradores.