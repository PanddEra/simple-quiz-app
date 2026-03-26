'use strict';
import { storageHandler } from "./storageHandler.js";
import questionCardService from "./questionCardService.js";
import requestHandler from "./requestHandler.js";
import { renderQuiz } from "./renderQuiz.js";
import { showResult } from "./resultView.js";

const startQuiz = async () => {
    try {
        const questionsData = await requestHandler.getQuestionCards();
        const questionsHTML = questionCardService.generateQuestions(questionsData);
        
        renderQuiz(questionsHTML);

        document.getElementById('quizForm').addEventListener("submit", async (e) => {
            e.preventDefault();
            const responses = Array.from(new FormData(e.target).entries()).map(([key, value]) => ({
                question_id: key.replace('question_', ''),
                selected_option: value
            }));

            const result = await requestHandler.sendAnswers({
                username: storageHandler.getUsername(),
                responses
            });
            
            showResult(result);
        });
    } catch (e) {
        console.error(e);
        alert("Error loading questions.");
    }
};

export default function initEvents({ loginModal }) {
    window.addEventListener('DOMContentLoaded', () => loginModal.show());

    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        storageHandler.setUsername(e.target.elements.usernameInput.value);
        loginModal.hide();
        startQuiz();
    });

    document.querySelector('.btn-danger[data-bs-dismiss="modal"]')?.addEventListener('click', () => {
        storageHandler.setGuest();
        startQuiz();
    });
}