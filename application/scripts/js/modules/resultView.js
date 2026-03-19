export function showResult(results) {
    const total = results.length;

    document.body.innerHTML = `
        <div class="text-center mt-5">
            <h2>Quiz Finished</h2>
            <p>You answered ${total} questions</p>
            <button onclick="location.reload()" class="btn btn-primary">
                Restart
            </button>
        </div>
    `;
}