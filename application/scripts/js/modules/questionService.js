const questionService = {

    getQuestions: (questions) => {
        return questions.map(q => this._generateQuestionTemplate(q));
},

    _generateQuestionTemplate: (question) => {
        return
        `<div class="card">
            <div class="card-header">
                    ${question.text}
            </div>
            <div class="card-body">
                <div class="form-check">
                    ${question.options.forEach(q => {
                        <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1"/>
                        <label className="form-check-label" htmlFor="radioDefault1">${q.text}</label>
                    })}
                </div>
            </div>
        </div>`
    }
}

