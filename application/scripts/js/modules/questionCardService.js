const questionCardService = {
    generateQuestions: function (questions){
        return questions.map(q => this._generateQuestionTemplate(q));
},

    _generateQuestionTemplate: (question) => {
        return `<div class="card">
            <div class="card-header">
                ${question.text}
            </div>
            <div class="card-body">
                <div class="form-check">
                   ${question.options.map(q => `
                        <input class="form-check-input" type="radio" name="radioDefault" id="radio_${q.id}"/>
                        <label class="form-check-label" for="radio_${q.id}">${q.text}</label>
                    `).join('')}
                </div>
            </div>
        </div>`
    }
}
export default questionCardService;

