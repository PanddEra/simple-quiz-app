const questionCardService = {
    generateQuestions: function (questions) {
        return questions.map(q => this._generateQuestionTemplate(q));
    },

    _generateQuestionTemplate: (question) => {
        const name = `question_${question.question_id}`;
        // Отримуємо варіанти з першого (і єдиного) об'єкта в options
        const opts = question.options[0];

        // Масив ключів, щоб пройтися циклом по варіантах
        const keys = ['option_a', 'option_b', 'option_c', 'option_d'];

        return `
        <div class="card mb-3">
            <div class="card-header"><b>${question.question_text}</b></div>
            <div class="card-body">
                ${keys.map(key => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" 
                               name="${name}" 
                               value="${key}" 
                               id="q${question.question_id}_${key}" required>
                        <label class="form-check-label" for="q${question.question_id}_${key}">
                            ${opts[key]}
                        </label>
                    </div>
                `).join('')}
            </div>
        </div>`;
    }
}
export default questionCardService;