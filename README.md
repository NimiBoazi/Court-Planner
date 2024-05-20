# Court Planner App for Web

## Introduction
The Court Planner app is a public facility schedule planner developed for the web, utilizing the MERN stack. This application allows users to create profiles (note: user profile functionality is currently unsecured) to book time slots for various facilities. The app is designed to store all user profiles, facility locations, and booking data within the database. The project is under development, utilizing a local server and database for testing and development purposes.

## Features
- User authentication: Sign in and create a new user account.
- Facility location selection: Users can choose from a list of available locations.
- Booking component:
  - Time slot selection: Users can pick from a list or use a bar chart for visual selection.
  - Bar chart for court availability and time slot selection: Implements a dynamic bar chart using the React Recharts library to display current court availability.

## Quick Start
### Prerequisites
- Node.js (version 21.6.1 or above)
- MongoDB (version 2.1.3 or above)
- Git
- A modern web browser, preferably Google Chrome

### Installation
```bash
git clone https://github.com/NimiBoazi/Court-Planner.git
cd Court-Planner
npm install
