const requestHandler = {

    async _fetchGetQuestions(){
        const response = await fetch(`scripts/php/getQuestions.php`);
        const text = await response.text();
        return JSON.parse(text);
    },

    async _fetchGetAnswers(){
        const response = await fetch(`scripts/php/getAnswers.php`);
        const text = await response.text();
        return JSON.parse(text);
    },

    async _fetchPostQuestions(data){
        await fetch(`scripts/php/post_user_response.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        });

    },

    async _fetchGetUserScore(username){
        const response = await fetch(`scripts/php/get_score.php`, {
            body: JSON.stringify(username)
        });
        const text = await response.text();
        return JSON.parse(text);
    },

    async getQuestionCards() {
        const questions = await this._fetchGetQuestions();
        const answers = await this._fetchGetAnswers();

        /*deb*/
        console.log("q => " + questions);
        console.log("a => " + answers);

        return questions.map(q => ({
            ...q,
            options: answers.find(a => a.question_id === q.question_id)
        }));
    },

    async sendAnswers(data) {

        /*deb*/
        console.log("d => " + data);

        await this._fetchPostQuestions(data);
    },

    async getUserScore(username){
        const response = await this._fetchGetUserScore(username);
        return await response;
    }
};

export default requestHandler;