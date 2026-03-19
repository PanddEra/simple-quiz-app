'use strict';
import storageHandler from "./storageHandler.js";
import questionCardService from "./questionCardService.js";
import requestHandler from "./requestHandler.js";

export default function initEvents({
                                       loginModal,
                                       sendAnswersModal
                                   }){

    const loginForm = document.getElementById('loginForm');

    window.addEventListener('DOMContentLoaded', async () => {
        if (!storageHandler.username) {
            loginModal.show();
        }

        const questionsData = await requestHandler.getQuestionCards();
        const questionsHTML = questionCardService.generateQuestions(questionsData).join('');
//TODO move rendering to another file !
        const quizFormHTML = ` 
        <form id="quizForm">
            ${questionsHTML}
            <button type="submit" class="btn btn-success mt-4">Finish Quiz</button>
        </form>
    `;

        document.body.insertAdjacentHTML('beforeend', quizFormHTML);

        document.getElementById('quizForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const results = [];

            for (let [key, value] of formData.entries()) {
                const questionId = key.replace('question_', '');
                results.push({
                    question_id: questionId,
                    selected_option: value
                });
            }

            console.log("Saving these results:", results);
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            storageHandler.username = e.target.elements.usernameInput.value;
            loginModal.hide();
        });
    }
}