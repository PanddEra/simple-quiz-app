const requestHandler = {

    async _fetchGetQuestions(){
        const response = await fetch(`scripts/php/get_questions.php`);
        const text = await response.text();
        return JSON.parse(text);
    },

    async _fetchGetAnswers(){
        const response = await fetch(`scripts/php/get_answers.php`);
        const text = await response.text();
        return JSON.parse(text);
    },

    async _fetchPostQuestions(data){
        await fetch(`scripts/php/post_user_response.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    async _fetchGetUserScore(username){
        const response = await fetch(`scripts/php/get_score.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        const text = await response.text();
        return JSON.parse(text);
    },

    async getQuestionCards() {
        const questions = await this._fetchGetQuestions();
        const answers = await this._fetchGetAnswers();

        return questions.map(q => ({
            ...q,
            options: answers.find(a => a.question_id === q.question_id)
        }));
    },

    async sendAnswers(data) {

        await this._fetchPostQuestions(data);
    },

    async getUserScore(username){
        return await this._fetchGetUserScore(username);
    }
};

export default requestHandler;