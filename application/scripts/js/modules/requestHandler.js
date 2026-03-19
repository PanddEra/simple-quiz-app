const requestHandler = {

    async getQuestionCards(){
        const questions = await this._fetchGetQuestions();
        const answers = await this._fetchGetAnswers();
        let data = []
        for (let i = 0; i < questions.length; i++) {
            data[i] = questions[i];
            for (let j = 0; j < answers.length; j++) {
                if(questions[i].question_id === answers[j].question_id){
                    if (!data[i].options) data[i].options = [];
                    data[i].options.push(answers[j]);
                }
            }
        }
        return data;
    },
    async sendAnswers(data) {
        const res = await fetch(`scripts/php/post_user_response.php`, {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Failed to send answers");
        }

        return await res.json();
    },

    async _fetchGetQuestions(url='scripts/php/get_questions.php') {
       const response = await fetch(url);
       return await response.json();
    },

    async _fetchGetAnswers(url='scripts/php/get_answers.php') {
        const response = await fetch(url);
        return response.json();
    }
}
export default requestHandler;