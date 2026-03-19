export function renderQuiz(questionsHTML) {
    const html = `
        <form id="quizForm">
            ${questionsHTML}
            <button type="submit" class="btn btn-success mt-4">
                Finish Quiz
            </button>
        </form>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
}