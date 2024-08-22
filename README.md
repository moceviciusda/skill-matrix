# Skill Matrix

Skill Matrix is a team competence monitoring and individual evaluation project I used as an opportunity to **learn React**.
It empowers managers and team leads to create competence matrices for evaluating the skills and competences of their team members.

The project died when I got comfortable with the stack and realized that there were more appropriate technologies for the task that I also want to learn.
[Bloom](https://bloom-kappa-flame.vercel.app/) is the scaled-up successor of Skill Matrix, through which I'm hoping to bring the idea to completion.

## Technologies Used

- **MERN Stack:**
  - MongoDB: Document database for storing matrices, user data, and evaluations.
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
