# Simple Quiz App

This repository contains a straightforward, full-stack quiz application. The frontend is built with vanilla JavaScript (ES6 Modules) and Bootstrap, while the backend is powered by PHP and a MySQL database.

## Features

-   **User Identification**: Start the quiz with a username or as a guest.
-   **Dynamic Content**: Questions and answers are dynamically fetched from a MySQL database.
-   **Interactive Quiz**: Users can select one answer for each multiple-choice question.
-   **Score Calculation**: User responses are submitted to the server, which calculates the score.
-   **Result Display**: The final score is presented in a summary modal upon completion.
-   **Modular Code**: The JavaScript code is organized into modules for better maintainability.

## Technologies Used

-   **Frontend**: HTML5, Bootstrap 5, JavaScript (ES6 Modules)
-   **Backend**: PHP
-   **Database**: MySQL

## Project Structure

```
.
├── application/             # Contains the core application files
│   ├── index.html           # Main HTML entry point
│   └── scripts/
│       ├── js/              # Frontend JavaScript
│       │   ├── app.js       # Main JS file, initializes the app
│       │   └── modules/     # Reusable JS modules
│       └── php/             # Backend PHP scripts
│           ├── connect_db.php
│           ├── get_answers.php
│           ├── get_questions.php
│           ├── get_score.php
│           └── post_user_response.php
└── files/                   # Database files
    ├── empty_db.sql         # SQL schema for creating the database tables
    └── sqlInserts.txt       # SQL statements to populate the database with questions
```

## Setup and Installation

To run this project locally, you will need a web server environment that supports PHP and MySQL (like XAMPP, WAMP, or MAMP).

### 1. Database Setup

1.  Create a new MySQL database named `quiz`.
2.  Import the table structure into your `quiz` database by executing the commands in `files/empty_db.sql`. This will create the `questions`, `answers`, and `user_responses` tables.
3.  Populate the `questions` and `answers` tables by running the SQL commands found in `files/sqlInserts.txt`.

### 2. Application Configuration

1.  Clone this repository to your local machine.
2.  Copy the `application` directory into your web server's root folder (e.g., `htdocs` in XAMPP).
3.  Open the `application/scripts/php/connect_db.php` file. If your MySQL credentials are not the default (`localhost`, `root`, no password), update them accordingly.
    ```php
    <?php
    global $conn;
    // Update these values if necessary
    $conn = mysqli_connect("localhost", "root", "", "quiz");

    if (!$conn) {
        die("Error: " . mysqli_connect_error());
    }
    ```

### 3. Running the Application

1.  Start your Apache and MySQL services from your web server's control panel.
2.  Open your web browser and navigate to `http://localhost/application/`.
3.  The quiz application should now be running. You can enter a username or proceed as a guest to start the quiz.
