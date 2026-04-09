import generateQuestions from "./questionCardService.js";

let currentPage = 1;
let limit = 1;
let savedAnswers = [];
const renderQuiz = (questions) => {
    document.body.innerHTML = `
        <form id="quizForm">
            <div id="questionsContainer"></div>
            <div id="paginationContainer" class="mt-3 d-flex justify-content-around"></div>
            <button type="submit" class="btn btn-success mt-4">Finish Quiz</button>
        </form>
    `;

    const questionsContainer = document.getElementById('questionsContainer');
    const paginationContainer = document.getElementById('paginationContainer');

    const renderPage = () => {
        const start = (currentPage - 1) * limit;
        const end = start + limit;

        const currentQuestions = questions.slice(start, end);

        questionsContainer.innerHTML = generateQuestions(currentQuestions);

        const totalPages = Math.ceil(questions.length / limit);
        for(let name in savedAnswers) {
            const input = document.querySelector(`input[name = "${name}"][value="${savedAnswers[name]}"]`);
            if(input) input.checked = true;
        }
        renderPagination(totalPages);
    };
    const renderPagination = (totalPages) => {
        let pages = [];

        pages.push(1);

        let start;
        let end;

        if (currentPage === 1) {
            start = currentPage + 1;
        } else if (currentPage === 2) {
            start = currentPage;
        } else {
            start = currentPage - 1;
        }

        if (currentPage === totalPages) {
            end = currentPage - 1;
        } else if (currentPage === totalPages - 1) {
            end = currentPage;
        } else {
            end = currentPage + 1;
        }

        if (start > 2) pages.push('...');

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) pages.push('...');

        pages.push(totalPages);

        let html = `<a id="prev" class="pagination ${currentPage === 1 ? 'disabled' : ''}">&laquo;</a>`;

        html += pages.map(p => {
            if (p === '...') return `<span>...</span>`;
            return `<a class="pagination page-link ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</a>`;
        }).join('');

        html += `<a id="next" class="pagination ${currentPage === totalPages ? 'disabled' : ''}">&raquo;</a>`;

        paginationContainer.innerHTML = html;
    };

    paginationContainer.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('disabled')) return;

        if (target.id === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (target.id === 'next') {
            currentPage++;
        } else if (target.dataset.page) {
            currentPage = parseInt(target.dataset.page);
        }

        document.querySelectorAll('input:checked').forEach((input) => {
            savedAnswers[input.name] = input.value;
        })
        renderPage();
    });

    renderPage();
};

export default renderQuiz;