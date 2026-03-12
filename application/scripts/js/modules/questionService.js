const questionService = {

    getQuestions: (questions) => {
        return questions.map(q => this._generateQuestionTemplate(q));
},

    _generateQuestionTemplate: (question) => {

}
}