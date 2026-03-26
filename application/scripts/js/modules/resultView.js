import createModal from "./modalGenerator.js";

export function showResult({ score, total }) {
    const resultModal = createModal({
        id: 'resultModal',
        title: 'Quiz Finished!',
        body: `
            <div class="text-center">
                <h2 class="mb-3">Your Score</h2>
                <div class="display-1 fw-bold text-primary mb-3">${score} / ${total}</div>
                <p class="lead">You answered ${Math.round((score / total) * 100)}% of questions correctly!</p>
            </div>
        `,
        footer: `
            <button onclick="location.reload()" class="btn btn-primary w-100">Try Again</button>
        `
    });

    resultModal.show();
}