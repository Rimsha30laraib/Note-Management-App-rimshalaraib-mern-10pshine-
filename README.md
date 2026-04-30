# Note Management App

# Overview

This project aims to provide a full-stack web application that allows users to create, edit, and delete notes. It integrates user authentication to ensure privacy for each user and includes application logging, exception handling, unit testing, and SQL database or MongoDB integration.

## Technology Stack
Following are the stacks below:
- Node.JS (Latest LTS)
- React.js
- MongoDB
- Pino Logger
- Mocha/Chai (Backend)
- Jest (Frontend Testing)
- Logger
- SonarQube
- Git

  ## Key Features
  
- User Authentication & Authorization:
    - Users can sign up, log in, and log out.
    - Notes are associated with individual authenticated users.
- Note Management
    - Users can create new notes, edit existing ones, and delete notes.
    - Notes support rich text editing for a better user experience.
- Application Logging using Pino Logger
    - Implement logging throughout the application using Pino Logger.
    - Log important events, errors, http request and response and user activities.
- Mongo Database
    - Design a database schema to store user information, Notes, and related data.
- Exception Handling:
    - Implement global exception handling (middleware) to gracefully handle errors and provide meaningful error messages to users.
    - Log exceptions using Pino.
- Unit Testing using Mocha/Chai(backend) and Jest(frontend)
    - Write unit tests to cover critical parts of application.
    - Test controllers, services, and data access layers.
- SonarQube Integration
    - Integrate SonarQube to analyze code quality and identify potential issues.
    - Configure rules for the JavaScript/typescript code.
- React.js Frontend
    - Use React.js for the frontend to create an interactive and responsive user interface.
    - Implement a dashboard to display notes, user profile, and other relevant information.
- Git Version Control
    - Utilize Git for version control.
    - Encourage the use of branching and merging strategies.
- NodeJS Backend
    - Create, read, update, and delete APIs.
    - Implement logging throughout the application using Pino Logger.
    - Write unit tests in Mocha/Chai to cover critical parts of the application.
- Additional Features (Optional)
    - Search and Filter: Implement search and filter functionalities for tasks
 
  ## Components
🖥️ **Screen details (click on the arrow icon to extend the content)**

- Screen 1: Sign Up / Log In
    **Components:**
    
    - Sign-up form
    - Log-in form
    
    **Operations:**
    
    - User registration and authentication
    - Redirect to the main application upon successful login
      
- Screen 2: Dashboard (List of Notes)
    
    **Components:**
    
    - List of user-specific notes
    - Button to create a new note
    
    **Operations:**
    
    - Fetch user-specific notes from the backend
    - Display the list of notes
    - Navigate to the note editor
- Screen/Modal 3: Note Editor
    
    **Components:**
    
    - Rich text editor
    - Save and cancel buttons
    
    **Operations:**
    
    - Create a new note or edit an existing one
    - Save the note to the backend
    - Return to the dashboard after saving or canceling
- Screen/Modal 4: User Profile [optional]
    
    **Components:**
    
    - User details
    - Logout button
    
    **Operations:**
    
    - Display user information
    - Log the user out

