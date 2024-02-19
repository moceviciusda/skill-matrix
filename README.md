# Skill Matrix

Skill Matrix is a work-in-progress web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Chakra UI. It empowers managers and team leads to create competence matrices for evaluating the skills and competences of their team members.

## Technologies Used

- **MERN Stack:**
  - MongoDB: Database for storing matrices, user data, and evaluations.
    > In retrospect, non relational database was not the best choice for this project
  - Express.js: Backend framework for handling API requests.
  - React.js: Frontend library for building user interfaces.
  - Node.js: JavaScript runtime for server-side development.
- **Chakra UI:** A component library for React that provides a set of accessible and customizable UI components.

## Features

- **Competence Matrices:** Users with management roles can create matrices defining the skills relevant to their team or project.
- **Evaluation:** Both workers and managers can evaluate and select the skills they believe the worker possesses.
- **Matrix Compliance:** The application calculates and displays how well the worker complies with the created matrix. Compliance disagreements are highlighted to streamline the discussion process during final evaluation.
- **History:** Evaluation data is stored for easier reevaluation and statistics
