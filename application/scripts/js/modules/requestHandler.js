const requestHandler = {
    async _fetch(endpoint, options = {}) {
        const response = await fetch(`scripts/php/${endpoint}`, options);
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error('Server error response:', text);
            throw new Error(`Invalid JSON response from ${endpoint}`);
        }
    },

    async getQuestionCards() {
        const [questions, answers] = await Promise.all([
            this._fetch('get_questions.php'),
            this._fetch('get_answers.php')
        ]);

        if (questions.error) throw new Error(questions.error);
        if (answers.error) throw new Error(answers.error);

        return questions.map(q => ({
            ...q,
            options: answers.find(a => a.question_id === q.question_id)
        }));
    },

    async sendAnswers(data) {
        return this._fetch('post_user_response.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

export default requestHandler;