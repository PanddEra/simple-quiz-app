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
        const questionsElements = await questionCardService.generateQuestions(questionsData).join('');
        document.body.insertAdjacentHTML('beforeend', questionsElements);//NOT MINE
    })

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            storageHandler.username = e.target.elements.usernameInput.value;
            loginModal.hide();
        });
    }
}