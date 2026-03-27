const renderQuiz = (questionsHTML) => {

    /*deb*/
    console.log("qHTML => " + questionsHTML);

    document.body.insertAdjacentHTML('beforeend', `
        <form id="quizForm">
            ${questionsHTML}
            <button type="submit" class="btn btn-success mt-4">Finish Quiz</button>
        </form>
    `);
}
export default renderQuiz;