# Simple Quiz App Documentation

## Overview

The **Simple Quiz App** is a full-stack application that allows users to participate in interactive quizzes. It supports both registered (username-based) and guest users. The application dynamically fetches questions and answers from a database and calculates scores in real-time.

The project is modular, making it easy to understand, maintain, and scale.

## Features

1. **User Authentication**:
   - Users can log in with a custom username or proceed as a guest.
2. **Dynamic Quiz Generation**:
   - Questions and answers are dynamically fetched from a MySQL database, ensuring data consistency.
3. **Score Calculation**:
   - Submissions are processed on the server, where the score is calculated.
4. **Result Summary**:
   - Results are presented in a stylish modal with user-friendly details.
5. **Responsive Design**:
   - The frontend is built with Bootstrap 5 for a responsive, modern UI.
6. **Modular Architecture**:
   - Code is split across frontend and backend modules for better organization.

## Technologies Used

- **Frontend**: HTML5, Bootstrap 5, JavaScript (ES6 Modules)
- **Backend**: PHP (server-side scripting)
- **Database**: MySQL

## Data Flow

### Frontend:
1. The user starts the app via `index.html`:
   - The `loginModal` handles user login or guest selection (`modalGenerator.js`).
2. Once authenticated, the app fetches quiz data using `requestHandler.js`.
3. The `eventsHandler.js` manages quiz events:
   - Rendering questions dynamically.
   - Submitting answers via AJAX calls to the server.
4. Results are fetched and displayed in a modal (`scoreModal.js`).

### Backend:
1. On receiving requests, PHP scripts (`get_questions.php`, `get_answers.php`) query the database.
2. For submissions, `post_user_response.php` registers responses in the database.
3. Scores are computed in real-time using `get_score.php` and sent back to the client.

### Database:
- Data is stored in `questions`, `answers`, and `user_responses` tables.
- Relationships ensure data integrity:
   - **`user_responses`**: Stores which user answered what.
   - **`questions`**: Holds question texts and correct answers.
   - **`answers`**: Contains available answer options for each question.

## Project Structure

```plaintext
.
├── application/
│   ├── index.html             # Main entry point for the app
│   └── scripts/
│       ├── js/
│       │   ├── app.js         # Initializes the app
│       │   └── modules/       # Modularized JavaScript code
│       │       ├── eventsHandler.js
│       │       ├── modalGenerator.js
│       │       ├── questionCardService.js
│       │       ├── renderQuiz.js
│       │       ├── requestHandler.js
│       │       ├── scoreModal.js
│       │       └── storageHandler.js
│       └── php/
│           ├── connect_db.php
│           ├── get_questions.php
│           ├── get_answers.php
│           ├── get_score.php
│           └── post_user_response.php
├── files/
│   ├── empty_db.sql           # Schema for database tables
│   └── sqlInserts.txt         # Sample data for questions and answers
```

### Folder Highlights:

1. **`application/scripts/js/modules/`**:
   - **Frontend Modules**: Responsible for rendering the quiz, handling events, and connecting with the server.

2. **`application/scripts/php/`**:
   - **Backend PHP Scripts**: Handle the database operations and dynamic data retrieval.

3. **`files`**:
   - SQL scripts for database setup and inserts.

## File Responsibilities

### JavaScript Modules
- **`modalGenerator.js`**: Creates custom modals dynamically.
- **`eventsHandler.js`**: Handles quiz-related events like form submissions and user authentication.
- **`questionCardService.js`**: Converts database questions/answers into HTML.
- **`renderQuiz.js`**: Renders the quiz dynamically.
- **`requestHandler.js`**: Performs server requests for questions, answers, and scores.
- **`scoreModal.js`**: Displays the result summary modal.
- **`storageHandler.js`**: Manages session storage for usernames.

### PHP Scripts
- **`connect_db.php`**: Establishes MySQL database connection.
- **`get_questions.php`**: Fetches questions.
- **`get_answers.php`**: Retrieves possible answers for questions.
- **`post_user_response.php`**: Saves user responses after quiz submission.
- **`get_score.php`**: Computes scores and retrieves results.

