# AS App - assignment submission app

## Description
AS App is a web application created using React,Springboot designed to provide a user-friendly interface with features powered by Tailwind and spline. 

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Add assignments
- Separate assignments based on importance
- Submit assignments to lecturers via mail.
- JWT implementation.


## Technologies Used
- *React*: A JavaScript library for building user interfaces.
- *Springboot*: backend.
- *Spline*: For 3d model.
- *Tailwind*: Styling.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   bash
   git clone git@github.com:VarshithPawarHR/Assignment-submission-application---AS-app.git


2.  Configure the database:

    Create a new MySQL database and update the configuration in `src/main/resources/application.properties`:

    bash

    spring.datasource.url=jdbc:mysql://localhost:3306/Notes/your-database-name
    spring.datasource.username=your-database-username
    spring.datasource.password=your-database-password
    

3.  Build the backend:

    bash
    cd server/Notes
    ./mvnw package
    
4.  Run the backend:

    bash

    java -jar target/Notes-0.0.1-SNAPSHOT.jar
    

5.  Install frontend dependencies:

    bash

    cd client
    npm install
    

6.  Run the frontend:

    bash

    npm start
    ```

7.  Access the application:

    Open [http://localhost:3000](http://localhost:3000/) in your web browser.



## Built as part of JSF course
Special thanks @shanpradeep2023 -- https://github.com/shanpradeep2023****
