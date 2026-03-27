# Simple Quiz App Logic (Pseudocode)

## 1. Application Entry (app.js)
```text
BEGIN
    SET loginModal = CALL createModal(id="loginModal", title="Login")
    CALL init(loginModal)
END
```

## 2. Initialization & Events (eventsHandler.js)
```text
FUNCTION init(loginModal)
    WHEN DOMContentLoaded:
        CALL loginModal.show()

    WHEN loginForm SUBMITTED:
        SET username = GET usernameInput VALUE
        IF username IS NOT EMPTY:
            CALL storageHandler.setUsername(username)
            CALL loginModal.hide()
            CALL startQuiz()
        ELSE:
            SHOW alert("Enter username")

    WHEN guestModeButton CLICKED:
        CALL storageHandler.setGuest()
        CALL loginModal.hide()
        CALL startQuiz()
END FUNCTION

ASYNC FUNCTION startQuiz()
    TRY:
        SET questionsData = CALL requestHandler.getQuestionCards()
        SET questionsHTML = CALL generateQuestionsHTML(questionsData)
        
        CALL renderQuiz(questionsHTML)

        WHEN quizForm SUBMITTED:
            PREVENT default submission
            SET responses = []
            FOR EACH input IN form:
                APPEND {question_id, selected_option} TO responses
            
            CALL requestHandler.sendAnswers(username, responses)
            SET result = CALL requestHandler.getUserScore(username)
            CALL showResult(result.score, result.total)
    CATCH Error:
        SHOW alert("Error loading questions")
END FUNCTION
```

## 3. Data Handling (requestHandler.js)
```text
ASYNC FUNCTION getQuestionCards()
    SET questions = FETCH FROM "get_questions.php"
    SET answers = FETCH FROM "get_answers.php"
    
    RETURN questions MAPPED WITH matching answers BY question_id
END FUNCTION

ASYNC FUNCTION sendAnswers(username, responses)
    POST {username, responses} TO "post_user_response.php"
END FUNCTION

ASYNC FUNCTION getUserScore(username)
    POST {username} TO "get_score.php"
    RETURN parsed JSON result
END FUNCTION
```

## 4. UI Rendering (questionCardService.js / renderQuiz.js)
```text
FUNCTION generateQuestionsHTML(questions)
    SET finalHTML = ""
    FOR EACH question IN questions:
        APPEND Card DIV to finalHTML
        FOR EACH option (A, B, C, D) IN question.options:
            APPEND Radio Input + Label to finalHTML
    RETURN finalHTML
END FUNCTION

FUNCTION renderQuiz(html)
    INJECT html + Submit Button INTO document.body
END FUNCTION
```

## 5. Result Display (scoreModal.js)
```text
FUNCTION showResult(score, total)
    SET content = "You scored " + score + " out of " + total
    SET modal = CALL createModal(id="resultModal", body=content)
    CALL modal.show()
END FUNCTION
```

---

## 6. PHP Backend Logic

### Database Connection (connect_db.php)
```text
BEGIN
    TRY:
        CONNECT TO MySQL("localhost", "root", "", "quiz")
        IF connection FAILS:
            DIE with ERROR message
END
```

### Fetch Questions (get_questions.php)
```text
BEGIN
    SET query = "SELECT question_id, question_text FROM questions"
    SET result = EXECUTE query
    SET questionsArray = []
    
    WHILE row EXISTS in result:
        APPEND row TO questionsArray
        
    RETURN questionsArray AS JSON
END
```

### Fetch Answers (get_answers.php)
```text
BEGIN
    SET query = "SELECT * FROM answers"
    SET result = EXECUTE query
    SET answersArray = []
    
    WHILE row EXISTS in result:
        APPEND row TO answersArray
        
    RETURN answersArray AS JSON
END
```

### Save User Responses (post_user_response.php)
```text
BEGIN
    SET data = READ JSON input FROM body
    SET username = data.username OR "Guest"
    SET responses = data.responses
    
    PREPARE statement "INSERT INTO user_responses (username, question_id, selected_option) VALUES (?, ?, ?)"
    
    FOR EACH response IN responses:
        BIND username, response.question_id, response.selected_option
        EXECUTE statement
        
    CLOSE statement
    CLOSE connection
END
```

### Calculate Score (get_score.php)
```text
BEGIN
    SET data = READ JSON input FROM body
    SET username = data.username OR "Guest"
    
    SET query = "SELECT ur.selected_option, q.correct_option 
                 FROM user_responses ur
                 JOIN questions q ON ur.question_id = q.question_id
                 WHERE ur.username = ?"
                 
    PREPARE and EXECUTE query WITH username
    
    SET score = 0
    SET total = 0
    
    WHILE row EXISTS in results:
        INCREMENT total
        IF row.selected_option EQUALS row.correct_option:
            INCREMENT score
            
    RETURN {score, total} AS JSON
    CLOSE connection
END
```