### SQL Files
- **`empty_db.sql`**: Defines database structure.
- **`sqlInserts.txt`**: Contains sample questions and answers for initial database setup.

## How to Set Up Locally

### Requirements:
- A local server with PHP and MySQL (e.g., XAMPP, WAMP, MAMP).

### Steps:
1. **Database**:
   - Create a database named `quiz`.
   - Import `empty_db.sql` to set up the tables.
   - Execute the commands in `sqlInserts.txt` to populate the tables.

2. **Application**:
   - Clone the repository and move the `application` folder into your server's public directory (e.g., `htdocs` for XAMPP).
   - Update database credentials in `connect_db.php` as needed:
     ```php
     $conn = mysqli_connect("localhost", "root", "", "quiz");
     ```

3. **Run**:
   - Start the server and MySQL.
   - Open your browser and navigate to `http://localhost/application/`.

## Code Flow: How It Works

1. **Login Phase**:
   - Users provide a username or select guest mode.
   - The `eventsHandler.js` handles login and initializes the quiz.

2. **Quiz Rendering**:
   - Questions from the database are fetched via `requestHandler.js`.
   - `renderQuiz.js` dynamically builds the quiz interface.

3. **Score Calculation & Display**:
   - Submissions are sent to the `post_user_response.php`.
   - The score is calculated in `get_score.php` and displayed in the `scoreModal.js`.

---

## Contribution

Feel free to contribute by opening issues and submitting pull requests with improvements or new features for the app.

---

## Diagrams

### 1. Frontend Data Flow Diagram

**Description**: The flow of data begins when a user interacts with the application. It details the interaction between the user interface and JavaScript modules. The data flow highlights how requests and responses enable quiz functionality.

**Flow**:
```plaintext
User Interaction ➡ Login (modalGenerator.js)
   ⬇
Starts Quiz (eventsHandler.js)
   ⬇
Sends Request for Questions (requestHandler.js) ➡ Server
   ⬇
Receives Questions/Answers ⬅ (requestHandler.js)
   ⬇
Renders Quiz Questions (renderQuiz.js)
   ⬇
User Submission (eventsHandler.js)
   ⬇ 
Sends Answers to Server (requestHandler.js) ➡ Server
   ⬇
Shows Score in Modal (scoreModal.js)
```

---

### 2. Server-Side Workflow Diagram

**Description**: This diagram explains how PHP scripts handle user actions and interact with the database. It describes the server-side data flow for fetching quiz questions, saving user responses, and calculating scores.

**Flow**:
```plaintext
[Frontend Requests]
   ⬇
Server-Side (PHP Scripts):
  - get_questions.php: Fetch quiz questions
  - get_answers.php: Provide possible answers
  - post_user_response.php: Save user’s responses
  - get_score.php: Calculate and return user score
   ⬇
[Database Interaction]
  - questions Table: Fetch question texts
  - answers Table: Retrieve answer options
  - user_responses Table: Store responses and calculate scores
```

---

### 3. Database Schema (ER Diagram)

**Description**: A depiction of the tables in the database and how they interact with each other.

**Schema**:
```plaintext
+-------------------+       +----------------+
|  questions        |       |  answers       |
+-------------------+       +----------------+
| question_id (PK)  |<----->| question_id (FK)|
| question_text     |       | option_a        |
| correct_option    |       | option_b        |
+-------------------+       | option_c        |
                            | option_d        |
                            +----------------+

+-------------------+
|  user_responses   |
+-------------------+
| response_id (PK)  |
| username          |
| question_id (FK)  |
| selected_option   |
+-------------------+
```

**Relationships**:
- **questions.question_id**: Primary key for the `questions` table.
- **answers.question_id**: Foreign key linking answers to the respective question.
- **user_responses.question_id**: Foreign key linking responses to questions.

---
