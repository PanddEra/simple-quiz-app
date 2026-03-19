'use strict';
import storageHandler from "./storageHandler.js";
import questionCardService from "./questionCardService.js";
import requestHandler from "./requestHandler.js";
import {renderQuiz} from "./renderQuiz.js";
import {showResult} from "./resultView.js";

export default function initEvents({
                                       loginModal,
                                       sendAnswersModal
                                   }){

    const loginForm = document.getElementById('loginForm');

    window.addEventListener('DOMContentLoaded', async () => {
        const username = e.target.elements.usernameInput.value.trim();

        if (!username) {
            alert('Enter username');
            return;
        }
try{
    const questionsData = await requestHandler.getQuestionCards();
}catch (e){
            alert("Failed to load questions")
    console.log(e)
}

        const questionsHTML = questionCardService.generateQuestions(questionsData).join('');
        renderQuiz(questionsHTML);

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const results = Array.from(formData.entries()).map(([key, value]) => ({
                question_id: key.replace('question_', ''),
                selected_option: value
            }));

            await requestHandler.sendAnswers(results);

            showResult(results);
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            storageHandler.username = e.target.elements.usernameInput.value.trim();
            loginModal.hide();
        });
    }
}