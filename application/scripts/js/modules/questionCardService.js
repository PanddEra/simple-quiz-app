const questionCardService = {
    generateQuestions: function (questions){
        return questions.map(q => this._generateQuestionTemplate(q));
},

    _generateQuestionTemplate: (question) => {
        const name = `question_${question.question_id}`;

        return `<div class="card mb-3">
        <div class="card-header">${question.question_text}</div>
        <div class="card-body">
            ${question.options.map(opt => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" 
                           name="${name}" 
                           value="${opt.question_id}" 
                           id="q${question.question_id}_${opt.question_id}" required>
                    <label class="form-check-label" for="q${question.question_id}_${opt.question_id}">
                        ${opt.question_text}
                    </label>
                </div>
            `).join('')}
        </div>
    </div>`;
    }
}
export default questionCardService;

