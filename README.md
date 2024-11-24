# README

# Travel Log

# Description
  The Travel Log is a personalized tool designed specifically for me to track the places I've been and, eventually, the destinations on my bucket list that I want to visit. It serves as a visual collection of my adventures, allowing me to celebrate past experiences and stay inspired for future travels.

  Built with a simple and intuitive interface, the app helps me reflect on my journeys, document cherished memories, and plan the next steps in my exploration of the world. It’s more than just a tracker—it’s a living record of some of my best memories. 

# Getting Started
  These instructions will get you a copy of the project up and running on your local machine.

# Prerequisites
  Before you begin, ensure you have met the following requirements:
    Backend
      - Ruby version: 3.2.2
      - Rails version: 7.1.3.4
      - PostgreSQL
    Frontend
      - Node.js version: v22.2.0
      - npm version: 10.7.0

# Technologies Used
  Backend
    - Ruby on Rails
    - PostgreSQL
  Frontend
    - React
    - Axios
    - Leaflet 
    - OpenStreetMap

# Backend Installation
  1. Clone the backend repository:
      git clone https://github.com/alcytorres/travel-app-backend.git

  2. Navigate to the backend directory:
      cd travel-app-backend

  3. Install dependencies:
      bundle install

  4. Set up the database:
      rails db:setup

# Starting the Rails Server
  From the travel-app-backend directory, run:
    rails server

# Frontend Installation
  1. Clone the frontend repository:
      git clone https://github.com/alcytorres/travel-app-frontend.git

  2. Navigate to the frontend directory:
      cd travel-app-frontend

  3. Install dependencies:
      npm install

# Starting the React Development Server
  From the travel-app-frontend directory, run:
    npm start

# Usage
  - Add New Trips: Click on "Add Trip" to input details about your travels, such as location, dates, and highlights.
  - View Map: Access the interactive map to see pins marking all the - places you've visited.
  - Manage Trips: View the list of your trips, edit details, or remove trips from your log.
  - Plan Future Travels: Add destinations you wish to visit in the future.

# Key Features
  - Add Trips: Document your travels with specific details.
  - Visual Map: An interactive map displaying all your visited locations.
  - Manage Trips: Easily edit or delete trips from your log.
  - Personal Motivation: Reflect on past adventures and plan new ones.

# Additional Configuration
  CORS Configuration: Configure Cross-Origin Resource Sharing (CORS) in your Rails backend to allow requests from your frontend.

# License
  This project is open source and available under the MIT License.

# Acknowledgments
  Leaflet and OpenStreetMap for providing mapping tools. The open-source community for their invaluable resources and support.


