'use strict';
import storageHandler from "./storageHandler.js";
import questionCardService from "./questionCardService.js";
import requestHandler from "./requestHandler.js";
import {renderQuiz} from "./renderQuiz.js";
import {showResult} from "./resultView.js";

export default function initEvents({ loginModal, sendAnswersModal }) {
    const loginForm = document.getElementById('loginForm');

    // Функція для запуску квізу
    const startQuiz = async () => {
        try {
            const questionsData = await requestHandler.getQuestionCards();
            const questionsHTML = questionCardService.generateQuestions(questionsData).join('');

            // Рендеримо квіз
            renderQuiz(questionsHTML);

            // Тепер, коли форма з'явилася в DOM, вішаємо на неї подію
            const quizForm = document.getElementById('quizForm');
            quizForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(quizForm);
                const results = Array.from(formData.entries()).map(([key, value]) => ({
                    question_id: key.replace('question_', ''),
                    selected_option: value
                }));

                await requestHandler.sendAnswers(results);
                showResult(results);
            });
        } catch (e) {
            console.error(e);
            alert("Помилка завантаження питань.");
        }
    };

    // Показуємо модалку при старті
    window.addEventListener('DOMContentLoaded', () => {
        loginModal.show();
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = e.target.elements.usernameInput;
            storageHandler.username = input ? input.value : null;
            loginModal.hide();
            startQuiz(); // Запускаємо квіз після логіну
        });
    }

    // Обробка кнопки Guest Mode (якщо у неї є ID або клас)
    document.querySelector('.btn-danger[data-bs-dismiss="modal"]')?.addEventListener('click', () => {
        storageHandler.username = ""; // Спрацює логіка з UUID
        startQuiz();
    });
}