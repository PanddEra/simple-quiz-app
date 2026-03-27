'use strict';
import storageHandler from "./storageHandler.js";
import generateQuestionsHTML from "./questionCardService.js";
import requestHandler from "./requestHandler.js";
import renderQuiz from "./renderQuiz.js";
import showResult from "./scoreModal.js";

const startQuiz = async () => {
    try {
        const questionsData = await requestHandler.getQuestionCards();
        const questionsHTML = generateQuestionsHTML(questionsData);
        
        renderQuiz(questionsHTML);

        document.getElementById('quizForm').addEventListener("submit", async (e) => {
            e.preventDefault();
            const responses = [];
            const formData = new FormData(e.target);

            formData.forEach((value, key) => {
                responses.push({
                    question_id: key.replace('question_', ''),
                    selected_option: value
                });
            });

            const result = await requestHandler.sendAnswers({
                username: storageHandler.getUsername(),
                responses
            });
            
            const {score, total} = await requestHandler.getUserScore(storageHandler.getUsername());
            showResult({score, total});
        });
    } catch (e) {
        console.error(e);
        alert("Error loading questions.");
    }
};
const init = ({ loginModal }) => {
    window.addEventListener('DOMContentLoaded', () => loginModal.show());

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target.elements.usernameInput.value;
        if (username) {
            storageHandler.setUsername(e.target.elements.usernameInput.value);
            loginModal.hide();
            startQuiz();
        }else{
            alert("Please enter valid username");
        }

    });

    document.querySelector('[data-guest-mode-btn]').addEventListener('click', () => {
        storageHandler.setGuest();
        loginModal.hide();
        startQuiz();
    });
}

export default init;